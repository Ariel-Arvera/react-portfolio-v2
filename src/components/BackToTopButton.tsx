import { AnimatePresence, motion } from "framer-motion";
import { ChevronUp } from "lucide-react";
import { useEffect, useState } from "react";

import { useLanguage } from "@/context/language";

const BackToTopButton = () => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 120);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const scrollToTop = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 14, scale: 0.94 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 14, scale: 0.94 }}
          transition={{ duration: 0.22 }}
          className="fixed bottom-6 right-5 z-[70] glass-card border border-primary/30 px-4 py-2 text-xs md:text-sm font-medium text-foreground hover:text-primary hover:box-glow transition-all"
          aria-label={language === "es" ? "Volver al inicio" : "Back to top"}
        >
          <span className="inline-flex items-center gap-1.5">
            <ChevronUp className="w-4 h-4" />
            {language === "es" ? "Volver al inicio" : "Back to top"}
          </span>
        </motion.button>
      ) : null}
    </AnimatePresence>
  );
};

export default BackToTopButton;
