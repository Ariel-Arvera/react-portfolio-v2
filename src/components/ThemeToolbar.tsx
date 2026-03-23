import { useEffect, useState } from "react";
import { Palette, Paintbrush } from "lucide-react";

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

const ThemeToolbar = () => {
  const [componentIndex, setComponentIndex] = useState(1);
  const [backgroundIndex, setBackgroundIndex] = useState(0);

  useEffect(() => {
    const savedComponent = Number(localStorage.getItem("componentThemeIndex") ?? 1);
    const savedBackground = Number(localStorage.getItem("backgroundThemeIndex") ?? 0);
    const component = Number.isInteger(savedComponent) ? Math.max(0, Math.min(savedComponent, componentThemes.length - 1)) : 0;
    const background = Number.isInteger(savedBackground) ? Math.max(0, Math.min(savedBackground, backgroundThemes.length - 1)) : 0;
    setComponentIndex(component);
    setBackgroundIndex(background);
    applyComponentTheme(componentThemes[component]);
    applyBackgroundTheme(backgroundThemes[background]);
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

  return (
    <aside className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-[60] flex flex-col gap-3 rounded-xl border border-border/60 bg-card/90 backdrop-blur p-3 shadow-xl">
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
    </aside>
  );
};

export default ThemeToolbar;
