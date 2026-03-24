import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { ReactNode } from "react";

export type AccentMode = "neon" | "calm" | "retro" | "sunset";

export const ACCENT_MODE_META: Record<AccentMode, { label: string; gradient: string; glow: string }> = {
  neon: {
    label: "Neón",
    gradient: "linear-gradient(120deg, #22d3ee, #d946ef, #6366f1)",
    glow: "0 0 18px rgba(34, 211, 238, 0.45)",
  },
  calm: {
    label: "Calma",
    gradient: "linear-gradient(120deg, #7dd3fc, #a5f3fc, #fef3c7)",
    glow: "0 0 16px rgba(125, 211, 252, 0.35)",
  },
  retro: {
    label: "Retro",
    gradient: "linear-gradient(120deg, #facc15, #fb7185, #f472b6)",
    glow: "0 0 16px rgba(250, 204, 21, 0.4)",
  },
  sunset: {
    label: "Atardecer",
    gradient: "linear-gradient(120deg, #f97316, #f43f5e, #a855f7)",
    glow: "0 0 18px rgba(249, 115, 22, 0.45)",
  },
};

type HiddenDotState = {
  x: number;
  y: number;
  color: string;
  anchorId: string | null;
  initialized: boolean;
  foundCount: number;
  lastMovedAt: number;
};

type InteractivityContextValue = {
  accentMode: AccentMode;
  setAccentMode: (mode: AccentMode) => void;
  heroBannerOpacity: number;
  setHeroBannerOpacity: (value: number) => void;
  heroParallaxIntensity: number;
  setHeroParallaxIntensity: (value: number) => void;
  hiddenDot: HiddenDotState;
  moveHiddenDot: () => void;
  markHiddenDotFound: () => void;
};

const InteractivityContext = createContext<InteractivityContextValue | null>(null);

const randomFromArray = <T,>(items: T[]): T => items[Math.floor(Math.random() * items.length)];

export const InteractivityProvider = ({ children }: { children: ReactNode }) => {
  const [accentMode, setAccentMode] = useState<AccentMode>(() => {
    if (typeof window === "undefined") return "neon";
    const stored = window.localStorage.getItem("accentMode");
    if (stored === "neon" || stored === "calm" || stored === "retro" || stored === "sunset") {
      return stored;
    }
    return "neon";
  });
  const [heroBannerOpacity, setHeroBannerOpacityState] = useState(0.68);
  const [heroParallaxIntensity, setHeroParallaxIntensityState] = useState(0.5);
  const [hiddenDot, setHiddenDot] = useState<HiddenDotState>({
    x: 80,
    y: 80,
    color: "#ff47d1",
    anchorId: null,
    initialized: false,
    foundCount: 0,
    lastMovedAt: Date.now(),
  });

  const persistAccent = useCallback((mode: AccentMode) => {
    if (typeof window === "undefined") return;
    window.localStorage.setItem("accentMode", mode);
  }, []);

  const setHeroBannerOpacity = useCallback((value: number) => {
    const clamped = Math.min(0.9, Math.max(0.25, value));
    setHeroBannerOpacityState(clamped);
  }, []);

  const setHeroParallaxIntensity = useCallback((value: number) => {
    const clamped = Math.min(1, Math.max(0, value));
    setHeroParallaxIntensityState(clamped);
  }, []);

  const moveHiddenDot = useCallback(() => {
    if (typeof window === "undefined" || typeof document === "undefined") return;

    window.requestAnimationFrame(() => {
      const candidates = Array.from(document.querySelectorAll<HTMLElement>("[data-hidden-dot-target='true']"));
      const fallbackX = window.innerWidth * (0.2 + Math.random() * 0.6);
      const fallbackY = window.scrollY + window.innerHeight * (0.2 + Math.random() * 0.6);
      const target = candidates.length ? randomFromArray(candidates) : null;

      let x = fallbackX + window.scrollX;
      let y = fallbackY;
      let anchorId: string | null = null;

      if (target) {
        const rect = target.getBoundingClientRect();
        const offsetX = rect.left + Math.random() * Math.max(rect.width - 16, 16);
        const offsetY = rect.top + Math.random() * Math.max(rect.height - 16, 16);
        x = offsetX + window.scrollX;
        y = offsetY + window.scrollY;
        anchorId = target.id || target.getAttribute("data-hidden-dot-id");
      }

      const palette = ["#ff47d1", "#00ffa3", "#ffd400", "#5c6cff"];

      setHiddenDot((current) => ({
        ...current,
        x,
        y,
        color: randomFromArray(palette),
        anchorId,
        initialized: true,
        lastMovedAt: Date.now(),
      }));
    });
  }, []);

  const markHiddenDotFound = useCallback(() => {
    setHiddenDot((current) => ({
      ...current,
      foundCount: current.foundCount + 1,
    }));
  }, []);

  const value = useMemo(
    () => ({
      accentMode,
      setAccentMode: (mode: AccentMode) => {
        setAccentMode(mode);
        persistAccent(mode);
      },
      heroBannerOpacity,
      setHeroBannerOpacity,
      heroParallaxIntensity,
      setHeroParallaxIntensity,
      hiddenDot,
      moveHiddenDot,
      markHiddenDotFound,
    }),
    [accentMode, heroBannerOpacity, heroParallaxIntensity, hiddenDot, moveHiddenDot, markHiddenDotFound, persistAccent, setHeroBannerOpacity, setHeroParallaxIntensity]
  );

  return <InteractivityContext.Provider value={value}>{children}</InteractivityContext.Provider>;
};

export const useInteractivity = () => {
  const ctx = useContext(InteractivityContext);
  if (!ctx) {
    throw new Error("useInteractivity must be used within InteractivityProvider");
  }
  return ctx;
};
