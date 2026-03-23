import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { GraduationCap, Award, Clock, Lightbulb, BookOpen, TrendingUp } from "lucide-react";

const educationData = [
  {
    year: "2023 - Present",
    degree: "Bachelor of Engineering",
    institution: "SAL Engineering and Technical Institute",
    field: "Computer Engineering",
    cgpa: "8.33",
    fill: 85,
    tags: ["Data Structures", "Algorithms", "Database Management", "Web Technologies"],
  },
  {
    year: "2020 - 2023",
    degree: "Diploma in Computer Engineering",
    institution: "Government Polytechnic Ahmedabad",
    field: "Computer Engineering",
    cgpa: "7.67",
    fill: 78,
    tags: ["Programming Fundamentals", "Database Concepts", "Basic Web Development"],
  },
];

const stats = [
  { icon: GraduationCap, value: "2", label: "Degrees" },
  { icon: Clock, value: "6+", label: "Years" },
  { icon: Award, value: "8.0+", label: "Avg CGPA" },
  { icon: Lightbulb, value: "10+", label: "Key Skills" },
];

const EducationSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="education" className="section-padding bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          My Education
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {educationData.map((edu, i) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.15 }}
              className="glass-card p-6 hover:box-glow transition-all duration-500 group"
            >
              <div className="flex items-center justify-between mb-4">
                <GraduationCap className="w-8 h-8 text-primary group-hover:scale-110 transition-transform" />
                <span className="text-sm text-primary font-mono">{edu.year}</span>
              </div>
              <h3 className="text-xl font-bold text-foreground mb-1">{edu.degree}</h3>
              <h4 className="text-sm text-muted-foreground mb-4">{edu.institution}</h4>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" /> {edu.field}</span>
                <span className="flex items-center gap-1"><TrendingUp className="w-3 h-3" /> {edu.cgpa} CGPA</span>
              </div>
              <div className="flex flex-wrap gap-2 mb-4">
                {edu.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full">{tag}</span>
                ))}
              </div>
              <div className="w-full h-2 bg-secondary rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={isVisible ? { width: `${edu.fill}%` } : {}}
                  transition={{ delay: 0.5, duration: 1, ease: "easeOut" }}
                  className="h-full bg-gradient-to-r from-primary to-glow-secondary rounded-full"
                />
              </div>
              <p className="text-right text-xs text-muted-foreground mt-1">{edu.cgpa} CGPA</p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map(({ icon: Icon, value, label }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isVisible ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.1 }}
              className="glass-card p-5 text-center group hover:box-glow transition-all"
            >
              <Icon className="w-6 h-6 text-primary mx-auto mb-2 group-hover:scale-110 transition-transform" />
              <p className="text-2xl font-bold text-foreground">{value}</p>
              <p className="text-sm text-muted-foreground">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
