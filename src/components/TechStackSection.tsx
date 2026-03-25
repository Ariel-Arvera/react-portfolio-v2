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
      { name: "React", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { name: "TypeScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
      { name: "JavaScript", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { name: "HTML5", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { name: "CSS3", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { name: "Tailwind", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
      { name: "Bootstrap", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/bootstrap/bootstrap-original.svg" },
      { name: "Angular", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/angular/angular-original.svg", functional: true },
      { name: "Next.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg", functional: true },
    ],
  },
  backend: {
    title: { es: "Back-End", en: "Back-End" },
    description: {
      es: "APIs escalables y servicios funcionales",
      en: "Scalable APIs and functional services",
    },
    icons: [
      { name: "C#", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg" },
      { name: ".NET", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/dotnetcore/dotnetcore-original.svg" },
      { name: "Node.js", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
      { name: "Java", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg", functional: true },
      { name: "Spring Boot", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/spring/spring-original.svg", functional: true },
      { name: "PHP", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg", functional: true },
      { name: "Laravel", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/laravel/laravel-original.svg", functional: true },
    ],
  },
  database: {
    title: { es: "Bases de datos", en: "Databases" },
    description: {
      es: "Modelado relacional y consultas optimizadas",
      en: "Relational modeling and optimized queries",
    },
    icons: [
      { name: "SQL Express", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/microsoftsqlserver/microsoftsqlserver-plain.svg" },
      { name: "SQLite", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/sqlite/sqlite-original.svg" },
      { name: "PostgreSQL", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg" },
      { name: "MongoDB", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg", functional: true },
      { name: "Oracle", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/oracle/oracle-original.svg", functional: true },
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
      { name: "GitLab", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/gitlab/gitlab-original.svg" },
      { name: "Docker", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg" },
      { name: "Figma", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
      { name: "Jira", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/jira/jira-original.svg" },
      { name: "Postman", url: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg" },
    ],
  },
};

const categoryOrder: CategoryId[] = ["frontend", "backend", "database", "tools"];

const categorySkillFilters: Record<CategoryId, string[]> = {
  frontend: ["html", "css", "ui", "ux", "responsive", "tailwind", "frontend", "react", "angular", "typescript", "next", "lit"],
  backend: ["api", "backend", "node", "java", "c#", ".net", "spring", "php", "laravel"],
  database: ["sql", "database", "postgres", "oracle", "server", "pl/sql", "mongo"],
  tools: ["git", "docker", "azure", "figma", "jira", "scrum", "ci/cd", "devops", "postman", "gitlab"],
};

const TechStackSection = () => {
  const { language } = useLanguage();
  const { skills } = getCvData(language);
  const { ref, isVisible } = useScrollAnimation();
  const functionalLabel = language === "es" ? "Funcional" : "Functional";

  return (
    <section id="tech-stack" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-padding">
      {/* Background banner */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 hero-banner"
          style={{
            backgroundImage: "url('/banner_tecnology.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />
      </div>

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          {language === "es" ? "Stack Tecnológico" : "Tech Stack"}
        </motion.h2>

        <div className="grid gap-4">
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
                className="p-4 flex flex-row items-center gap-6"
              >
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-semibold text-foreground min-w-[120px]">{title}</h3>
                </div>
                <div className="flex flex-wrap gap-6">
                  {(() => {
                    const renderIcon = (icon: TechIcon) => (
                      <div
                        key={`${categoryId}-${icon.name}`}
                        className="group relative w-16 h-16 rounded-xl flex items-center justify-center hover:scale-110 transition-all duration-300 drop-shadow-lg"
                      >
                        <img src={icon.url} alt={icon.name} className="w-10 h-10 object-contain" />
                        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-card border border-border text-xs text-foreground opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                          {icon.name}
                        </span>
                        {icon.functional ? (
                          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 px-1 py-0.5 rounded-full bg-primary text-primary-foreground text-[8px] font-semibold uppercase">
                            {functionalLabel}
                          </span>
                        ) : null}
                      </div>
                    );

                    return (
                      <div className="flex flex-wrap gap-4 justify-center">
                        {category.icons.map(renderIcon)}
                      </div>
                    );
                  })()}
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
