import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";

const advantages = [
  { title: "Superior Performance", metric: "75%", unit: "", description: "Perplexity reduction when retrained on domain-specific data across model sizes from 1.6M to 63M parameters.", image: "/brain_artificial_int_76a4f2c5.jpg", color: "primary" },
  { title: "Lightning Fast", metric: "<20", unit: "sec", description: "Train on thousands of tokens in seconds. No expensive GPU clusters or lengthy retraining cycles required.", image: "/futuristic_ai_techno_65818c05.jpg", color: "secondary" },
  { title: "Zero Forgetting", metric: "100%", unit: "", description: "Maintains base model knowledge while adding new information. LUT corrections layer on top without interference.", image: "/digital_transformati_88f18833.jpg", color: "primary" },
  { title: "Minimal Overhead", metric: "<1%", unit: "", description: "Tiny memory footprint and computational cost. LUT layer adds negligible latency compared to external RAG.", image: "/complex_infrastructu_67a3236a.jpg", color: "secondary" },
];

export const Advantages = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-10 bg-muted/20 overflow-hidden bg-shapes-soft bg-pattern-results"
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeIn()}
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] rounded-full bg-primary/[0.06] blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-0 w-64 h-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10 max-w-5xl lg:max-w-6xl xl:max-w-[72rem] mx-auto">
        <motion.div
          className="max-w-3xl lg:max-w-4xl xl:max-w-[42rem] mx-auto text-center mb-10 sm:mb-14 lg:mb-16 xl:mb-20 space-y-3 sm:space-y-4 lg:space-y-5"
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase mx-auto font-accent" variants={fadeInUp(0)}>
            <span className="text-primary">Proven Results</span>
          </motion.div>
          <motion.h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground px-2" variants={fadeInUp(0)}>
            Why This{" "}
            <span className="text-primary">Changes Everything</span>
          </motion.h2>
          <motion.p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 font-sans" variants={fadeInUp(0)}>
            Proven results that make continuous learning practical and cost-effective for the first time in AI history.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex md:grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 xl:gap-10 max-w-5xl lg:max-w-6xl xl:max-w-[72rem] mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-auto md:px-0"
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {advantages.map((item, index) => {
            if (index === 0) {
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(0.1)}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-[260px] max-w-[320px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
                >
                  <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 shadow-sm flex flex-col items-center text-center p-6 sm:p-8">
                    <div className="font-display text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-primary mb-3">
                      {item.metric}
                      {item.unit && <span className="text-2xl sm:text-3xl ml-0.5 opacity-90">{item.unit}</span>}
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans max-w-sm">{item.description}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-primary" />
                  </Card>
                </motion.div>
              );
            }

            if (index === 1) {
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(0.1)}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-[260px] max-w-[320px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
                >
                  <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 shadow-sm flex flex-row">
                    <div className="relative w-24 sm:w-28 flex-shrink-0 overflow-hidden">
                      <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity" />
                      <div className="absolute inset-0 bg-primary/20" />
                      <div className="absolute top-4 left-4 right-4 text-left">
                        <div className="font-accent font-bold text-2xl sm:text-3xl text-white drop-shadow-md">
                          {item.metric}{item.unit}
                        </div>
                      </div>
                    </div>
                    <div className="p-4 sm:p-5 flex-1 min-w-0">
                      <h3 className="font-display font-bold text-foreground mb-2 text-base sm:text-lg">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed font-sans">{item.description}</p>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-primary" />
                  </Card>
                </motion.div>
              );
            }

            if (index === 3) {
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(0.1)}
                  whileHover={{ y: -6, scale: 1.01 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-[260px] max-w-[320px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
                >
                  <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 shadow-sm border-l-4 border-l-primary pl-5 sm:pl-6 pr-4 sm:pr-5 py-5 sm:py-6">
                    <div className="font-display text-3xl sm:text-4xl font-bold text-primary mb-2">
                      {item.metric}{item.unit}
                    </div>
                    <h3 className="font-display font-bold text-foreground mb-2">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed font-sans">{item.description}</p>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-primary" />
                  </Card>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={index}
                variants={fadeInUp(0.1)}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="h-full min-w-[260px] max-w-[320px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
              >
                <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 shadow-sm">
                  <div className="relative h-28 sm:h-32 overflow-hidden">
                    <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-50 group-hover:opacity-60 transition-opacity" />
                    <div className="absolute inset-0 bg-card/95" />
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 text-right">
                      <div className="font-accent font-bold text-2xl sm:text-3xl md:text-4xl tracking-tight text-primary">
                        {item.metric}
                        {item.unit && <span className="text-sm sm:text-base ml-0.5 opacity-90">{item.unit}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 relative z-10">
                    <h3 className="font-display text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 text-foreground group-hover:text-primary">
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                      {item.description}
                    </p>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-primary" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};
