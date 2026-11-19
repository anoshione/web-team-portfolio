"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";

interface ProjectGridAnimationProps {
  children: ReactNode;
}

// Signature project entrance clip-path reveal and subtle scrubbed parallax
export function ProjectGridAnimation({ children }: ProjectGridAnimationProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const grid = gridRef.current;
      if (!grid) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      const tiles = grid.querySelectorAll("[data-project-tile]");
      if (tiles.length === 0) return;

      // 1. Staggered clip-path reveal inset(100% 0 0 0) -> inset(0)
      gsap.fromTo(
        tiles,
        {
          clipPath: "inset(100% 0% 0% 0% round 16px)",
        },
        {
          clipPath: "inset(0% 0% 0% 0% round 16px)",
          duration: 1.2,
          ease: "expo.out",
          stagger: 0.14,
          scrollTrigger: {
            trigger: grid,
            start: "top 82%",
            once: true,
          },
        }
      );

      // Frame scale 1.25 to 1 during reveal
      const frames = grid.querySelectorAll(".browser-frame-inner");
      if (frames.length > 0) {
        gsap.fromTo(
          frames,
          { scale: 1.25 },
          {
            scale: 1,
            duration: 1.2,
            ease: "expo.out",
            stagger: 0.14,
            scrollTrigger: {
              trigger: grid,
              start: "top 82%",
              once: true,
            },
          }
        );
      }

      // 2. Subtle scrubbed parallax inside tiles on desktop (yPercent -6 to 6)
      const mm = gsap.matchMedia();
      mm.add("(min-width: 900px)", () => {
        tiles.forEach((tile) => {
          const frame = tile.querySelector(".browser-frame-inner");
          if (frame) {
            gsap.fromTo(
              frame,
              { yPercent: -6 },
              {
                yPercent: 6,
                ease: "none",
                scrollTrigger: {
                  trigger: tile,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: true,
                },
              }
            );
          }
        });
      });

      return () => mm.revert();
    },
    { scope: gridRef }
  );

  return (
    <div
      ref={gridRef}
      className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-8 lg:[&_[data-project-tile]]:cursor-none"
      data-project-grid
    >
      {children}
    </div>
  );
}
