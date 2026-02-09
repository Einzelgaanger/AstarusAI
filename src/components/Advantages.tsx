import { Card } from "@/components/ui/card";
import { TrendingUp, Zap, Shield, Layers } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";

const advantages = [
  {
    icon: TrendingUp,
    title: "Superior Performance",
    metric: "75%",
    unit: "",
    description: "Perplexity reduction when retrained on domain-specific data across model sizes from 1.6M to 63M parameters.",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    metric: "<20",
    unit: "sec",
    description: "Train on thousands of tokens in seconds. No expensive GPU clusters or lengthy retraining cycles required.",
    color: "secondary",
  },
  {
    icon: Shield,
    title: "Zero Forgetting",
    metric: "100%",
    unit: "",
    description: "Maintains base model knowledge while adding new information. LUT corrections layer on top without interference.",
    color: "primary",
  },
  {
    icon: Layers,
    title: "Minimal Overhead",
    metric: "<1%",
    unit: "",
    description: "Tiny memory footprint and computational cost. LUT layer adds negligible latency compared to external RAG.",
    color: "secondary",
  },
];

export const Advantages = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeIn()}
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-40" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6"
          variants={fadeInUp(0.1)}
        >
          <div className="section-badge mx-auto text-xs sm:text-sm">
            <TrendingUp className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-primary">Proven Results</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground px-2">
            Why This{" "}
            <span className="text-gradient">Changes Everything</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Proven results that make continuous learning practical and cost-effective 
            for the first time in AI history.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 max-w-5xl mx-auto"
          variants={staggerContainer(0.1, 0.1)}
        >
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            const isPrimary = advantage.color === "primary";
            
            return (
              <motion.div
                key={index}
                variants={fadeInUp(index * 0.1)}
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full ${
                  isPrimary 
                    ? "bg-gradient-to-br from-primary/5 via-primary/10 to-primary/5" 
                    : "bg-gradient-to-br from-secondary/5 via-secondary/10 to-secondary/5"
                }`}>
                  <div className="absolute top-0 right-0 w-48 h-48 opacity-5 transform translate-x-12 -translate-y-12">
                    <Icon className={`w-full h-full ${isPrimary ? "text-primary" : "text-secondary"}`} />
                  </div>

                  <div className="p-5 sm:p-6 md:p-8 relative z-10">
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className={`w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-2xl flex items-center justify-center shadow-lg transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl flex-shrink-0 ${
                        isPrimary ? "bg-gradient-primary" : "bg-gradient-secondary"
                      }`}>
                        <Icon className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-white" />
                      </div>
                      
                      <div className="text-right min-w-0 flex-1">
                        <div className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-none ${
                          isPrimary ? "text-gradient" : "text-gradient-secondary"
                        }`}>
                          {advantage.metric}
                        </div>
                        {advantage.unit && (
                          <div className="text-xs sm:text-sm font-medium text-muted-foreground uppercase tracking-wide mt-1">
                            {advantage.unit}
                          </div>
                        )}
                      </div>
                    </div>

                    <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${
                      isPrimary ? "group-hover:text-primary" : "group-hover:text-secondary"
                    }`}>
                      {advantage.title}
                    </h3>
                    
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                      {advantage.description}
                    </p>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
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
