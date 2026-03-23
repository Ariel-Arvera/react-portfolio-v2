import { Github, Linkedin, Twitter } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border/50 py-8">
    <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-4">
      <div>
        <p className="font-bold gradient-text text-lg">Krupal Fataniya</p>
        <p className="text-xs text-muted-foreground">Full Stack Developer • Computer Engineering Student</p>
      </div>
      <div className="flex gap-4">
        {[
          { icon: Github, url: "https://github.com/krupal-036" },
          { icon: Linkedin, url: "https://linkedin.com/in/krupal-fataniya" },
          { icon: Twitter, url: "#" },
        ].map(({ icon: Icon, url }, i) => (
          <a
            key={i}
            href={url}
            target="_blank"
            rel="noreferrer"
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Icon className="w-5 h-5" />
          </a>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">© 2025 Krupal Fataniya. All rights reserved.</p>
    </div>
  </footer>
);

export default Footer;
