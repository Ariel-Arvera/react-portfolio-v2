import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Download, Mail, MapPin, Clock, BookOpen, Music, Film, Gamepad2, Linkedin, Phone, CookingPot, MessageCircle } from "lucide-react";
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
      icon: MessageCircle,
      title: "WhatsApp",
      desc: language === "es" ? "Escríbeme" : "Message me",
      detail: "+34 695 298 272",
      link: "https://wa.me/+34695298272",
    },
    {
      icon: MapPin,
      title: language === "es" ? "Ubicación" : "Location",
      desc: language === "es" ? "Actualmente en" : "Currently in",
      detail: personalInfo.location,
    },
  ];

  const hobbies =
    language === "es"
      ? [
          { icon: BookOpen, label: "Arte" },
          { icon: Music, label: "Música" },
          { icon: Film, label: "Películas" },
          { icon: CookingPot, label: "Cocina" },
        ]
      : [
          { icon: BookOpen, label: "Art" },
          { icon: Music, label: "Music" },
          { icon: Film, label: "Movies" },
          { icon: CookingPot, label: "Cooking" },
        ];

  return (
    <section id="contact" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden section-padding">
      {/* Background banner */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        <div
          className="absolute inset-0 hero-banner"
          style={{
            backgroundImage: "url('/banner_contactos.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            opacity: 0.3,
          }}
        />
      </div>
      {/* Glow orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-[120px] animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-glow-secondary/10 rounded-full blur-[100px] animate-float" style={{ animationDelay: "2s" }} />

      <div className="container mx-auto px-6 relative z-10" ref={ref}>
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
              whileTap={{ scale: 0.98 }}
              className="p-6 text-center transition-all duration-300 group w-full max-w-sm"
            >
              {card.link ? (
                <a href={card.link} target={card.link.startsWith("http") ? "_blank" : undefined} rel={card.link.startsWith("http") ? "noreferrer" : undefined}>
                  <card.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform cursor-pointer" />
                </a>
              ) : (
                <card.icon className="w-8 h-8 text-primary mx-auto mb-3 group-hover:scale-110 transition-transform" />
              )}
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
        <div className="grid md:grid-cols-1 gap-6 max-w-3xl mx-auto place-items-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="p-6 text-center w-full max-w-md"
          >
            <h3 className="text-lg font-bold text-foreground mb-4">{language === "es" ? "Despues del código..." : "Beyond Coding"}</h3>
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
