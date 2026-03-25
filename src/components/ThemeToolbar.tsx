import { useEffect, useState } from "react";
import { Palette, Paintbrush, Pointer, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/context/language";

type ComponentTheme = {
  primary: string;
  glowSecondary: string;
};

type BackgroundTheme = {
  background: string;
  card: string;
  secondary: string;
  muted: string;
};

const componentThemes: ComponentTheme[] = [
  { primary: "190 100% 50%", glowSecondary: "260 100% 65%" },
  { primary: "45 100% 55%", glowSecondary: "18 100% 60%" },
  { primary: "142 76% 48%", glowSecondary: "190 100% 50%" },
  { primary: "330 100% 63%", glowSecondary: "270 90% 68%" },
  { primary: "210 100% 58%", glowSecondary: "180 100% 50%" },
];

const backgroundThemes: BackgroundTheme[] = [
  { background: "220 20% 6%", card: "220 18% 10%", secondary: "220 15% 15%", muted: "220 15% 15%" },
  { background: "222 28% 8%", card: "222 24% 13%", secondary: "222 18% 18%", muted: "222 18% 18%" },
  { background: "204 36% 7%", card: "204 30% 12%", secondary: "204 20% 18%", muted: "204 20% 18%" },
  { background: "280 16% 8%", card: "280 14% 13%", secondary: "280 10% 18%", muted: "280 10% 18%" },
  { background: "18 16% 8%", card: "18 14% 13%", secondary: "18 10% 18%", muted: "18 10% 18%" },
];

const applyComponentTheme = (theme: ComponentTheme) => {
  const root = document.documentElement;
  root.style.setProperty("--primary", theme.primary);
  root.style.setProperty("--accent", theme.primary);
  root.style.setProperty("--ring", theme.primary);
  root.style.setProperty("--glow", theme.primary);
  root.style.setProperty("--glow-secondary", theme.glowSecondary);
};

const applyBackgroundTheme = (theme: BackgroundTheme) => {
  const root = document.documentElement;
  root.style.setProperty("--background", theme.background);
  root.style.setProperty("--card", theme.card);
  root.style.setProperty("--popover", theme.card);
  root.style.setProperty("--secondary", theme.secondary);
  root.style.setProperty("--muted", theme.muted);
};

type CursorShape = "circle" | "star" | "moon" | "sun" | "dolphin" | "cow" | "shovel" | "banana" | "gun";

const cursorShapes: { id: CursorShape; label: string; symbol: string }[] = [
  { id: "circle", label: "Dot", symbol: "●" },
  { id: "star", label: "Star", symbol: "★" },
  { id: "moon", label: "Moon", symbol: "🌙" },
  { id: "sun", label: "Sun", symbol: "☀️" },
  { id: "dolphin", label: "Dolphin", symbol: "🐬" },
  { id: "cow", label: "Cow", symbol: "🐮" },
  { id: "shovel", label: "Shovel", symbol: "⛏️" },
  { id: "banana", label: "Banana", symbol: "🍌" },
  { id: "gun", label: "Pistol", symbol: "🔫" },
];

const ThemeToolbar = () => {
  const { language } = useLanguage();
  const [componentIndex, setComponentIndex] = useState(1);
  const [backgroundIndex, setBackgroundIndex] = useState(0);
  const [cursorShape, setCursorShape] = useState<CursorShape>("circle");
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const savedComponent = Number(localStorage.getItem("componentThemeIndex") ?? 1);
    const savedBackground = Number(localStorage.getItem("backgroundThemeIndex") ?? 0);
    const savedCursor = (localStorage.getItem("cursorShape") as CursorShape | null) ?? "circle";
    const savedVisibility = localStorage.getItem("toolbarVisible");
    const component = Number.isInteger(savedComponent) ? Math.max(0, Math.min(savedComponent, componentThemes.length - 1)) : 0;
    const background = Number.isInteger(savedBackground) ? Math.max(0, Math.min(savedBackground, backgroundThemes.length - 1)) : 0;
    setComponentIndex(component);
    setBackgroundIndex(background);
    applyComponentTheme(componentThemes[component]);
    applyBackgroundTheme(backgroundThemes[background]);
    if (savedCursor && cursorShapes.some((shape) => shape.id === savedCursor)) {
      setCursorShape(savedCursor);
    }
    if (savedVisibility !== null) {
      setIsVisible(savedVisibility === "true");
    }
  }, []);

  const handleComponentChange = (index: number) => {
    setComponentIndex(index);
    applyComponentTheme(componentThemes[index]);
    localStorage.setItem("componentThemeIndex", String(index));
  };

  const handleBackgroundChange = (index: number) => {
    setBackgroundIndex(index);
    applyBackgroundTheme(backgroundThemes[index]);
    localStorage.setItem("backgroundThemeIndex", String(index));
  };

  const handleCursorChange = (shape: CursorShape) => {
    setCursorShape(shape);
    localStorage.setItem("cursorShape", shape);
    window.dispatchEvent(new CustomEvent("cursor-shape-change", { detail: { shape } }));
  };

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
    localStorage.setItem("toolbarVisible", String(!isVisible));
  };

  return (
    <>
      <button
        type="button"
        aria-label={isVisible ? "Hide toolbar" : "Show toolbar"}
        onClick={toggleVisibility}
        className={`fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[60] rounded-full border border-border/60 bg-card/90 backdrop-blur shadow-xl flex items-center gap-2 px-3 py-2 transition-all duration-300 hover:bg-secondary ${!isVisible ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <span className="text-xs text-muted-foreground whitespace-nowrap">{language === "es" ? "Mostrar" : "Show"}</span>
        <ChevronRight className="w-4 h-4" />
      </button>
      <aside className={`fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-3 rounded-xl border border-border/60 bg-card/90 backdrop-blur p-3 shadow-xl transition-all duration-300 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"}`}>
      <button
        type="button"
        aria-label="Hide toolbar"
        onClick={toggleVisibility}
        className="absolute -left-16 top-1/2 -translate-y-1/2 rounded-full border border-border/60 bg-card flex items-center gap-1 px-2 py-1 hover:bg-secondary transition-colors"
      >
        <ChevronLeft className="w-3 h-3" />
        <span className="text-xs text-muted-foreground whitespace-nowrap">{language === "es" ? "Ocultar" : "Hide"}</span>
      </button>
      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        <Palette className="w-3.5 h-3.5" /> UI
      </div>
      <div className="flex flex-col gap-2">
        {componentThemes.map((theme, index) => (
          <button
            key={`component-${index}`}
            type="button"
            aria-label={`Component color ${index + 1}`}
            onClick={() => handleComponentChange(index)}
            className={`h-6 w-6 rounded-full border ${componentIndex === index ? "border-white" : "border-white/20"}`}
            style={{ background: `linear-gradient(135deg, hsl(${theme.primary}), hsl(${theme.glowSecondary}))` }}
          />
        ))}
      </div>

      <div className="h-px bg-border/60" />

      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        <Paintbrush className="w-3.5 h-3.5" /> BG
      </div>
      <div className="flex flex-col gap-2">
        {backgroundThemes.map((theme, index) => (
          <button
            key={`bg-${index}`}
            type="button"
            aria-label={`Background color ${index + 1}`}
            onClick={() => handleBackgroundChange(index)}
            className={`h-6 w-6 rounded-full border ${backgroundIndex === index ? "border-white" : "border-white/20"}`}
            style={{ background: `linear-gradient(135deg, hsl(${theme.background}), hsl(${theme.card}))` }}
          />
        ))}
      </div>

      <div className="h-px bg-border/60" />

      <div className="flex items-center gap-2 text-xs text-muted-foreground uppercase tracking-wider">
        <Pointer className="w-3.5 h-3.5" /> Cursor
      </div>
      <div className="grid grid-cols-3 gap-2">
        {cursorShapes.map((shape) => (
          <button
            key={shape.id}
            type="button"
            aria-label={`Cursor ${shape.label}`}
            onClick={() => handleCursorChange(shape.id)}
            className={`h-8 rounded-md border text-sm flex items-center justify-center transition ${cursorShape === shape.id ? "border-white text-white" : "border-white/20 text-muted-foreground"}`}
          >
            {shape.symbol}
          </button>
        ))}
      </div>
    </aside>
    </>
  );
};

export default ThemeToolbar;
