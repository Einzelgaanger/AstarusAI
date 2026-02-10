import {
  useState,
  useRef,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import OpenAI from "openai";
import { useParams, useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Send, Bot, User, RefreshCw, MessageCircle, Brain, Sparkles, ChevronDown, Info, Check, X, Edit2, MessageSquare, FileText, History, ScrollText, GraduationCap, MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { fadeIn } from "@/lib/motion";
import {
  getSpaceByLutName,
  getSpaceTrainingLogsByLutName,
  createSpaceTrainingLog,
  updateSpaceTrainingLogQAs,
} from "@/lib/spaceService";
import {
  getOrCreateSpaceChat,
  getChatMessages,
  saveMessageWithUser,
} from "@/lib/chatService";

const BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "https://dhzzxfr41qjcz7-8000.proxy.runpod.net";
const MODEL = import.meta.env.VITE_API_MODEL || "mistral";
const OPENAI_MODEL = import.meta.env.VITE_OPENAI_MODEL || "gpt-4.1";

// NOTE: This runs in the browser. Using OpenAI directly from the client will
// expose your API key to anyone who can see the network calls / bundle.
// For production, proxy this call through your own backend instead.
const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

// Reuse same style of system prompt so behaviour matches main demo
const SYSTEM_PROMPT =
  "You are Astara, a friendly conversational AI assistant running on a " +
  "LUT-augmented Mistral model created by Astarus AI. " +
  "You are an expert on Astarus AI and have been fine-tuned on information on it. " +
  "Astarus AI is an AI startup which focuses on building continuously trainable LLMs through LUT (look up table) based LLMs. " +
  "You answer like a chat, not like an email. " +
  "Be concise and informal. " +
  "If the user just greets you or says thanks, reply briefly and naturally.";

function buildMistralChatPrefix(
  userMessage: string,
  systemPrompt: string = SYSTEM_PROMPT
): string {
  const trimmedUser = userMessage.trim();
  const content = systemPrompt
    ? `${systemPrompt.trim()}\n\n${trimmedUser}`
    : trimmedUser;

  return `[INST] ${content} [/INST]`;
}

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

type GenerateResponse = {
  completion: string;
  residual?: number | number[];
  threshold?: number;
};

const DEFAULT_THRESHOLD = 0.45;
const GEN_LENGTH = 300;
const DEFAULT_BLOCKS = [-1, -4];
const DEFAULT_RESIDUALS = [0.2, 0.25];

type QAItem = {
  id: string;
  question: string;
  answer: string;
};

type TrainingHistoryEntry = {
  id: string;
  user: string;
  date: string;
  qaCount: number;
  qas: QAItem[];
  lastEditedBy?: string;
  lastEditedAt?: string;
};

function cleanAnswer(raw: string): string {
  let text = raw;
  text = text.replace(/\[INST\]/g, "").replace(/\[\/INST\]/g, "");
  text = text.replace(/^Assistant:\s*/i, "");
  text = text.replace(/\nAssistant:\s*/gi, "\n");
  const userIdx = text.indexOf("\nUser:");
  if (userIdx !== -1) {
    text = text.slice(0, userIdx);
  }
  const dotColonIdx = text.indexOf(".:");
  if (dotColonIdx !== -1) {
    text = text.slice(0, dotColonIdx + 1);
  }
  text = text.replace(/\n\./g, ".");
  text = text.replace(/\n{3,}/g, "\n\n");
  return text.trim();
}

// Same simple extraction as old code
function extractAssistantAnswer(_userMsg: string, completion: string): string {
  return cleanAnswer(completion.trim());
}

// Generate Q&A pairs from text using OpenAI directly
async function generateQAsFromText(
  text: string,
  _lutName: string
): Promise<Array<{ question: string; answer: string }>> {
  if (!import.meta.env.VITE_OPENAI_API_KEY) {
    throw new Error(
      "VITE_OPENAI_API_KEY is not set. Please add it to your .env file."
    );
  }

  const trimmed = text.trim();
  if (!trimmed) {
    return [];
  }

  const prompt = `
You generate high-quality question–answer pairs from source text.

Your goals, in order of priority:
1) Create as MANY useful Q&A pairs as possible from the text.
2) Every question must be significant and non-trivial (no fluff).
3) Avoid redundant or near-duplicate questions completely.

Guidelines:
- Focus on key ideas, mechanisms, definitions, trade-offs, and practical implications.
- Prefer questions that would genuinely help someone understand or be tested on this text.
- Do NOT create questions that just restate the same fact in slightly different words.
- Do NOT create questions about formatting, headings, or obviously minor details.
- Each question must be understandable without seeing the original text.
- If the text is long and rich, you can return 20–40 questions.
- If the text is short or repetitive, return fewer questions and keep only the best ones.

Output format (MUST follow exactly):
- Return ONLY valid JSON, no extra text.
- JSON must be an array of objects with exactly these fields:
  - "question": string
  - "answer": string
- Example: [{"question":"...","answer":"..."}, {"question":"...","answer":"..."}]

Source text (possibly truncated):
${trimmed.substring(0, 4000)}
`;

  const response = await openai.responses.create({
    model: OPENAI_MODEL,
    input: [
      {
        role: "system",
        content:
          "You are an assistant that extracts concise, high-value question–answer pairs from text and returns ONLY JSON.",
      },
      {
        role: "user",
        content: prompt,
      },
    ],
    max_output_tokens: 1200,
  });

  // Safely extract text from the response output
  const outputItem = response.output[0];
  let raw = "";
  if (outputItem && "content" in outputItem && Array.isArray(outputItem.content)) {
    const contentItem = outputItem.content[0];
    if (contentItem && "type" in contentItem && contentItem.type === "output_text" && "text" in contentItem) {
      raw = contentItem.text;
    }
  }

  // Clean common wrappers like markdown fences
  let cleaned = raw.trim()
    .replace(/```json\s*/gi, "")
    .replace(/```\s*$/gi, "")
    .trim();

  // Ensure we only keep the JSON array part if there's extra text
  const firstBracket = cleaned.indexOf("[");
  const lastBracket = cleaned.lastIndexOf("]");
  if (firstBracket !== -1 && lastBracket !== -1 && lastBracket > firstBracket) {
    cleaned = cleaned.slice(firstBracket, lastBracket + 1);
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(cleaned);
  } catch (err) {
    console.error("Failed to parse OpenAI Q&A JSON:", err, cleaned);
    throw new Error("Failed to parse Q&A pairs from OpenAI response.");
  }

  if (!Array.isArray(parsed)) {
    throw new Error("OpenAI did not return a JSON array of Q&A pairs.");
  }

  return (parsed as any[])
    .map((qa) => ({
      question: String(qa.question ?? "").trim(),
      answer: String(qa.answer ?? "").trim(),
    }))
    .filter(
      (qa) =>
        qa.question &&
        qa.answer &&
        qa.question.length > 5 &&
        qa.answer.length > 5
    );
}

// Train LUT with the same chat formatting as Python CLI / old UI:
async function trainLut(
  lutName: string,
  label: string,
  labelContext: string | null,
  wnnBlocks: number[],
  threshold: number,
  residuals: number[]
) {
  const payload = {
    label: label.trim(),
    label_context: labelContext ? buildMistralChatPrefix(labelContext) : null,
    lut_name: lutName,
    model: MODEL,
    wnn_blocks: wnnBlocks,
    threshold,
    residuals,
    sparsity: 1.0,
    cost_scale: 5,
  };
  const res = await fetch(`${BASE_URL}/train_lut`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(
      (json as any)?.error ||
        (json as any)?.detail ||
        `Train LUT failed with ${res.status}`
    );
  }
  return json;
}

async function generateFromApi(
  lutName: string,
  userMsg: string,
  threshold: number,
  wnnBlocks: number[],
  residuals: number[]
): Promise<GenerateResponse> {
  const prompt = buildMistralChatPrefix(userMsg);

  const payload = {
    prompt,
    length: GEN_LENGTH,
    lut_name: lutName,
    model: MODEL,
    threshold,
    residuals,
    wnn_blocks: wnnBlocks,
    cost_scale: 5,
  };

  const res = await fetch(`${BASE_URL}/generate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const json = (await res.json().catch(() => ({}))) as GenerateResponse & {
    error?: string;
    detail?: string;
  };
  if (!res.ok) {
    throw new Error(json.error || json.detail || `Generate failed ${res.status}`);
  }
  return json;
}

export default function SpaceChat() {
  const { lut_name } = useParams<{ lut_name: string }>();
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [status, setStatus] = useState<string | null>(null);
  const [spaceName, setSpaceName] = useState<string>("");
  const [trainingText, setTrainingText] = useState("");
  const [generatedQAs, setGeneratedQAs] = useState<QAItem[]>([]);
  const [isGeneratingQAs, setIsGeneratingQAs] = useState(false);
  const [editingQA, setEditingQA] = useState<string | null>(null);
  const [trainingHistory, setTrainingHistory] = useState<TrainingHistoryEntry[]>([]);
  const [activeView, setActiveView] = useState<'chat' | 'training' | 'logs'>('chat');
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [loadingStage, setLoadingStage] = useState<string>('');
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [loadingTotal, setLoadingTotal] = useState(0);
  const [loadingTimeRemaining, setLoadingTimeRemaining] = useState<string>('');
  const [loadingType, setLoadingType] = useState<'generate' | 'train'>('generate');
  const { user } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isInitialMount = useRef(true);
  const startTimeRef = useRef<number>(0);
  const [selectedHistoryId, setSelectedHistoryId] = useState<string | null>(null);
  const [historyEditQAs, setHistoryEditQAs] = useState<QAItem[]>([]);
  const [isRetraining, setIsRetraining] = useState(false);
  const [spaceId, setSpaceId] = useState<string | null>(null);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);

  const hasMessages = useMemo(() => messages.length > 0, [messages.length]);

  // Effective LUT name is always tied to this space
  const effectiveLutName = useMemo(
    () => lut_name || "",
    [lut_name]
  );

  // Load space name
  useEffect(() => {
    if (lut_name) {
      getSpaceByLutName(lut_name)
        .then((space) => {
          if (space) {
            setSpaceId(space.id);
            setSpaceName(space.name);
          }
        })
        .catch(() => {
          // If space not found, use lut_name as fallback
          setSpaceName(lut_name);
        });
    }
  }, [lut_name]);

  // Load persisted training logs for this LUT
  useEffect(() => {
    if (!effectiveLutName) return;
    getSpaceTrainingLogsByLutName(effectiveLutName)
      .then((logs) => {
        const entries: TrainingHistoryEntry[] = logs.map((log) => ({
          id: log.id,
          user: log.user_identifier,
          date: log.created_at,
          qaCount: (log.qas || []).length,
          qas: (log.qas || []).map((qa, index) => ({
            id: `${log.id}-${index}`,
            question: qa.question,
            answer: qa.answer,
          })),
          lastEditedBy: log.last_edited_by || undefined,
          lastEditedAt: log.last_edited_at || undefined,
        }));
        setTrainingHistory(entries);
      })
      .catch((err) => {
        console.error("Failed to load training logs:", err);
      });
  }, [effectiveLutName]);

  // Get or create space chat and load messages
  useEffect(() => {
    const loadSpaceChat = async () => {
      if (!spaceId || !user || !lut_name) return;

      try {
        // Get or create chat for this space
        const chatId = await getOrCreateSpaceChat(spaceId, user.id, spaceName || undefined);
        setCurrentChatId(chatId);

        // Load existing messages
        const dbMessages = await getChatMessages(chatId);
        const loadedMessages: Message[] = dbMessages.map((msg) => ({
          id: msg.id,
          role: msg.role as "user" | "assistant",
          content: msg.content,
        }));
        setMessages(loadedMessages);
      } catch (err) {
        console.error("Failed to load space chat:", err);
      }
    };

    loadSpaceChat();
  }, [spaceId, user, lut_name, spaceName]);

  // Scroll to top only on initial component mount
  useLayoutEffect(() => {
    if (isInitialMount.current) {
      requestAnimationFrame(() => {
        window.scrollTo({ top: 0, left: 0, behavior: "instant" as ScrollBehavior });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
      });
      isInitialMount.current = false;
    }
  }, []);

  // Scroll to messages end when new messages are added (but not on initial mount)
  useEffect(() => {
    if (messages.length > 0 && !isInitialMount.current) {
      // Scroll the container to bottom instead of using scrollIntoView
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
        }
      }, 50);
    }
  }, [messages.length]);

  if (!lut_name) {
    navigate("/spaces");
    return null;
  }

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || isGenerating || !effectiveLutName) return;

    // Ensure we have a chat ID
    let chatId = currentChatId;
    if (!chatId && spaceId && user) {
      try {
        chatId = await getOrCreateSpaceChat(spaceId, user.id, spaceName || undefined);
        setCurrentChatId(chatId);
      } catch (err) {
        console.error("Failed to get/create chat:", err);
        setStatus("Failed to initialize chat");
        return;
      }
    }

    const userMsg: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: trimmed,
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setStatus(null);
    setIsGenerating(true);

    // Save user message to DB
    if (chatId && user) {
      try {
        await saveMessageWithUser(chatId, "user", trimmed, user.id);
      } catch (err) {
        console.error("Failed to save user message:", err);
      }
    }

    try {
      const resp = await generateFromApi(
        effectiveLutName,
        trimmed,
        DEFAULT_THRESHOLD,
        DEFAULT_BLOCKS,
        DEFAULT_RESIDUALS
      );

      const assistantText = extractAssistantAnswer(trimmed, resp.completion);
      const assistantMsg: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: assistantText,
      };
      setMessages((prev) => [...prev, assistantMsg]);

      // Clear loading state immediately after showing the answer
      setIsGenerating(false);

      // Save assistant message to DB (non-blocking)
      if (chatId) {
        saveMessageWithUser(chatId, "assistant", assistantText, null).catch((err) => {
          console.error("Failed to save assistant message:", err);
        });
      }

      // Train the Q&A pair into the LUT as memory (non-blocking, in background)
      if (effectiveLutName && user) {
        // Run training in background without blocking UI
        trainLut(
          effectiveLutName,
          assistantText,
          trimmed,
          DEFAULT_BLOCKS,
          DEFAULT_THRESHOLD,
          DEFAULT_RESIDUALS
        ).catch((err) => {
          console.error("Failed to train chat message into LUT:", err);
          // Don't show error to user for chat training failures
        });
      }
    } catch (err: any) {
      setStatus(err?.message || "Generation failed");
      setIsGenerating(false);
    }
  };

  const handleGenerateQAs = async () => {
    if (!lut_name || !trainingText.trim()) {
      setStatus("Please provide text to generate Q&A pairs from.");
      return;
    }

    setIsGeneratingQAs(true);
    setLoadingType('generate');
    setShowLoadingModal(true);
    setLoadingProgress(0);
    setLoadingTotal(100);
    startTimeRef.current = Date.now();
    
    const stages = [
      "Preparing text for analysis...",
      "Sending request to AI model...",
      "Generating question-answer pairs...",
      "Processing and validating results...",
      "Finalizing Q&A pairs..."
    ];
    
    try {
      // Stage 1: Preparing
      setLoadingStage(stages[0]);
      setLoadingProgress(10);
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Stage 2: Sending request
      setLoadingStage(stages[1]);
      setLoadingProgress(25);
      
      // Stage 3: Generating (main work)
      setLoadingStage(stages[2]);
      setLoadingProgress(40);
      
      const qas = await generateQAsFromText(trainingText, lut_name);
      
      // Stage 4: Processing
      setLoadingStage(stages[3]);
      setLoadingProgress(80);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Stage 5: Finalizing
      setLoadingStage(stages[4]);
      setLoadingProgress(95);
      await new Promise(resolve => setTimeout(resolve, 200));
      
      setGeneratedQAs(qas.map((qa, i) => ({ ...qa, id: crypto.randomUUID() })));
      setLoadingProgress(100);
      setLoadingStage("Complete!");
      
      await new Promise(resolve => setTimeout(resolve, 500));
      setShowLoadingModal(false);
      setStatus(null);
    } catch (err: any) {
      setShowLoadingModal(false);
      setStatus(err?.message || "Failed to generate Q&A pairs");
    } finally {
      setIsGeneratingQAs(false);
    }
  };

  const handleEditQA = (id: string, field: 'question' | 'answer', value: string) => {
    setGeneratedQAs(prev => prev.map(qa => 
      qa.id === id ? { ...qa, [field]: value } : qa
    ));
  };

  const handleRemoveQA = (id: string) => {
    setGeneratedQAs(prev => prev.filter(qa => qa.id !== id));
  };

  const handleTrain = async () => {
    if (!effectiveLutName || generatedQAs.length === 0) {
      setStatus("Please generate and review Q&A pairs first.");
      return;
    }

    if (!user) {
      setStatus("You must be logged in to train a LUT.");
      return;
    }

    setLoadingType('train');
    setShowLoadingModal(true);
    setLoadingProgress(0);
    setLoadingTotal(generatedQAs.length);
    startTimeRef.current = Date.now();
    
    try {
      // Train each Q&A pair with progress tracking
      for (let i = 0; i < generatedQAs.length; i++) {
        const qa = generatedQAs[i];
        const currentProgress = i + 1;
        
        setLoadingStage(`Training Q&A pair ${currentProgress} of ${generatedQAs.length}...`);
        setLoadingProgress(currentProgress);
        
        // Calculate time remaining
        const elapsed = Date.now() - startTimeRef.current;
        const avgTimePerItem = elapsed / currentProgress;
        const remaining = (generatedQAs.length - currentProgress) * avgTimePerItem;
        const secondsRemaining = Math.ceil(remaining / 1000);
        
        if (secondsRemaining > 60) {
          setLoadingTimeRemaining(`${Math.ceil(secondsRemaining / 60)} min remaining`);
        } else {
          setLoadingTimeRemaining(`${secondsRemaining} sec remaining`);
        }
        
        await trainLut(
          effectiveLutName,
          qa.answer,
          qa.question,
          DEFAULT_BLOCKS,
          DEFAULT_THRESHOLD,
          DEFAULT_RESIDUALS
        );
      }

      // Log training (persist to Supabase and add to history)
      if (user) {
        const log = await createSpaceTrainingLog({
          spaceId,
          lutName: effectiveLutName,
          userId: user.id,
          userIdentifier: user.email || user.id,
          sourceText: trainingText,
          qas: generatedQAs.map((qa) => ({
            question: qa.question,
            answer: qa.answer,
          })),
        });

        const entry: TrainingHistoryEntry = {
          id: log.id,
          user: log.user_identifier,
          date: log.created_at,
          qaCount: (log.qas || []).length,
          qas: (log.qas || []).map((qa, index) => ({
            id: `${log.id}-${index}`,
            question: qa.question,
            answer: qa.answer,
          })),
          lastEditedBy: log.last_edited_by || undefined,
          lastEditedAt: log.last_edited_at || undefined,
        };
        setTrainingHistory((prev) => [entry, ...prev]);
      }

      setLoadingProgress(generatedQAs.length);
      setLoadingStage("Training complete!");
      setLoadingTimeRemaining("");
      
      await new Promise(resolve => setTimeout(resolve, 800));
      setShowLoadingModal(false);
      
      setStatus(
        `Successfully trained AI with ${generatedQAs.length} Q&A pairs!`
      );
      setTrainingText("");
      setGeneratedQAs([]);
      // Switch to logs view after training
      setActiveView('logs');
    } catch (err: any) {
      setShowLoadingModal(false);
      setStatus(err?.message || "Training failed");
    }
  };

  const openHistoryEntry = (entry: TrainingHistoryEntry) => {
    setSelectedHistoryId(entry.id);
    setHistoryEditQAs(
      entry.qas.map((qa) => ({
        id: qa.id,
        question: qa.question,
        answer: qa.answer,
      }))
    );
  };

  const closeHistoryModal = () => {
    if (isRetraining) return;
    setSelectedHistoryId(null);
    setHistoryEditQAs([]);
  };

  const handleHistoryQAEdit = (
    id: string,
    field: "question" | "answer",
    value: string
  ) => {
    setHistoryEditQAs((prev) =>
      prev.map((qa) =>
        qa.id === id
          ? {
              ...qa,
              [field]: value,
            }
          : qa
      )
    );
  };

  const handleRetrainHistory = async () => {
    if (!effectiveLutName || !selectedHistoryId || historyEditQAs.length === 0) return;

    setIsRetraining(true);
    setLoadingType("train");
    setShowLoadingModal(true);
    setLoadingProgress(0);
    setLoadingTotal(historyEditQAs.length);
    startTimeRef.current = Date.now();

    try {
      for (let i = 0; i < historyEditQAs.length; i++) {
        const qa = historyEditQAs[i];
        const currentProgress = i + 1;

        setLoadingStage(
          `Retraining Q&A pair ${currentProgress} of ${historyEditQAs.length}...`
        );
        setLoadingProgress(currentProgress);

        const elapsed = Date.now() - startTimeRef.current;
        const avgTimePerItem = elapsed / currentProgress;
        const remaining = (historyEditQAs.length - currentProgress) * avgTimePerItem;
        const secondsRemaining = Math.ceil(remaining / 1000);

        if (secondsRemaining > 60) {
          setLoadingTimeRemaining(
            `${Math.ceil(secondsRemaining / 60)} min remaining`
          );
        } else {
          setLoadingTimeRemaining(`${secondsRemaining} sec remaining`);
        }

        await trainLut(
          effectiveLutName,
          qa.answer,
          qa.question,
          DEFAULT_BLOCKS,
          DEFAULT_THRESHOLD,
          DEFAULT_RESIDUALS
        );
      }

      setLoadingProgress(historyEditQAs.length);
      setLoadingStage("Retraining complete!");
      setLoadingTimeRemaining("");

      await new Promise((resolve) => setTimeout(resolve, 800));
      setShowLoadingModal(false);

      // Update training log in database
      const editorIdentifier = user ? user.email || user.id : "unknown";
      try {
        await updateSpaceTrainingLogQAs({
          logId: selectedHistoryId,
          editorIdentifier,
          qas: historyEditQAs.map((qa) => ({
            question: qa.question,
            answer: qa.answer,
          })),
        });
        // Reload training history
        const logs = await getSpaceTrainingLogsByLutName(effectiveLutName);
        const entries: TrainingHistoryEntry[] = logs.map((log) => ({
          id: log.id,
          user: log.user_identifier,
          date: log.created_at,
          qaCount: (log.qas || []).length,
          qas: (log.qas || []).map((qa, index) => ({
            id: `${log.id}-${index}`,
            question: qa.question,
            answer: qa.answer,
          })),
          lastEditedBy: log.last_edited_by || undefined,
          lastEditedAt: log.last_edited_at || undefined,
        }));
        setTrainingHistory(entries);
      } catch (err) {
        console.error("Failed to update training log:", err);
      }

      setStatus(
        `Successfully re-trained AI with ${historyEditQAs.length} edited Q&A pairs.`
      );
      closeHistoryModal();
    } catch (err: any) {
      setShowLoadingModal(false);
      setStatus(err?.message || "Retraining failed");
      setIsRetraining(false);
    } finally {
      setIsRetraining(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Loading Modal */}
      <AnimatePresence>
        {showLoadingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={(e) => e.target === e.currentTarget && setShowLoadingModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-4 sm:p-8 max-w-md w-[calc(100%-2rem)] max-h-[90vh] overflow-y-auto mx-4 shadow-2xl"
            >
              <div className="flex flex-col items-center space-y-6">
                {/* Icon */}
                <div className={`w-16 h-16 sm:w-20 sm:h-20 rounded-2xl flex items-center justify-center ${
                  loadingType === 'generate' 
                    ? 'bg-gradient-secondary' 
                    : 'bg-primary'
                } shadow-lg`}>
                  {loadingType === 'generate' ? (
                    <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                  ) : (
                    <GraduationCap className="w-8 h-8 sm:w-10 sm:h-10 text-white animate-pulse" />
                  )}
                </div>
                
                {/* Title */}
                <div className="text-center">
                  <h3 className="text-lg sm:text-xl font-bold text-foreground mb-2">
                    {loadingType === 'generate' ? 'Generating Q&A Pairs' : 'Training AI'}
                  </h3>
                  <p className="text-xs sm:text-sm text-muted-foreground px-2">{loadingStage}</p>
                </div>
                
                {/* Progress Bar */}
                <div className="w-full space-y-2">
                  <div className="flex justify-between text-xs text-muted-foreground mb-1">
                    <span>
                      {loadingType === 'generate' 
                        ? `${loadingProgress}%` 
                        : `${loadingProgress} / ${loadingTotal} Q&A pairs`}
                    </span>
                    {loadingTimeRemaining && (
                      <span>{loadingTimeRemaining}</span>
                    )}
                  </div>
                  <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full ${
                        loadingType === 'generate' 
                          ? 'bg-gradient-secondary' 
                          : 'bg-primary'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ 
                        width: loadingType === 'generate' 
                          ? `${loadingProgress}%` 
                          : `${(loadingProgress / loadingTotal) * 100}%`
                      }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    />
                  </div>
                </div>
                
                {/* Loading Animation */}
                <div className="flex space-x-2">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      className={`w-2 h-2 rounded-full ${
                        loadingType === 'generate' 
                          ? 'bg-secondary' 
                          : 'bg-primary'
                      }`}
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [0.5, 1, 0.5],
                      }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        delay: i * 0.2,
                      }}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <Navbar />
      <div className="flex-1 flex bg-gradient-to-b from-background via-muted/20 to-background pt-20 sm:pt-24 min-h-[calc(100vh-4rem)]">
        {/* Mobile Navigation */}
        <div className="md:hidden w-full border-b border-border bg-card/80">
          <div className="flex">
            <button
              onClick={() => setActiveView('chat')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 text-xs sm:text-sm transition-colors touch-manipulation min-h-[44px] ${
                activeView === 'chat'
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>Chat</span>
            </button>
            <button
              onClick={() => setActiveView('training')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 text-xs sm:text-sm transition-colors touch-manipulation min-h-[44px] ${
                activeView === 'training'
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Training</span>
            </button>
            <button
              onClick={() => setActiveView('logs')}
              className={`flex-1 flex items-center justify-center gap-1.5 sm:gap-2 px-2 sm:px-4 py-3 text-xs sm:text-sm transition-colors touch-manipulation min-h-[44px] ${
                activeView === 'logs'
                  ? 'text-foreground border-b-2 border-primary'
                  : 'text-muted-foreground'
              }`}
            >
              <ScrollText className="w-4 h-4" />
              <span>Logs</span>
              {trainingHistory.length > 0 && (
                <span className="text-xs text-muted-foreground ml-0.5">
                  {trainingHistory.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8 flex-1 flex flex-col max-w-5xl">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={fadeIn()}
              className="flex-1 flex flex-col"
            >
              {/* Chat View */}
              {activeView === 'chat' && (
                <Card className="bg-card border border-border flex-1 flex flex-col mb-6 min-h-0 shadow-sm">
                  <div className="p-3 sm:p-4 md:p-6 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                        <div className="min-w-0 flex-1">
                          <h2 className="font-bold text-foreground text-base sm:text-lg truncate">
                            {spaceName || lut_name || "Space Chat"}
                          </h2>
                          <div className="flex items-center gap-1.5 sm:gap-2 mt-1 flex-wrap">
                            <span className="text-xs px-1.5 sm:px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-mono truncate max-w-[120px] sm:max-w-none">
                              {lut_name}
                            </span>
                            <span className="text-xs text-muted-foreground hidden sm:inline">•</span>
                            <span className="text-xs text-muted-foreground hidden sm:inline">Memory-Augmented LUT</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        <Button
                          onClick={() => setActiveView('training')}
                          variant="ghost"
                          size="sm"
                          className="h-9 sm:h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs sm:text-sm touch-manipulation"
                        >
                          <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Train</span>
                        </Button>
                        <Button
                          onClick={() => setActiveView('logs')}
                          variant="ghost"
                          size="sm"
                          className="h-9 sm:h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs sm:text-sm touch-manipulation"
                        >
                          <ScrollText className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Logs</span>
                          {trainingHistory.length > 0 && (
                            <span className="ml-1 text-xs text-muted-foreground">
                              ({trainingHistory.length})
                            </span>
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setMessages([])}
                          className="h-9 w-9 sm:h-8 sm:w-8 text-foreground hover:bg-muted/60 touch-manipulation"
                          title="Clear chat"
                        >
                          <RefreshCw className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div
                    ref={messagesContainerRef}
                    className="flex-1 min-h-0 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4"
                  >
                    {!hasMessages ? (
                      <div className="h-full flex flex-col items-center justify-center text-center px-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center mb-6">
                          <Bot className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          Start a Conversation
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          Ask me about Astarus AI, our technology, or anything you'd like to know.
                        </p>
                      </div>
                    ) : (
                      <AnimatePresence mode="popLayout">
                        {messages.map((m) => (
                          <motion.div
                            key={m.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`flex ${
                              m.role === "user"
                                ? "justify-end"
                                : "justify-start"
                            }`}
                          >
                            <div
                              className={`flex items-start gap-3 max-w-[85%] ${
                                m.role === "user" ? "flex-row-reverse" : ""
                              }`}
                            >
                              <div
                                className={`w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0 ${
                                  m.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-muted-foreground"
                                }`}
                              >
                                {m.role === "user" ? (
                                  <User className="w-4 h-4" />
                                ) : (
                                  <Bot className="w-4 h-4" />
                                )}
                              </div>
                              <div
                                className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap ${
                                  m.role === "user"
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted text-foreground"
                                }`}
                              >
                                {m.content}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </AnimatePresence>
                    )}

                    {isGenerating && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex justify-start"
                      >
                        <div className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-xl bg-muted flex items-center justify-center">
                            <Bot className="w-4 h-4 text-muted-foreground" />
                          </div>
                          <div className="bg-muted text-foreground rounded-2xl px-4 py-3">
                            <div className="typing-indicator">
                              <span className="bg-primary"></span>
                              <span className="bg-primary"></span>
                              <span className="bg-primary"></span>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                    <div ref={messagesEndRef} />
                  </div>

                  <div className="border-t border-border p-3 sm:p-4 md:p-6">
                    {status && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`mb-3 px-4 py-2 rounded-lg text-sm ${
                          status.includes("success") ||
                          status.includes("stored")
                            ? "bg-green-500/20 text-green-200 border border-green-500/50"
                            : "bg-red-500/20 text-red-200 border border-red-500/50"
                        }`}
                      >
                        {status}
                      </motion.div>
                    )}
                    <div className="flex gap-2 sm:gap-3">
                      <div className="flex-1 relative">
                        <textarea
                          className="w-full resize-none rounded-xl border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 pr-10 sm:pr-12 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 focus:ring-2 focus:ring-primary/30 transition-all"
                          rows={2}
                          placeholder="Ask something about Astarus AI..."
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter" && !e.shiftKey) {
                              e.preventDefault();
                              handleSend();
                            }
                          }}
                          disabled={isGenerating}
                        />
                      </div>
                      <Button
                        onClick={() => handleSend()}
                        disabled={isGenerating || !input.trim()}
                        className="h-auto min-h-[44px] px-4 sm:px-6 bg-primary hover:opacity-90 text-primary-foreground touch-manipulation"
                      >
                        {isGenerating ? (
                          <RefreshCw className="w-5 h-5 animate-spin" />
                        ) : (
                          <Send className="w-5 h-5" />
                        )}
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* Training View */}
              {activeView === 'training' && (
                <Card className="bg-card border border-border flex-1 flex flex-col mb-6 shadow-sm">
                  <div className="p-3 sm:p-4 md:p-6 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-lg flex-shrink-0">
                          <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <h2 className="font-bold text-foreground text-base sm:text-lg">Train the AI</h2>
                          <p className="text-xs text-muted-foreground">Add knowledge to this space</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        <div className="hidden sm:flex flex-col items-end mr-2 text-xs text-muted-foreground">
                          <span className="font-mono">
                            LUT: {effectiveLutName}
                          </span>
                        </div>
                        <Button
                          onClick={() => setActiveView('chat')}
                          variant="ghost"
                          size="sm"
                          className="h-9 sm:h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs sm:text-sm touch-manipulation"
                        >
                          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Chat</span>
                        </Button>
                        <Button
                          onClick={() => setActiveView('logs')}
                          variant="ghost"
                          size="sm"
                          className="h-9 sm:h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs sm:text-sm touch-manipulation"
                        >
                          <ScrollText className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Logs</span>
                          {trainingHistory.length > 0 && (
                            <span className="ml-1 text-xs text-muted-foreground">
                              ({trainingHistory.length})
                            </span>
                          )}
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6 space-y-3 sm:space-y-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-foreground">
                        Enter text to train the AI
                      </label>
                      <textarea
                        className="w-full rounded-lg border border-border bg-background px-3 sm:px-4 py-2.5 sm:py-3 text-sm text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-primary/50 transition-colors"
                        rows={8}
                        placeholder="Paste or type the text you want to train the AI with. The system will automatically extract key Q&A pairs from it..."
                        value={trainingText}
                        onChange={(e) => setTrainingText(e.target.value)}
                        disabled={isGeneratingQAs}
                      />
                    </div>
                    <Button
                      onClick={handleGenerateQAs}
                      disabled={!trainingText.trim() || isGeneratingQAs}
                      className="w-full min-h-[44px] bg-gradient-secondary hover:opacity-90 text-secondary-foreground touch-manipulation"
                    >
                      {isGeneratingQAs ? (
                        <>
                          <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                          Generating Q&A pairs...
                        </>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 mr-2" />
                          Generate Q&A Pairs
                        </>
                      )}
                    </Button>

                    {generatedQAs.length > 0 && (
                      <div className="space-y-4 pt-4 border-t border-border">
                        <div className="flex items-center justify-between">
                          <label className="text-sm font-medium text-foreground">
                            Review and edit Q&A pairs ({generatedQAs.length})
                          </label>
                        </div>
                        <div className="space-y-3 max-h-[500px] overflow-y-auto">
                            {generatedQAs.map((qa) => (
                              <div
                                key={qa.id}
                                className="p-3 rounded-lg border border-border bg-muted/50 space-y-2"
                              >
                                <div className="space-y-1">
                                  <label className="text-xs font-medium text-muted-foreground">
                                    Question
                                  </label>
                                  {editingQA === `${qa.id}-question` ? (
                                    <input
                                      type="text"
                                      className="w-full rounded border border-primary/50 bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                                      value={qa.question}
                                      onChange={(e) => handleEditQA(qa.id, 'question', e.target.value)}
                                      onBlur={() => setEditingQA(null)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' && !e.shiftKey) {
                                          e.preventDefault();
                                          setEditingQA(null);
                                        }
                                      }}
                                      autoFocus
                                    />
                                  ) : (
                                    <p
                                      className="text-sm text-foreground cursor-pointer hover:bg-muted/60 p-1 rounded min-h-[20px]"
                                      onClick={() => setEditingQA(`${qa.id}-question`)}
                                    >
                                      {qa.question}
                                    </p>
                                  )}
                                </div>
                                <div className="space-y-1">
                                  <label className="text-xs font-medium text-muted-foreground">
                                    Answer
                                  </label>
                                  {editingQA === `${qa.id}-answer` ? (
                                    <textarea
                                      className="w-full rounded border border-primary/50 bg-background px-2 py-1 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                                      rows={3}
                                      value={qa.answer}
                                      onChange={(e) => handleEditQA(qa.id, 'answer', e.target.value)}
                                      onBlur={() => setEditingQA(null)}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Escape') {
                                          setEditingQA(null);
                                        }
                                      }}
                                      autoFocus
                                    />
                                  ) : (
                                    <p
                                      className="text-sm text-foreground cursor-pointer hover:bg-muted/60 p-1 rounded min-h-[40px] whitespace-pre-wrap"
                                      onClick={() => setEditingQA(`${qa.id}-answer`)}
                                    >
                                      {qa.answer}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => {
                                      if (editingQA === `${qa.id}-question` || editingQA === `${qa.id}-answer`) {
                                        setEditingQA(null);
                                      } else {
                                        setEditingQA(`${qa.id}-question`);
                                      }
                                    }}
                                    className="h-7 px-2 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                                  >
                                    <Edit2 className="w-3 h-3" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleRemoveQA(qa.id)}
                                    className="h-7 px-2 text-red-400 hover:text-red-300 hover:bg-red-500/10"
                                  >
                                    <X className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            ))}
                        </div>
                        <Button
                          onClick={handleTrain}
                          disabled={generatedQAs.length === 0}
                          className="w-full min-h-[44px] bg-primary hover:opacity-90 text-primary-foreground touch-manipulation"
                        >
                          <Check className="w-4 h-4 mr-2" />
                          Train AI ({generatedQAs.length} Q&A pairs)
                        </Button>
                      </div>
                    )}

                    {status && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`px-4 py-2 rounded-lg text-sm ${
                          status.includes("success") ||
                          status.includes("stored")
                            ? "bg-green-500/20 text-green-200 border border-green-500/50"
                            : "bg-red-500/20 text-red-200 border border-red-500/50"
                        }`}
                      >
                        {status}
                      </motion.div>
                    )}
                  </div>
                </Card>
              )}

              {/* Logs View */}
              {activeView === 'logs' && (
                <Card className="bg-card border border-border flex-1 flex flex-col mb-6 shadow-sm">
                  <div className="p-3 sm:p-4 md:p-6 border-b border-border">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-secondary flex items-center justify-center shadow-lg flex-shrink-0">
                          <ScrollText className="w-4 h-4 sm:w-5 sm:h-5 text-secondary-foreground" />
                        </div>
                        <div>
                          <h2 className="font-bold text-foreground text-base sm:text-lg">Training History</h2>
                          <p className="text-xs text-muted-foreground">View all training activities in this space</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        <Button
                          onClick={() => setActiveView('chat')}
                          variant="ghost"
                          size="sm"
                          className="h-9 sm:h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs sm:text-sm touch-manipulation"
                        >
                          <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Chat</span>
                        </Button>
                        <Button
                          onClick={() => setActiveView('training')}
                          variant="ghost"
                          size="sm"
                          className="h-9 sm:h-8 px-2 sm:px-3 text-muted-foreground hover:text-foreground hover:bg-muted/60 text-xs sm:text-sm touch-manipulation"
                        >
                          <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4 sm:mr-2" />
                          <span className="hidden sm:inline">Train</span>
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 overflow-y-auto p-3 sm:p-4 md:p-6">
                    {trainingHistory.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-center px-4">
                        <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-secondary/20 to-primary/20 flex items-center justify-center mb-6">
                          <ScrollText className="w-10 h-10 text-muted-foreground" />
                        </div>
                        <h3 className="text-xl font-bold text-foreground mb-2">
                          No Training History
                        </h3>
                        <p className="text-muted-foreground mb-6 max-w-md">
                          Training activities will appear here once you start training the AI with text.
                        </p>
                        <Button
                          onClick={() => setActiveView('training')}
                          className="bg-primary hover:opacity-90 text-primary-foreground"
                        >
                          Go to Training
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {trainingHistory.map((entry, i) => (
                          <motion.button
                            key={entry.id}
                            type="button"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            onClick={() => openHistoryEntry(entry)}
                            className="w-full text-left p-4 rounded-lg border border-border bg-muted/50 hover:bg-muted transition-all flex items-center justify-between"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                                <User className="w-5 h-5 text-primary-foreground" />
                              </div>
                              <div>
                                <p className="text-foreground font-medium">{entry.user}</p>
                                <p className="text-xs text-muted-foreground">
                                  {new Date(entry.date).toLocaleString()}
                                </p>
                                {entry.lastEditedBy && entry.lastEditedAt && (
                                  <p className="text-xs text-muted-foreground mt-1">
                                    Last edited by {entry.lastEditedBy} on{" "}
                                    {new Date(entry.lastEditedAt).toLocaleString()}
                                  </p>
                                )}
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-foreground font-semibold">
                                {entry.qaCount}
                              </p>
                              <p className="text-xs text-muted-foreground">Q&A pairs</p>
                              <p className="mt-1 text-xs text-muted-foreground">
                                View & edit
                              </p>
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    )}
                  </div>
                </Card>
              )}
            </motion.div>
          </div>
        </div>
      </div>
      {/* History Q&A Modal */}
      <AnimatePresence>
        {selectedHistoryId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 flex items-center justify-center bg-background/80 backdrop-blur-sm"
            onClick={(e) =>
              e.target === e.currentTarget && !isRetraining && closeHistoryModal()
            }
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-card border border-border rounded-2xl p-4 sm:p-6 max-w-2xl w-[calc(100%-2rem)] mx-4 max-h-[85vh] max-h-[85dvh] overflow-hidden flex flex-col shadow-2xl"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center">
                    <FileText className="w-4 h-4 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-base sm:text-lg font-bold text-foreground">
                      Training Session Details
                    </h3>
                    <p className="text-xs text-muted-foreground">
                      View, edit, and retrain on stored Q&A pairs
                    </p>
                  </div>
                </div>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  onClick={closeHistoryModal}
                  disabled={isRetraining}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                {historyEditQAs.map((qa) => (
                  <div
                    key={qa.id}
                    className="p-3 rounded-lg border border-white/20 bg-white/5 space-y-2"
                  >
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        Question
                      </label>
                      <input
                        type="text"
                        aria-label="Training question"
                        className="w-full rounded border border-primary/50 bg-background px-2 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50"
                        value={qa.question}
                        onChange={(e) =>
                          handleHistoryQAEdit(qa.id, "question", e.target.value)
                        }
                        disabled={isRetraining}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-medium text-muted-foreground">
                        Answer
                      </label>
                      <textarea
                        aria-label="Training answer"
                        className="w-full rounded border border-primary/50 bg-background px-2 py-1 text-sm text-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary/50"
                        rows={3}
                        value={qa.answer}
                        onChange={(e) =>
                          handleHistoryQAEdit(qa.id, "answer", e.target.value)
                        }
                        disabled={isRetraining}
                      />
                    </div>
                  </div>
                ))}

                {historyEditQAs.length === 0 && (
                  <p className="text-sm text-muted-foreground">
                    No Q&A pairs stored for this training session.
                  </p>
                )}
              </div>

              <div className="mt-4 flex justify-end gap-2">
                <Button
                  variant="ghost"
                  className="text-muted-foreground hover:text-foreground hover:bg-muted/60"
                  onClick={closeHistoryModal}
                  disabled={isRetraining}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleRetrainHistory}
                  disabled={isRetraining || historyEditQAs.length === 0}
                  className="bg-primary hover:opacity-90 text-primary-foreground"
                >
                  {isRetraining ? (
                    <>
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Retraining...
                    </>
                  ) : (
                    <>
                      <GraduationCap className="w-4 h-4 mr-2" />
                      Retrain with edits
                    </>
                  )}
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
