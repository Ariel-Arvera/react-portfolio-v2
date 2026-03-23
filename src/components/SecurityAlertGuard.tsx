import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const messages = [
  "Alerta de seguridad\n¡La curiosidad es una cualidad fantástica para un desarrollador! Pero este código es un poco tímido. Si quieres saber más, hablemos.",
  "Alerta de seguridad\n¡Explorar está en tu ADN de developer! Este código prefiere presentarse en confianza. Si te interesa, te cuento cada detalle.",
  "Alerta de seguridad\nTu curiosidad técnica suma muchísimo. Aquí protegemos el código con cariño. Si quieres ver más, conversemos y te lo explico.",
];

const SecurityAlertGuard = () => {
  const [activeMessage, setActiveMessage] = useState<string | null>(null);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    const showAlert = () => {
      const randomIndex = Math.floor(Math.random() * messages.length);
      setActiveMessage(messages[randomIndex]);

      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }

      timerRef.current = window.setTimeout(() => {
        setActiveMessage(null);
      }, 3000);
    };

    const handleContextMenu = (event: MouseEvent) => {
      event.preventDefault();
      showAlert();
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const blockedShortcut =
        event.key === "F12" ||
        (event.ctrlKey && event.shiftKey && ["I", "J", "C"].includes(event.key.toUpperCase())) ||
        (event.ctrlKey && event.key.toLowerCase() === "u");

      if (!blockedShortcut) return;

      event.preventDefault();
      showAlert();
    };

    window.addEventListener("contextmenu", handleContextMenu);
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("contextmenu", handleContextMenu);
      window.removeEventListener("keydown", handleKeyDown);
      if (timerRef.current) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <AnimatePresence>
      {activeMessage ? (
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -16, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          className="fixed top-5 left-1/2 -translate-x-1/2 z-[140] w-[min(92vw,640px)]"
          role="alert"
          aria-live="assertive"
        >
          <div className="glass-card border border-primary/35 bg-card/90 p-4 md:p-5 shadow-[0_0_30px_hsl(var(--primary)/0.3)]">
            {activeMessage.split("\n").map((line) => (
              <p key={line} className="text-sm md:text-base text-foreground leading-relaxed">
                {line}
              </p>
            ))}
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};

export default SecurityAlertGuard;
