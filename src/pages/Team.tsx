import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";

const teamMembers = [
  {
    name: "Rafayel Latif",
    role: "Founder & CEO",
    image: "/CEO Pic.jpeg",
    bio: "AI researcher with a focus on continuous learning architectures. Leading the development of memory-augmented transformers.",
    linkedin: "https://www.linkedin.com/in/rafayel-latif-490aa724a/",
    email: "rafayel.latif@gmail.com",
  },
  {
    name: "Alfred Mulinge",
    role: "Business Development",
    image: "/team-member.jpeg",
    bio: "Focused on investor relations, funding strategy, and strategic partnerships to accelerate Astarus's growth.",
    linkedin: "https://www.linkedin.com/in/alfred-mulinge-7586582a9/",
    email: "binfred.ke@gmail.com",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-background bg-dots-subtle">
      <Navbar />

      {/* Hero — clear image, light overlay */}
      <motion.section
        className="relative pt-24 sm:pt-28 pb-16 sm:pb-24 px-3 sm:px-4 overflow-hidden safe-area-px min-h-[50vh] flex flex-col justify-center"
        initial="hidden"
        animate="visible"
        variants={fadeIn()}
      >
        <div className="absolute inset-0">
          <img
            src="/professional_team_me_6f748015.jpg"
            alt="Team"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/35 to-black/60" />
        </div>

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp(0.1)} className="space-y-6">
            <p className="font-accent text-primary font-semibold text-xs uppercase tracking-wider">
              Our Team
            </p>
            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white drop-shadow-lg">
              Meet the <span className="text-primary-foreground">Pioneers</span>
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto font-accent">
              A passionate group of AI researchers and engineers pushing the boundaries of machine learning.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* Team cards — stacked on all screens for consistent look */}
      <motion.section
        className="py-16 sm:py-24 px-3 sm:px-4 safe-area-px relative"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn()}
      >
        <div className="container max-w-3xl mx-auto">
          <div className="space-y-8 md:space-y-10">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                variants={fadeInUp(index * 0.1)}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
              >
                <Card className="overflow-hidden border border-border bg-card shadow-soft hover:shadow-elegant transition-all duration-300 group">
                  <div className="flex flex-col md:flex-row md:min-h-0">
                    {/* Photo — full width on mobile, fixed width on desktop */}
                    <div className="relative w-full md:w-64 md:flex-shrink-0 md:self-stretch overflow-hidden bg-muted/20">
                      {member.image ? (
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full min-h-[240px] md:min-h-0 md:h-full object-cover object-center group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="absolute inset-0 min-h-[240px] md:min-h-full bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                          <span className="font-display text-6xl font-bold text-primary/60">
                            {member.initials}
                          </span>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 p-6 sm:p-8 flex flex-col justify-center">
                      <h3 className="font-display text-2xl font-bold text-foreground">{member.name}</h3>
                      <p className="font-accent font-semibold text-primary mb-3">{member.role}</p>
                      <p className="text-muted-foreground font-accent text-sm sm:text-base leading-relaxed mb-5">
                        {member.bio}
                      </p>
                      <div className="flex flex-wrap gap-3">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center font-accent text-sm font-medium text-primary hover:underline"
                        >
                          LinkedIn
                        </a>
                        <span className="text-border">|</span>
                        <a
                          href={`mailto:${member.email}`}
                          className="inline-flex items-center font-accent text-sm font-medium text-primary hover:underline"
                        >
                          Email
                        </a>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

    </div>
  );
}
