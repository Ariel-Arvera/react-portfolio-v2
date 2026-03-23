import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Download, FileText, Printer, RefreshCw } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const ResumeSection = () => {
  const { language } = useLanguage();
  const { education, experience, personalInfo, skills } = getCvData(language);
  const { ref, isVisible } = useScrollAnimation();
  const [flipped, setFlipped] = useState(false);
  const [hasCelebrated, setHasCelebrated] = useState(false);
  const [burstId, setBurstId] = useState(0);
  const [showConfetti, setShowConfetti] = useState(false);
  const latestExperience = experience[0];
  const mainEducation = education[0];

  useEffect(() => {
    if (!isVisible || hasCelebrated) return;
    setHasCelebrated(true);
    setBurstId((current) => current + 1);
    setShowConfetti(true);
  }, [isVisible, hasCelebrated]);

  useEffect(() => {
    if (!showConfetti) return;
    const timerId = window.setTimeout(() => setShowConfetti(false), 2300);
    return () => window.clearTimeout(timerId);
  }, [showConfetti]);

  const confettiPieces = useMemo(
    () =>
      Array.from({ length: 34 }, (_, index) => ({
        id: `${burstId}-${index}`,
        left: `${Math.round(Math.random() * 92 + 4)}%`,
        delay: `${(Math.random() * 0.45).toFixed(2)}s`,
        duration: `${(1.7 + Math.random() * 1.2).toFixed(2)}s`,
        rotate: `${Math.round(Math.random() * 280 - 140)}deg`,
        color: ["#00ffff", "#6ee7ff", "#22d3ee", "#facc15", "#fb7185", "#a78bfa"][index % 6],
      })),
    [burstId]
  );

  return (
    <section id="resume" className="section-padding bg-secondary/20">
      <div className="container mx-auto px-6 relative overflow-hidden" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          {language === "es" ? "Mi CV" : "My Resume"}
        </motion.h2>

        {showConfetti ? (
          <div className="confetti-burst" aria-hidden>
            {confettiPieces.map((piece) => (
              <span
                key={piece.id}
                className="confetti-piece"
                style={{
                  left: piece.left,
                  animationDelay: piece.delay,
                  animationDuration: piece.duration,
                  backgroundColor: piece.color,
                  transform: `translate3d(0, 0, 0) rotate(${piece.rotate})`,
                }}
              />
            ))}
          </div>
        ) : null}

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="max-w-4xl mx-auto perspective-1000"
        >
          <div
            className="relative cursor-pointer"
            style={{ transformStyle: "preserve-3d", transition: "transform 0.8s" }}
            onClick={() => setFlipped(!flipped)}
          >
            {/* Front */}
            <div className={`glass-card p-8 transition-all duration-700 ${flipped ? "hidden" : ""}`}>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/3 flex flex-col items-center text-center">
                  <div className="w-24 h-24 rounded-xl overflow-hidden border border-primary/30 mb-4">
                    <img src={personalInfo.profileImage} alt={personalInfo.name} className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{personalInfo.name}</h3>
                  <p className="text-sm text-primary">{personalInfo.title}</p>
                  <div className="mt-6 text-left w-full space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{language === "es" ? "Formación" : "Education"}</p>
                      <p className="text-sm text-foreground">{mainEducation.degree}</p>
                      <p className="text-xs text-muted-foreground">{mainEducation.institution} • {mainEducation.period}</p>
                      <p className="text-xs text-muted-foreground mt-2">{mainEducation.details}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{language === "es" ? "Experiencia" : "Experience"}</p>
                      <p className="text-sm text-foreground">{latestExperience.title}</p>
                      <p className="text-xs text-muted-foreground">{latestExperience.company} • {latestExperience.period}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">{language === "es" ? "Habilidades" : "Skills"}</p>
                      <div className="flex flex-wrap gap-1">
                        {skills.slice(0, 6).map((s) => (
                          <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-foreground mb-2">{language === "es" ? "Descargar CV" : "Download Resume"}</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    {language === "es"
                      ? "Obten la version PDF completa con informacion detallada sobre formacion, experiencia y habilidades."
                      : "Get the complete PDF version with detailed information about education, experience, and skills."}
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      { icon: FileText, label: language === "es" ? "Formato profesional" : "Professional format" },
                      { icon: Printer, label: language === "es" ? "Listo para imprimir" : "Print ready" },
                      { icon: RefreshCw, label: language === "es" ? "Actualizado" : "Regularly updated" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon className="w-4 h-4 text-primary" /> {label}
                      </div>
                    ))}
                  </div>
                  <a
                    href={personalInfo.cvUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4" /> {language === "es" ? "Descargar PDF" : "Download PDF"}
                  </a>
                    <p className="text-xs text-muted-foreground mt-4 cursor-pointer hover:text-primary" onClick={() => setFlipped(true)}>
                      {language === "es" ? "Haz clic para girar →" : "Click to flip →"}
                    </p>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className={`glass-card p-8 transition-all duration-700 ${!flipped ? "hidden" : ""}`}>
              <p className="text-xs text-primary uppercase tracking-widest mb-2">{language === "es" ? "Trayectoria" : "Journey"}</p>
              <h3 className="text-2xl font-bold text-foreground mb-4">{language === "es" ? "Mi recorrido profesional" : "My professional journey"}</h3>
                <p className="text-muted-foreground mb-8">
                  {language === "es"
                    ? "Con una base sólida en tecnología y experiencia práctica en desarrollo web, aporto habilidades técnicas y resolución creativa de problemas."
                    : "With a strong technical foundation and hands-on web development experience, I bring technical skill and creative problem-solving."}
                </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { val: "10+", label: language === "es" ? "Años exp." : "Pro years" },
                  { val: "3", label: language === "es" ? "Empresas" : "Companies" },
                  { val: "7+", label: language === "es" ? "Certificaciones" : "Certifications" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-bold text-primary">{s.val}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-3">{language === "es" ? "Puntos clave" : "Key highlights"}</h4>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                {[
                  language === "es"
                    ? `${latestExperience.title} en ${latestExperience.company}`
                    : `${latestExperience.title} at ${latestExperience.company}`,
                  language === "es" ? `Ubicado en ${personalInfo.location}` : `Based in ${personalInfo.location}`,
                  language === "es" ? "Especializado en Front-End y Back-End funcional" : "Specialized in frontend and practical backend",
                  language === "es"
                    ? "Experiencia en desarrollo web, infraestructura y redes"
                    : "Experience in web development, infrastructure, and networks",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => setFlipped(false)}>
                {language === "es" ? "← Haz clic para volver" : "← Click to flip back"}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
