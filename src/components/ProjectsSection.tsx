import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { ExternalLink, Github } from "lucide-react";
import { useState } from "react";

const projects = [
  {
    title: "Maverick Challenge Ai Health",
    tags: ["Django", "Gemini API", "Python"],
    category: "AI in WEB",
    desc: "AI for Inclusive Healthcare Access – An AI-driven telemonitoring platform bridging the healthcare gap in underserved areas. Built with Django, Google Gemini API, and Notion API.",
    image: "https://krupal.vercel.app/assets/img/maverick.png",
    github: "https://github.com/krupal-036/maverick-challenge-ai-health",
    demo: "https://maverick-challenge-ai-health.onrender.com/",
  },
  {
    title: "Locsent",
    tags: ["Flask", "Notion API", "Python"],
    category: "Web Development",
    desc: "A modern web dashboard built with Python and Flask to monitor user GPS coordinates. Provides role-based access, location history, and utilizes Notion as a serverless backend.",
    image: "https://krupal.vercel.app/assets/img/locsent.jpg",
    github: "https://github.com/krupal-036/locsent",
    demo: "https://locsent.vercel.app/",
  },
  {
    title: "Browser History Fetcher",
    tags: ["Django", "Django REST API", "Python"],
    category: "API Integration",
    desc: "A modern web application that securely retrieves and displays browsing history from multiple web browsers including Chrome, Edge, Firefox, Opera, and Brave.",
    image: "https://krupal.vercel.app/assets/img/browser_history_fetcher.jpg",
    github: "https://github.com/krupal-036/browser_history_fetcher",
    demo: "#",
  },
  {
    title: "Polyglotty",
    tags: ["Flask", "Translate API", "Python"],
    category: "API Integration",
    desc: "A powerful, minimalistic web application that allows users to seamlessly translate text between languages and convert both the original and translated text into speech.",
    image: "https://krupal.vercel.app/assets/img/polyglotty.jpg",
    github: "https://github.com/krupal-036/polyglotty",
    demo: "https://polyglotty.vercel.app/",
  },
  {
    title: "Cinezy",
    tags: ["Flask", "OMDB API", "Python"],
    category: "API Integration",
    desc: "A modern, interactive movie discovery web app powered by Flask and the OMDB API. Features a dynamic p5.js starfield background, theme switching, and real-time search.",
    image: "https://krupal.vercel.app/assets/img/cinezy.png",
    github: "https://github.com/krupal-036/cinezy",
    demo: "https://cinezy.vercel.app/",
  },
];

const filters = ["All Projects", "Web Development", "AI in WEB", "API Integration"];

const ProjectsSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [filter, setFilter] = useState("All Projects");

  const filtered = filter === "All Projects" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-8 gradient-text"
        >
          My Projects
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === f
                  ? "bg-primary text-primary-foreground shadow-[0_0_15px_hsl(var(--primary)/0.3)]"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {f}
            </button>
          ))}
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + i * 0.1 }}
              layout
              className="glass-card overflow-hidden group hover:box-glow transition-all duration-500"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-foreground mb-2">{project.title}</h3>
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map((tag) => (
                    <span key={tag} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{tag}</span>
                  ))}
                </div>
                <p className="text-sm text-muted-foreground mb-4 line-clamp-3">{project.desc}</p>
                <div className="flex gap-3">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" /> GitHub
                  </a>
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    <ExternalLink className="w-4 h-4" /> Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
