import { Navbar } from "@/components/Navbar";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Linkedin, Mail, Users, ArrowRight, Sparkles } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn, fadeInUp, staggerContainer } from "@/lib/motion";
import { Link } from "react-router-dom";

const teamMembers = [
  {
    name: "Rafayel",
    role: "Founder & CEO",
    image: "/CEO Pic.jpeg",
    bio: "AI researcher with a focus on continuous learning architectures. Leading the development of memory-augmented transformers.",
    linkedin: "https://www.linkedin.com/in/rafayel-latif-490aa724a/",
    email: "rafayel.latif@gmail.com",
    color: "primary",
  },
  {
    name: "Alfred",
    role: "Business Development",
    initials: "A",
    bio: "Focused on investor relations, funding strategy, and strategic partnerships to accelerate Astarus's growth.",
    linkedin: "https://www.linkedin.com/in/alfred-mulinge-7586582a9/",
    email: "binfred.ke@gmail.com",
    color: "secondary",
  },
];

export default function Team() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <motion.section
        className="relative pt-24 sm:pt-28 pb-12 sm:pb-16 px-3 sm:px-4 overflow-hidden safe-area-px"
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn()}
      >
        <div className="absolute inset-0">
          <img 
            src="/professional_team_me_6f748015.jpg" 
            alt="Team Background" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/85" />
        </div>
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl" />

        <div className="container relative z-10 max-w-4xl mx-auto text-center">
          <motion.div variants={fadeInUp(0.1)} className="space-y-6">
            <div className="inline-flex items-center gap-2 text-primary font-semibold text-xs uppercase tracking-wider mx-auto">
              <Users className="w-4 h-4" />
              <span>Our Team</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight">
              <span className="text-foreground">Meet the </span>
              <span className="text-primary">Pioneers</span>
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
              A passionate group of AI researchers and engineers pushing 
              the boundaries of machine learning.
            </p>
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-12 sm:py-20 px-3 sm:px-4 safe-area-px"
        initial="hidden"
        animate="visible"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        variants={fadeIn()}
      >
        <div className="container">
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto"
            variants={staggerContainer(0.15, 0.1)}
          >
            {teamMembers.map((member, index) => {
              const isPrimary = member.color === "primary";
              return (
                <motion.div
                  key={index}
                  variants={fadeInUp(index * 0.1)}
                  whileHover={{ y: -8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Card className="p-5 sm:p-8 border border-border shadow-soft hover:shadow-elegant transition-all duration-500 h-full group bg-card">
                    <div className="text-center space-y-5">
                      <div className="relative inline-block">
                        {member.image ? (
                          <div className={`w-32 h-32 rounded-2xl overflow-hidden mx-auto border-4 shadow-xl group-hover:scale-105 transition-transform duration-300 ${
                            isPrimary ? "border-primary/30" : "border-secondary/30"
                          }`}>
                            <img
                              src={member.image}
                              alt={member.name}
                              className="w-full h-full object-cover"
                            />
                          </div>
                        ) : (
                          <div className={`w-32 h-32 rounded-2xl mx-auto flex items-center justify-center text-4xl font-bold text-white shadow-xl group-hover:scale-105 transition-transform duration-300 ${
                            "bg-primary"
                          }`}>
                            {member.initials}
                          </div>
                        )}
                        <div className={`absolute -bottom-2 -right-2 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                          "bg-primary"
                        }`}>
                          <Sparkles className="w-5 h-5 text-white" />
                        </div>
                      </div>

                      <div>
                        <h3 className="text-2xl font-bold text-foreground">{member.name}</h3>
                        <p className={`font-semibold ${isPrimary ? "text-primary" : "text-secondary"}`}>
                          {member.role}
                        </p>
                      </div>

                      <p className="text-muted-foreground leading-relaxed">
                        {member.bio}
                      </p>

                      <div className="flex justify-center gap-3 pt-2">
                        <a
                          href={member.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`w-10 h-10 min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-all duration-300 touch-manipulation ${
                            isPrimary 
                              ? "bg-primary/10 text-primary hover:bg-primary hover:text-white" 
                              : "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white"
                          }`}
                        >
                          <Linkedin className="w-5 h-5" />
                        </a>
                        <a
                          href={`mailto:${member.email}`}
                          className={`w-10 h-10 min-h-[44px] min-w-[44px] rounded-xl flex items-center justify-center transition-all duration-300 touch-manipulation ${
                            isPrimary 
                              ? "bg-primary/10 text-primary hover:bg-primary hover:text-white" 
                              : "bg-secondary/10 text-secondary hover:bg-secondary hover:text-white"
                          }`}
                        >
                          <Mail className="w-5 h-5" />
                        </a>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </motion.section>

      <motion.section
        className="py-20 px-4 bg-gradient-dark"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeIn()}
      >
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            variants={fadeInUp(0.1)}
          >
            <div className="w-20 h-20 rounded-2xl bg-primary mx-auto mb-8 flex items-center justify-center shadow-lg glow-primary">
              <Users className="w-10 h-10 text-white" />
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-foreground mb-6">
              Join Our Team
            </h2>
            
            <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
              We're always looking for talented individuals who are passionate 
              about pushing the boundaries of AI research and development.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact">
                <Button className="rounded-xl bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-soft hover:shadow-glow hover:-translate-y-0.5 transition-all duration-300 group">
                  <span>View Open Positions</span>
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/technology">
                <Button variant="outline" className="rounded-xl border-2 border-border bg-background hover:bg-muted/60">
                  Learn About Our Tech
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}
