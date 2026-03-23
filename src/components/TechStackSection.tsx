import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const techIcons = [
  { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
  { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
  { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
  { name: "C#", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
  { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg" },
  { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
  { name: "Angular", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
  { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original-wordmark.svg" },
  { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
  { name: "Tailwind CSS", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
  { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
  { name: "Bootstrap", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
  { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
  { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
  { name: "Azure DevOps", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg" },
  { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
];

const TechStackSection = () => {
  const { language } = useLanguage();
  const { skills } = getCvData(language);
  const { ref, isVisible } = useScrollAnimation();
  const normalizedSkills = new Set(skills.map((skill) => skill.toLowerCase()));
  const visibleTechIcons = techIcons.filter((tech) => normalizedSkills.has(tech.name.toLowerCase()));

  return (
    <section id="tech-stack" className="section-padding bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          {language === "es" ? "Stack Tecnológico" : "Tech Stack"}
        </motion.h2>

        <div className="overflow-hidden relative">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none" />
          <div className="flex animate-marquee whitespace-nowrap">
            {[...visibleTechIcons, ...visibleTechIcons].map((tech, i) => (
              <div
                key={`${tech.name}-${i}`}
                className="mx-6 flex-shrink-0 w-16 h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-110"
                title={tech.name}
              >
                <img src={tech.url} alt={tech.name} className="w-12 h-12" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
