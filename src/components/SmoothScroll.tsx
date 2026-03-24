import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

type SmoothScrollProps = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.65,
      easing: (t: number) => 1 - Math.pow(1 - t, 2.6),
      smoothWheel: true,
      syncTouch: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.05,
      lerp: 0.06,
      infinite: false,
    });

    const handleScroll = ({ progress }: { progress: number }) => {
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(3));
    };

    lenis.on("scroll", handleScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      lenis.off("scroll", handleScroll);
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
