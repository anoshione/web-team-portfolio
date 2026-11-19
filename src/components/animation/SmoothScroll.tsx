"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { ANIM } from "@/lib/anim-config";

interface SmoothScrollContextType {
  lenis: Lenis | null;
  scrollTo: (
    target: string | HTMLElement,
    options?: { offset?: number; immediate?: boolean; duration?: number }
  ) => void;
  stop: () => void;
  start: () => void;
}

const SmoothScrollContext = createContext<SmoothScrollContextType>({
  lenis: null,
  scrollTo: () => {},
  stop: () => {},
  start: () => {},
});

export const useSmoothScroll = () => useContext(SmoothScrollContext);

export function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    // If reduced motion or smooth scroll disabled in config, skip Lenis
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // Refresh ScrollTrigger after fonts and window finish loading
    const refreshTrigger = () => {
      ScrollTrigger.refresh();
    };
    document.fonts.ready.then(refreshTrigger);
    window.addEventListener("load", refreshTrigger);

    if (!ANIM.smoothScroll || prefersReducedMotion) {
      return () => {
        window.removeEventListener("load", refreshTrigger);
      };
    }

    // Initialize Lenis with smooth easing curve
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      syncTouch: false,
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Sync Lenis scroll with GSAP ScrollTrigger
    lenis.on("scroll", ScrollTrigger.update);

    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      window.removeEventListener("load", refreshTrigger);
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  const scrollTo = (
    target: string | HTMLElement,
    options: { offset?: number; immediate?: boolean; duration?: number } = {}
  ) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, {
        offset: options.offset ?? -80,
        immediate: options.immediate,
        duration: options.duration,
      });
    } else {
      // Native fallback
      if (typeof target === "string") {
        const el = document.querySelector(target);
        if (el) {
          const top =
            el.getBoundingClientRect().top +
            window.scrollY +
            (options.offset ?? -80);
          window.scrollTo({ top, behavior: options.immediate ? "auto" : "smooth" });
        }
      } else if (target) {
        const top =
          target.getBoundingClientRect().top +
          window.scrollY +
          (options.offset ?? -80);
        window.scrollTo({ top, behavior: options.immediate ? "auto" : "smooth" });
      }
    }
  };

  const stop = () => {
    lenisRef.current?.stop();
  };

  const start = () => {
    lenisRef.current?.start();
  };

  return (
    <SmoothScrollContext.Provider
      value={{
        lenis: lenisInstance,
        scrollTo,
        stop,
        start,
      }}
    >
      {children}
    </SmoothScrollContext.Provider>
  );
}
