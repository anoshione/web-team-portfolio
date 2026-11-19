"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface CounterProps {
  target: number;
  suffix?: string;
  className?: string;
}

// Numerical count-up animation
export function Counter({ target, suffix = "", className }: CounterProps) {
  const containerRef = useRef<HTMLSpanElement>(null);
  const numRef = useRef<HTMLSpanElement>(null);

  useGSAP(
    () => {
      const el = containerRef.current;
      const numEl = numRef.current;
      if (!el || !numEl) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) {
        numEl.innerText = target.toString();
        return;
      }

      const counterObj = { val: 0 };

      gsap.to(counterObj, {
        val: target,
        duration: 1.6,
        ease: "expo.out",
        snap: { val: 1 },
        scrollTrigger: {
          trigger: el,
          start: "top 85%",
          once: true,
        },
        onUpdate: () => {
          if (numRef.current) {
            numRef.current.innerText = counterObj.val.toString();
          }
        },
      });
    },
    { scope: containerRef, dependencies: [target] }
  );

  return (
    <span ref={containerRef} className={className} data-count={target}>
      <span ref={numRef}>0</span>
      {suffix && <span className="text-accent">{suffix}</span>}
    </span>
  );
}
