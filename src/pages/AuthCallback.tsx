import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { CheckCircle, AlertCircle } from "lucide-react";

export default function AuthCallback() {
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    const verifyFromQueryParams = async () => {
      const params = new URLSearchParams(window.location.search);
      const tokenHash = params.get("token_hash");
      const typeParam = params.get("type");

      if (!tokenHash || !typeParam) return false;

      // Supabase expects one of these types
      const type = typeParam as
        | "signup"
        | "recovery"
        | "magiclink"
        | "invite"
        | "email_change";

      setStatus("loading");
      setMessage("Verifying link...");

      const { error } = await supabase.auth.verifyOtp({
        type,
        token_hash: tokenHash,
      });

      if (error) {
        setStatus("error");
        setMessage(
          "This link is invalid or expired. Please request a new email and try again."
        );
        timeoutId = setTimeout(() => navigate("/login"), 2500);
        return true;
      }

      setStatus("success");

      if (type === "recovery") {
        setMessage("Password reset verified. Redirecting...");
        timeoutId = setTimeout(() => navigate("/reset-password"), 1200);
      } else {
        setMessage("Verified. Redirecting...");
        timeoutId = setTimeout(() => navigate("/spaces"), 1200);
      }

      return true;
    };

    // 1) Preferred: verify token_hash links (recommended for email templates)
    // 2) Fallback: handle legacy hash-based links via auth state
    let subscription: { unsubscribe: () => void } | undefined;

    (async () => {
      const handled = await verifyFromQueryParams();
      if (handled) return;

      // Supabase will automatically handle token exchange from URL hash
      const {
        data: { subscription: sub },
      } = supabase.auth.onAuthStateChange(async (event, session) => {
        if (event === "PASSWORD_RECOVERY") {
          setStatus("success");
          setMessage("Password reset verified. Redirecting...");
          timeoutId = setTimeout(() => navigate("/reset-password"), 1200);
          return;
        }

        if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
          setStatus("success");
          setMessage("Verified. Redirecting...");
          timeoutId = setTimeout(() => navigate("/spaces"), 1200);
          return;
        }

        if (session) {
          setStatus("success");
          setMessage("Redirecting...");
          timeoutId = setTimeout(() => navigate("/spaces"), 1000);
          return;
        }

        // Fallback — give it a moment then redirect
        timeoutId = setTimeout(() => {
          setStatus("error");
          setMessage("Verification failed. Redirecting to login...");
          timeoutId = setTimeout(() => navigate("/login"), 2000);
        }, 2500);
      });

      subscription = sub;
    })();

    return () => {
      subscription?.unsubscribe();
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
