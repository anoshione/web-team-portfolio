"use client";

import { useRef, type ReactNode } from "react";
import { useGSAP } from "@/lib/gsap";

interface SpotlightProps {
  children: ReactNode;
  className?: string;
}

// Spotlight cursor-following radial glow for cards
export function Spotlight({ children, className }: SpotlightProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      // setup
    },
    { scope: cardRef }
  );

  const handlePointerMove = contextSafe((e: React.PointerEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    el.style.setProperty("--mx", `${x}px`);
    el.style.setProperty("--my", `${y}px`);
  });

  return (
    <div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      className={`group relative overflow-hidden transition-colors ${className || ""}`}
      data-spotlight
    >
      {/* Subtle radial spotlight overlay following pointer */}
      <div
        className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(400px circle at var(--mx, -999px) var(--my, -999px), rgba(31, 138, 87, 0.18), transparent 80%)",
        }}
        aria-hidden="true"
      />
      <div className="relative z-10 h-full">{children}</div>
    </div>
  );
}
