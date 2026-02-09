import { Card } from "@/components/ui/card";
import { AlertCircle, DollarSign, Clock, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer } from "@/lib/motion";

const problems = [
  {
    icon: DollarSign,
    title: "Expensive Fine-Tuning",
    description: "Traditional model adaptation requires costly compute resources and full retraining cycles that can cost thousands of dollars.",
    image: "/expensive_money_tech_cae74b9a.jpg",
    color: "primary",
  },
  {
    icon: Clock,
    title: "Slow to Adapt",
    description: "Current methods can't update in real-time, making personalization impractical at scale for enterprise applications.",
    image: "/slow_clock_time_wait_12986dff.jpg",
    color: "secondary",
  },
  {
    icon: AlertCircle,
    title: "Catastrophic Forgetting",
    description: "Backpropagation-based approaches struggle with continuous learning without losing previously learned knowledge.",
    image: "/broken_memory_data_l_46a96241.jpg",
    color: "primary",
  },
  {
    icon: Zap,
    title: "Complex RAG Systems",
    description: "External retrieval augmentation adds infrastructure complexity and latency without enabling true model learning.",
    image: "/complex_infrastructu_67a3236a.jpg",
    color: "secondary",
  },
];

export const Problem = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeIn()}
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />
      <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-black/5 to-transparent" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6"
          variants={fadeInUp(0.1)}
        >
          <div className="section-badge mx-auto text-xs sm:text-sm">
            <AlertCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-primary" />
            <span className="text-primary">The Challenge</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground px-2">
            Why Current AI{" "}
            <span className="text-gradient">Falls Short</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Modern LLMs lack the ability to learn continuously and adapt in real-time 
            — a fundamental limitation that hinders personalization and enterprise adoption.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={staggerContainer(0.1, 0.1)}
        >
          {problems.map((problem, index) => {
            const Icon = problem.icon;
            const isOdd = index % 2 === 1;
            
            return (
              <motion.div
                key={index}
                variants={fadeInUp(index * 0.1)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full ${
                  isOdd ? "bg-gradient-to-br from-secondary/5 to-secondary/10" : "bg-gradient-to-br from-primary/5 to-primary/10"
                }`}>
                  <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
                    <Icon className={`w-full h-full ${isOdd ? "text-secondary" : "text-primary"}`} />
                  </div>

                  <div className="p-5 sm:p-6 md:p-8 relative z-10">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5">
                      <div className="relative flex-shrink-0 w-full sm:w-auto">
                        <div className={`w-full sm:w-20 sm:h-20 md:w-24 md:h-24 aspect-square rounded-2xl overflow-hidden border-4 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl ${
                          isOdd ? "border-secondary/30" : "border-primary/30"
                        }`}>
                          <img
                            src={problem.image}
                            alt={problem.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className={`absolute -bottom-2 -right-2 w-8 h-8 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                          isOdd ? "bg-gradient-secondary" : "bg-gradient-primary"
                        }`}>
                          <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                        </div>
                      </div>

                      <div className="flex-1 min-w-0 w-full sm:w-auto">
                        <h3 className={`text-lg sm:text-xl md:text-2xl font-bold mb-2 sm:mb-3 transition-colors duration-300 ${
                          isOdd ? "group-hover:text-secondary" : "group-hover:text-primary"
                        }`}>
                          {problem.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {problem.description}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                    isOdd ? "bg-gradient-secondary" : "bg-gradient-primary"
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
