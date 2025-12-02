import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import { Plus, Brain, Building2, User, ArrowRight } from "lucide-react";

interface Space {
  id: string;
  lut_name: string;
  name: string;
  type: "company" | "personal";
  description?: string;
  created_at: string;
}

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "https://dhzzxfr41qjcz7-8000.proxy.runpod.net";

export default function Spaces() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [spaces, setSpaces] = useState<Space[]>([]);
  const [loading, setLoading] = useState(true);
  const [createOpen, setCreateOpen] = useState(false);
  const [newSpaceName, setNewSpaceName] = useState("");
  const [newSpaceType, setNewSpaceType] = useState<"company" | "personal">("personal");
  const [newSpaceDescription, setNewSpaceDescription] = useState("");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }
    loadSpaces();
  }, [isAuthenticated, navigate]);

  const loadSpaces = async () => {
    try {
      // TODO: Replace with actual API call
      // For now, use mock data
      await new Promise((resolve) => setTimeout(resolve, 500));
      setSpaces([
        // Mock spaces - replace with API call
      ]);
    } catch (error) {
      console.error("Failed to load spaces:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateSpace = async () => {
    if (!newSpaceName.trim()) return;

    setCreating(true);
    try {
      // TODO: Replace with actual API call
      // const response = await fetch(`${BASE_URL}/spaces`, {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({
      //     name: newSpaceName,
      //     type: newSpaceType,
      //     description: newSpaceDescription || null,
      //   }),
      // });
      // const data = await response.json();

      // Mock API response
      await new Promise((resolve) => setTimeout(resolve, 500));
      const newSpace: Space = {
        id: crypto.randomUUID(),
        lut_name: `space-${crypto.randomUUID().slice(0, 8)}`,
        name: newSpaceName,
        type: newSpaceType,
        description: newSpaceDescription || undefined,
        created_at: new Date().toISOString(),
      };

      setSpaces([...spaces, newSpace]);
      setCreateOpen(false);
      setNewSpaceName("");
      setNewSpaceType("personal");
      setNewSpaceDescription("");
    } catch (error: any) {
      console.error("Failed to create space:", error);
      alert(error.message || "Failed to create space");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 px-4 py-20 bg-gradient-to-b from-black via-primary/5 to-black">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer(0.1)}
            className="space-y-8"
          >
            <motion.div variants={fadeInUp(0)} className="flex items-center justify-between">
              <div>
                <h1 className="text-4xl font-bold text-white mb-2">Your Spaces</h1>
                <p className="text-white/70">Manage your AI brains and knowledge bases</p>
              </div>
              <Dialog open={createOpen} onOpenChange={setCreateOpen}>
                <DialogTrigger asChild>
                  <Button className="bg-gradient-primary hover:opacity-90 text-white">
                    <Plus className="w-4 h-4 mr-2" />
                    Create New Space
                  </Button>
                </DialogTrigger>
                <DialogContent className="glass-dark glass-border border-white/20 text-white">
                  <DialogHeader>
                    <DialogTitle>Create New Space</DialogTitle>
                    <DialogDescription className="text-white/70">
                      A space is a named brain with its own memory. Each space has a unique identifier.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        value={newSpaceName}
                        onChange={(e) => setNewSpaceName(e.target.value)}
                        placeholder="e.g., X Company Brain"
                        className="bg-white/5 border-white/20 text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Type *</Label>
                      <RadioGroup value={newSpaceType} onValueChange={(v) => setNewSpaceType(v as "company" | "personal")}>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="company" id="company" />
                          <Label htmlFor="company" className="flex items-center gap-2 cursor-pointer">
                            <Building2 className="w-4 h-4" />
                            Company
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="personal" id="personal" />
                          <Label htmlFor="personal" className="flex items-center gap-2 cursor-pointer">
                            <User className="w-4 h-4" />
                            Personal
                          </Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="description">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        value={newSpaceDescription}
                        onChange={(e) => setNewSpaceDescription(e.target.value)}
                        placeholder="What is this space for?"
                        className="bg-white/5 border-white/20 text-white"
                        rows={3}
                      />
                    </div>
                    <Button
                      onClick={handleCreateSpace}
                      disabled={creating || !newSpaceName.trim()}
                      className="w-full bg-gradient-primary hover:opacity-90 text-white"
                    >
                      {creating ? "Creating..." : "Create Space"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>

            {spaces.length === 0 ? (
              <motion.div variants={fadeInUp(0.1)}>
                <Card className="glass-dark glass-border border-white/20">
                  <CardContent className="py-12 text-center">
                    <Brain className="w-16 h-16 mx-auto mb-4 text-white/30" />
                    <h3 className="text-xl font-semibold text-white mb-2">No spaces yet</h3>
                    <p className="text-white/70 mb-6">Create your first space to get started</p>
                    <Button
                      onClick={() => setCreateOpen(true)}
                      className="bg-gradient-primary hover:opacity-90 text-white"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Create Your First Space
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                variants={fadeInUp(0.1)}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {spaces.map((space, index) => (
                  <motion.div
                    key={space.id}
                    variants={fadeInUp(0.1 + index * 0.05)}
                  >
                    <Card className="glass-dark glass-border border-white/20 hover:border-primary/50 transition-all cursor-pointer h-full">
                      <CardHeader>
                        <div className="flex items-start justify-between mb-2">
                          <CardTitle className="text-white">{space.name}</CardTitle>
                          {space.type === "company" ? (
                            <Building2 className="w-5 h-5 text-primary" />
                          ) : (
                            <User className="w-5 h-5 text-secondary" />
                          )}
                        </div>
                        <CardDescription className="text-white/70 capitalize">
                          {space.type} Space
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {space.description && (
                          <p className="text-sm text-white/60 mb-4">{space.description}</p>
                        )}
                        <Button
                          onClick={() => navigate(`/spaces/${space.lut_name}`)}
                          className="w-full bg-gradient-primary hover:opacity-90 text-white"
                        >
                          Open
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

