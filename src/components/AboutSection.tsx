import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Brain, Smartphone, Cloud, Database, Plug, FolderKanban, Users, Rocket } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const highlightsByLanguage = {
  es: [
    { icon: Code, label: "Desarrollo Full Stack" },
    { icon: Brain, label: "Aprendizaje continuo" },
    { icon: Smartphone, label: "Diseño responsive" },
    { icon: Cloud, label: "Integración cloud" },
    { icon: Database, label: "Gestión de bases de datos" },
    { icon: Plug, label: "Integración de APIs" },
    { icon: FolderKanban, label: "Arquitectura de proyectos" },
    { icon: Users, label: "Trabajo en equipo" },
    { icon: Rocket, label: "Soluciones escalables" },
  ],
  en: [
    { icon: Code, label: "Full Stack Development" },
    { icon: Brain, label: "Continuous learning" },
    { icon: Smartphone, label: "Responsive design" },
    { icon: Cloud, label: "Cloud integration" },
    { icon: Database, label: "Database management" },
    { icon: Plug, label: "API integration" },
    { icon: FolderKanban, label: "Project architecture" },
    { icon: Users, label: "Team collaboration" },
    { icon: Rocket, label: "Scalable solutions" },
  ],
} as const;

const AboutSection = () => {
  const { language } = useLanguage();
  const { aboutText, personalInfo } = getCvData(language);
  const highlights = highlightsByLanguage[language];
  const { ref, isVisible } = useScrollAnimation();

  const goToTop = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="md:w-1/3 flex justify-center">
            <motion.div
              className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-primary/30 box-glow"
              whileHover={{ scale: 1.04, rotate: -1.5 }}
              transition={{ type: "spring", stiffness: 220, damping: 16 }}
            >
              <img
                src={personalInfo.profileImage}
                alt={personalInfo.name}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">{language === "es" ? "Sobre Mí" : "About Me"}</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              {aboutText}
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {highlights.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="flex items-center gap-2 glass-card px-3 py-2 text-sm hover:border-primary/40 transition-all"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground/80">{label}</span>
                </motion.div>
              ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={goToTop}
                className="glass-card px-5 py-2.5 text-sm font-medium text-foreground hover:text-primary hover:border-primary/40 hover:box-glow transition-all"
              >
                {language === "es" ? "Volver al inicio" : "Back to top"}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
