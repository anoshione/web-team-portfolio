"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface FooterAnimationProps {
  children: ReactNode;
}

// Giant low-opacity wordmark scrubbed rise (yPercent 40 to 0) & column stagger
export function FooterAnimation({ children }: FooterAnimationProps) {
  const footerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const footer = footerRef.current;
      if (!footer) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // 1. Giant low-opacity wordmark scrubbed rise
      const wordmark = footer.querySelector(".footer-giant-wordmark");
      if (wordmark) {
        gsap.fromTo(
          wordmark,
          { yPercent: 40 },
          {
            yPercent: 0,
            ease: "none",
            scrollTrigger: {
              trigger: footer,
              start: "top bottom",
              end: "bottom bottom",
              scrub: true,
            },
          }
        );
      }

      // 2. Columns fade up stagger 0.08
      const columns = footer.querySelectorAll(".footer-column");
      if (columns.length > 0) {
        gsap.fromTo(
          columns,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.08,
            ease: "expo.out",
            scrollTrigger: {
              trigger: footer,
              start: "top 88%",
              once: true,
            },
          }
        );
      }
    },
    { scope: footerRef }
  );

  return (
    <div ref={footerRef} className="relative overflow-hidden">
      {children}
    </div>
  );
}
