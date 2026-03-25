import { motion } from "framer-motion";
import { Sparkles, Swords, Shield, Wand2, Brain } from "lucide-react";
import { useLanguage } from "@/context/language";
import { getCvData } from "@/data/cv-2";

const RpgProfileCard = () => {
  const { language } = useLanguage();
  const { personalInfo } = getCvData(language);

  const stats = [
    { icon: Swords, labelEs: "Front-End", labelEn: "Front-End", value: 92 },
    { icon: Shield, labelEs: "Back-End", labelEn: "Back-End", value: 87 },
    { icon: Wand2, labelEs: "UI/UX", labelEn: "UI/UX", value: 82 },
    { icon: Brain, labelEs: "Estrategia", labelEn: "Strategy", value: 85 },
  ];

  return (
    <section className="section-padding">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rpg-profile"
        >
          <div className="rpg-profile__header">
            <div>
              <p className="rpg-profile__subtitle">
                {language === "es" ? "Hoja de Aventurero" : "Adventurer Sheet"}
              </p>
              <h3 className="rpg-profile__title">{personalInfo.name}</h3>
              <p className="rpg-profile__role">{personalInfo.title}</p>
            </div>
            <Sparkles className="w-6 h-6 text-primary" />
          </div>

          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="rpg-profile__pane">
              <dl className="space-y-2 text-sm text-muted-foreground">
                <div className="flex justify-between">
                  <dt>{language === "es" ? "Ubicación" : "Location"}</dt>
                  <dd>{personalInfo.location}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{language === "es" ? "Disponibilidad" : "Availability"}</dt>
                  <dd>{personalInfo.availability}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{language === "es" ? "Email" : "Email"}</dt>
                  <dd>{personalInfo.email}</dd>
                </div>
                <div className="flex justify-between">
                  <dt>{language === "es" ? "LinkedIn" : "LinkedIn"}</dt>
                  <dd>{personalInfo.linkedin.replace("https://", "")}</dd>
                </div>
              </dl>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat) => (
                <div key={stat.labelEn} className="rpg-profile__stat">
                  <stat.icon className="w-4 h-4" />
                  <div>
                    <p className="text-xs uppercase tracking-widest text-muted-foreground/70">
                      {language === "es" ? stat.labelEs : stat.labelEn}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-white/10 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-glow-secondary"
                          style={{ width: `${stat.value}%` }}
                        />
                      </div>
                      <span className="text-sm font-semibold text-primary/80">{stat.value}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default RpgProfileCard;
