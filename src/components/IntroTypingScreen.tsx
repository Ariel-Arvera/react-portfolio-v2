import { useEffect, useState } from "react";

const SCRAMBLE_CHARACTERS = "!<>-_\\/[]{}—=+*^?#________0123456789";
const INTRO_TEXT = "Ariel.Vera :: DevPortfolio";

const IntroTypingScreen = () => {
  const [displayText, setDisplayText] = useState(" ");

  useEffect(() => {
    const queue = INTRO_TEXT.split("").map((char) => {
      const start = Math.floor(Math.random() * 18);
      const end = start + Math.floor(Math.random() * 18) + 14;
      return { to: char, start, end };
    });

    let frame = 0;
    let rafId: number;

    const update = () => {
      let output = "";
      let complete = 0;

      queue.forEach((item) => {
        if (frame >= item.end) {
          output += item.to;
          complete += 1;
          return;
        }

        if (frame >= item.start) {
          const randomChar = SCRAMBLE_CHARACTERS[Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)];
          output += randomChar;
        } else {
          output += " ";
        }
      });

      setDisplayText(output);
      frame += 1;

      if (complete < queue.length) {
        rafId = window.requestAnimationFrame(update);
      } else {
        setDisplayText(INTRO_TEXT);
      }
    };

    rafId = window.requestAnimationFrame(update);
    return () => window.cancelAnimationFrame(rafId);
  }, []);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#050505]">
      <p className="intro-typing-text" data-text={displayText}>
        {displayText}
      </p>
    </div>
  );
};

export default IntroTypingScreen;
