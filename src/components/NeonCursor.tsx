import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const sectionColors: Record<string, string> = {
  hero: "#f8ff3d",
  about: "#00ffff",
  projects: "#ff47d1",
  contact: "#70ff4d",
};

const trackSections = ["hero", "about", "projects", "contact"];

const NeonCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const rawX = useMotionValue(-100);
  const rawY = useMotionValue(-100);
  const x = useSpring(rawX, { stiffness: 1100, damping: 70, mass: 0.12 });
  const y = useSpring(rawY, { stiffness: 1100, damping: 70, mass: 0.12 });

  useEffect(() => {
    if (typeof window === "undefined") return;
    const media = window.matchMedia("(pointer: fine)");
    const update = () => setEnabled(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!enabled) return;
    document.body.classList.add("neon-cursor");
    return () => {
      document.body.classList.remove("neon-cursor");
    };
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;

    const onMove = (event: MouseEvent) => {
      rawX.set(event.clientX - 7);
      rawY.set(event.clientY - 7);
    };

    const onDown = () => {
      setIsClicking(true);
      window.setTimeout(() => setIsClicking(false), 180);
    };

    const updateSection = () => {
      const probe = window.scrollY + window.innerHeight * 0.4;
      let current = "hero";

      for (const id of trackSections) {
        const section = document.getElementById(id);
        if (!section) continue;
        const start = section.offsetTop;
        const end = start + section.offsetHeight;
        if (probe >= start && probe < end) {
          current = id;
          break;
        }
      }

      setActiveSection(current);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("scroll", updateSection, { passive: true });
    window.addEventListener("resize", updateSection);
    updateSection();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("resize", updateSection);
    };
  }, [enabled, rawX, rawY]);

  const color = useMemo(() => sectionColors[activeSection] ?? sectionColors.hero, [activeSection]);

  if (!enabled) return null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      animate={{
        scale: isClicking ? 2.4 : 1,
        backgroundColor: color,
        boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
      }}
      transition={{ type: "spring", stiffness: 700, damping: 34, mass: 0.18 }}
      style={{ x, y, width: 14, height: 14, borderRadius: 9999 }}
    />
  );
};

export default NeonCursor;
