import { motion } from "framer-motion";

const navItems = ["About", "Education", "Skills", "Projects", "Resume", "Certificates", "Contact"];

const Navbar = () => {
  const scrollTo = (id: string) => {
    document.getElementById(id.toLowerCase())?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -80 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/30 backdrop-blur-xl"
    >
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <span className="text-lg font-bold gradient-text cursor-pointer" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          Krupal Fataniya
        </span>
        <div className="hidden md:flex gap-6">
          {navItems.map((item) => (
            <button
              key={item}
              onClick={() => scrollTo(item)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
