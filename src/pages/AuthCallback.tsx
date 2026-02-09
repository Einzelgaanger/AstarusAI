import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const navigate = useNavigate();

  useEffect(() => {
    // Supabase will automatically handle the token exchange from the URL hash
    // We just need to listen for the auth state change and redirect
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") {
        navigate("/reset-password");
      } else if (event === "SIGNED_IN") {
        navigate("/spaces");
      } else {
        // Fallback — give it a moment then redirect
        setTimeout(() => navigate("/login"), 2000);
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto mb-4" />
        <p className="text-white/70">Verifying your email...</p>
      </div>
    </div>
  );
}
