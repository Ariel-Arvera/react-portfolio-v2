import { motion } from "framer-motion";
import { useTypingEffect } from "@/hooks/useTypingEffect";
import { ArrowDown, ExternalLink } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const HeroSection = () => {
  const { language } = useLanguage();
  const { personalInfo } = getCvData(language);
  const typedName = useTypingEffect(
    [
      language === "es" ? `Hola! Soy ${personalInfo.name}...` : `Hi! I'm ${personalInfo.name}...`,
      language === "es" ? "Apasionado por UI/UX..." : "Passionate about UI/UX...",
      "React + TypeScript + APIs...",
    ],
    80, 50, 2000
  );

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.3) 1px, transparent 0)",
          backgroundSize: "40px 40px"
        }} />
      </div>
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />
      <div className="absolute inset-x-0 top-20 mx-auto h-px w-[70%] bg-gradient-to-r from-transparent via-primary/60 to-transparent animate-shimmer" />

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center z-10 px-6"
      >
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6">
          <span className="gradient-text">{typedName}</span>
          <span className="typing-cursor text-primary">▌</span>
        </h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-lg md:text-xl mb-2 max-w-2xl mx-auto"
        >
          {personalInfo.title}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground text-sm mb-4"
        >
          {personalInfo.location} · {personalInfo.availability}
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="text-muted-foreground/70 italic mb-8 max-w-lg mx-auto"
        >
          {personalInfo.tagline}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground rounded-full font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all duration-300 hover:scale-105 animate-soft-pulse"
          >
            {language === "es" ? "Hablemos" : "Let's connect"} <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </motion.div>

      {/* Profile image */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="mt-12 z-10"
        whileHover={{ y: -8, rotate: -1 }}
      >
        <div className="w-32 h-32 rounded-full border-2 border-primary/50 overflow-hidden animate-glow-pulse">
          <img
            src={personalInfo.profileImage}
            alt={personalInfo.name}
            className="w-full h-full object-cover"
          />
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 flex flex-col items-center gap-2 text-muted-foreground"
      >
        <ArrowDown className="w-5 h-5 animate-bounce" />
      </motion.div>
    </section>
  );
};

export default HeroSection;
