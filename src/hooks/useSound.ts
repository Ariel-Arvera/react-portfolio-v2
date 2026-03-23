import { useCallback } from "react";

const audioContext = typeof window !== "undefined" ? new (window.AudioContext || (window as any).webkitAudioContext)() : null;

const playTone = (freq: number, duration: number, volume = 0.05) => {
  if (!audioContext) return;
  const osc = audioContext.createOscillator();
  const gain = audioContext.createGain();
  osc.connect(gain);
  gain.connect(audioContext.destination);
  osc.frequency.value = freq;
  osc.type = "sine";
  gain.gain.setValueAtTime(volume, audioContext.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + duration);
  osc.start();
  osc.stop(audioContext.currentTime + duration);
};

export const useSound = () => {
  const playClick = useCallback(() => playTone(800, 0.08, 0.03), []);
  const playHover = useCallback(() => playTone(1200, 0.05, 0.015), []);
  const playSection = useCallback(() => playTone(600, 0.15, 0.02), []);
  return { playClick, playHover, playSection };
};
