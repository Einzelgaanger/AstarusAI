import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer } from "@/lib/motion";
import { Link } from "react-router-dom";

const stats = [
  { value: "75%", label: "Perplexity Reduction", image: "/brain_artificial_int_76a4f2c5.jpg" },
  { value: "<20s", label: "Training Time", image: "/futuristic_ai_techno_65818c05.jpg" },
  { value: "100%", label: "Knowledge Retention", image: "/digital_transformati_88f18833.jpg" },
];

export const Hero = () => {
  return (
    <motion.section
      className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24 overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
    >
      {/* Background: full-bleed image with overlay */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/AIBackground1.webp"
          alt="AI and neural networks"
          className="w-full h-full object-cover scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-black/80" />
        <div className="absolute inset-0 bg-gradient-to-r from-primary/15 via-transparent to-primary/10 mix-blend-overlay" />
      </div>

      {/* Soft glow orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/25 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/15 rounded-full blur-[120px]" />
      </div>

      <div className="container relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full glass-dark glass-border"
            variants={fadeInUp(0)}
          >
            <span className="text-xs sm:text-sm font-semibold text-white/90 tracking-wide">
              Next-Generation AI Architecture
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          </motion.div>

          <motion.h1
            className="font-display font-bold text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] px-2"
            variants={fadeInUp(0.08)}
          >
            AI That{" "}
            <span className="relative inline-block">
              <span className="text-gradient">Learns</span>
              <svg className="absolute -bottom-1 sm:-bottom-2 left-0 w-full hidden sm:block" viewBox="0 0 200 12" fill="none">
                <path d="M2 8C50 3 150 3 198 8" stroke="url(#heroGrad)" strokeWidth="4" strokeLinecap="round" />
                <defs>
                  <linearGradient id="heroGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="hsl(262, 83%, 58%)" />
                    <stop offset="100%" stopColor="hsl(280, 90%, 55%)" />
                  </linearGradient>
                </defs>
              </svg>
            </span>
            <br className="hidden sm:block" />
            <span className="text-white/95"> Continuously</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed px-4 font-medium"
            variants={fadeInUp(0.12)}
          >
            Memory-augmented transformers that enable{" "}
            <span className="text-primary font-semibold">real-time learning</span> and adaptation
            without expensive fine-tuning or complex infrastructure.
          </motion.p>

          <motion.div className="flex items-center justify-center pt-2 sm:pt-4 px-4" variants={fadeInUp(0.16)}>
            <Link to="/demo" className="w-full sm:w-auto">
              <Button
                size="lg"
                className="group cta-button text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto w-full sm:w-auto min-h-[48px] touch-manipulation font-semibold"
              >
                Try Interactive Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats: image-backed cards, no icons */}
          <motion.div
            className="pt-8 sm:pt-12 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 max-w-4xl mx-auto"
            variants={fadeInUp(0.2)}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="group relative rounded-2xl overflow-hidden glass-dark glass-border min-h-[100px] sm:min-h-[120px] flex flex-col justify-end p-4 sm:p-5"
              >
                <img
                  src={stat.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:opacity-35 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <div className="relative z-10">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-white">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-white/75 font-medium">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-white/50"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-white/25 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-2.5 bg-white/60 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};
