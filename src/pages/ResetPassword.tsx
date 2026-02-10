import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { Lock, CheckCircle, AlertCircle } from "lucide-react";

export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasValidSession, setHasValidSession] = useState<boolean | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user has a valid session (from password reset link)
    const checkSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session) {
          setHasValidSession(true);
        } else {
          // Check URL hash for recovery token
          const hashParams = new URLSearchParams(window.location.hash.substring(1));
          const accessToken = hashParams.get('access_token');
          const type = hashParams.get('type');
          
          if (accessToken && type === 'recovery') {
            // Token is in URL, session will be created when we update password
            setHasValidSession(true);
          } else {
            setHasValidSession(false);
          }
        }
      } catch (err) {
        setHasValidSession(false);
      }
    };

    checkSession();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validation
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    // Check for common weak passwords
    const commonPasswords = ['password', '123456', 'password123', 'qwerty'];
    if (commonPasswords.includes(password.toLowerCase())) {
      setError("Please choose a stronger password");
      return;
    }

    setLoading(true);

    try {
      // First, ensure we have a session (handle URL hash tokens)
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        // Try to get session from URL hash
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        
        if (!accessToken) {
          throw new Error("Invalid or expired reset link. Please request a new password reset.");
        }
      }

      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      
      setSuccess(true);
      setTimeout(() => navigate("/login"), 3000);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to update password";
      if (errorMessage.includes("expired") || errorMessage.includes("invalid")) {
        setError("This reset link has expired or is invalid. Please request a new password reset.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 py-20 bg-gradient-to-b from-black via-primary/5 to-black">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp(0)}
          className="w-full max-w-md"
        >
          <Card className="glass-dark glass-border border-white/20 shadow-2xl">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-3xl font-bold text-white">
                {success ? "Password Updated!" : "Set New Password"}
              </CardTitle>
              <CardDescription className="text-white/70">
                {success
                  ? "Redirecting you to login..."
                  : "Enter your new password below"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {hasValidSession === false ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <AlertCircle className="w-16 h-16 text-yellow-400" />
                  </div>
                  <p className="text-center text-white/70 text-sm">
                    This password reset link is invalid or has expired. Please request a new password reset.
                  </p>
                  <Link to="/forgot-password">
                    <Button className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold">
                      Request New Reset Link
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                      Back to Login
                    </Button>
                  </Link>
                </div>
              ) : success ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle className="w-16 h-16 text-green-400" />
                  </div>
                  <p className="text-center text-white/70 text-sm">
                    Your password has been successfully updated! Redirecting to login...
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="password" className="text-white/90">New Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-white/90">Confirm Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                      <Input
                        id="confirmPassword"
                        type="password"
                        placeholder="••••••••"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading || hasValidSession === false}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold"
                  >
                    {loading ? "Updating..." : "Update Password"}
                  </Button>
                  <div className="text-center">
                    <Link to="/login" className="text-sm text-white/70 hover:text-white">
                      Back to Login
                    </Link>
                  </div>
                </form>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}
