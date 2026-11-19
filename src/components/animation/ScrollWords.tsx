"use client";

import { useRef } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface ScrollWordsProps {
  text: string;
  className?: string;
}

// Scroll-linked word highlight (opacity 0.2 to 1, scrubbed)
export function ScrollWords({ text, className }: ScrollWordsProps) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const el = containerRef.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const wordSpans = el.querySelectorAll(".scroll-word");

      gsap.fromTo(
        wordSpans,
        { opacity: 0.2 },
        {
          opacity: 1,
          stagger: 0.05,
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 75%",
            end: "bottom 45%",
            scrub: true,
          },
        }
      );
    },
    { scope: containerRef }
  );

  return (
    <p ref={containerRef} className={className}>
      {words.map((word, idx) => (
        <span key={idx} className="scroll-word inline-block mr-[0.28em] transition-colors">
          {word}
        </span>
      ))}
    </p>
  );
}
