import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowUpRight, Mail, Phone, Linkedin } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", to: "/team" },
    { label: "Technology", to: "/technology" },
    { label: "Investors", to: "/investors" },
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
    <footer className="relative bg-black py-12 sm:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-10 overflow-hidden border-t border-white/10 safe-area-pb safe-area-px court-pattern">
      <div className="container relative z-10 max-w-5xl lg:max-w-6xl xl:max-w-[72rem] mx-auto">
        <div className="w-full">
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 xl:gap-16 mb-10 sm:mb-12 lg:mb-14 xl:mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: {},
              visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
            }}
          >
            <motion.div
              className="sm:col-span-2 space-y-4 sm:space-y-6"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            >
              <Link to="/" className="inline-flex items-center gap-2 touch-manipulation">
                <img
                  src="/Astarus Logo.png"
                  alt="Astarus Logo"
                  className="h-16 sm:h-20 md:h-24 w-auto rounded-lg"
                />
                <span className="font-display text-xl sm:text-2xl font-bold text-white">Astarus</span>
              </Link>

              <p className="text-sm sm:text-base text-white/80 leading-relaxed max-w-sm">
                Building the next generation of continuously learning AI systems
                with memory-augmented transformer technology.
              </p>

              <div className="flex items-center gap-3">
                <a
                  href="https://www.linkedin.com/in/rafayel-latif-490aa724a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-violet-600 flex items-center justify-center text-white transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="mailto:rafayel.latif@gmail.com"
                  className="w-10 h-10 rounded-xl bg-white/10 hover:bg-violet-600 flex items-center justify-center text-white transition-all touch-manipulation min-h-[44px] min-w-[44px]"
                  aria-label="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </motion.div>

            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            >
              <h4 className="font-bold text-white text-base sm:text-lg">Company</h4>
              <ul className="space-y-2 sm:space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.to}>
                    <Link
                      to={link.to}
                      className="text-sm sm:text-base text-white/80 hover:text-violet-400 transition-colors inline-flex items-center gap-1 group touch-manipulation"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all text-violet-400" />
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              className="space-y-3 sm:space-y-4"
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0, transition: { duration: 0.4 } } }}
            >
              <h4 className="font-bold text-white text-base sm:text-lg">Get in Touch</h4>
              <ul className="space-y-2 sm:space-y-3">
                <li>
                  <a
                    href="mailto:rafayel.latif@gmail.com"
                    className="text-sm sm:text-base text-white/80 hover:text-violet-400 transition-colors inline-flex items-center gap-2 touch-manipulation break-all"
                  >
                    <Mail className="w-4 h-4 flex-shrink-0 text-white" />
                    <span className="break-all">rafayel.latif@gmail.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="tel:+447957456969"
                    className="text-sm sm:text-base text-white/80 hover:text-violet-400 transition-colors inline-flex items-center gap-2 touch-manipulation"
                  >
                    <Phone className="w-4 h-4 flex-shrink-0 text-white" />
                    <span>+44 7957 456969</span>
                  </a>
                </li>
                <li className="text-sm sm:text-base text-white/70 pt-1">
                  Monday–Friday, 9am–5pm GMT
                </li>
              </ul>
            </motion.div>
          </motion.div>

          <motion.div
            className="pt-4 sm:pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-3"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <p className="text-[11px] sm:text-xs text-white/60 text-center sm:text-left">
              &copy; {currentYear} Astarus AI. All rights reserved.
            </p>
            <div className="flex items-center gap-3 sm:gap-4 text-[11px] sm:text-xs text-white/60">
              <span className="cursor-pointer hover:text-violet-400 transition-colors touch-manipulation">Privacy Policy</span>
              <span className="cursor-pointer hover:text-violet-400 transition-colors touch-manipulation">Terms of Service</span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};
