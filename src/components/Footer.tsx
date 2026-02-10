import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, Phone, Linkedin, Twitter, Github } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", to: "/team" },
    { label: "Technology", to: "/technology" },
    { label: "Investors", to: "/investors" },
    { label: "Contact", to: "/contact" },
  ],
  resources: [
    { label: "Try Demo", to: "/chat" },
    { label: "Documentation", to: "/technology" },
    { label: "Research", to: "/technology" },
  ],
};

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative bg-[#0a0812] py-12 sm:py-16 px-4 sm:px-6 overflow-hidden border-t border-white/5">
      <div className="absolute inset-0 bg-mesh-gradient opacity-20" />
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-primary/25 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-10 sm:mb-12">
            <div className="sm:col-span-2 space-y-4 sm:space-y-6">
              <Link to="/" className="inline-flex items-center gap-2 touch-manipulation">
                <img
                  src="/Actual Logo.png"
                  alt="Astarus Logo"
                  className="h-12 sm:h-14 md:h-16 w-auto rounded-lg"
                />
                <span className="font-display text-xl sm:text-2xl font-bold text-white">Astarus</span>
              </Link>
              
              <p className="text-sm sm:text-base text-white/60 leading-relaxed max-w-sm">
                Building the next generation of continuously learning AI systems 
                with memory-augmented transformer technology.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/rafayel-latif-490aa724a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:rafayel.latif@gmail.com"
                  className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 active:bg-white/15 flex items-center justify-center text-white/60 hover:text-white transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-white text-base sm:text-lg">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm sm:text-base text-white/60 hover:text-white active:text-white transition-colors inline-flex items-center gap-1 group touch-manipulation"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-3 sm:space-y-4">
              <h4 className="font-bold text-white text-base sm:text-lg">Contact</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href="mailto:rafayel.latif@gmail.com"
                    className="text-sm sm:text-base text-white/60 hover:text-white active:text-white transition-colors inline-flex items-center gap-2 touch-manipulation break-all"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span className="break-all">rafayel.latif@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+447957456969"
                    className="text-sm sm:text-base text-white/60 hover:text-white active:text-white transition-colors inline-flex items-center gap-2 touch-manipulation"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>+44 7957 456969</span>
                  </a>
                </li>
              </ul>

              <div className="pt-3 sm:pt-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-gradient-primary text-white text-sm font-semibold hover:opacity-90 active:opacity-95 transition-opacity shadow-lg shadow-primary/30 touch-manipulation min-h-[44px]"
                >
                  Get in Touch
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
            <p className="text-xs sm:text-sm text-white/40 text-center sm:text-left">
              &copy; {currentYear} Astarus AI. All rights reserved.
            </p>
            <div className="flex items-center gap-4 sm:gap-6 text-xs sm:text-sm text-white/40">
              <span className="cursor-pointer hover:text-white/60 transition-colors touch-manipulation">Privacy Policy</span>
              <span className="cursor-pointer hover:text-white/60 transition-colors touch-manipulation">Terms of Service</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
