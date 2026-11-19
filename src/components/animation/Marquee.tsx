"use client";

import { useRef, type ReactNode } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/gsap";
import { ANIM } from "@/lib/anim-config";

interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  className?: string;
}

// Infinite marquee with velocity boost and directional response
export function Marquee({
  children,
  duration = 30,
  className,
}: MarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const container = containerRef.current;
      const track = trackRef.current;
      if (!container || !track || !ANIM.marquee) return;

      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
      ).matches;
      if (prefersReducedMotion) return;

      // Base linear continuous animation
      const tween = gsap.to(track, {
        xPercent: -50,
        repeat: -1,
        ease: "none",
        duration,
      });

      // Pause on hover
      const onEnter = () => tween.pause();
      const onLeave = () => tween.play();
      container.addEventListener("mouseenter", onEnter);
      container.addEventListener("mouseleave", onLeave);

      // Scroll-velocity link: boost timeScale based on scroll velocity
      const st = ScrollTrigger.create({
        trigger: container,
        start: "top bottom",
        end: "bottom top",
        onUpdate(self) {
          const velocity = self.getVelocity();
          const speedBoost = 1 + Math.min(Math.abs(velocity) / 300, 5);
          const dir = velocity < 0 ? -1 : 1;

          gsap.to(tween, {
            timeScale: speedBoost * dir,
            duration: 0.25,
            overwrite: "auto",
            onComplete() {
              gsap.to(tween, {
                timeScale: 1,
                duration: 1,
                ease: "power2.out",
              });
            },
          });
        },
      });

      return () => {
        container.removeEventListener("mouseenter", onEnter);
        container.removeEventListener("mouseleave", onLeave);
        st.kill();
        tween.kill();
      };
    },
    { scope: containerRef, dependencies: [duration] }
  );

  return (
    <div
      ref={containerRef}
      className={`relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] ${
        className || ""
      }`}
    >
      <div
        ref={trackRef}
        data-marquee-track
        className="flex w-max shrink-0 items-center gap-6"
      >
        <div className="flex shrink-0 items-center gap-6">{children}</div>
        <div className="flex shrink-0 items-center gap-6" aria-hidden="true">
          {children}
        </div>
      </div>
    </div>
  );
}
