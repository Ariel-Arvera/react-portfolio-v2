import { Linkedin, Mail, Phone } from "lucide-react";
import { getCvData } from "@/data/cv-2";
import { useLanguage } from "@/context/language";

const Footer = () => {
  const { language } = useLanguage();
  const { personalInfo } = getCvData(language);

  return (
    <footer className="border-t border-border/50 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <p className="font-bold gradient-text text-lg">{personalInfo.name}</p>
          <p className="text-xs text-muted-foreground">{personalInfo.title} • {personalInfo.location}</p>
        </div>
        <div className="flex gap-4">
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
              className="text-muted-foreground hover:text-primary transition-colors hover:-translate-y-0.5"
            >
              <Icon className="w-5 h-5" />
            </a>
          ))}
        </div>
        <p className="text-xs text-muted-foreground">
          © 2025 {personalInfo.name}. {language === "es" ? "Todos los derechos reservados." : "All rights reserved."}
        </p>
      </div>
    </footer>
  );
};

export default Footer;
