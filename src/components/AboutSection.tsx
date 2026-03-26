import { motion } from "framer-motion";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const AboutSection = () => {
  const { language } = useLanguage();
  const { aboutText, personalInfo } = getCvData(language);

  return (
    <section 
      id="about" 
      className="py-12"
      style={{ backgroundColor: "#1e1930" }}
    >
      <div className="max-w-[844px] mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col md:flex-row gap-8"
        >
          <div className="md:w-1/2">
            <motion.h2
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-base text-white text-right mb-4"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {language === "es" ? "Sobre Mi" : "About Me"}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-[10px] text-white text-right leading-[2] tracking-[2px]"
              style={{ fontFamily: "Inter, sans-serif", fontWeight: 300 }}
            >
              {aboutText}
            </motion.p>
          </div>

          <div className="md:w-1/2 flex justify-center md:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="w-[191px] h-[155px]"
            >
              <div 
                className="w-full h-full rounded-[19px] overflow-hidden"
                style={{
                  backgroundImage: `url(${personalInfo.profileImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: 0.97
                }}
              />
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;