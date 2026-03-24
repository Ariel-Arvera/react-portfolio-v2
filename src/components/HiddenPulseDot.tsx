import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useInteractivity } from "@/context/interactivity";

const HiddenPulseDot = () => {
  const { hiddenDot, moveHiddenDot, markHiddenDotFound } = useInteractivity();
  const [isCelebrating, setIsCelebrating] = useState(false);

  useEffect(() => {
    if (!hiddenDot.initialized) {
      moveHiddenDot();
    }
  }, [hiddenDot.initialized, moveHiddenDot]);

  if (typeof window === "undefined") return null;

  const handleFound = () => {
    if (isCelebrating) return;
    setIsCelebrating(true);
    markHiddenDotFound();

    window.setTimeout(() => {
      setIsCelebrating(false);
      moveHiddenDot();
    }, 1400);
  };

  return (
    <motion.button
      type="button"
      aria-label="Punto secreto"
      className="fixed w-4 h-4 rounded-full pointer-events-auto"
      style={{
        left: hiddenDot.x,
        top: hiddenDot.y,
        transform: "translate(-50%, -50%)",
        opacity: hiddenDot.initialized ? 0.35 : 0,
        mixBlendMode: isCelebrating ? "normal" : "screen",
        zIndex: isCelebrating ? 140 : 12,
      }}
      initial={false}
      animate={{
        backgroundColor: hiddenDot.color,
        scale: isCelebrating ? [1, 2.2, 1.1] : [1, 1.3, 1],
        boxShadow: isCelebrating
          ? `0 0 22px ${hiddenDot.color}, 0 0 36px ${hiddenDot.color}`
          : `0 0 10px ${hiddenDot.color}`,
      }}
      transition={{ duration: isCelebrating ? 0.45 : 2, repeat: isCelebrating ? 0 : Infinity, repeatType: "mirror" }}
      onClick={(event) => {
        event.stopPropagation();
        handleFound();
      }}
      onMouseEnter={(event) => {
        event.stopPropagation();
        handleFound();
      }}
    >
      <AnimatePresence>
        {isCelebrating ? (
          <motion.span
            key="exclaim"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: -10 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.4 }}
            className="absolute left-1/2 -translate-x-1/2 -top-6 text-xs font-bold text-primary"
          >
            !
          </motion.span>
        ) : null}
      </AnimatePresence>
    </motion.button>
  );
};

export default HiddenPulseDot;
