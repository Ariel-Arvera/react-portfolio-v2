import { useEffect, useMemo, useState } from "react";
import { motion, useMotionValue } from "framer-motion";

const sectionColors: Record<string, string> = {
  hero: "#f8ff3d",
  about: "#00ffff",
  contact: "#70ff4d",
};

const trackSections = ["hero", "about", "contact"];

type CursorShape = "circle" | "star" | "cow" | "gun";

const cursorShapeEmojis: Record<Exclude<CursorShape, "circle">, string> = {
  star: "★",
  cow: "🐮",
  gun: "🚀",
};

const NeonCursor = () => {
  const [enabled, setEnabled] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isRightClick, setIsRightClick] = useState(false);
  const [showCowMoo, setShowCowMoo] = useState(false);
  const [gunShot, setGunShot] = useState(false);
  const [activeSection, setActiveSection] = useState("hero");
  const [cursorShape, setCursorShape] = useState<CursorShape>("circle");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);

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
      x.set(adjustedX - 7);
      y.set(adjustedY - 7);
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
  }, [enabled, cursorShape]);

  const color = useMemo(() => sectionColors[activeSection] ?? sectionColors.hero, [activeSection]);

  if (!enabled) return null;

  const isEmojiShape = cursorShape !== "circle";
  const emoji = isEmojiShape ? cursorShapeEmojis[cursorShape as Exclude<CursorShape, "circle">] : null;

  const hiddenShapes = ["banana", "shovel"];
  const shouldHideCursor = isEmojiShape && hiddenShapes.includes(cursorShape);

  if (shouldHideCursor) return null;

  const rightClickScale = 3;
  const rightClickScaleEmoji = 1.8;

  const getEmojiAnimation = () => {
    const baseScale = isClicking ? 1.4 : 1;
    const rightClickScaleVal = isRightClick ? rightClickScaleEmoji : 1;

    switch (cursorShape) {
      case "star":
        return {
          scale: isRightClick ? 1 : baseScale,
          rotate: isRightClick ? 360 : 0,
          textShadow: `0 0 18px ${color}, 0 0 30px ${color}`,
        };
      case "gun":
        return {
          scale: isRightClick ? 1.3 : baseScale,
          rotate: isRightClick ? -20 : 0,
          textShadow: `0 0 18px ${color}, 0 0 30px ${color}`,
        };
      default:
        return {
          scale: isRightClick ? rightClickScaleEmoji : baseScale,
          textShadow: `0 0 18px ${color}, 0 0 30px ${color}`,
        };
    }
  };

  const emojiAnimation = isEmojiShape ? getEmojiAnimation() : {};

  return (
    <>
      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[9999]"
        animate={
          isEmojiShape
            ? emojiAnimation
            : {
                scale: isRightClick ? rightClickScale : isClicking ? 2.4 : 1,
                backgroundColor: color,
                boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
                borderRadius: isRightClick ? "50% 50% 50% 50% / 60% 60% 40% 40%" : 9999,
              }
        }
        transition={{
          rotate: cursorShape === "star" ? { duration: 1, repeat: Infinity, ease: "linear" } : { type: "spring", stiffness: 700, damping: 34, mass: 0.18 },
          scale: { type: "spring", stiffness: 700, damping: 34, mass: 0.18 },
          textShadow: { duration: 0.2 },
          boxShadow: { duration: 0.2 },
          backgroundColor: { duration: 0.2 },
        }}
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
          color: color,
        }}
      >
        {emoji}
      </motion.div>
      {showCowMoo && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed z-[9999] text-white text-sm font-bold px-3 py-1.5 rounded-full"
          style={{
            left: x.get() + 20,
            top: y.get() - 25,
            backgroundColor: color,
            boxShadow: `0 0 12px ${color}`,
          }}
        >
          Moo!
        </motion.div>
      )}
      {gunShot && (
        <motion.div
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.5 }}
          transition={{ duration: 0.3 }}
          className="pointer-events-none fixed z-[9998] rounded-full"
          style={{
            left: x.get() - 10,
            top: y.get() - 10,
            width: 40,
            height: 40,
            backgroundColor: "#ff4444",
            boxShadow: `0 0 20px #ff0000, 0 0 40px #ff8800`,
          }}
        />
      )}
    </>
  );
};

export default NeonCursor;
