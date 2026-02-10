import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer, scaleIn } from "@/lib/motion";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <motion.section
      className="relative py-12 sm:py-14 md:py-16 lg:py-20 xl:py-24 px-4 sm:px-6 md:px-8 lg:px-10 overflow-hidden safe-area-px bg-muted/30"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={fadeIn()}
    >
      <div className="container relative z-10 max-w-5xl lg:max-w-6xl xl:max-w-[72rem] mx-auto">
        <motion.div
          className="max-w-3xl lg:max-w-4xl xl:max-w-[52rem] mx-auto text-center"
          variants={staggerContainer(0.08, 0.1)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="relative rounded-2xl border border-black/10 bg-black px-5 sm:px-8 lg:px-12 py-7 sm:py-10 lg:py-12 shadow-xl overflow-hidden"
            variants={scaleIn(0.1)}
          >
            {/* Subtle grid and shapes */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-48 h-48 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-36 h-36 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <motion.div className="w-12 h-12 sm:w-14 sm:h-14 lg:w-16 lg:h-16 rounded-xl bg-white/10 mx-auto mb-4 sm:mb-5 lg:mb-6 flex items-center justify-center border border-white/10" variants={fadeInUp(0)}>
                <motion.span animate={{ rotate: [0, 5, -5, 0] }} transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}>
                  <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8 text-white" />
                </motion.span>
              </motion.div>

              <motion.h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 sm:mb-4 lg:mb-5 px-2" variants={fadeInUp(0)}>
                Ready to Experience Astarus?
              </motion.h2>

              <motion.p className="text-sm sm:text-base md:text-lg text-white/80 mb-5 sm:mb-6 max-w-xl mx-auto px-2 font-sans" variants={fadeInUp(0)}>
                Try the interactive demo and see how memory-augmented transformers enable real-time learning and personalization.
              </motion.p>

              <motion.div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center" variants={fadeInUp(0)}>
                <Link to="/chat" className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full sm:w-auto min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-5 sm:px-6 py-3.5 sm:py-4 h-auto text-sm shadow-sm group touch-manipulation transition-colors font-accent">
                      <Play className="w-4 h-4 mr-1.5" />
                      Try Demo Now
                      <ArrowRight className="w-4 h-4 ml-1.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </motion.div>
                </Link>
                <a href="mailto:rafayel.latif@gmail.com?subject=Contact%20Sales" className="w-full sm:w-auto">
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                    <Button className="w-full sm:w-auto min-h-[44px] bg-transparent border border-white/30 text-white hover:border-white/70 hover:bg-white/10 hover:text-white font-semibold px-5 sm:px-6 py-3.5 sm:py-4 h-auto text-sm touch-manipulation transition-colors font-accent">
                      Contact Sales
                    </Button>
                  </motion.div>
                </a>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};
