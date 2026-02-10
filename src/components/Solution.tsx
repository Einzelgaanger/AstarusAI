import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  { title: "Real-Time Learning", description: "Update model behavior in seconds with append-only lookup tables that require negligible compute.", image: "/futuristic_ai_techno_65818c05.jpg" },
  { title: "Native Integration", description: "Uses the model's internal embeddings — no complex RAG infrastructure needed.", image: "/digital_transformati_bcf974ad.jpg" },
  { title: "Cost-Effective", description: "Dramatically lower compute and infrastructure costs compared to fine-tuning.", image: "/complex_infrastructu_67a3236a.jpg" },
  { title: "Continuous Improvement", description: "The model accumulates corrections over time, becoming better automatically.", image: "/brain_artificial_int_76a4f2c5.jpg" },
];

const steps = [
  { step: "01", title: "Inference", description: "Model processes input and generates embeddings at selected layers.", color: "primary" },
  { step: "02", title: "Lookup", description: "LUT searches for matching embeddings and retrieves correction vectors.", color: "secondary" },
  { step: "03", title: "Correction", description: "Corrections are applied to logits, steering predictions toward learned behavior.", color: "primary" },
  { step: "04", title: "Output", description: "Personalized, adapted response is generated in real-time.", color: "secondary" },
];

export const Solution = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeIn()}
    >
      <div className="absolute inset-0">
        <img src="/brain_artificial_int_e9d43400.jpg" alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/75 to-black/85" />
      </div>
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5"
          variants={fadeInUp(0.1)}
        >
          <div className="section-badge mx-auto bg-white/5 border-white/10 text-xs sm:text-sm">
            <span className="text-white/90">Our Innovation</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white px-2">
            Memory-Augmented{" "}
            <span className="text-gradient">Transformers</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
            A breakthrough architecture that adds a small, trainable lookup table (LUT) layer to transformer blocks, enabling instant learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start max-w-7xl mx-auto">
          <motion.div className="space-y-6 sm:space-y-8" variants={staggerContainer(0.08, 0.05)}>
            <motion.div variants={fadeInUp(0.1)}>
              <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">Key Advantages</h3>
              <div className="grid gap-3 sm:gap-4">
                {features.map((item, index) => (
                  <motion.div key={index} variants={fadeInUp(0.08)}>
                    <Card className="p-0 overflow-hidden bg-white/5 border-white/10 hover:bg-white/10 hover:border-primary/20 transition-all duration-300 rounded-xl">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative w-full sm:w-24 sm:min-h-[80px] aspect-video sm:aspect-square flex-shrink-0">
                          <img src={item.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-80" />
                          <div className="absolute inset-0 bg-gradient-to-r from-primary/40 to-transparent sm:bg-gradient-to-b sm:from-primary/40" />
                        </div>
                        <div className="p-4 sm:p-5 min-w-0 flex-1">
                          <h4 className="font-display font-bold text-white mb-1 text-sm sm:text-base">{item.title}</h4>
                          <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{item.description}</p>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            <motion.div variants={fadeInUp(0.2)} className="px-0">
              <Link to="/chat" className="block w-full sm:w-auto">
                <Button className="cta-button w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5 font-semibold">
                  Try It Yourself
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp(0.15)}>
            <Card className="p-5 sm:p-6 md:p-8 bg-white/5 border-white/10 backdrop-blur-sm rounded-2xl overflow-hidden">
              <div className="relative h-32 sm:h-40 rounded-xl overflow-hidden mb-6 sm:mb-8">
                <img src="/digital_transformati_88f18833.jpg" alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                <h3 className="absolute bottom-0 left-0 right-0 p-4 font-display text-xl sm:text-2xl font-bold text-white">
                  How It Works
                </h3>
              </div>
              <div className="space-y-5 sm:space-y-6">
                {steps.map((s, index) => (
                  <motion.div
                    key={index}
                    className="relative flex gap-3 sm:gap-4"
                    initial={{ opacity: 0, x: 16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {index < steps.length - 1 && (
                      <div className="absolute left-6 sm:left-7 top-12 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                    <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-display font-bold text-white text-sm ${
                      s.color === "primary" ? "bg-gradient-primary" : "bg-gradient-secondary"
                    }`}>
                      {s.step}
                    </div>
                    <div className="pt-0.5 min-w-0 flex-1">
                      <h4 className="font-display font-bold text-white mb-1 text-sm sm:text-base">{s.title}</h4>
                      <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{s.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-primary/20 to-primary/10 border border-white/10">
                <p className="text-xs sm:text-sm text-white/85 leading-relaxed">
                  <span className="font-semibold text-white">Result:</span> Personalized, adapted output with no retraining required.
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
