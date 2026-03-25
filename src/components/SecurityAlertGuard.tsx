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
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[140] w-[min(92vw,560px)]"
          role="alert"
          aria-live="assertive"
        >
          <div className="rounded-2xl border border-red-500/40 bg-black/80 p-4 md:p-5 shadow-[0_0_40px_rgba(255,0,0,0.35)] backdrop-blur">
            {activeMessage.split("\n").map((line, index) => (
              <p
                key={line}
                className={`text-center leading-relaxed ${
                  index === 0 ? "text-red-400 text-sm md:text-base font-semibold tracking-wide" : "text-red-200 text-xs md:text-sm"
                }`}
              >
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
