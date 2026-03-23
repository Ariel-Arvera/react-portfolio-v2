import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";
import {
  SiAngular,
  SiDocker,
  SiFigma,
  SiGit,
  SiJavascript,
  SiNodedotjs,
  SiPostgresql,
  SiReact,
  SiSharp,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import { FaJava, FaMicrosoft } from "react-icons/fa6";
import type { IconType } from "react-icons";

type SkillIcon = {
  name: string;
  color: string;
  Icon: IconType;
};

const iconLibrary: SkillIcon[] = [
  { name: "React", color: "#61dafb", Icon: SiReact },
  { name: "Angular", color: "#dd0031", Icon: SiAngular },
  { name: "TypeScript", color: "#3178c6", Icon: SiTypescript },
  { name: "JavaScript", color: "#f7df1e", Icon: SiJavascript },
  { name: "C#", color: "#9b4f96", Icon: SiSharp },
  { name: "Java", color: "#ea2d2e", Icon: FaJava },
  { name: "Node.js", color: "#6da55f", Icon: SiNodedotjs },
  { name: "Docker", color: "#2496ed", Icon: SiDocker },
  { name: "Git", color: "#f1502f", Icon: SiGit },
  { name: "PostgreSQL", color: "#336791", Icon: SiPostgresql },
  { name: "Tailwind CSS", color: "#38bdf8", Icon: SiTailwindcss },
  { name: "Figma", color: "#a259ff", Icon: SiFigma },
  { name: "Azure DevOps", color: "#0078d7", Icon: FaMicrosoft },
];

const SkillsSection = () => {
  const { language } = useLanguage();
  const { skills } = getCvData(language);
  const { ref, isVisible } = useScrollAnimation();

  const normalized = new Set(skills.map((item) => item.toLowerCase()));
  const visibleIcons = iconLibrary.filter((item) => normalized.has(item.name.toLowerCase()));

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-6 gradient-text"
        >
          {language === "es" ? "Habilidades" : "Skills"}
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="text-center text-sm md:text-base text-muted-foreground mb-10 max-w-3xl mx-auto"
        >
          {language === "es"
            ? "Tecnologías clave con iconos interactivos."
            : "Core technologies displayed as interactive icons."}
        </motion.p>

        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-4">
          {visibleIcons.map(({ name, color, Icon }, index) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 24 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.04 }}
              whileHover={{ y: -6, scale: 1.05 }}
              className="glass-card p-4 flex items-center justify-center"
              title={name}
            >
              <Icon className="h-8 w-8" style={{ color }} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
