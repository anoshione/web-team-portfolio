"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ANIM } from "@/lib/anim-config";

// Custom cursor: 10px green dot + 36px trailing ring
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const isDesktop = window.innerWidth >= 900;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (ANIM.cursor && isFinePointer && isDesktop && !prefersReducedMotion) {
      setEnabled(true);
    }
  }, []);

  useGSAP(
    () => {
      if (!enabled) return;

      const dot = dotRef.current;
      const ring = ringRef.current;
      const label = labelRef.current;
      if (!dot || !ring) return;

      // QuickTo setters for fluid tracking
      const dotX = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power2.out" });
      const dotY = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power2.out" });
      const ringX = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power2.out" });
      const ringY = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power2.out" });

      const onMouseMove = (e: MouseEvent) => {
        dotX(e.clientX);
        dotY(e.clientY);
        ringX(e.clientX);
        ringY(e.clientY);
      };

      window.addEventListener("mousemove", onMouseMove);

      // Listeners for project tiles and interactive buttons
      const updateCursorState = () => {
        const projectTiles = document.querySelectorAll("[data-project-tile]");
        const buttons = document.querySelectorAll("button, a, [data-magnetic]");

        projectTiles.forEach((tile) => {
          tile.addEventListener("mouseenter", () => {
            gsap.to(ring, {
              width: 84,
              height: 84,
              borderColor: "#1F8A57",
              backgroundColor: "rgba(31, 138, 87, 0.2)",
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(dot, { opacity: 0, duration: 0.2 });
            if (label) gsap.to(label, { opacity: 1, duration: 0.2 });
          });

          tile.addEventListener("mouseleave", () => {
            gsap.to(ring, {
              width: 36,
              height: 36,
              borderColor: "rgba(31, 138, 87, 0.6)",
              backgroundColor: "transparent",
              duration: 0.3,
              ease: "power2.out",
            });
            gsap.to(dot, { opacity: 1, duration: 0.2 });
            if (label) gsap.to(label, { opacity: 0, duration: 0.2 });
          });
        });

        buttons.forEach((btn) => {
          btn.addEventListener("mouseenter", () => {
            gsap.to(ring, {
              scale: 0.6,
              borderColor: "#1F8A57",
              duration: 0.2,
            });
          });
          btn.addEventListener("mouseleave", () => {
            gsap.to(ring, {
              scale: 1,
              borderColor: "rgba(31, 138, 87, 0.6)",
              duration: 0.2,
            });
          });
        });
      };

      // Slight timeout to let DOM render
      const timer = setTimeout(updateCursorState, 300);

      return () => {
        window.removeEventListener("mousemove", onMouseMove);
        clearTimeout(timer);
      };
    },
    { dependencies: [enabled] }
  );

  if (!enabled) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-[999] overflow-hidden" aria-hidden="true">
      {/* 10px Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_10px_#22c55e,0_0_18px_#1F8A57]"
      />

      {/* 36px Trailing Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-accent/70 shadow-[0_0_20px_rgba(34,197,94,0.35)] backdrop-blur-[1px] transition-[width,height,background-color] will-change-transform"
      >
        <span
          ref={labelRef}
          className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink opacity-0"
        >
          View
        </span>
      </div>
    </div>
  );
}
