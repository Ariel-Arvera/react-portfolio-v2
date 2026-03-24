import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Download, Mail, MapPin, Clock, BookOpen, Music, Film, Gamepad2, Linkedin, Phone, CookingPot } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const ContactSection = () => {
  const { language } = useLanguage();
  const { personalInfo } = getCvData(language);
  const { ref, isVisible } = useScrollAnimation();

  const contactCards = [
    {
      icon: Download,
      title: language === "es" ? "Descargar CV" : "Download CV",
      desc: language === "es" ? "Última versión en PDF" : "Latest PDF version",
      detail: language === "es" ? "Abrir CV" : "Open CV",
      link: personalInfo.cvUrl,
      variant: "cv",
    },
    {
      icon: Mail,
      title: "Email",
      desc:
        language === "es"
          ? "Para consultas de proyectos y colaboraciones"
          : "For project inquiries and collaborations",
      detail: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
    },
    {
      icon: MapPin,
      title: language === "es" ? "Ubicación" : "Location",
      desc: language === "es" ? "Actualmente en" : "Currently in",
      detail: personalInfo.location,
    },
    {
      icon: Clock,
      title: language === "es" ? "Disponibilidad" : "Availability",
      desc: language === "es" ? "Estado laboral" : "Current status",
      detail: personalInfo.availability,
    },
  ];

  const hobbies =
    language === "es"
      ? [
          { icon: BookOpen, label: "Lectura" },
          { icon: Music, label: "Música" },
          { icon: Film, label: "Películas" },
          { icon: CookingPot, label: "Cocina" },
        ]
      : [
          { icon: BookOpen, label: "Reading" },
          { icon: Music, label: "Music" },
          { icon: Film, label: "Movies" },
          { icon: CookingPot, label: "Cooking" },
        ];

  return (
    <section id="contact" className="section-padding bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          {language === "es" ? "Contacto" : "Get In Touch"}
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 justify-items-center">
          {contactCards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className={`glass-card p-6 text-center hover:box-glow transition-all duration-500 group w-full max-w-sm ${card.variant === "cv" ? "glitch-card" : ""}`}
            >
              <card.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              <h3 className="text-lg font-bold text-foreground mb-1">{card.title}</h3>
              <p className="text-sm text-muted-foreground mb-3">{card.desc}</p>
              {card.variant === "cv" ? (
                <a
                  href={card.link}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full bg-primary text-primary-foreground shadow-[0_0_20px_hsl(var(--primary)/0.3)] hover:scale-105 transition"
                >
                  <Download className="w-4 h-4" /> {card.detail}
                </a>
              ) : card.link ? (
                <a href={card.link} className="text-sm text-primary hover:underline">{card.detail}</a>
              ) : (
                <p className="text-sm text-primary">{card.detail}</p>
              )}
            </motion.div>
          ))}
        </div>

        {/* Social & Hobbies row */}
        <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto place-items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="glass-card p-6 text-center w-full max-w-md"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">{language === "es" ? "Redes" : "Social"}</h3>
            <div className="flex justify-center gap-4">
              {[
                { icon: Mail, url: `mailto:${personalInfo.email}` },
                { icon: Linkedin, url: personalInfo.linkedin },
                { icon: Phone, url: `tel:${personalInfo.phone.replace(/\s+/g, "")}` },
              ].map(({ icon: Icon, url }, i) => (
                <a
                  key={i}
                  href={url}
                  target={url.startsWith("http") ? "_blank" : undefined}
                  rel={url.startsWith("http") ? "noreferrer" : undefined}
                  className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/10 transition-all hover:scale-110"
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="glass-card p-6 text-center w-full max-w-md"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">{language === "es" ? "Más allá del código" : "Beyond Coding"}</h3>
            <div className="flex justify-center gap-4">
              {hobbies.map(({ icon: Icon, label }) => (
                <div key={label} className="flex flex-col items-center gap-1">
                  <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-muted-foreground">
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-muted-foreground">{label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
