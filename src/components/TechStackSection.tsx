import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

type CategoryId = "frontend" | "backend" | "database" | "tools";

type TechIcon = { name: string; url: string; functional?: boolean };

const techCategories: Record<
  CategoryId,
  {
    title: { es: string; en: string };
    description: { es: string; en: string };
    icons: TechIcon[];
  }
> = {
  frontend: {
    title: { es: "Front-End", en: "Front-End" },
    description: {
      es: "Interfaces reactivas, UX y diseño responsive",
      en: "Reactive UIs, UX and responsive design",
    },
    icons: [
      { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "Angular", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg" },
      { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
    ],
  },
  backend: {
    title: { es: "Back-End", en: "Back-End" },
    description: {
      es: "APIs escalables y servicios funcionales",
      en: "Scalable APIs and functional services",
    },
    icons: [
      { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "C#", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg", functional: true },
      { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", functional: true },
      { name: ".NET", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg", functional: true },
      { name: "Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg" },
      { name: "Spring", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", functional: true },
    ],
  },
  database: {
    title: { es: "Bases de datos", en: "Databases" },
    description: {
      es: "Modelado relacional y consultas optimizadas",
      en: "Relational modeling and optimized queries",
    },
    icons: [
      { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "SQL Server", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
      { name: "Oracle", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg" },
      { name: "SQLite", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" },
    ],
  },
  tools: {
    title: { es: "Herramientas", en: "Tools" },
    description: {
      es: "Colaboración, automatización y diseño",
      en: "Collaboration, automation, and design",
    },
    icons: [
      { name: "Git", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg" },
      { name: "GitHub", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
      { name: "Azure DevOps", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azuredevops/azuredevops-original.svg" },
      { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Jira", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
    ],
  },
};

const categoryOrder: CategoryId[] = ["frontend", "backend", "database", "tools"];

const categorySkillFilters: Record<CategoryId, string[]> = {
  frontend: ["html", "css", "ui", "ux", "responsive", "tailwind", "frontend", "react", "angular"],
  backend: ["api", "backend", "node", "java", "c#", ".net", "spring", "express"],
  database: ["sql", "database", "postgres", "oracle", "server", "pl/sql"],
  tools: ["git", "docker", "azure", "figma", "jira", "scrum", "ci/cd", "devops"],
};

const TechStackSection = () => {
  const { language } = useLanguage();
  const { skills } = getCvData(language);
  const { ref, isVisible } = useScrollAnimation();
  const functionalLabel = language === "es" ? "Funcional" : "Functional";

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

        <div className="grid gap-6 md:grid-cols-2">
          {categoryOrder.map((categoryId, index) => {
            const category = techCategories[categoryId];
            const title = category.title[language];
            const desc = category.description[language];
            return (
              <motion.article
                key={categoryId}
                initial={{ opacity: 0, y: 24 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="glass-card p-6 flex flex-col gap-4"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-semibold text-foreground">{title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{desc}</p>
                  </div>
                  <span className="text-xs text-muted-foreground/70">{category.icons.length} tech</span>
                </div>
                <div className="flex flex-wrap gap-3">
                  {category.icons.map((icon) => (
                    <div
                      key={icon.name}
                      className="relative w-16 h-16 rounded-2xl bg-secondary/40 border border-border/60 flex items-center justify-center hover:scale-110 hover:border-primary/60 transition-all duration-300"
                      title={icon.name}
                    >
                      <img src={icon.url} alt={icon.name} className="w-9 h-9 object-contain" />
                      {icon.functional ? (
                        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-[2px] rounded-full bg-primary text-primary-foreground text-[10px] font-semibold uppercase tracking-wide shadow-[0_4px_14px_hsl(var(--primary)/0.4)]">
                          {functionalLabel}
                        </span>
                      ) : null}
                    </div>
                  ))}
                </div>
                {(() => {
                  const keywords = categorySkillFilters[categoryId];
                  const badgeSkills = skills
                    .filter((skill) => keywords.some((keyword) => skill.toLowerCase().includes(keyword)))
                    .slice(0, 4);
                  if (!badgeSkills.length) return null;
                  return (
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground/80">
                      {badgeSkills.map((skill) => (
                        <span key={`${categoryId}-${skill}`} className="px-2 py-1 rounded-full bg-secondary/40 border border-border/50">
                          {skill}
                        </span>
                      ))}
                    </div>
                  );
                })()}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
