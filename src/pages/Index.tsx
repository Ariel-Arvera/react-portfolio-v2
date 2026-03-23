import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import TechStackSection from "@/components/TechStackSection";
import EducationSection from "@/components/EducationSection";
import ProjectsSection from "@/components/ProjectsSection";
import ResumeSection from "@/components/ResumeSection";
import CertificatesSection from "@/components/CertificatesSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import ThemeToolbar from "@/components/ThemeToolbar";
import BackToTopButton from "@/components/BackToTopButton";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Navbar />
    <HeroSection />
    <AboutSection />
    <TechStackSection />
    <EducationSection />
    <ProjectsSection />
    <ResumeSection />
    <CertificatesSection />
    <ContactSection />
    <Footer />
    <ThemeToolbar />
    <BackToTopButton />
  </div>
);

export default Index;
