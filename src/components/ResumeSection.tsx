import { motion } from "framer-motion";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
import { Download, FileText, Printer, RefreshCw, Briefcase, Code, GraduationCap } from "lucide-react";
import { useState } from "react";

const ResumeSection = () => {
  const { ref, isVisible } = useScrollAnimation();
  const [flipped, setFlipped] = useState(false);

  return (
    <section id="resume" className="section-padding bg-secondary/20">
      <div className="container mx-auto px-6" ref={ref}>
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          className="text-3xl md:text-4xl font-bold text-center mb-16 gradient-text"
        >
          My Resume
        </motion.h2>

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
                    <img src="https://krupal.vercel.app/assets/img/profile_pic.jpg" alt="Krupal" className="w-full h-full object-cover" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Krupal Fataniya</h3>
                  <p className="text-sm text-primary">Full Stack Developer</p>
                  <div className="mt-6 text-left w-full space-y-4">
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Education</p>
                      <p className="text-sm text-foreground">BE Computer Engineering</p>
                      <p className="text-xs text-muted-foreground">SAL Engineering • 2023-Present</p>
                      <p className="text-sm text-foreground mt-2">Diploma in CE</p>
                      <p className="text-xs text-muted-foreground">Govt Polytechnic • 2020-2023</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Experience</p>
                      <p className="text-sm text-foreground">Python & Django Intern</p>
                      <p className="text-xs text-muted-foreground">Radixweb • 2025</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground uppercase tracking-wider mb-2">Skills</p>
                      <div className="flex flex-wrap gap-1">
                        {["Django", "React", "Python"].map((s) => (
                          <span key={s} className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <h3 className="text-xl font-bold text-foreground mb-2">Download My Resume</h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    Get the complete PDF version of my resume with detailed information about my education, experience, projects, and skills.
                  </p>
                  <div className="flex flex-wrap gap-3 mb-6">
                    {[
                      { icon: FileText, label: "Professional Format" },
                      { icon: Printer, label: "Print Ready" },
                      { icon: RefreshCw, label: "Updated Regularly" },
                    ].map(({ icon: Icon, label }) => (
                      <div key={label} className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Icon className="w-4 h-4 text-primary" /> {label}
                      </div>
                    ))}
                  </div>
                  <a
                    href="https://krupal.vercel.app/assets/krupal_fataniya_resume.pdf"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:shadow-[0_0_30px_hsl(var(--primary)/0.4)] transition-all hover:scale-105"
                  >
                    <Download className="w-4 h-4" /> Download PDF
                  </a>
                  <p className="text-xs text-muted-foreground mt-4 cursor-pointer hover:text-primary" onClick={() => setFlipped(true)}>
                    Click to flip →
                  </p>
                </div>
              </div>
            </div>

            {/* Back */}
            <div className={`glass-card p-8 transition-all duration-700 ${!flipped ? "hidden" : ""}`}>
              <p className="text-xs text-primary uppercase tracking-widest mb-2">Development Journey</p>
              <h3 className="text-2xl font-bold text-foreground mb-4">My Professional Journey</h3>
              <p className="text-muted-foreground mb-8">
                With a strong foundation in computer engineering and hands-on experience in web development,
                I bring a unique blend of technical skills and creative problem-solving.
              </p>
              <div className="grid grid-cols-3 gap-4 mb-8">
                {[
                  { val: "4+", label: "Years in Dev" },
                  { val: "10+", label: "Projects" },
                  { val: "5+", label: "Frameworks" },
                ].map((s) => (
                  <div key={s.label} className="text-center">
                    <p className="text-2xl font-bold text-primary">{s.val}</p>
                    <p className="text-xs text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
              <h4 className="text-sm font-semibold text-foreground mb-3">Key Highlights</h4>
              <ul className="space-y-2 text-sm text-muted-foreground mb-6">
                {[
                  "Former Python & Django Intern at Radixweb",
                  "Final-Year Computer Engineering Student",
                  "Specializing in Full-Stack Development",
                  "Passionate about AI-Driven Web Integration",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full shrink-0" /> {item}
                  </li>
                ))}
              </ul>
              <p className="text-xs text-muted-foreground cursor-pointer hover:text-primary" onClick={() => setFlipped(false)}>
                ← Click to flip back
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResumeSection;
