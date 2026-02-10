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
      className="relative py-16 sm:py-20 md:py-24 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-10 bg-white overflow-hidden bg-grid-subtle"
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeIn()}
    >
      <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-primary/[0.05] blur-3xl pointer-events-none" />

      <div className="container relative z-10 max-w-5xl lg:max-w-6xl xl:max-w-[72rem] mx-auto">
        <motion.div
          className="max-w-3xl lg:max-w-4xl xl:max-w-[42rem] mx-auto text-center mb-10 sm:mb-14 lg:mb-16 xl:mb-20 space-y-3 sm:space-y-4 lg:space-y-5"
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          <motion.div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase mx-auto font-accent" variants={fadeInUp(0)}>
            <span className="text-primary">Real-World Impact</span>
          </motion.div>
          <motion.h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-bold text-foreground px-2" variants={fadeInUp(0)}>
            Transformative{" "}
            <span className="text-primary">Applications</span>
          </motion.h2>
          <motion.p className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto px-4 font-sans" variants={fadeInUp(0)}>
            Enable use cases that were previously impossible or economically unfeasible with traditional approaches.
          </motion.p>
        </motion.div>

        <motion.div
          className="flex md:grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 xl:gap-10 max-w-5xl lg:max-w-6xl xl:max-w-[72rem] mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-auto md:px-0"
          variants={staggerContainer(0.08, 0.05)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.08 }}
        >
          {useCases.map((useCase, index) => {
            if (index === 0) {
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(0.1)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-[280px] max-w-[360px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
                >
                  <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 shadow-sm flex flex-col md:flex-row">
                    <div className="flex-1 p-4 sm:p-5 md:p-6 min-w-0 order-2 md:order-1">
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-4">{useCase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((ex, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-primary/10 border-primary/30 text-primary font-accent">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative w-full md:w-44 md:min-h-[240px] h-44 md:h-auto flex-shrink-0 order-1 md:order-2 overflow-hidden">
                      <img src={useCase.image} alt={useCase.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40 md:bg-black/50" />
                    </div>
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
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-[280px] max-w-[360px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
                >
                  <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 shadow-sm flex flex-col">
                    <div className="flex-1 p-4 sm:p-5 md:p-6 min-w-0">
                      <h3 className="font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3">{useCase.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-4">{useCase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((ex, idx) => (
                          <span key={idx} className="px-3 py-1.5 rounded-full text-xs font-medium border bg-primary/10 border-primary/30 text-primary font-accent">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="relative h-28 overflow-hidden rounded-b-2xl flex-shrink-0">
                      <img src={useCase.image} alt={useCase.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50" />
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-primary" />
                  </Card>
                </motion.div>
              );
            }

            if (index === 2) {
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(0.1)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-[280px] max-w-[360px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
                >
                  <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 shadow-sm flex flex-col sm:flex-row">
                    <div className="relative w-full sm:w-36 sm:min-h-[220px] h-40 sm:h-auto flex-shrink-0 overflow-hidden">
                      <img src={useCase.image} alt={useCase.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/50" />
                      <h3 className="absolute bottom-0 left-0 right-0 p-3 font-display text-base sm:text-lg font-bold text-white drop-shadow-md">
                        {useCase.title}
                      </h3>
                    </div>
                    <div className="flex-1 p-4 sm:p-5 min-w-0">
                      <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-3">{useCase.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((ex, idx) => (
                          <span key={idx} className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted/80 text-foreground font-accent">
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-primary" />
                  </Card>
                </motion.div>
              );
            }

            return (
              <motion.div
                key={index}
                variants={fadeInUp(0.1)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full min-w-[280px] max-w-[360px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
              >
                <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/20 transition-all duration-500 shadow-sm">
                  <div className="relative h-44 sm:h-52 overflow-hidden">
                    <img src={useCase.image} alt={useCase.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/55" />
                    <h3 className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 font-display text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-md">
                      {useCase.title}
                    </h3>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6 relative z-10">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans mb-4 sm:mb-5">
                      {useCase.description}
                    </p>
                    <div className="space-y-2 sm:space-y-3">
                      <p className="text-xs font-semibold uppercase tracking-wider text-primary font-accent">
                        Key Applications
                      </p>
                      <div className="flex flex-wrap gap-2">
                        {useCase.examples.map((ex, idx) => (
                          <span
                            key={idx}
                            className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium border transition-colors bg-primary/10 border-primary/30 text-primary hover:bg-primary/20 font-accent"
                          >
                            {ex}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left bg-primary" />
                </Card>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          className="text-center mt-12 sm:mt-16 px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Link to="/investors" className="block w-full sm:w-auto sm:inline-block">
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-2xl bg-primary text-primary-foreground min-h-[48px] touch-manipulation text-sm sm:text-base px-6 sm:px-8 py-4 sm:py-5 font-semibold hover:bg-primary/90 transition-colors font-accent">
                Explore Investment Opportunities
              </Button>
            </motion.div>
          </Link>
        </motion.div>
      </div>
    </motion.section>
  );
};
