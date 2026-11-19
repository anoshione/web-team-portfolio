"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ANIM } from "@/lib/anim-config";

interface ParallaxProps {
  children: ReactNode;
  yPercent?: number | [number, number];
  className?: string;
}

// Scrubbed parallax scroll effect
export function Parallax({
  children,
  yPercent = -12,
  className,
}: ParallaxProps) {
  const targetRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = targetRef.current;
      if (!el || !ANIM.parallax) return;

      const mm = gsap.matchMedia();

      // Only on desktop >= 900px and no reduced motion
      mm.add(
        "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
        () => {
          const fromY = Array.isArray(yPercent) ? yPercent[0] : 0;
          const toY = Array.isArray(yPercent) ? yPercent[1] : yPercent;

          gsap.fromTo(
            el,
            { yPercent: fromY },
            {
              yPercent: toY,
              ease: "none",
              scrollTrigger: {
                trigger: el,
                start: "top bottom",
                end: "bottom top",
                scrub: true,
              },
            }
          );
        }
      );

      return () => mm.revert();
    },
    { scope: targetRef, dependencies: [yPercent] }
  );

  return (
    <div ref={targetRef} className={className} data-parallax>
      {children}
    </div>
  );
}
