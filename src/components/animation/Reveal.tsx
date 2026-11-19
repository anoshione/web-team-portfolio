"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  duration?: number;
  stagger?: number;
  as?: "div" | "span" | "p" | "section";
}

// Block fade-up reveal animation
export function Reveal({
  children,
  className,
  delay = 0,
  y = 28,
  duration = 1.1,
  stagger = 0.08,
  as: Component = "div",
}: RevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const targets = el.querySelectorAll("[data-reveal]");
      const items = targets.length > 0 ? targets : [el];

      gsap.fromTo(
        items,
        { opacity: 0, y },
        {
          opacity: 1,
          y: 0,
          duration,
          delay,
          stagger: items.length > 1 ? stagger : 0,
          ease: "expo.out",
          scrollTrigger: {
            trigger: el,
            start: "top 88%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <Component ref={containerRef} className={className}>
      {children}
    </Component>
  );
}
