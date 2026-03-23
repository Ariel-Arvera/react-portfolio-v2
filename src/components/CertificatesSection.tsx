import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Award, ExternalLink } from "lucide-react";

const certificates = [
  {
    title: "User Experience Design Fundamentals",
    issuer: "IBM SkillsBuild",
    level: "Intermediate",
    duration: "6 weeks",
    date: "May 11, 2025",
    link: "https://www.credly.com/badges/cc780be5-82b0-4d83-91fe-45b6d9637d0c",
  },
  {
    title: "Web Development Fundamentals",
    issuer: "IBM SkillsBuild",
    level: "Beginner",
    duration: "8 weeks",
    date: "September 22, 2024",
    link: "https://www.credly.com/badges/23eb0a59-f61e-447c-8d34-1aedd7a8df2f",
  },
];

const CertificatesSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="certificates" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          My Certificates
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="glass-card p-6 hover:box-glow transition-all duration-500 group"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <span className={`text-xs px-2 py-0.5 rounded-full ${cert.level === "Intermediate" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {cert.level}
                </span>
              </div>
              <h3 className="text-lg font-bold text-foreground mb-1">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>{cert.duration}</span>
                <span>{cert.date}</span>
              </div>
              <a
                href={cert.link}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
              >
                View <ExternalLink className="w-3 h-3" />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
