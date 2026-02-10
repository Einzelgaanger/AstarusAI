import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Lock, CheckCircle, AlertCircle, ShieldCheck, Home } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasValidSession, setHasValidSession] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setHasValidSession(true);
          return;
        }
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get("access_token");
        const type = hashParams.get("type");
        setHasValidSession(!!(accessToken && type === "recovery"));
      } catch {
        setHasValidSession(false);
      }
    };
    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }
    const weak = ["password", "123456", "password123", "qwerty"];
    if (weak.includes(password.toLowerCase())) {
      setError("Please choose a stronger password");
      return;
    }
    setLoading(true);
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        if (!hashParams.get("access_token")) {
          throw new Error("Invalid or expired reset link. Please request a new password reset.");
        }
      }
      const { error: err } = await supabase.auth.updateUser({ password });
      if (err) throw err;
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Failed to update password";
      setError(
        msg.includes("expired") || msg.includes("invalid")
          ? "This reset link has expired or is invalid. Please request a new password reset."
          : msg
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <div className="flex-1 flex min-h-0 flex-col lg:flex-row">
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
              <img src="/Astarus Logo.png" alt="" className="h-[21rem] sm:h-[24rem] md:h-[27rem] w-auto max-w-full" />
              <span className="font-brand text-5xl sm:text-6xl md:text-7xl tracking-tight text-black uppercase">
                Astarus
              </span>
            </div>
            <div className="rounded-2xl border border-border bg-white shadow-elegant pt-6 sm:pt-8 pb-4 sm:pb-5 px-6 sm:px-8 -mt-16 sm:-mt-24 md:-mt-32">
              <div className="text-center mb-4">
                <span className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider">
                  Set new password
                </span>
                <h1 className="font-display text-2xl sm:text-3xl font-bold text-foreground mt-2">
                  {success ? "Password Updated!" : "Set New Password"}
                </h1>
                <p className="text-sm text-muted-foreground mt-1">
                  {success ? "Redirecting you to login..." : "Enter your new password below"}
                </p>
              </div>

              {hasValidSession === false ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-14 h-14 rounded-2xl bg-amber-500/10 flex items-center justify-center">
                      <AlertCircle className="w-8 h-8 text-amber-600" />
                    </div>
                  </div>
                  <p className="text-center text-sm text-muted-foreground">
                    This reset link is invalid or expired. Please request a new one.
                  </p>
                  <Link to="/forgot-password">
                    <Button
                      className="w-full min-h-[52px] rounded-xl bg-primary/90 hover:bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 border border-primary/60 ring-1 ring-primary/40"
                    >
                      Request New Reset Link
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button
                      variant="outline"
                      className="w-full min-h-[48px] rounded-xl border-primary/40 text-primary bg-card/40 hover:bg-primary/5 shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300"
                    >
                      Back to Login
                    </Button>
                  </Link>
                  <Link to="/" className="block">
                    <Button
                      variant="ghost"
                      className="w-full min-h-[44px] rounded-xl text-muted-foreground hover:text-primary hover:bg-primary/5"
                    >
                      <Home className="w-4 h-4 mr-2" />
                      Back to home
                    </Button>
                  </Link>
                </div>
              ) : success ? (
                <div className="flex justify-center">
                  <div className="inline-flex w-14 h-14 rounded-2xl bg-success/10 items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-success" />
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-3">
                  {error && (
                    <div className="p-3 rounded-xl bg-destructive/10 border border-destructive/30 text-destructive text-sm">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-sm font-medium text-foreground">New Password</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-sm font-medium text-foreground">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="input-premium pr-11 min-h-[48px] touch-manipulation"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || !hasValidSession}
                    className="w-full min-h-[52px] rounded-xl bg-primary/90 hover:bg-primary text-primary-foreground font-semibold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 border border-primary/60 ring-1 ring-primary/40"
                  >
                    {loading ? "Updating..." : (
                      <>
                        <ShieldCheck className="w-4 h-4 mr-2" />
                        Update Password
                      </>
                    )}
                  </Button>
                  <div className="space-y-2 text-center">
                    <Link to="/login" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      Back to Login
                    </Link>
                    <div className="pt-2 border-t border-border/60">
                      <Link
                        to="/"
                        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        <Home className="w-4 h-4" />
                        Back to home
                      </Link>
                    </div>
                  </div>
                </form>
              )}
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
        <div className="hidden lg:flex lg:w-1/2 flex-shrink-0 relative min-h-[400px] bg-black/20 overflow-hidden">
          <img
            src="/fogotpassword.jpg"
            alt="Reset password"
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
