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

export const Problem = () => {
  return (
    <motion.section
      className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#0a0812] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.08 }}
      variants={fadeIn()}
    >
      <div className="absolute inset-0 bg-mesh-gradient opacity-25" />
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-primary/5 to-transparent pointer-events-none" />

      <div className="container relative z-10">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-12 sm:mb-16 space-y-4 sm:space-y-5"
          variants={fadeInUp(0.1)}
        >
          <div className="section-badge mx-auto text-xs sm:text-sm">
            <span className="text-primary">The Challenge</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white px-2">
            Why Current AI{" "}
            <span className="text-gradient">Falls Short</span>
          </h2>
          <p className="text-base sm:text-lg text-white/70 max-w-2xl mx-auto px-4">
            Modern LLMs lack the ability to learn continuously and adapt in real-time — a fundamental limitation that hinders personalization and enterprise adoption.
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto"
          variants={staggerContainer(0.08, 0.05)}
        >
          {problems.map((problem, index) => {
            const isOdd = index % 2 === 1;
            return (
              <motion.div
                key={index}
                variants={fadeInUp(0.1)}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="h-full"
              >
                <Card className="group relative overflow-hidden border-0 h-full rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-primary/30 transition-all duration-500">
                  <div className="relative h-40 sm:h-48 md:h-52 overflow-hidden">
                    <img
                      src={problem.image}
                      alt={problem.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isOdd ? "from-secondary/90 to-transparent" : "from-primary/90 to-transparent"
                    }`} />
                    <h3 className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 font-display text-lg sm:text-xl md:text-2xl font-bold text-white">
                      {problem.title}
                    </h3>
                  </div>
                  <div className="p-4 sm:p-5 md:p-6">
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                      {problem.description}
                    </p>
                  </div>
                  <div className={`absolute bottom-0 left-0 right-0 h-0.5 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left ${
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
