import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
const valueProps = [
  { title: "Huge Market", description: "$1.3T AI market by 2032, with personalization as a key driver", image: "/futuristic_ai_techno_65818c05.jpg" },
  { title: "First Mover", description: "Novel architecture with proven results and defensible IP", image: "/brain_artificial_int_76a4f2c5.jpg" },
  { title: "Clear Path", description: "B2B and B2C opportunities across multiple verticals", image: "/digital_transformati_88f18833.jpg" },
  { title: "Strong Team", description: "Experienced AI researchers with deep technical expertise", image: "/professional_team_me_6f748015.jpg" },
];

const roadmapItems = [
  { phase: "Current", title: "Working Prototype", description: "Proven benchmarks across model sizes (1.6M - 78M parameters)", status: "done" },
  { phase: "6 Months", title: "Enterprise Pilots", description: "API development and partnership discussions with major providers", status: "next" },
  { phase: "12 Months", title: "Commercial Launch", description: "Initial revenue, IP filings, and Series A preparation", status: "future" },
];

const marketSegments = [
  { title: "Enterprise (B2B)", items: ["Legal firms", "Financial services", "Healthcare", "Consulting"] },
  { title: "Consumer (B2C)", items: ["Personal AI assistants", "Content creators", "Developers", "Students"] },
];

const stats = [
  { value: "75%", label: "Perplexity reduction" },
  { value: "<20s", label: "Update time" },
  { value: "<1%", label: "Cost vs fine-tuning" },
];

export default function Investors() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <motion.section
        className="relative pt-24 sm:pt-28 md:pt-28 lg:pt-32 pb-16 sm:pb-20 md:pb-24 lg:pb-28 px-4 sm:px-6 md:px-8 lg:px-10 overflow-hidden safe-area-px min-h-[50vh] flex flex-col justify-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <div className="absolute inset-0">
          <img
            src="/business_investment__8f5b8246.jpg"
            alt="Investment"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
        </div>

        <div className="container relative z-10 max-w-4xl lg:max-w-5xl xl:max-w-[64rem] mx-auto text-center">
          <motion.div variants={fadeInUp(0.1)} className="space-y-5 sm:space-y-6 lg:space-y-8">
            <p className="font-accent text-primary font-semibold text-xs uppercase tracking-wider">
              Investment Opportunity
            </p>
            <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-white drop-shadow-lg">
              Join the <span className="text-primary-foreground">AI Revolution</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-accent">
              Partner with us to build the next generation of continuously learning AI systems that adapt in real-time.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-10 bg-white safe-area-px overflow-hidden bg-grid-subtle"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn()}
      >
        <div className="container relative z-10 max-w-5xl lg:max-w-6xl xl:max-w-[72rem] mx-auto">
          <motion.div
            className="max-w-3xl lg:max-w-[42rem] mx-auto text-center mb-8 sm:mb-10 lg:mb-12"
            variants={staggerContainer(0.06, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p className="font-accent text-primary font-semibold text-xs uppercase tracking-wider mb-2" variants={fadeInUp(0)}>Why Astarus</motion.p>
            <motion.h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground" variants={fadeInUp(0)}>Key Value Propositions</motion.h2>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 xl:gap-8"
            variants={staggerContainer(0.06, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.08 }}
          >
            {valueProps.map((prop, index) => (
              <motion.div
                key={index}
                variants={fadeInUp(0.08)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="group"
              >
                <Card className="overflow-hidden h-full border border-border bg-card shadow-sm hover:shadow-md hover:border-primary/15 transition-all duration-300 p-0 rounded-xl">
                  <div className="aspect-[3/2] overflow-hidden">
                    <img
                      src={prop.image}
                      alt=""
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-display text-base font-bold text-foreground mb-1">{prop.title}</h3>
                    <p className="text-muted-foreground font-accent text-xs leading-relaxed">{prop.description}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-10 bg-gradient-dark safe-area-px overflow-hidden bg-pattern-cta"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn()}
      >
        <div className="absolute top-0 right-0 w-1/2 h-full max-w-md pointer-events-none opacity-40">
          <img src="/brain_artificial_int_e9d43400.jpg" alt="" className="w-full h-full object-cover object-left" />
        </div>
        <div className="container max-w-3xl lg:max-w-4xl xl:max-w-[56rem] mx-auto relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            variants={staggerContainer(0.06, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground" variants={fadeInUp(0)}>
              Why Invest in <span className="text-primary">Astarus</span>?
            </motion.h2>
          </motion.div>

          <motion.div className="space-y-4" variants={staggerContainer(0.06, 0.05)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
            <motion.div variants={fadeInUp(0.08)}>
              <Card className="p-4 sm:p-5 bg-card/95 border border-border shadow-sm rounded-xl">
                <h3 className="font-display text-base font-bold text-primary mb-2">The Problem We Solve</h3>
                <p className="text-muted-foreground font-accent text-sm leading-relaxed">
                  Current AI models are static after training. They can't adapt to individual users or company-specific data without expensive retraining or complex external systems — limiting personalization and enterprise adoption.
                </p>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp(0.1)}>
              <Card className="p-4 sm:p-5 bg-card/95 border border-border shadow-sm rounded-xl">
                <h3 className="font-display text-base font-bold text-primary mb-3">Our Solution</h3>
                <p className="text-muted-foreground font-accent text-sm leading-relaxed mb-4">
                  Memory-augmented transformers that learn continuously in real-time, adapting in seconds instead of weeks.
                </p>
                <div className="flex flex-wrap gap-2">
                  {stats.map((stat, i) => (
                    <div key={i} className="inline-flex items-baseline gap-1.5 px-3 py-2 rounded-lg bg-primary/10 border border-primary/20">
                      <span className="font-display text-lg font-bold text-primary">{stat.value}</span>
                      <span className="text-xs text-muted-foreground font-accent">{stat.label}</span>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            <motion.div variants={fadeInUp(0.12)}>
              <Card className="p-4 sm:p-5 bg-card/95 border border-border shadow-sm rounded-xl">
                <h3 className="font-display text-base font-bold text-foreground mb-3">Market Opportunity</h3>
                <div className="grid sm:grid-cols-2 gap-3">
                  {marketSegments.map((segment, i) => (
                    <div key={i} className="p-3 rounded-lg bg-primary/5 border border-primary/10">
                      <h4 className="font-display font-bold text-sm mb-2 text-primary">{segment.title}</h4>
                      <ul className="space-y-0.5">
                        {segment.items.map((item, j) => (
                          <li key={j} className="font-accent text-muted-foreground text-xs">{item}</li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="relative py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 px-4 sm:px-6 md:px-8 lg:px-10 bg-muted/30 overflow-hidden bg-pattern-results"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn()}
      >
        <div className="container max-w-2xl lg:max-w-3xl xl:max-w-[48rem] mx-auto relative z-10">
          <motion.div
            className="text-center mb-8 sm:mb-10 lg:mb-12"
            variants={staggerContainer(0.06, 0.05)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.p className="font-accent text-primary font-semibold text-xs uppercase tracking-wider mb-2" variants={fadeInUp(0)}>Roadmap</motion.p>
            <motion.h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-foreground" variants={fadeInUp(0)}>
              Traction & <span className="text-primary">Timeline</span>
            </motion.h2>
          </motion.div>

          <motion.div className="space-y-3" variants={staggerContainer(0.06, 0.05)} initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.08 }}>
            {roadmapItems.map((item, index) => (
              <motion.div key={index} variants={fadeInUp(0.08)} className="relative">
                {index < roadmapItems.length - 1 && (
                  <div className="absolute left-5 sm:left-6 top-11 bottom-0 w-px bg-gradient-to-b from-primary/25 to-transparent hidden sm:block" />
                )}
                <Card className="p-4 sm:p-5 border border-border/80 shadow-sm hover:shadow-md hover:border-primary/15 transition-all duration-300 bg-card rounded-xl">
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="flex flex-col items-center flex-shrink-0">
                      <span className="text-[9px] font-semibold uppercase tracking-widest text-muted-foreground mb-0.5">Phase</span>
                      <span
                        className={`font-display text-xs font-bold w-8 h-8 rounded-full flex items-center justify-center ring-2 ${
                          item.status === "done"
                            ? "bg-success/15 ring-success/30 text-success"
                            : item.status === "next"
                              ? "bg-primary/10 ring-primary/25 text-primary"
                              : "bg-muted/50 ring-border text-muted-foreground"
                        }`}
                        aria-hidden
                      >
                        {index + 1}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0 pt-0.5">
                      <p className="font-display text-xs font-semibold uppercase tracking-wide text-muted-foreground mb-0.5">{item.phase}</p>
                      <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
                      <p className="text-muted-foreground font-accent text-xs sm:text-sm mt-1 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="relative py-12 sm:py-14 md:py-16 lg:py-20 px-4 sm:px-6 md:px-8 lg:px-10 bg-primary overflow-hidden"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn()}
      >
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.04)_1px,transparent_1px),linear-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none" aria-hidden />
        <div className="container relative z-10 max-w-5xl lg:max-w-6xl mx-auto">
          <motion.div className="max-w-xl lg:max-w-2xl mx-auto text-center" variants={fadeInUp(0.1)}>
            <h2 className="font-display text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground mb-3 lg:mb-4">
              Let's Build the Future Together
            </h2>
            <p className="text-sm sm:text-base text-primary-foreground/90 font-accent mb-6 max-w-md mx-auto">
              We're seeking strategic investors who share our vision for continuously learning AI systems.
            </p>
            <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 justify-center">
              <a href="mailto:rafayel.latif@gmail.com?subject=Request%20Investor%20Deck" className="inline-block">
                <motion.span
                  className="inline-flex items-center justify-center rounded-full bg-white text-primary font-semibold text-sm px-5 py-2.5 min-h-[42px] shadow-sm hover:shadow-md hover:bg-white/95 active:scale-[0.98] transition-all duration-200 border border-white/20"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Request Investor Deck
                </motion.span>
              </a>
              <a href="mailto:rafayel.latif@gmail.com?subject=Schedule%20a%20Call" className="inline-block">
                <motion.span
                  className="inline-flex items-center justify-center rounded-full border-2 border-white/70 text-white font-semibold text-sm px-5 py-2.5 min-h-[42px] hover:bg-white/10 active:scale-[0.98] transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Schedule a Call
                </motion.span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
