import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Code, Brain, Smartphone, Cloud, Database, Plug, FolderKanban, Users, Rocket } from "lucide-react";

const highlights = [
  { icon: Code, label: "Full Stack Development" },
  { icon: Brain, label: "AI Enthusiast" },
  { icon: Smartphone, label: "Responsive Design" },
  { icon: Cloud, label: "Cloud Integration" },
  { icon: Database, label: "Database Management" },
  { icon: Plug, label: "API Integration" },
  { icon: FolderKanban, label: "Project Architecture" },
  { icon: Users, label: "Team Collaboration" },
  { icon: Rocket, label: "Scalable Solutions" },
];

const AboutSection = () => {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section id="about" className="section-padding">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="flex flex-col md:flex-row gap-12 items-center"
        >
          <div className="md:w-1/3 flex justify-center">
            <div className="w-48 h-48 md:w-56 md:h-56 rounded-2xl overflow-hidden border-2 border-primary/30 box-glow">
              <img
                src="https://krupal.vercel.app/assets/img/profile_pic.jpg"
                alt="Krupal Fataniya"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="md:w-2/3">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 gradient-text">About Me</h2>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              Hi, I'm Krupal Fataniya, a passionate Computer Engineering student with a strong enthusiasm
              for web development. I specialize in creating beautiful, functional, and user-centric web applications.
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">
              With a strong foundation in both front-end and back-end technologies, I enjoy tackling challenges
              and continuously learning to build seamless digital experiences, optimize performance, and
              implement innovative features.
            </p>
            <p className="text-muted-foreground mb-8 leading-relaxed">
              Currently exploring advancements in AI/ML and how they can be integrated into web
              applications to create smarter, more intuitive user interactions.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {highlights.map(({ icon: Icon, label }, i) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isVisible ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.3 + i * 0.06 }}
                  className="flex items-center gap-2 glass-card px-3 py-2 text-sm"
                >
                  <Icon className="w-4 h-4 text-primary shrink-0" />
                  <span className="text-foreground/80">{label}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
