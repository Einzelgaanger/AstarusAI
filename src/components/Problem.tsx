import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeInUp, fadeIn, staggerContainer } from "@/lib/motion";

const problems = [
  {
    title: "Expensive Fine-Tuning",
    description: "Traditional model adaptation requires costly compute resources and full retraining cycles that can cost thousands of dollars.",
    image: "/expensive_money_tech_cae74b9a.jpg",
    color: "primary",
  },
  {
    title: "Slow to Adapt",
    description: "Current methods can't update in real-time, making personalization impractical at scale for enterprise applications.",
    image: "/slow_clock_time_wait_12986dff.jpg",
    color: "secondary",
  },
  {
    title: "Catastrophic Forgetting",
    description: "Backpropagation-based approaches struggle with continuous learning without losing previously learned knowledge.",
    image: "/broken_memory_data_l_46a96241.jpg",
    color: "primary",
  },
  {
    title: "Complex RAG Systems",
    description: "External retrieval augmentation adds infrastructure complexity and latency without enabling true model learning.",
    image: "/complex_infrastructu_67a3236a.jpg",
    color: "secondary",
  },
];

const cardLayouts = [
  "image-top",      // 0: classic full-bleed image + title overlay, body below
  "split-left",    // 1: image left 45%, text right
  "image-top",     // 2: same as 0 with diagonal accent
  "number-hero",   // 3: large number + small image strip
];

export const Problem = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-white overflow-hidden rounded-t-[4rem] -mt-16 z-10 bg-grid-subtle"
      initial="hidden"
      animate="visible"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeIn()}
    >
      {/* Soft shape */}
      <div className="absolute top-0 right-0 w-[400px] h-[400px] rounded-full bg-primary/[0.04] blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-64 h-64 rounded-full bg-secondary/5 blur-3xl pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5"
          variants={fadeInUp(0.1)}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-black text-white text-[10px] sm:text-xs font-semibold tracking-wider uppercase mx-auto font-accent">
            <span className="text-primary">The Challenge</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground px-2">
            Why Current AI{" "}
            <span className="text-primary">Falls Short</span>
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4 font-sans">
            Modern LLMs lack the ability to learn continuously and adapt in real-time — a fundamental limitation that hinders personalization and enterprise adoption.
          </p>
        </motion.div>

        <motion.div
          className="flex md:grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto overflow-x-auto md:overflow-visible snap-x snap-mandatory pb-2 -mx-4 px-4 md:mx-auto md:px-0"
          variants={staggerContainer(0.08, 0.05)}
        >
          {problems.map((problem, index) => {
            const layout = cardLayouts[index];

            if (layout === "split-left") {
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(0.1)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-[280px] max-w-[360px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
                >
                  <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 shadow-sm flex flex-col sm:flex-row min-h-[280px]">
                    <div className="relative w-full sm:w-[45%] min-h-[160px] sm:min-h-full overflow-hidden">
                      <img src={problem.image} alt={problem.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/40" />
                    </div>
                    <div className="flex-1 p-4 sm:p-5 md:p-6 flex flex-col justify-center">
                      <h3 className="font-display text-lg sm:text-xl font-bold text-foreground mb-2">{problem.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-sans">{problem.description}</p>
                      <div className="mt-3 w-12 h-0.5 bg-primary rounded-full opacity-80" />
                    </div>
                  </Card>
                </motion.div>
              );
            }

            if (layout === "number-hero") {
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(0.1)}
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3 }}
                  className="h-full min-w-[280px] max-w-[360px] snap-start flex-shrink-0 md:min-w-0 md:max-w-none"
                >
                  <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 shadow-sm">
                    <div className="p-5 sm:p-6 md:p-7">
                      <span className="font-display text-6xl sm:text-7xl font-bold text-primary/20 leading-none block mb-3">0{index + 1}</span>
                      <h3 className="font-display text-xl sm:text-2xl font-bold text-foreground mb-3">{problem.title}</h3>
                      <p className="text-sm text-muted-foreground leading-relaxed font-sans mb-4">{problem.description}</p>
                    </div>
                    <div className="relative h-28 overflow-hidden rounded-b-2xl">
                      <img src={problem.image} alt="" className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:opacity-90 transition-opacity" />
                      <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
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
                <Card className={`group relative overflow-hidden border-0 h-full rounded-2xl bg-card border border-border hover:border-primary/30 transition-all duration-500 shadow-sm ${index === 2 ? "rounded-br-[3rem]" : ""}`}>
                  <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                    <img src={problem.image} alt={problem.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-black/55" />
                    {index === 2 && <div className="absolute bottom-0 right-0 w-32 h-32 bg-primary/30 rounded-tl-full" />}
                    <h3 className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 font-display text-lg sm:text-xl md:text-2xl font-bold text-white drop-shadow-md">
                      {problem.title}
                    </h3>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans">
                      {problem.description}
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
