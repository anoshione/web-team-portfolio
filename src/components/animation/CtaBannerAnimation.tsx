"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface CtaBannerAnimationProps {
  children: ReactNode;
}

// Expanding container: scale 0.92, radius 48px scrubbed to scale 1, radius 20px
export function CtaBannerAnimation({ children }: CtaBannerAnimationProps) {
  const bannerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const banner = bannerRef.current;
      if (!banner) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      gsap.fromTo(
        banner,
        {
          scale: 0.92,
          borderRadius: "48px",
        },
        {
          scale: 1,
          borderRadius: "20px",
          ease: "none",
          scrollTrigger: {
            trigger: banner,
            start: "top bottom",
            end: "center center",
            scrub: true,
          },
        }
      );
    },
    { scope: bannerRef }
  );

  return (
    <div
      ref={bannerRef}
      className="relative overflow-hidden bg-accent px-8 py-16 sm:px-12 sm:py-20 lg:p-24 shadow-2xl will-change-transform"
      style={{ borderRadius: "48px" }}
    >
      {children}
    </div>
  );
}
