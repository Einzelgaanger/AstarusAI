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
      className="relative min-h-[100svh] flex items-center justify-center px-4 sm:px-6 py-20 sm:py-24 overflow-hidden bg-white"
      initial="hidden"
      animate="visible"
      variants={fadeIn()}
    >
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/AIBackground1.webp"
          alt="AI and neural networks"
          className="w-full h-full object-cover scale-105"
        />
      </div>

      {/* Geometric shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-primary/15 rounded-full blur-[100px] animate-pulse" />
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute top-20 right-[15%] w-32 h-32 rounded-3xl border border-white/20 rotate-12" />
        <div className="absolute bottom-32 left-[10%] w-24 h-24 rounded-full border border-white/15" />
        <div className="absolute top-1/2 left-[5%] w-2 h-24 bg-primary/30 rounded-full rotate-[-20deg]" />
        <div className="absolute bottom-1/4 right-[8%] w-40 h-40 rounded-[2rem] bg-black/5 backdrop-blur-sm" />
        <div className="absolute top-[40%] right-[25%] w-16 h-16 rounded-xl border-2 border-primary/20 rotate-45" />
      </div>

      {/* Subtle grid overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:64px_64px] pointer-events-none" />

      <div className="container relative z-10 max-w-6xl mx-auto">
        <motion.div
          className="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8"
          variants={staggerContainer(0.12)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-full glass-dark glass-border font-accent"
            variants={fadeInUp(0)}
          >
            <span className="text-xs sm:text-sm font-semibold text-foreground/90 tracking-wide uppercase tracking-wider">
              Next-Generation AI Architecture
            </span>
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          </motion.div>

          <motion.h1
            className="font-display font-bold text-foreground text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl tracking-tight leading-[1.05] px-2"
            variants={fadeInUp(0.08)}
          >
            AI That{" "}
            <span className="text-primary">Learns</span>
            <br className="hidden sm:block" />
            <span className="text-foreground"> Continuously</span>
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed px-4 font-medium font-sans"
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
                className="group w-full sm:w-auto rounded-2xl bg-primary text-primary-foreground text-sm sm:text-base px-6 sm:px-8 py-5 sm:py-6 h-auto min-h-[48px] touch-manipulation font-semibold hover:bg-primary/90 transition-colors"
              >
                Try Interactive Demo
              </Button>
            </Link>
          </motion.div>

          {/* Stats: varied card layouts */}
          <motion.div
            className="pt-8 sm:pt-12 flex sm:grid sm:grid-cols-3 gap-4 sm:gap-5 overflow-x-auto sm:overflow-visible snap-x snap-mandatory pb-2 -mx-4 px-4 sm:mx-auto sm:px-0 max-w-4xl"
            variants={fadeInUp(0.2)}
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className={`group relative overflow-hidden glass-dark glass-border flex flex-col justify-end bg-white/95 min-w-[240px] max-w-[260px] snap-start flex-shrink-0 sm:min-w-0 sm:max-w-none transition-all duration-300 hover:shadow-elegant ${
                  i === 0 ? "rounded-2xl min-h-[100px] sm:min-h-[130px] p-4 sm:p-5 sm:rounded-[1.5rem]" :
                  i === 1 ? "rounded-2xl min-h-[100px] sm:min-h-[120px] p-4 sm:p-5 border-l-4 border-l-primary/60" :
                  "rounded-[1.25rem] min-h-[100px] sm:min-h-[120px] p-4 sm:p-5 ring-1 ring-black/5"
                }`}
              >
                <img
                  src={stat.image}
                  alt=""
                  className="absolute inset-0 w-full h-full object-cover opacity-20 group-hover:opacity-30 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-white/90" />
                <div className="relative z-10">
                  <div className="font-display font-bold text-2xl sm:text-3xl text-foreground">{stat.value}</div>
                  <div className="text-xs sm:text-sm text-muted-foreground font-medium font-accent">{stat.label}</div>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 hidden sm:flex flex-col items-center gap-2 text-muted-foreground"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <span className="text-xs uppercase tracking-widest font-medium">Scroll</span>
        <div className="w-6 h-10 rounded-full border-2 border-foreground/20 flex items-start justify-center p-1.5">
          <motion.div
            className="w-1.5 h-2.5 bg-foreground/50 rounded-full"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </motion.section>
  );
};
