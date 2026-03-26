import { motion } from "framer-motion";
import { Linkedin, Mail, Phone } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const Footer = () => {
  const { language } = useLanguage();
  const { personalInfo } = getCvData(language);

  return (
    <footer 
      className="py-8"
      style={{ backgroundColor: "#16203d" }}
    >
      <div className="max-w-[844px] mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h3 
              className="text-base text-white mb-1"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {personalInfo.name}
            </h3>
            <p 
              className="text-xs text-white"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              {language === "es" ? "Desarrollador Web Fullstack / UI-UX" : "Fullstack Web Developer / UI-UX"}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <a 
              href={`mailto:${personalInfo.email}`}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Email"
            >
              <Mail className="w-5 h-5" />
            </a>
            <a 
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-white hover:text-white/80 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a 
              href={`tel:${personalInfo.phone.replace(/\s/g, '')}`}
              className="text-white hover:text-white/80 transition-colors"
              aria-label="Phone"
            >
              <Phone className="w-5 h-5" />
            </a>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            className="text-xs text-white"
            style={{ fontFamily: "Inter, sans-serif" }}
          >
            © 2026 {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;