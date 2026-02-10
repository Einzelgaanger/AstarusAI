import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying your email...");

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    // Supabase will automatically handle the token exchange from the URL hash
    // We just need to listen for the auth state change and redirect
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === "PASSWORD_RECOVERY") {
        setStatus("success");
        setMessage("Password reset link verified! Redirecting...");
        setTimeout(() => navigate("/reset-password"), 1500);
      } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
        setStatus("success");
        setMessage("Email verified! Redirecting...");
        setTimeout(() => navigate("/spaces"), 1500);
      } else if (event === "SIGNED_OUT") {
        setStatus("error");
        setMessage("Verification failed. Redirecting to login...");
        timeoutId = setTimeout(() => navigate("/login"), 2000);
      } else {
        // For other events, check if we have a session
        if (session) {
          setStatus("success");
          setMessage("Redirecting...");
          setTimeout(() => navigate("/spaces"), 1000);
        } else {
          // Fallback — give it a moment then redirect
          timeoutId = setTimeout(() => {
            setStatus("error");
            setMessage("Verification failed. Redirecting to login...");
            setTimeout(() => navigate("/login"), 2000);
          }, 3000);
        }
      }
    });

    // Also check current session immediately
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        // Check URL hash for type
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const type = hashParams.get('type');
        
        if (type === 'recovery') {
          setStatus("success");
          setMessage("Password reset link verified! Redirecting...");
          setTimeout(() => navigate("/reset-password"), 1500);
        } else {
          setStatus("success");
          setMessage("Email verified! Redirecting...");
          setTimeout(() => navigate("/spaces"), 1500);
        }
      }
    });

    return () => {
      subscription.unsubscribe();
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        {status === "loading" && (
          <>
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
            <p className="text-white/70">{message}</p>
          </>
        )}
        {status === "success" && (
          <>
            <CheckCircle className="w-12 h-12 text-green-400 mx-auto mb-4" />
            <p className="text-white/70">{message}</p>
          </>
        )}
        {status === "error" && (
          <>
            <AlertCircle className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
            <p className="text-white/70">{message}</p>
          </>
        )}
      </div>
    </div>
  );
}
