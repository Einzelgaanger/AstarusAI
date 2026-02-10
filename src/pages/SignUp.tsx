import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { UserPlus, Mail, Lock, User, CheckCircle, RefreshCw } from "lucide-react";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendSuccess, setResendSuccess] = useState(false);
  const { signup, resendConfirmationEmail } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      await signup(email, password, name);
      setEmailSent(true);
    } catch (err: any) {
      setError(err.message || "Failed to sign up");
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
              <CardTitle className="text-3xl font-bold text-white">Create Account</CardTitle>
              <CardDescription className="text-white/70">
                Start building your AI spaces
              </CardDescription>
            </CardHeader>
            <CardContent>
              {emailSent ? (
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <CheckCircle className="w-16 h-16 text-primary" />
                  </div>
                  <p className="text-center text-white/70 text-sm">
                    We've sent a confirmation link to <span className="text-white font-medium">{email}</span>. Please check your email and click the link to activate your account.
                  </p>
                  <div className="text-center text-white/50 text-xs space-y-1">
                    <p>Check your spam folder if you don't see it.</p>
                    <p className="text-white/40 text-[10px] mt-2">
                      Still not receiving emails? Make sure:
                    </p>
                    <ul className="text-white/40 text-[10px] list-disc list-inside space-y-0.5 text-left max-w-sm mx-auto">
                      <li>Email confirmation is enabled in Supabase Auth settings</li>
                      <li>Your email provider isn't blocking Supabase emails</li>
                      <li>The redirect URL is whitelisted in Supabase</li>
                    </ul>
                  </div>
                  
                  {resendSuccess && (
                    <div className="p-3 rounded-lg bg-green-500/20 border border-green-500/50 text-green-200 text-sm text-center">
                      Confirmation email resent! Please check your inbox.
                    </div>
                  )}

                  <div className="space-y-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={async () => {
                        setError("");
                        setResendSuccess(false);
                        setResending(true);
                        try {
                          await resendConfirmationEmail(email);
                          setResendSuccess(true);
                        } catch (err: any) {
                          setError(err.message || "Failed to resend email");
                        } finally {
                          setResending(false);
                        }
                      }}
                      disabled={resending}
                      className="w-full border-white/20 text-white hover:bg-white/10"
                    >
                      <RefreshCw className={`w-4 h-4 mr-2 ${resending ? "animate-spin" : ""}`} />
                      {resending ? "Resending..." : "Resend Confirmation Email"}
                    </Button>
                    
                    <Link to="/login">
                      <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/10">
                        Go to Login
                      </Button>
                    </Link>
                  </div>

                  {error && (
                    <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                      {error}
                    </div>
                  )}
                </div>
              ) : (
                <>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-lg bg-red-500/20 border border-red-500/50 text-red-200 text-sm">
                        {error}
                      </div>
                    )}
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-white/90">Name (Optional)</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/50" />
                        <Input
                          id="name"
                          type="text"
                          placeholder="Your name"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                        />
                      </div>
                    </div>
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
                    <div className="space-y-2">
                      <Label htmlFor="password" className="text-white/90">Password</Label>
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
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-gradient-primary hover:opacity-90 text-white font-semibold"
                    >
                      {loading ? (
                        "Creating account..."
                      ) : (
                        <>
                          <UserPlus className="w-4 h-4 mr-2" />
                          Sign Up
                        </>
                      )}
                    </Button>
                  </form>
                  <div className="mt-6 text-center text-sm text-white/70">
                    Already have an account?{" "}
                    <Link to="/login" className="text-primary hover:underline font-medium">
                      Sign in
                    </Link>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
      <Footer />
    </div>
  );
}

