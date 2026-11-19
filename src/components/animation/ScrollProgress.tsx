"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

// Top 2px scroll progress indicator
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const bar = barRef.current;
      if (!bar) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        bar,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.15,
          },
        }
      );
    },
    { scope: barRef }
  );

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 right-0 z-50 h-[2.5px] w-full origin-left bg-accent shadow-[0_0_12px_#22c55e,0_0_24px_#1F8A57] pointer-events-none will-change-transform"
      style={{ transform: "scaleX(0)" }}
      aria-hidden="true"
    />
  );
}
