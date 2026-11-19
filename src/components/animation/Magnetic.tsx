"use client";

import { useRef, type ReactNode } from "react";
import { gsap, useGSAP } from "@/lib/gsap";
import { ANIM } from "@/lib/anim-config";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
}

// Magnetic button attraction effect for fine desktop pointers
export function Magnetic({
  children,
  className,
  strength = 0.25,
}: MagneticProps) {
  const elementRef = useRef<HTMLDivElement>(null);

  const { contextSafe } = useGSAP(
    () => {
      // Setup runs once
    },
    { scope: elementRef }
  );

  const handlePointerMove = contextSafe((e: React.PointerEvent<HTMLDivElement>) => {
    if (!ANIM.magnetic || window.innerWidth < 900) return;
    const el = elementRef.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const rect = el.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const deltaX = (e.clientX - centerX) * strength;
    const deltaY = (e.clientY - centerY) * strength;

    gsap.to(el, {
      x: deltaX,
      y: deltaY,
      duration: 0.6,
      ease: "elastic.out(1, 0.5)",
      overwrite: "auto",
    });
  });

  const handlePointerLeave = contextSafe(() => {
    if (!ANIM.magnetic) return;
    const el = elementRef.current;
    if (!el) return;

    gsap.to(el, {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.4)",
      overwrite: "auto",
    });
  });

  return (
    <div
      ref={elementRef}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      className={className}
      data-magnetic
    >
      {children}
    </div>
  );
}
