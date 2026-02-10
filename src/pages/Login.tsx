import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { KeyRound, Mail, Lock, Home } from "lucide-react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/spaces");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to log in";
      if (message.includes("email") && message.includes("confirm")) {
        setError("Please verify your email address before signing in. Check your inbox for the confirmation link.");
      } else if (message.includes("Invalid login credentials")) {
        setError("Invalid email or password. Please check your credentials and try again.");
      } else {
        setError(message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex min-h-0 flex-col lg:flex-row">
        {/* Left: Form with orbs (half on desktop) */}
        <div className="flex-1 flex flex-col min-h-0 px-4 sm:px-6 lg:px-8 pt-0 sm:pt-1 relative overflow-hidden bg-dots-subtle min-w-0 lg:w-1/2 lg:flex-shrink-0">
          <div className="flex-1 flex flex-col items-center justify-start overflow-auto">
          <div className="absolute inset-0 pointer-events-none">
            <motion.div
              className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/10 rounded-full blur-[100px]"
              animate={{ scale: [1, 1.2, 1], opacity: [0.06, 0.12, 0.06] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
              className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/8 rounded-full blur-[120px]"
              animate={{ scale: [1.1, 1, 1.1], opacity: [0.05, 0.1, 0.05] }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-sm relative z-10 -mt-16 sm:-mt-24"
          >
            <div className="flex items-center justify-start gap-0 mb-0 -space-x-10 sm:-space-x-14">
              <img
                src="/Astarus Logo.png"
                alt=""
                className="h-[21rem] sm:h-[24rem] md:h-[27rem] w-auto max-w-full"
              />
              <span className="font-brand text-5xl sm:text-6xl md:text-7xl tracking-tight text-black uppercase">
                Astarus
              </span>
            </div>
            <div className="rounded-2xl border border-border bg-white shadow-elegant pt-6 sm:pt-8 pb-4 sm:pb-5 px-6 sm:px-8 -mt-16 sm:-mt-24 md:-mt-32">
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
                  Welcome back
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
                  Sign in to your account
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  Access your AI spaces and continue building
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3">
                {error && (
                  <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                    {error}
                  </div>
                )}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-foreground">Email</Label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="you@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="input-premium pr-11 min-h-[48px] touch-manipulation"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-foreground">Password</Label>
                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                    <Input
                      id="password"
                      type="password"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="input-premium pr-11 min-h-[48px] touch-manipulation"
                    />
                  </div>
                </div>
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full min-h-[52px] rounded-xl bg-primary/90 hover:bg-primary text-primary-foreground font-semibold text-base shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 touch-manipulation border border-primary/60 ring-1 ring-primary/40"
                >
                  {loading ? "Signing in..." : (
                    <>
                      <KeyRound className="w-4 h-4 mr-2" />
                      Sign In
                    </>
                  )}
                </Button>
              </form>

              <div className="mt-3 text-center">
                <Link to="/forgot-password" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Forgot your password?
                </Link>
              </div>
              <p className="mt-3 text-center text-sm text-muted-foreground">
                Don&apos;t have an account?{" "}
                <Link to="/signup" className="text-primary font-medium hover:underline">
                  Sign up
                </Link>
              </p>
              <div className="mt-4 pt-4 border-t border-border/60 text-center">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Home className="w-4 h-4" />
                  Back to home
                </Link>
              </div>
            </div>
          </motion.div>
          </div>
          <footer className="relative z-10 mt-auto w-full max-w-sm py-6 text-center text-xs text-muted-foreground self-center">
            <p className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0">
              <span>© {new Date().getFullYear()} Astarus</span>
              <span aria-hidden>·</span>
              <Link to="/terms" className="hover:text-primary transition-colors">Terms of Service</Link>
              <span aria-hidden>·</span>
              <Link to="/privacy" className="hover:text-primary transition-colors">Privacy Policy</Link>
            </p>
          </footer>
        </div>

        {/* Right: AI tech image (desktop only, half width) */}
        <div className="hidden lg:flex lg:w-1/2 flex-shrink-0 relative min-h-[400px] bg-black/20 overflow-hidden">
          <img
            src="/fogotpassword.jpg"
            alt="Sign in"
            className="absolute inset-0 w-full h-full object-cover object-center img-panel"
            loading="eager"
            fetchpriority="high"
          />
          <div className="absolute inset-0 bg-black/25" />
        </div>
      </div>
    </div>
  );
}
