import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap, Award, Clock, Lightbulb, BookOpen, TrendingUp, ExternalLink } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const EducationSection = () => {
  const { language } = useLanguage();
  const { education, personalInfo } = getCvData(language);
  const { ref, isVisible } = useScrollAnimation();
  const educationData = education
    .filter((item) => item.degree)
    .map((item) => ({
      year: item.period,
      degree: item.degree ?? "",
      institution: item.institution,
      field: language === "es" ? "Software / Desarrollo" : "Software / Development",
      cgpa: item.details,
      fill: 82,
      tags:
        language === "es"
          ? ["Desarrollo Web", "Ingeniería de Software", "Aprendizaje continuo"]
          : ["Web Development", "Software Engineering", "Continuous learning"],
    }));

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
            ? "Básico"
            : "Beginner",
      duration: language === "es" ? "Curso completado" : "Course completed",
      date: item.period,
      tags: item.tags,
    }));

  const stats = [
    { icon: GraduationCap, value: educationData.length.toString(), label: language === "es" ? "Carreras" : "Degrees" },
    { icon: Clock, value: "10+", label: language === "es" ? "Años exp." : "Pro years" },
    { icon: Award, value: certificates.length.toString(), label: language === "es" ? "Certificados" : "Certificates" },
    { icon: Lightbulb, value: "40+", label: language === "es" ? "Habilidades" : "Skills" },
  ];

  return (
    <section id="education" className="section-padding bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-center max-w-3xl mx-auto mb-8"
        >
          <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground mb-3">
            {language === "es" ? "Mi CV" : "My CV"}
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 gradient-text">
            {language === "es" ? "Formación y Certificaciones" : "Education & Certifications"}
          </h2>
        </motion.div>

        <div className="space-y-12">
          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-foreground">{language === "es" ? "Formación" : "Education"}</h3>
              <span className="text-sm text-muted-foreground">{educationData.length} {language === "es" ? "programas" : "programs"}</span>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              {educationData.map((edu, i) => (
                <motion.div
                  key={edu.degree}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.12 }}
                  whileHover={{ y: -8 }}
                  className="glass-card p-6 hover:box-glow transition-all duration-500 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                    <span className="text-sm text-primary font-mono">{edu.year}</span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
                  <h4 className="text-sm text-muted-foreground mb-4">{edu.institution}</h4>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {edu.field}</span>
                    <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {edu.cgpa}</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {edu.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{tag}</span>
                    ))}
                  </div>
                  <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={isVisible ? { width: `${edu.fill}%` } : {}}
                      transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                      className="h-full bg-gradient-to-r from-primary to-glow-secondary rounded-full"
                    />
                  </div>
                  <p className="text-right text-xs text-muted-foreground mt-1">{edu.cgpa}</p>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-foreground">{language === "es" ? "Certificaciones" : "Certificates"}</h3>
              <span className="text-sm text-muted-foreground">{certificates.length} {language === "es" ? "logros" : "achievements"}</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {certificates.map((cert, i) => (
                <motion.div
                  key={`${cert.title}-${cert.date}`}
                  initial={{ opacity: 0, y: 10 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.05 }}
                  className="cert-ribbon"
                >
                  <div className="cert-ribbon__label">
                    <Award className="w-3 h-3" /> {language === "es" ? "Certificado" : "Certificate"}
                  </div>
                  <p className="cert-ribbon__title">{cert.title}</p>
                  <p className="cert-ribbon__meta">{cert.issuer}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-16">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass-card p-5 text-center group hover:box-glow transition-all"
            >
              <Icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
