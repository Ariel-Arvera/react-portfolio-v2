import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const skillCategories = [
  { title: "Frontend", skills: ["HTML5", "CSS3", "JavaScript", "React", "GSAP", "Anime.js"] },
  { title: "Backend", skills: ["Node.js", "Python", "Flask", "Django", "REST APIs"] },
  { title: "Database", skills: ["MongoDB", "MySQL", "PostgreSQL", "Firebase"] },
  { title: "Tools & Others", skills: ["Git", "VS Code", "Figma", "CI/CD", "Agile"] },
];

const SkillsSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="skills" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          Skills & Technologies
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.12 }}
              className="glass-card p-6 hover:box-glow transition-all duration-500"
            >
              <h3 className="text-lg font-semibold text-primary mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, j) => (
                  <motion.span
                    key={skill}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={isVisible ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: 0.4 + j * 0.06 }}
                    whileHover={{ scale: 1.1, backgroundColor: "hsl(var(--primary) / 0.2)" }}
                    className="text-sm px-3 py-1.5 bg-secondary rounded-lg text-foreground/80 cursor-default transition-colors"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
