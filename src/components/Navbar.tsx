import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/technology", label: "Technology" },
  { to: "/team", label: "Team" },
  { to: "/investors", label: "Investors" },
];

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 overflow-visible ${
          scrolled ? "py-2" : "py-3"
        } ${isOpen ? "opacity-0 pointer-events-none" : ""}`}
      >
        <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 xl:px-10 overflow-visible max-w-7xl">
          <div
            className={`flex items-center justify-between gap-4 rounded-xl px-4 sm:px-5 md:px-6 lg:px-7 transition-all duration-300 overflow-visible bg-[#000000] border border-white/10 ${
              scrolled ? "backdrop-blur-xl shadow-lg py-2" : "shadow-md py-2.5 md:py-3"
            }`}
          >
            <Link
              to="/"
              className="flex items-center shrink-0 overflow-visible focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40 focus-visible:ring-offset-2 focus-visible:ring-offset-black rounded-lg transition-opacity hover:opacity-90 min-w-0"
              aria-label="Astarus home"
            >
              <img
                src="/Astarus Logo.png"
                alt="Astarus"
                className="h-10 sm:h-11 w-auto scale-[1.6] sm:scale-[2.6] md:scale-[2.8] lg:scale-[3] xl:scale-[3.2] origin-center"
              />
            </Link>

            <nav className="hidden lg:flex items-center gap-0.5 xl:gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.to}
                  to={link.to}
                  className={`relative px-4 py-2.5 rounded-lg text-[15px] sm:text-base font-medium transition-colors ${
                    location.pathname === link.to
                      ? "text-white"
                      : "text-white/70 hover:text-white hover:bg-white/[0.08]"
                  }`}
                >
                  {link.label}
                  {location.pathname === link.to && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 bg-white/10 rounded-lg -z-10"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
                    />
                  )}
                </Link>
              ))}
            </nav>

            <div className="hidden lg:flex items-center gap-2">
              {isAuthenticated ? (
                <>
                  <Link to="/spaces">
                    <span className="inline-block px-4 py-2 text-[15px] sm:text-base font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors">
                      My Spaces
                    </span>
                  </Link>
                  <button
                    type="button"
                    onClick={logout}
                    className="px-4 py-2 text-[15px] sm:text-base font-medium text-white/80 hover:text-white rounded-lg hover:bg-white/[0.08] transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/demo"
                    className="inline-block px-4 py-2 text-[15px] sm:text-base font-medium text-white/70 hover:text-white rounded-lg hover:bg-white/[0.06] transition-colors"
                  >
                    Try Demo
                  </Link>
                  <Link to="/signup">
                    <span className="inline-flex items-center px-5 py-2.5 text-[15px] sm:text-base font-semibold text-black bg-white hover:bg-white/90 rounded-lg transition-colors shadow-sm">
                      Get Started
                    </span>
                  </Link>
                </>
              )}
            </div>

            {/* Hamburger — larger tap target */}
            <button
              type="button"
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/[0.08] active:bg-white/10 transition-colors touch-manipulation flex-shrink-0"
              aria-label={isOpen ? "Close menu" : "Open menu"}
              aria-expanded={isOpen}
            >
              <span
                className={`block w-5 h-[2.5px] rounded-full bg-white/90 transition-all duration-200 origin-center ${
                  isOpen ? "rotate-45 translate-y-[6px]" : ""
                }`}
              />
              <span
                className={`block h-[2.5px] rounded-full bg-white/90 transition-all duration-200 ${
                  isOpen ? "w-0 opacity-0" : "w-5 opacity-100"
                }`}
              />
              <span
                className={`block w-5 h-[2.5px] rounded-full bg-white/90 transition-all duration-200 origin-center ${
                  isOpen ? "-rotate-45 -translate-y-[6px]" : ""
                }`}
              />
            </button>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay + panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              role="presentation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm lg:hidden"
              onClick={() => setIsOpen(false)}
              aria-hidden="true"
            />
            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 28, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 z-50 w-full max-w-sm bg-[#000000] border-l border-white/10 shadow-2xl lg:hidden flex flex-col"
            >
              <div className="flex items-center justify-between px-4 py-4 border-b border-white/10">
                <Link to="/" onClick={() => setIsOpen(false)} className="shrink-0">
                  <img src="/Astarus Logo.png" alt="Astarus" className="h-14 sm:h-16 w-auto scale-150 sm:scale-[1.75] origin-left" />
                </Link>
                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="w-11 h-11 flex flex-col items-center justify-center gap-1.5 rounded-lg hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <span className="block w-5 h-[2.5px] rounded-full bg-white/90 rotate-45 translate-y-[6px]" />
                  <span className="block w-5 h-[2.5px] rounded-full bg-white/90 -rotate-45 -translate-y-[6px]" />
                </button>
              </div>
              <nav className="flex-1 overflow-auto py-4 px-3 space-y-0.5">
                {navLinks.map((link, index) => (
                  <motion.div key={link.to} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.03 }}>
                    <Link
                      to={link.to}
                      onClick={() => setIsOpen(false)}
                      className={`block py-3 px-4 rounded-lg text-base font-medium transition-colors ${
                        location.pathname === link.to ? "bg-white/10 text-white" : "text-white/75 hover:bg-white/[0.08] hover:text-white"
                      }`}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="p-4 pt-3 border-t border-white/10 space-y-2">
                {isAuthenticated ? (
                  <>
                    <Link to="/spaces" onClick={() => setIsOpen(false)} className="block">
                      <span className="flex items-center justify-center w-full py-3 rounded-lg text-base font-medium text-white/90 border border-white/20 hover:bg-white/[0.08] transition-colors">
                        My Spaces
                      </span>
                    </Link>
                    <button
                      type="button"
                      onClick={logout}
                      className="w-full py-3 rounded-lg text-base font-medium text-white/90 border border-white/20 hover:bg-white/[0.08] transition-colors"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/demo"
                      onClick={() => setIsOpen(false)}
                      className="flex items-center justify-center w-full py-3 rounded-lg text-base font-medium text-white/80 border border-white/20 hover:bg-white/[0.08] hover:text-white transition-colors"
                    >
                      Try Demo
                    </Link>
                    <Link to="/signup" onClick={() => setIsOpen(false)} className="block">
                      <span className="flex items-center justify-center w-full py-3 rounded-lg text-base font-semibold bg-white text-black hover:bg-white/90 transition-colors shadow-sm">
                        Get Started
                      </span>
                    </Link>
                  </>
                )}
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
