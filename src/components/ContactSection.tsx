import { motion } from "framer-motion";
import { Download, Mail, MessageCircle, MapPin, FileDown } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const ContactSection = () => {
  const { language } = useLanguage();
  const { personalInfo } = getCvData(language);

  const contactCards = [
    {
      icon: Download,
      title: language === "es" ? "Descargar CV" : "Download CV",
      desc: language === "es" ? "Ultima Version de mi CV" : "Latest version of my CV",
      detail: language === "es" ? "Abrir CV" : "Open CV",
      link: personalInfo.cvUrl,
      bgColor: "#ffffff",
      textColor: "#000000",
      iconColor: "#000000",
    },
    {
      icon: Mail,
      title: "Email",
      desc: language === "es" 
        ? "Respondo  rapido como un \"npm run build..\"" 
        : "I respond as fast as \"npm run build..\"",
      detail: personalInfo.email,
      link: `mailto:${personalInfo.email}`,
      bgColor: "transparent",
      textColor: "#ffffff",
      iconColor: "#ffffff",
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      desc: language === "es" ? "Para consultas rapidas!" : "For quick inquiries!",
      detail: personalInfo.phone,
      link: `https://wa.me/${personalInfo.phone.replace(/\s/g, '')}`,
      bgColor: "transparent",
      textColor: "#ffffff",
      iconColor: "#ffffff",
    },
    {
      icon: MapPin,
      title: language === "es" ? "Ubicacion" : "Location",
      desc: language === "es" ? "Actualmente en" : "Currently in",
      detail: personalInfo.location,
      bgColor: "transparent",
      textColor: "#ffffff",
      iconColor: "#ffffff",
    },
  ];

  return (
    <section 
      id="contact" 
      className="py-12"
      style={{ backgroundColor: "#0e1524" }}
    >
      <div className="max-w-[844px] mx-auto px-6">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-base text-white mb-8"
          style={{ fontFamily: "Inter, sans-serif" }}
        >
          {language === "es" ? "Contacto" : "Contact"}
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {contactCards.map((card, index) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="p-4"
            >
              <div className="flex flex-col items-center text-center">
                <div 
                  className="w-6 h-6 mb-3"
                  style={{ color: card.iconColor }}
                >
                  <card.icon className="w-6 h-6" />
                </div>
                <h3 
                  className="text-[10px] mb-2"
                  style={{ color: card.textColor, fontFamily: "Inter, sans-serif" }}
                >
                  {card.title}
                </h3>
                <p 
                  className="text-[10px] mb-3"
                  style={{ color: card.textColor, fontFamily: "Inter, sans-serif" }}
                >
                  {card.desc}
                </p>
                {card.link ? (
                  <a 
                    href={card.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-1 rounded-[5px] text-sm"
                    style={{ 
                      backgroundColor: card.bgColor, 
                      color: card.textColor,
                      fontFamily: "Inter, sans-serif"
                    }}
                  >
                    {card.detail}
                  </a>
                ) : (
                  <p 
                    className="text-sm"
                    style={{ color: card.textColor, fontFamily: "Inter, sans-serif" }}
                  >
                    {card.detail}
                  </p>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;