import { Card } from "@/components/ui/card";
import { CheckCircle2, Sparkles, Zap, Database, RefreshCw, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const features = [
  {
    icon: Zap,
    title: "Real-Time Learning",
    description: "Update model behavior in seconds with append-only lookup tables that require negligible compute.",
  },
  {
    icon: Database,
    title: "Native Integration",
    description: "Uses the model's internal embeddings — no complex RAG infrastructure needed.",
  },
  {
    icon: RefreshCw,
    title: "Cost-Effective",
    description: "Dramatically lower compute and infrastructure costs compared to fine-tuning.",
  },
  {
    icon: Sparkles,
    title: "Continuous Improvement",
    description: "The model accumulates corrections over time, becoming better automatically.",
  },
];

const steps = [
  {
    step: "01",
    title: "Inference",
    description: "Model processes input and generates embeddings at selected layers.",
    color: "primary",
  },
  {
    step: "02",
    title: "Lookup",
    description: "LUT searches for matching embeddings and retrieves correction vectors.",
    color: "secondary",
  },
  {
    step: "03",
    title: "Correction",
    description: "Corrections are applied to logits, steering predictions toward learned behavior.",
    color: "primary",
  },
  {
    step: "04",
    title: "Output",
    description: "Personalized, adapted response is generated in real-time.",
    color: "secondary",
  },
];

export const Solution = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeIn()}
    >
      <div className="absolute inset-0">
        <img 
          src="/brain_artificial_int_e9d43400.jpg" 
          alt="AI Background" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/80" />
      </div>
      <div className="absolute inset-0 opacity-30">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/20 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6"
          variants={fadeInUp(0.1)}
        >
          <div className="section-badge mx-auto bg-white/5 border-white/10 text-xs sm:text-sm">
            <Sparkles className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-white/90">Our Innovation</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white px-2">
            Memory-Augmented{" "}
            <span className="text-gradient">Transformers</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
            We've developed a breakthrough architecture that adds a small, trainable 
            lookup table (LUT) layer to transformer blocks, enabling instant learning.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 sm:gap-10 lg:gap-12 items-start max-w-7xl mx-auto">
          <motion.div className="space-y-6 sm:space-y-8" variants={staggerContainer(0.1, 0.1)}>
            <motion.div variants={fadeInUp(0.1)}>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6 px-2 sm:px-0">Key Advantages</h3>
              <div className="grid gap-3 sm:gap-4">
                {features.map((feature, index) => {
                  const Icon = feature.icon;
                  return (
                    <motion.div
                      key={index}
                      variants={fadeInUp(index * 0.1)}
                      className="group"
                    >
                      <Card className="p-4 sm:p-5 bg-white/5 border-white/10 hover:bg-white/10 transition-all duration-300 hover:border-primary/30">
                        <div className="flex gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-primary flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <h4 className="font-bold text-white mb-1 text-sm sm:text-base">{feature.title}</h4>
                            <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{feature.description}</p>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp(0.3)} className="px-2 sm:px-0">
              <Link to="/chat" className="block w-full sm:w-auto">
                <Button className="cta-button group w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5">
                  <span>Try It Yourself</span>
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div variants={fadeInUp(0.2)}>
            <Card className="p-5 sm:p-6 md:p-8 bg-white/5 border-white/10 backdrop-blur-sm">
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-6 sm:mb-8 flex items-center gap-2 sm:gap-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-gradient-secondary flex items-center justify-center flex-shrink-0">
                  <RefreshCw className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                </div>
                <span>How It Works</span>
              </h3>

              <div className="space-y-5 sm:space-y-6">
                {steps.map((step, index) => (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                  >
                    {index < steps.length - 1 && (
                      <div className="absolute left-5 sm:left-6 top-12 sm:top-14 bottom-0 w-px bg-gradient-to-b from-white/20 to-transparent" />
                    )}
                    
                    <div className="flex gap-3 sm:gap-5">
                      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center flex-shrink-0 font-bold text-white text-sm sm:text-base ${
                        step.color === "primary" ? "bg-gradient-primary" : "bg-gradient-secondary"
                      }`}>
                        {step.step}
                      </div>
                      <div className="pt-0.5 sm:pt-1 min-w-0 flex-1">
                        <h4 className="font-bold text-white mb-1 text-sm sm:text-base">{step.title}</h4>
                        <p className="text-xs sm:text-sm text-white/60 leading-relaxed">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="mt-6 sm:mt-8 p-3 sm:p-4 rounded-xl bg-gradient-to-r from-primary/20 to-secondary/20 border border-white/10">
                <div className="flex items-start gap-2 sm:gap-3">
                  <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-green-400 flex-shrink-0 mt-0.5" />
                  <p className="text-xs sm:text-sm text-white/80 leading-relaxed">
                    <span className="font-semibold text-white">Result:</span> Personalized, 
                    adapted output with no retraining required
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
};
