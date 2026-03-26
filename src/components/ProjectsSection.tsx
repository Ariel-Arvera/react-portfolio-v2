import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const ProjectsSection = () => {
  const { language } = useLanguage();
  const { projects } = getCvData(language);
  const [activeIndex, setActiveIndex] = useState(0);

  const moveCarousel = (direction: "left" | "right") => {
    setActiveIndex((current) => {
      if (direction === "left") {
        return (current - 1 + projects.length) % projects.length;
      }
      return (current + 1) % projects.length;
    });
  };

  return (
    <section 
      id="projects" 
      className="py-16"
      style={{ backgroundColor: "#142039" }}
    >
      <div className="max-w-[844px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base text-white text-center mb-8"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {language === "es" ? "Portafolio de Proyectos Front-End" : "Frontend Projects Portfolio"}
        </motion.h2>

        <div className="relative">
          <button
            type="button"
            onClick={() => moveCarousel("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-40 p-2"
            aria-label={language === "es" ? "Anterior" : "Previous"}
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          <button
            type="button"
            onClick={() => moveCarousel("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-40 p-2"
            aria-label={language === "es" ? "Siguiente" : "Next"}
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="flex justify-center items-center gap-4 overflow-hidden py-8">
            <AnimatePresence mode="wait">
              {[0, 1, 2].map((depth) => {
                const index = (activeIndex + depth) % projects.length;
                const project = projects[index];
                const isFront = depth === 0;

                return (
                  <motion.div
                    key={`${project.id}-${depth}`}
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ 
                      opacity: isFront ? 1 : 0.6,
                      x: 0,
                      scale: isFront ? 1 : 0.85
                    }}
                    exit={{ opacity: 0, x: -50 }}
                    transition={{ duration: 0.4 }}
                    className={`${isFront ? 'w-[455px]' : 'w-[347px]'} h-[295px] rounded-[13px] overflow-hidden ${
                      isFront ? '' : 'opacity-60'
                    }`}
                    style={{ 
                      backgroundColor: isFront ? "#434255" : "#2d2c37",
                      zIndex: isFront ? 30 : 20 - depth
                    }}
                  >
                    <div className="h-[70%] bg-black/20" />
                    <div className="h-[30%] p-4">
                      <h3 
                        className="text-base text-white mb-2"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {project.title}
                      </h3>
                      <p 
                        className="text-base text-white"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {project.description.length > 80 
                          ? project.description.substring(0, 80) + "..." 
                          : project.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>
          </div>
        </div>

        <div className="flex justify-center gap-2 mt-4">
          {projects.map((_, index) => (
            <button
              key={index}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`w-2 h-2 rounded-full transition-colors ${
                index === activeIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;