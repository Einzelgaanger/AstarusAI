import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const useCases = [
  {
    title: "Personalized AI Assistants",
    description: "Consumer models that remember user preferences, tone, and past decisions — creating truly personalized experiences without privacy concerns.",
    examples: ["Custom GPTs", "Personal productivity tools", "Content creators"],
    image: "/brain_artificial_int_76a4f2c5.jpg",
    color: "primary",
  },
  {
    title: "Enterprise Adoption",
    description: "Companies can inject firm-specific knowledge, style guides, and domain expertise directly into model behavior.",
    examples: ["Legal firms", "Financial analysts", "Medical professionals"],
    image: "/digital_transformati_bcf974ad.jpg",
    color: "secondary",
  },
  {
    title: "Adaptive Learning Systems",
    description: "Educational AI that continuously adapts to individual student learning patterns and knowledge gaps.",
    examples: ["AI tutors", "Training platforms", "Skill development"],
    image: "/digital_transformati_88f18833.jpg",
    color: "primary",
  },
  {
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
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-gradient-to-b from-[#0a0812] to-[#0d0b14] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeIn()}
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-25" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5"
          variants={fadeInUp(0.1)}
        >
          <div className="section-badge mx-auto text-xs sm:text-sm">
            <span className="text-secondary">Real-World Impact</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white px-2">
            Transformative{" "}
            <span className="text-gradient-secondary">Applications</span>
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/70 max-w-2xl mx-auto px-4">
            Enable use cases that were previously impossible or economically unfeasible with traditional approaches.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={staggerContainer(0.08, 0.05)}
        >
          {useCases.map((useCase, index) => {
            const isPrimary = useCase.color === "primary";
            return (
              <motion.div
                key={index}
                variants={fadeInUp(0.1)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/20 transition-all duration-500">
                  <div className="relative h-44 sm:h-52 overflow-hidden">
                    <img
                      src={useCase.image}
                      alt={useCase.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isPrimary ? "from-primary/90 to-transparent" : "from-secondary/90 to-transparent"
                    }`} />
                    <h3 className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 font-display text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {useCase.title}
                    </h3>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 relative z-10">
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed mb-4 sm:mb-5">
                      {useCase.description}
                    </p>
                    <div className="space-y-2 sm:space-y-3">
                      <p className={`text-xs font-semibold uppercase tracking-wider ${isPrimary ? "text-primary" : "text-secondary"}`}>
                        Key Applications
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((ex, idx) => (
                          <span
                            key={idx}
                            className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors ${
                              isPrimary
                                ? "bg-primary/10 border-primary/30 text-primary hover:bg-primary/20"
                                : "bg-secondary/10 border-secondary/30 text-secondary hover:bg-secondary/20"
                            }`}
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
                    isPrimary ? "bg-gradient-primary" : "bg-gradient-secondary"
                  }`} />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div className="text-center mt-12 sm:mt-16 px-4" variants={fadeInUp(0.15)}>
          <Link to="/investors" className="block w-full sm:w-auto sm:inline-block">
            <Button className="cta-button w-full sm:w-auto min-h-[48px] touch-manipulation text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5 font-semibold">
              Explore Investment Opportunities
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
