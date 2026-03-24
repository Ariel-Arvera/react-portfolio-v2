import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { ArrowDown, Download, ExternalLink, Linkedin, Mail, MessageCircle } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const HeroSection = () => {
  const { language } = useLanguage();
  const { personalInfo } = getCvData(language);
  const phrases = useMemo(
    () => [
      language === "es" ? `Hola, Soy ${personalInfo.name}` : `Hello, I'm ${personalInfo.name}`,
      language === "es" ? "Diseño experiencias UI/UX" : "Designing bold UI/UX",
      "React · TypeScript · APIs",
      language === "es" ? "Código + IA + Creatividad" : "Code + AI + Creativity",
    ],
    [language, personalInfo.name]
  );

  const quickLinks = [
    {
      icon: Download,
      url: personalInfo.cvUrl,
      label: language === "es" ? "Descargar CV" : "Download CV",
      external: true,
    },
    {
      icon: Linkedin,
      url: personalInfo.linkedin,
      label: "LinkedIn",
      external: true,
    },
    {
      icon: Mail,
      url: `mailto:${personalInfo.email}`,
      label: "Email",
      external: false,
    },
    {
      icon: MessageCircle,
      url: "https://wa.me/+34695298272",
      label: "WhatsApp",
      external: true,
    },
  ];

  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayedName, setDisplayedName] = useState(phrases[0] ?? "");
  const [isScrambling, setIsScrambling] = useState(false);

  useEffect(() => {
    setDisplayedName(phrases[0] ?? "");
    setPhraseIndex(0);
  }, [phrases]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setPhraseIndex((current) => (current + 1) % phrases.length);
    }, 3600);
    return () => window.clearInterval(intervalId);
  }, [phrases.length]);

  useEffect(() => {
    const target = phrases[phraseIndex];
    if (!target) return;
    const SCRAMBLE_CHARACTERS = "!<>-_\\/[]{}—=+*^?#________0123456789";
    const queue = target.split("").map((char) => {
      const start = Math.floor(Math.random() * 6);
      const end = start + Math.floor(Math.random() * 6) + 6;
      return { to: char, start, end };
    });

    let frame = 0;
    let rafId: number;
    setIsScrambling(true);

    const update = () => {
      let output = "";
      let complete = 0;

      for (const item of queue) {
        if (frame >= item.end) {
          output += item.to;
          complete += 1;
        } else if (frame >= item.start) {
          const char = SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)];
          output += char;
        } else {
          output += " ";
        }
      }

      setDisplayedName(output.trim() ? output : target);
      frame += 1;

      if (complete < queue.length) {
        rafId = window.requestAnimationFrame(update);
      } else {
        setDisplayedName(target);
        setIsScrambling(false);
      }
    };

    rafId = window.requestAnimationFrame(update);
    return () => {
      window.cancelAnimationFrame(rafId);
      setDisplayedName(target);
      setIsScrambling(false);
    };
  }, [phraseIndex, phrases]);

  return (
    <section id="hero" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Background banner */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 hero-banner"
          style={{
            backgroundImage: "url('/banner_developer-.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.28,
          }}
        />
        <div className="absolute inset-0 bg-background/70" />
      </div>
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

      <div className="relative z-10 w-full max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="flex flex-col items-center text-center gap-6"
        >
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-2">
            <span
              className={`gradient-text neon-matrix inline-block whitespace-nowrap ${isScrambling ? "hero-glitch" : ""}`}
              data-text={displayedName}
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                letterSpacing: "0.04em",
                textShadow: "0 0 25px rgba(34, 211, 238, 0.45), 0 0 45px rgba(147, 51, 234, 0.35)",
              }}
            >
              {displayedName}
            </span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
            className="text-sm text-primary/80 tracking-wide"
          >
            “Antes era adicto a la televisión. Ahora la dejo encendida y me voy.” – Dwight Schrute | The Office
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="text-muted-foreground text-sm"
          >
            {personalInfo.location} · {personalInfo.availability}
          </motion.p>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="text-muted-foreground/70 italic max-w-2xl"
          >
            {personalInfo.tagline}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="flex items-center justify-center gap-3">
              {quickLinks.map(({ icon: Icon, url, label, external }) => (
                <a
                  key={label}
                  href={url}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noreferrer" : undefined}
                  aria-label={label}
                  className="w-11 h-11 rounded-full border border-border/60 bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary/50 transition-all duration-200 hover:scale-105"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>

            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-semibold bg-card/30 border border-white/15 text-primary hover:border-primary/50 hover:text-primary-foreground backdrop-blur-md transition-all duration-300 hover:shadow-[0_0_35px_rgba(0,255,255,0.25)]"
            >
              {language === "es" ? "Hablemos" : "Let's connect"} <ExternalLink className="w-4 h-4" />
            </a>
          </motion.div>
        </motion.div>
      </div>


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
