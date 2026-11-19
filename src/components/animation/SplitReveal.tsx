"use client";

import { useRef, type ReactNode } from "react";
import { gsap, SplitText, useGSAP } from "@/lib/gsap";

interface SplitRevealProps {
  children: ReactNode;
  className?: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div";
}

// SplitText line mask reveal animation
export function SplitReveal({
  children,
  className,
  as: Component = "h2",
}: SplitRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = textRef.current;
      if (!el) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      let split: SplitText | null = null;

      // Wait for fonts to be loaded so line wrapping calculations are exact
      document.fonts.ready.then(() => {
        if (!el) return;

        split = SplitText.create(el, {
          type: "lines",
          mask: "lines",
          autoSplit: true,
          onSplit(self) {
            return gsap.from(self.lines, {
              yPercent: 110,
              duration: 1.1,
              ease: "expo.out",
              stagger: 0.09,
              scrollTrigger: {
                trigger: el,
                start: "top 85%",
                once: true,
              },
            });
          },
        });
      });

      return () => {
        if (split) {
          split.revert();
        }
      };
    },
    { scope: textRef }
  );

  return (
    // @ts-expect-error Component dynamic tag typing
    <Component ref={textRef} className={className}>
      {children}
    </Component>
  );
}
