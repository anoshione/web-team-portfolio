"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ANIM } from "@/lib/anim-config";
import { siteConfig } from "@/data/site";
import { useSmoothScroll } from "@/components/animation/SmoothScroll";

// Fullscreen opening intro overlay (runs once per session)
export function IntroOverlay() {
  const [shouldRender, setShouldRender] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const { stop, start } = useSmoothScroll();

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("promise_intro_seen");
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;

      if (!hasSeen && ANIM.intro && !prefersReducedMotion) {
        setShouldRender(true);
        stop();
      }
    } catch {
      // sessionStorage unavailable (e.g. strict security mode)
      setShouldRender(false);
    }
  }, [stop]);

  useGSAP(
    () => {
      if (!shouldRender) return;

      const overlay = overlayRef.current;
      const text = textRef.current;
      const line = lineRef.current;
      if (!overlay || !text || !line) return;

      const tl = gsap.timeline({
        onComplete: () => {
          try {
            sessionStorage.setItem("promise_intro_seen", "true");
          } catch {
            // ignore
          }
          start();
          setShouldRender(false);
        },
      });

      // Wordmark subtle reveal
      tl.fromTo(
        text,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.45, ease: "power2.out" }
      )
        // Thin green line drawing left to right
        .fromTo(
          line,
          { scaleX: 0 },
          { scaleX: 1, duration: 0.6, ease: "power2.inOut" }
        )
        // Overlay exits upward via clip-path
        .to(
          overlay,
          {
            clipPath: "inset(0 0 100% 0)",
            duration: 0.75,
            ease: "expo.inOut",
          },
          "+=0.15"
        );
    },
    { scope: overlayRef, dependencies: [shouldRender] }
  );

  if (!shouldRender) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-bg"
      style={{ clipPath: "inset(0 0 0 0)" }}
    >
      <div className="flex flex-col items-center">
        <div ref={textRef} className="flex items-center gap-3">
          <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent text-sm font-bold text-ink">
            P
          </span>
          <span className="font-display text-xl font-bold tracking-tight text-ink sm:text-2xl">
            {siteConfig.shortName}
          </span>
        </div>

        {/* Thin drawing green line */}
        <div className="mt-4 h-[2px] w-48 overflow-hidden rounded bg-white/[0.08]">
          <div
            ref={lineRef}
            className="h-full w-full origin-left bg-accent"
            style={{ transform: "scaleX(0)" }}
          />
        </div>

        <p className="mt-3 font-mono text-[10px] uppercase tracking-widest text-ink/40">
          Promise Group
        </p>
      </div>
    </div>
  );
}
