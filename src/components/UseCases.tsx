import { Card } from "@/components/ui/card";
import { Users, Building2, GraduationCap, Briefcase, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    icon: Users,
    title: "Personalized AI Assistants",
    description: "Consumer models that remember user preferences, tone, and past decisions — creating truly personalized experiences without privacy concerns.",
    examples: ["Custom GPTs", "Personal productivity tools", "Content creators"],
    image: "/brain_artificial_int_76a4f2c5.jpg",
    color: "primary",
  },
  {
    icon: Building2,
    title: "Enterprise Adoption",
    description: "Companies can inject firm-specific knowledge, style guides, and domain expertise directly into model behavior.",
    examples: ["Legal firms", "Financial analysts", "Medical professionals"],
    image: "/digital_transformati_bcf974ad.jpg",
    color: "secondary",
  },
  {
    icon: GraduationCap,
    title: "Adaptive Learning Systems",
    description: "Educational AI that continuously adapts to individual student learning patterns and knowledge gaps.",
    examples: ["AI tutors", "Training platforms", "Skill development"],
    image: "/digital_transformati_88f18833.jpg",
    color: "primary",
  },
  {
    icon: Briefcase,
    title: "Operational Intelligence",
    description: "Models that improve at routine business tasks through accumulated corrections and organizational knowledge.",
    examples: ["Email automation", "Code generation", "Document summarization"],
    image: "/futuristic_ai_techno_65818c05.jpg",
    color: "secondary",
  },
];

export const UseCases = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-muted/30 to-white overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={fadeIn()}
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-30" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-6"
          variants={fadeInUp(0.1)}
        >
          <div className="section-badge mx-auto text-xs sm:text-sm">
            <Briefcase className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-secondary" />
            <span className="text-secondary">Real-World Impact</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground px-2">
            Transformative{" "}
            <span className="text-gradient-secondary">Applications</span>
          </h2>
          
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4">
            Enable use cases that were previously impossible or economically unfeasible 
            with traditional approaches.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={staggerContainer(0.1, 0.1)}
        >
          {useCases.map((useCase, index) => {
            const Icon = useCase.icon;
            const isPrimary = useCase.color === "primary";
            
            return (
              <motion.div
                key={index}
                variants={fadeInUp(index * 0.1)}
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
              >
                <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-500 h-full bg-white">
                  <div className="absolute inset-0 opacity-5">
                    <img 
                      src={useCase.image} 
                      alt={useCase.title}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-5 sm:p-6 md:p-8 relative z-10">
                    <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-5 mb-4 sm:mb-5">
                      <div className="relative flex-shrink-0 w-full sm:w-auto">
                        <div className={`w-full sm:w-16 sm:h-16 aspect-square rounded-2xl overflow-hidden border-4 shadow-xl transition-all duration-300 group-hover:scale-105 group-hover:shadow-2xl ${
                          isPrimary ? "border-primary/30" : "border-secondary/30"
                        }`}>
                          <img
                            src={useCase.image}
                            alt={useCase.title}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className={`absolute -bottom-2 -right-2 w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 ${
                          isPrimary ? "bg-gradient-primary" : "bg-gradient-secondary"
                        }`}>
                          <Icon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" />
                        </div>
                      </div>
                      
                      <h3 className={`text-lg sm:text-xl md:text-2xl font-bold flex-1 pt-0 sm:pt-2 transition-colors duration-300 w-full sm:w-auto ${
                        isPrimary ? "group-hover:text-primary" : "group-hover:text-secondary"
                      }`}>
                        {useCase.title}
                      </h3>
                    </div>

                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 sm:mb-6">
                      {useCase.description}
                    </p>

                    <div className="space-y-2 sm:space-y-3">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${
                        isPrimary ? "text-primary" : "text-secondary"
                      }`}>
                        Key Applications
                      </p>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {useCase.examples.map((example, idx) => (
                          <motion.span
                            key={idx}
                            className={`px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-all duration-200 ${
                              isPrimary
                                ? "bg-primary/5 border-primary/20 text-primary hover:bg-primary/10"
                                : "bg-secondary/5 border-secondary/20 text-secondary hover:bg-secondary/10"
                            }`}
                            whileHover={{ scale: 1.05 }}
                          >
                            {example}
                          </motion.span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className={`absolute bottom-0 left-0 right-0 h-1 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                    isPrimary ? "bg-gradient-primary" : "bg-gradient-secondary"
                  }`} />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12 sm:mt-16 px-4"
          variants={fadeInUp(0.4)}
        >
          <Link to="/investors" className="block w-full sm:w-auto sm:inline-block">
            <Button className="cta-button group w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5">
              <span>Explore Investment Opportunities</span>
              <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
