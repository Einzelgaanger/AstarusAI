import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { Plus, Users2, User, Brain, Sparkles } from "lucide-react";
import { createSpace } from "@/lib/spaceService";

export default function CreateSpace() {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [type, setType] = useState<"team" | "personal">("personal");
  const [description, setDescription] = useState("");
  const [icon, setIcon] = useState("💼");
  const [creating, setCreating] = useState(false);

  const presetIcons = [
    "💼",
    "🚀",
    "🎯",
    "💡",
    "🔥",
    "⚡",
    "🌟",
    "🎨",
    "🔬",
    "📊",
    "🎓",
    "🏆",
    "💻",
    "🌐",
    "🤝",
    "🧠",
  ];

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" replace />;
  }

  const handleCreate = async () => {
    if (!name.trim()) return;
    setCreating(true);
    try {
      await createSpace(
        user.id,
        name.trim(),
        type,
        description || undefined,
        icon || undefined
      );
      navigate("/spaces");
    } catch (error: any) {
      console.error("Failed to create space:", error);
      let errorMessage = error.message || "Failed to create space";

      if (errorMessage.includes("relation") && errorMessage.includes("does not exist")) {
        errorMessage =
          "Database tables not set up. Please run 'supabase-schema.sql' in your Supabase SQL Editor. See TROUBLESHOOTING.md for details.";
      } else if (errorMessage.includes("row-level security") || errorMessage.includes("permission denied")) {
        errorMessage =
          "Database permissions issue. Make sure you've run the complete 'supabase-schema.sql' file including RLS policies. See TROUBLESHOOTING.md for details.";
      } else if (errorMessage.includes("Failed to fetch") || errorMessage.includes("401") || errorMessage.includes("Unauthorized")) {
        errorMessage =
          "Supabase connection issue. Check your .env file has correct VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY, then restart the dev server.";
      }

      alert(errorMessage);
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 bg-gradient-to-b from-background via-muted/20 to-background pt-24 sm:pt-28 pb-14 sm:pb-16 px-3 sm:px-4 safe-area-px safe-area-pb">
        <div className="container mx-auto max-w-5xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeInUp(0)}
            className="grid grid-cols-1 lg:grid-cols-[1.1fr,1fr] gap-6 lg:gap-10 items-stretch"
          >
            {/* Info / hero side */}
            <Card className="order-2 lg:order-1 bg-card border border-primary/30 relative overflow-hidden shadow-sm">
              <div className="absolute inset-0 opacity-30 pointer-events-none">
                <div className="absolute -top-24 -right-10 w-60 h-60 bg-primary/20 rounded-full blur-3xl" />
                <div className="absolute bottom-0 -left-10 w-72 h-72 bg-secondary/20 rounded-full blur-3xl" />
              </div>
              <CardHeader className="relative space-y-4 pb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-xs font-medium text-foreground">
                  <Sparkles className="w-3 h-3 text-secondary" />
                  New continuously-learning brain
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center glow-primary">
                    <Brain className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl sm:text-3xl font-bold text-foreground">
                      Create a new space
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground max-w-md">
                      Spaces are independent AI brains with their own memory,
                      permissions, and training logs. Perfect for teams,
                      projects, clients, or personal knowledge.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="relative space-y-4 text-sm text-muted-foreground">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
                  <div className="p-3 rounded-xl bg-muted/50 border border-border">
                    <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                      <Users2 className="w-3.5 h-3.5 text-secondary" />
                      Team-ready
                    </p>
                    <p className="text-muted-foreground">
                      Invite collaborators with role-based access per space.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 border border-border">
                    <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                      <Brain className="w-3.5 h-3.5 text-primary" />
                      Dedicated memory
                    </p>
                    <p className="text-muted-foreground">
                      Each space keeps its own LUT so knowledge stays scoped.
                    </p>
                  </div>
                  <div className="p-3 rounded-xl bg-muted/50 border border-border">
                    <p className="font-semibold text-foreground flex items-center gap-1.5 mb-1">
                      <Plus className="w-3.5 h-3.5 text-secondary" />
                      Train any time
                    </p>
                    <p className="text-muted-foreground">
                      Continuously improve answers with new Q&A pairs.
                    </p>
                  </div>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  You can always rename, re‑icon, and re‑train a space later, so
                  focus on a clear purpose and audience for now.
                </p>
              </CardContent>
            </Card>

            {/* Form side */}
            <Card className="order-1 lg:order-2 bg-card border border-border shadow-2xl">
              <CardHeader className="space-y-1 pb-3">
                <CardTitle className="text-xl font-semibold text-foreground">
                  Space details
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                  Give your space a clear identity so your team knows when to
                  use it.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <div className="flex items-center justify-between gap-2">
                      <Label
                        htmlFor="space-name"
                        className="text-xs sm:text-sm text-foreground"
                      >
                        Name *
                      </Label>
                      <span className="text-[11px] text-muted-foreground">
                        Examples: “Marketing Brain”, “Sales Playbook”
                      </span>
                    </div>
                    <Input
                      id="space-name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Customer Support Brain"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label className="text-xs sm:text-sm text-foreground">
                      Type *
                    </Label>
                    <RadioGroup
                      value={type}
                      onValueChange={(v) => setType(v as "team" | "personal")}
                      className="grid grid-cols-2 gap-2"
                    >
                      <button
                        type="button"
                        onClick={() => setType("team")}
                        className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-xs sm:text-sm transition-all ${
                          type === "team"
                            ? "border-secondary bg-secondary/20 text-foreground"
                            : "border-border bg-muted/50 text-muted-foreground hover:border-border hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-secondary/30 flex items-center justify-center">
                            <Users2 className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="font-medium">Team</p>
                            <p className="text-[11px] text-muted-foreground">
                              Shared with others
                            </p>
                          </div>
                        </div>
                      </button>

                      <button
                        type="button"
                        onClick={() => setType("personal")}
                        className={`flex items-center justify-between gap-2 rounded-xl border px-3 py-2 text-left text-xs sm:text-sm transition-all ${
                          type === "personal"
                            ? "border-primary bg-primary/25 text-foreground"
                            : "border-border bg-muted/50 text-muted-foreground hover:border-border hover:bg-muted"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-lg bg-primary/30 flex items-center justify-center">
                            <User className="w-3.5 h-3.5" />
                          </div>
                          <div>
                            <p className="font-medium">Personal</p>
                            <p className="text-[11px] text-muted-foreground">
                              Just for you
                            </p>
                          </div>
                        </div>
                      </button>
                    </RadioGroup>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Label
                        htmlFor="icon"
                        className="text-xs sm:text-sm text-foreground"
                      >
                        Icon (optional)
                      </Label>
                      <span className="text-[11px] text-muted-foreground">
                        Pick an emoji or type your own
                      </span>
                    </div>
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-1.5 max-h-32 overflow-y-auto rounded-xl bg-muted/50 p-2 border border-border">
                      {presetIcons.map((emoji) => (
                        <button
                          key={emoji}
                          type="button"
                          onClick={() => setIcon(emoji)}
                          className={`flex items-center justify-center text-lg sm:text-xl rounded-lg border transition-all touch-manipulation min-h-[44px] min-w-[44px] sm:min-h-0 sm:min-w-0 ${
                            icon === emoji
                              ? "border-primary bg-primary/30 scale-105"
                              : "border-transparent hover:border-border hover:bg-muted"
                          }`}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                    <Input
                      type="text"
                      id="icon"
                      value={icon}
                      onChange={(e) => setIcon(e.target.value)}
                      placeholder="Or enter a custom emoji"
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground mt-1.5"
                      maxLength={2}
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <Label
                        htmlFor="description"
                        className="text-xs sm:text-sm text-foreground"
                      >
                        Description (optional)
                      </Label>
                      <span className="text-[11px] text-muted-foreground">
                        Helps teammates know when to use this space
                      </span>
                    </div>
                    <Textarea
                      id="description"
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Describe what lives in this space and who it's for."
                      className="bg-background border-border text-foreground placeholder:text-muted-foreground resize-none"
                      rows={3}
                    />
                  </div>

                  <Button
                    onClick={handleCreate}
                    disabled={creating || !name.trim()}
                    className="w-full min-h-[46px] rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground touch-manipulation mt-2"
                  >
                    {creating ? (
                      "Creating space..."
                    ) : (
                      <>
                        <Plus className="w-4 h-4 mr-2" />
                        Create space
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}


