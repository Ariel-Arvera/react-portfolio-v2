import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const HeroSection = () => {
  const { language } = useLanguage();
  const { personalInfo, tagline } = getCvData(language);

  return (
    <section 
      id="hero" 
      className="relative min-h-[525px] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#334470" }}
    >
      <div className="relative z-10 w-full px-6 max-w-[844px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center"
        >
          <h1 
            className="text-xl font-normal text-white mb-2"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {personalInfo.name}.Vera() {"{{ Dev.Portfolio }}"}
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-base text-white mb-8"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="mb-8"
          >
            <p 
              className="text-base text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {language === "es" 
                ? "se vuelve mas facil cada dia, pero tienes que hacerlo" 
                : "it gets easier every day, but you have to do it"}
            </p>
          </motion.div>

          <motion.a
            href="#contact"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center justify-center px-8 py-2 rounded-[5px] font-normal text-black bg-[#CCCCCC] hover:bg-white transition-colors"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            {language === "es" ? "Hablemos" : "Let's talk"}
          </motion.a>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-4"
      >
        <ArrowDown className="w-6 h-6 text-white" />
      </motion.div>
    </section>
  );
};

export default HeroSection;