import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { Mail, ArrowLeft, CheckCircle, RefreshCw } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setResendSuccess(false);
    setLoading(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) throw error;
      setSent(true);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to send reset email";
      if (errorMessage.includes("rate limit")) {
        setError("Too many requests. Please wait a few minutes before trying again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!email) {
      setError("Please enter your email address first");
      return;
    }

    setError("");
    setResendSuccess(false);
    setResending(true);

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}/auth/callback`,
      });

      if (error) throw error;
      setResendSuccess(true);
    } catch (err: any) {
      const errorMessage = err.message || "Failed to resend reset email";
      if (errorMessage.includes("rate limit")) {
        setError("Too many requests. Please wait a few minutes before trying again.");
      } else {
        setError(errorMessage);
      }
    } finally {
      setResending(false);
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
                {sent ? "Check Your Email" : "Forgot Password"}
              </CardTitle>
              <CardDescription className="text-white/70">
                {sent
                  ? "We've sent a password reset link to your email"
                  : "Enter your email and we'll send you a reset link"}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {sent ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle className="w-16 h-16 text-green-400" />
                  </div>
                  <p className="text-center text-white/70 text-sm">
                    If an account exists for <span className="text-white font-medium">{email}</span>, you'll receive a password reset link shortly. Check your spam folder if you don't see it.
                  </p>
                  
                  {resendSuccess && (
                    <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm text-center">
                      Reset email resent! Please check your inbox.
                    </div>
                  )}

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                      {error}
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleResend}
                      disabled={resending}
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${resending ? "animate-spin" : ""}`} />
                      {resending ? "Resending..." : "Resend Reset Link"}
                    </Button>
                    
                    <Link to="/login">
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Login
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                      {error}
                    </div>
                  )}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-white/90">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="you@example.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      />
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={loading}
                    className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold"
                  >
                    {loading ? "Sending..." : "Send Reset Link"}
                  </Button>
                  <div className="text-center">
                    <Link to="/login" className="text-sm text-white/70 hover:text-white">
                      <ArrowLeft className="w-3 h-3 inline mr-1" />
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
