"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface HeroAtmosphereProps {
  children?: ReactNode;
}

// Background grid drift, glow breathing, and mockup entrance
export function HeroAtmosphere({ children }: HeroAtmosphereProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // 1. Grid slowly drifts (40s linear loop)
      const grid = container.querySelector(".hero-grid-drift");
      if (grid) {
        gsap.to(grid, {
          backgroundPosition: "80px 80px",
          duration: 40,
          repeat: -1,
          ease: "none",
        });
      }

      // 2. Green radial glow breathes (opacity 0.45 to 0.8, 6s yoyo)
      const glow = container.querySelector(".hero-glow-breathe");
      if (glow) {
        gsap.fromTo(
          glow,
          { opacity: 0.45 },
          {
            opacity: 0.8,
            duration: 6,
            yoyo: true,
            repeat: -1,
            ease: "sine.inOut",
          }
        );
      }

      // 3. BrowserFrames smooth entrance (scale & opacity with zero clipping)
      const mockupStack = container.querySelector(".hero-mockup-stack");
      if (mockupStack) {
        gsap.fromTo(
          mockupStack,
          {
            scale: 1.05,
            y: 24,
            opacity: 0,
          },
          {
            scale: 1,
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: "expo.out",
            delay: 0.35,
          }
        );
      }
    },
    { scope: containerRef }
  );

  return (
    <div ref={containerRef} className="contents">
      {children}
    </div>
  );
}
