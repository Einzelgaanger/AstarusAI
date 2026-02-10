import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles, Play } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp } from "@/lib/motion";
import { Link } from "react-router-dom";

export const CTA = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-24 px-3 sm:px-4 overflow-hidden safe-area-px bg-muted/30"
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeIn()}
    >
      <div className="container relative z-10">
        <motion.div
          className="max-w-4xl mx-auto text-center"
          variants={fadeInUp(0.1)}
        >
          <div className="relative rounded-3xl border border-black/10 bg-black px-6 sm:px-10 py-10 sm:py-14 shadow-xl overflow-hidden">
            {/* Subtle grid and shapes */}
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:48px_48px] pointer-events-none" />
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-primary/5 blur-3xl pointer-events-none" />

            <div className="relative z-10">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-white/10 mx-auto mb-6 sm:mb-8 flex items-center justify-center border border-white/10">
                <Sparkles className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
              </div>

              <h2 className="font-display text-2xl sm:text-4xl md:text-5xl font-bold text-white mb-4 sm:mb-6 px-2">
                Ready to Experience Astarus?
              </h2>

              <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 max-w-2xl mx-auto px-2 font-sans">
                Try the interactive demo and see how memory-augmented transformers enable real-time learning and personalization.
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center">
                <Link to="/chat" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto min-h-[48px] bg-primary text-primary-foreground hover:bg-primary/90 font-semibold px-6 sm:px-8 py-5 sm:py-6 h-auto text-base shadow-sm group touch-manipulation transition-colors font-accent">
                    <Play className="w-5 h-5 mr-2" />
                    Try Demo Now
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link to="/contact" className="w-full sm:w-auto">
                  <Button className="w-full sm:w-auto min-h-[48px] bg-transparent border border-white/30 text-white hover:border-primary/60 hover:text-primary font-semibold px-6 sm:px-8 py-5 sm:py-6 h-auto text-base touch-manipulation transition-colors font-accent">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.section>
  );
};
