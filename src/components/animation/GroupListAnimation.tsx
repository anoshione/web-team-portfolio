"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface GroupListAnimationProps {
  children: ReactNode;
}

// Group row divider scaleX draw-in and text rise
export function GroupListAnimation({ children }: GroupListAnimationProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      if (!container) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const rows = container.querySelectorAll(".group-row");
      const lines = container.querySelectorAll(".group-divider-line");

      // Draw lines in from left (scaleX 0 to 1, 1s)
      gsap.fromTo(
        lines,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1.0,
          stagger: 0.12,
          ease: "expo.out",
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            once: true,
          },
        }
      );

      // Text rises in with short stagger
      gsap.fromTo(
        rows,
        { opacity: 0, y: 16 },
        {
          opacity: 1,
          y: 0,
          duration: 0.85,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.2,
          scrollTrigger: {
            trigger: container,
            start: "top 82%",
            once: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <div
      ref={containerRef}
      className="mt-14 flex flex-col rounded-2xl border border-white/[0.08] bg-surface overflow-hidden"
    >
      {children}
    </div>
  );
}
