import { motion } from "framer-motion";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const TechStackSection = () => {
  const { language } = useLanguage();
  const { techStack } = getCvData(language);

  const categoryOrder = ["frontend", "backend", "database", "tools"];

  return (
    <section 
      id="tech-stack" 
      className="py-16"
      style={{ backgroundColor: "#171a2c" }}
    >
      <div className="max-w-[844px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base text-white mb-8"
          style={{ fontFamily: "Inter, sans-serif", opacity: 0.99 }}
        >
          {language === "es" ? "Stack Tecnologico" : "Tech Stack"}
        </motion.h2>

        <div className="space-y-8">
          {categoryOrder.map((categoryId, index) => {
            const category = techStack.find((c) => c.id === categoryId);
            if (!category) return null;

            return (
              <motion.div
                key={categoryId}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="bg-transparent"
              >
                <h3 
                  className="text-base text-white mb-4"
                  style={{ fontFamily: "Inter, sans-serif", opacity: 0.99 }}
                >
                  {category.title}
                </h3>
                <div className="flex flex-wrap gap-6">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={`${categoryId}-${itemIndex}`}
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 + itemIndex * 0.05, duration: 0.3 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-6 h-6 mb-2">
                        {item.icon ? (
                          <img 
                            src={item.icon} 
                            alt={item.name}
                            className="w-full h-full object-contain"
                            onError={(e) => {
                              (e.target as HTMLImageElement).style.display = 'none';
                            }}
                          />
                        ) : (
                          <div className="w-6 h-6 bg-gray-500 rounded" />
                        )}
                      </div>
                      <span 
                        className="text-[10px] text-white"
                        style={{ fontFamily: "Inter, sans-serif" }}
                      >
                        {item.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;