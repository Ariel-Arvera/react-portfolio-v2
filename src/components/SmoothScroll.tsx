import { useEffect } from "react";
import type { ReactNode } from "react";
import Lenis from "lenis";

type SmoothScrollProps = {
  children: ReactNode;
};

const SmoothScroll = ({ children }: SmoothScrollProps) => {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.4,
      smoothWheel: true,
      wheelMultiplier: 0.7,
      touchMultiplier: 1.2,
      lerp: 0.04,
      infinite: false,
    });

    let rafId = 0;
    const raf = (time: number) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
};

export default SmoothScroll;
