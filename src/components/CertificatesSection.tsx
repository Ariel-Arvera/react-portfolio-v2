import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Award, ExternalLink } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const CertificatesSection = () => {
  const { language } = useLanguage();
  const { education } = getCvData(language);
  const { ref, isVisible } = useScrollAnimation();
  const certificates = education
    .filter((item) => !item.degree)
    .map((item) => ({
      title: item.institution,
      issuer: item.details,
      level:
        item.tags?.includes("backend") || item.tags?.includes("ux/ui")
          ? language === "es"
            ? "Intermedio"
            : "Intermediate"
          : language === "es"
            ? "Basico"
            : "Beginner",
      duration: language === "es" ? "Curso completado" : "Course completed",
      date: item.period,
      link: "#",
    }));

  return (
    <section id="certificates" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          {language === "es" ? "Certificaciones" : "Certificates"}
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 max-w-7xl mx-auto">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="glass-card p-5 hover:box-glow transition-all duration-500 group"
            >
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-6 h-6 text-primary" />
                <span className={`text-xs px-2 py-0.5 rounded-full ${cert.level === "Intermediate" ? "bg-primary/20 text-primary" : "bg-secondary text-muted-foreground"}`}>
                  {cert.level}
                </span>
              </div>
              <h3 className="text-base font-bold text-foreground mb-1 line-clamp-2">{cert.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{cert.issuer}</p>
              <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                <span>{cert.duration}</span>
                <span>{cert.date}</span>
              </div>
              {cert.link !== "#" ? (
                <a
                  href={cert.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-sm text-primary hover:underline"
                >
                  {language === "es" ? "Ver" : "View"} <ExternalLink className="w-3 h-3" />
                </a>
              ) : null}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
