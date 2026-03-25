import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Code2, Menu, X } from "lucide-react";
import { useLanguage } from "@/context/language";

type Item = { id: string; label: string };

const labels: Record<"es" | "en", { brand: string; nav: Item[] }> = {
  es: {
    brand: "Ariel Vera",
    nav: [
      { id: "hero", label: "Inicio" },
      { id: "about", label: "Sobre Mí" },
      { id: "contact", label: "Contacto" },
    ],
  },
  en: {
    brand: "DevPortfolio",
    nav: [
      { id: "hero", label: "Home" },
      { id: "about", label: "About" },
      { id: "contact", label: "Contact" },
    ],
  },
};

const Navbar = () => {
  const { language, setLanguage } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [glitchTarget, setGlitchTarget] = useState<string | null>(null);
  const { scrollY, scrollYProgress } = useScroll();

  const navItems = useMemo(() => labels[language].nav, [language]);
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 22,
    restDelta: 0.001,
  });

  useEffect(() => {
    const unsubscribe = scrollY.on("change", (current) => {
      setIsScrolled(current > 24);
    });
    return () => unsubscribe();
  }, [scrollY]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0.01 }
    );

    navItems.forEach(({ id }) => {
      const section = document.getElementById(id);
      if (section) observer.observe(section);
    });

    return () => observer.disconnect();
  }, [navItems]);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setIsMenuOpen(false);
  };

  const triggerGlitch = (target: string, action: () => void) => {
    setGlitchTarget(target);
    action();
    window.setTimeout(() => {
      setGlitchTarget((current) => (current === target ? null : current));
    }, 220);
  };

  return (
    <motion.nav
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50"
      style={{ fontFamily: "Poppins, sans-serif" }}
    >
      <div
        className="mx-auto mt-3 w-[min(96%,1180px)] rounded-2xl border border-white/10 px-6 shadow-[0_10px_30px_rgba(0,0,0,0.25)] backdrop-blur-xl transition-all duration-300"
        style={{
          background: "rgba(10, 10, 10, 0.42)",
          paddingTop: isScrolled ? "0.8rem" : "1.5rem",
          paddingBottom: isScrolled ? "0.8rem" : "1.5rem",
          opacity: isScrolled ? 0.95 : 0.88,
        }}
      >
        <div className="container mx-auto flex items-center justify-between">
          <button
            onClick={() => triggerGlitch("brand", () => scrollTo("hero"))}
            className={`inline-flex items-center gap-2 text-[1.8rem] leading-none font-semibold text-white hover:text-cyan-300 transition-all hover:drop-shadow-[0_0_12px_#00ffff] ${
              glitchTarget === "brand" ? "cyber-glitch" : ""
            }`}
            aria-label="Go to home"
          >
            <Code2 className="w-7 h-7" />
            <span>{labels[language].brand}</span>
          </button>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const glitchId = `nav-${item.id}`;
              return (
                <button
                  key={item.id}
                  onClick={() => triggerGlitch(glitchId, () => scrollTo(item.id))}
                  className={`text-sm tracking-wide transition-all duration-300 relative ${
                    isActive
                      ? "text-cyan-300 drop-shadow-[0_0_10px_#00ffff]"
                      : "text-white/80 hover:text-cyan-300 hover:drop-shadow-[0_0_10px_#00ffff]"
                  } ${glitchTarget === glitchId ? "cyber-glitch" : ""}`}
                >
                  {item.label}
                  <span
                    className={`absolute -bottom-2 left-0 h-[2px] bg-cyan-300 shadow-[0_0_10px_#00ffff] transition-all duration-300 ${
                      isActive ? "w-full" : "w-0"
                    }`}
                  />
                </button>
              );
            })}

            <button
              onClick={() => triggerGlitch("lang-desktop", () => setLanguage(language === "es" ? "en" : "es"))}
              className={`rounded-md px-2 py-1 text-xs text-white/80 hover:text-cyan-300 hover:drop-shadow-[0_0_10px_#00ffff] transition-all ${
                glitchTarget === "lang-desktop" ? "cyber-glitch" : ""
              }`}
              aria-label="Toggle language"
            >
              <span className="flex flex-col items-center gap-1">
                <span className="leading-none">{language === "es" ? "ES/EN" : "EN/ES"}</span>
                <span className="relative h-[3px] w-12 rounded-full bg-white/25 overflow-hidden" aria-hidden>
                  <span
                    className={`absolute top-0 h-full w-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_#00ffff] transition-transform duration-300 ${
                      language === "es" ? "translate-x-0" : "translate-x-full"
                    }`}
                  />
                </span>
              </span>
            </button>

          </div>

          <div className="md:hidden flex items-center gap-3">
            <button
              onClick={() => triggerGlitch("lang-mobile", () => setLanguage(language === "es" ? "en" : "es"))}
              className={`rounded-md px-1.5 py-1 text-xs text-white/80 hover:text-cyan-300 transition-all ${
                glitchTarget === "lang-mobile" ? "cyber-glitch" : ""
              }`}
              aria-label="Toggle language"
            >
              <span className="flex flex-col items-center gap-1">
                <span className="leading-none">{language === "es" ? "ES/EN" : "EN/ES"}</span>
                <span className="relative h-[3px] w-10 rounded-full bg-white/25 overflow-hidden" aria-hidden>
                  <span
                    className={`absolute top-0 h-full w-1/2 rounded-full bg-cyan-300 shadow-[0_0_8px_#00ffff] transition-transform duration-300 ${
                      language === "es" ? "translate-x-0" : "translate-x-full"
                    }`}
                  />
                </span>
              </span>
            </button>
            <button
              onClick={() => triggerGlitch("menu-mobile", () => setIsMenuOpen((prev) => !prev))}
              className={`text-white/90 hover:text-cyan-300 transition-colors ${
                glitchTarget === "menu-mobile" ? "cyber-glitch" : ""
              }`}
              aria-label="Toggle mobile menu"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      <motion.div
        className="h-[2px] bg-cyan-300 shadow-[0_0_12px_#00ffff] origin-left"
        style={{ scaleX: progressScaleX }}
      />

      <AnimatePresence>
        {isMenuOpen ? (
          <>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="fixed inset-0 z-40 bg-black/40 md:hidden"
              aria-label="Close mobile menu backdrop"
            />

            <motion.aside
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: "easeOut", duration: 0.3 }}
              className="fixed right-0 top-0 z-50 h-screen w-[78%] max-w-[300px] border-l border-cyan-300/20 bg-[#0a0a0a] p-6 shadow-[-12px_0_32px_rgba(0,255,255,0.16)] md:hidden"
            >
              <div className="mt-20 flex flex-col gap-5">
                {navItems.map((item) => {
                  const isActive = activeSection === item.id;
                  return (
                    <button
                      key={item.id}
                      onClick={() => triggerGlitch(`mobile-nav-${item.id}`, () => scrollTo(item.id))}
                      className={`text-left text-base transition-all ${
                        isActive
                          ? "text-cyan-300 drop-shadow-[0_0_10px_#00ffff]"
                          : "text-white/80 hover:text-cyan-300"
                      } ${glitchTarget === `mobile-nav-${item.id}` ? "cyber-glitch" : ""}`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
