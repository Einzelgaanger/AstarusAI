import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      <div className="flex-1 flex items-center justify-center px-4 safe-area-px">
        <div className="text-center max-w-md">
          <h1 className="font-display mb-2 text-6xl sm:text-7xl font-bold text-foreground">404</h1>
          <p className="mb-6 text-base sm:text-lg text-muted-foreground">This page doesn&apos;t exist or was moved.</p>
          <Link to="/">
            <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold min-h-[48px] px-6 shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300">
              <Home className="w-4 h-4 mr-2" />
              Return to Home
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
