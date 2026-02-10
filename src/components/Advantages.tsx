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
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#0d0b14] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeIn()}
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5"
          variants={fadeInUp(0.1)}
        >
          <div className="section-badge mx-auto text-xs sm:text-sm">
            <span className="text-primary">Proven Results</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white px-2">
            Why This{" "}
            <span className="text-gradient">Changes Everything</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Proven results that make continuous learning practical and cost-effective for the first time in AI history.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto"
          variants={staggerContainer(0.08, 0.05)}
        >
          {advantages.map((item, index) => {
            const isPrimary = item.color === "primary";
            return (
              <motion.div
                key={index}
                variants={fadeInUp(0.1)}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/20 transition-all duration-500">
                  <div className="relative h-36 sm:h-40 overflow-hidden">
                    <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-70 transition-opacity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0d0b14] via-[#0d0b14]/80 to-transparent" />
                    <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-right">
                      <div className={`font-display text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight ${
                        isPrimary ? "text-gradient" : "text-gradient-secondary"
                      }`}>
                        {item.metric}
                        {item.unit && <span className="text-lg sm:text-xl md:text-2xl ml-0.5 opacity-90">{item.unit}</span>}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 relative z-10">
                    <h3 className={`font-display text-lg sm:text-xl font-bold mb-2 transition-colors duration-300 ${
                      isPrimary ? "text-primary group-hover:text-primary" : "text-secondary group-hover:text-secondary"
                    }`}>
                      {item.title}
                    </h3>
                    <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                    isPrimary ? "bg-gradient-primary" : "bg-gradient-secondary"
                  }`} />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </motion.section>
  );
};
