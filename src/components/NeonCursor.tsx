import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const sectionColors: Record<string, string> = {
  hero: "#f8ff3d",
  about: "#00ffff",
  contact: "#70ff4d",
};

const trackSections = ["hero", "about", "contact"];

type CursorShape = "circle" | "star" | "moon" | "sun" | "dolphin" | "cow" | "shovel" | "banana" | "gun";

const cursorShapeEmojis: Record<Exclude<CursorShape, "circle">, string> = {
  star: "★",
  moon: "🌙",
  sun: "☀️",
  dolphin: "🐬",
  cow: "🐮",
  shovel: "⛏️",
  banana: "🍌",
  gun: "🔫",
};

const NeonCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [cursorShape, setCursorShape] = useState<CursorShape>("circle");
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
    const savedShape = localStorage.getItem("cursorShape") as CursorShape | null;
    if (savedShape && (savedShape === "circle" || cursorShapeEmojis[savedShape as Exclude<CursorShape, "circle">])) {
      setCursorShape(savedShape);
    }

    const handleShapeChange = (event: CustomEvent<{ shape: CursorShape }>) => {
      const shape = event.detail.shape;
      setCursorShape(shape);
      localStorage.setItem("cursorShape", shape);
    };

    window.addEventListener("cursor-shape-change", handleShapeChange as EventListener);
    return () => window.removeEventListener("cursor-shape-change", handleShapeChange as EventListener);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const readDocumentZoom = () => {
      if (typeof window === "undefined" || typeof document === "undefined") return 1;
      const html = document.documentElement;
      const inline = html.style.zoom;
      if (inline) {
        const parsed = Number.parseFloat(inline);
        if (!Number.isNaN(parsed) && parsed > 0) return parsed;
      }
      const computed = window.getComputedStyle(html).getPropertyValue("zoom");
      const parsed = Number.parseFloat(computed);
      if (!Number.isNaN(parsed) && parsed > 0) return parsed;
      return 1;
    };

    let zoomRatio = readDocumentZoom();

    const refreshZoom = () => {
      zoomRatio = readDocumentZoom();
    };

    const onMove = (event: MouseEvent) => {
      const adjustedX = zoomRatio ? event.clientX / zoomRatio : event.clientX;
      const adjustedY = zoomRatio ? event.clientY / zoomRatio : event.clientY;
      rawX.set(adjustedX - 7);
      rawY.set(adjustedY - 7);
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
    window.addEventListener("resize", refreshZoom);
    const zoomObserver = new MutationObserver(refreshZoom);
    zoomObserver.observe(document.documentElement, { attributes: true, attributeFilter: ["style", "class"] });
    refreshZoom();
    updateSection();

    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("scroll", updateSection);
      window.removeEventListener("resize", updateSection);
      window.removeEventListener("resize", refreshZoom);
      zoomObserver.disconnect();
    };
  }, [enabled, rawX, rawY]);

  const color = useMemo(() => sectionColors[activeSection] ?? sectionColors.hero, [activeSection]);

  if (!enabled) return null;

  const isEmojiShape = cursorShape !== "circle";
  const emoji = isEmojiShape ? cursorShapeEmojis[cursorShape as Exclude<CursorShape, "circle">] : null;

  return (
    <motion.div
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      animate={
        isEmojiShape
          ? { scale: isClicking ? 1.4 : 1, color: color, textShadow: `0 0 18px ${color}, 0 0 30px ${color}` }
          : { scale: isClicking ? 2.4 : 1, backgroundColor: color, boxShadow: `0 0 12px ${color}, 0 0 24px ${color}` }
      }
      transition={{ type: "spring", stiffness: 700, damping: 34, mass: 0.18 }}
      style={{
        x,
        y,
        width: isEmojiShape ? 28 : 14,
        height: isEmojiShape ? 28 : 14,
        borderRadius: isEmojiShape ? 0 : 9999,
        fontSize: 20,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {emoji}
    </motion.div>
  );
};

export default NeonCursor;
