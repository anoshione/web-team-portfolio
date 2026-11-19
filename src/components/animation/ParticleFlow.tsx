"use client";

import { useEffect, useRef } from "react";
import { ANIM } from "@/lib/anim-config";

interface Particle {
  laneAngle: number;
  laneJitterR: number;
  y: number;
  speed: number;
  length: number;
  size: number;
  colorType: number; // 0: accent green, 1: bright emerald, 2: pale mint, 3: ink spark
  alpha: number;
  spark: boolean;
  twinklePhase: number;
  twinkleSpeed: number;
}

export function ParticleFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ANIM.particles) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;

    // Viewport dimensions & scaling
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Track scroll & mouse position with smooth easing
    let targetScrollY = window.scrollY;
    let currentScrollY = window.scrollY;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const onScroll = () => {
      targetScrollY = window.scrollY;
    };

    const onMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      targetMouseX = (e.clientX / width - 0.5) * 2;
      targetMouseY = (e.clientY / height - 0.5) * 2;
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Color definitions based on the strict dark green & ink palette
    const colors = [
      "rgba(31, 138, 87, ",    // Accent green (#1F8A57)
      "rgba(52, 211, 153, ",   // Bright emerald highlight (#34D399)
      "rgba(134, 239, 172, ",  // Pale mint highlight (#86EFAC)
      "rgba(238, 242, 239, ",  // Crisp white/ink spark (#EEF2EF)
    ];

    // Particle pool setup
    const PARTICLE_COUNT = width < 768 ? 950 : 1600;
    const particles: Particle[] = [];

    // Lane angles count
    const TOTAL_LANES = 180;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const lane = Math.floor(Math.random() * TOTAL_LANES);
      const laneAngle = (lane / TOTAL_LANES) * Math.PI * 2;
      
      // Color probability: mostly accent green & bright emerald, occasional mint and white spark
      const randColor = Math.random();
      let colorType = 0;
      if (randColor > 0.94) colorType = 3;      // Ink spark
      else if (randColor > 0.78) colorType = 2; // Pale mint
      else if (randColor > 0.45) colorType = 1; // Bright emerald
      else colorType = 0;                       // Accent green

      particles.push({
        laneAngle,
        laneJitterR: (Math.random() - 0.5) * 12,
        y: Math.random() * (height * 1.8),
        speed: 1.6 + Math.random() * 2.8,
        length: 8 + Math.random() * 26,
        size: 0.9 + Math.random() * 1.5,
        colorType,
        alpha: 0.25 + Math.random() * 0.7,
        spark: Math.random() < 0.12,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.04 + Math.random() * 0.08,
      });
    }

    // Main Animation Loop
    const render = () => {
      // Smooth interpolation for scroll & mouse
      currentScrollY += (targetScrollY - currentScrollY) * 0.08;
      currentMouseX += (targetMouseX - currentMouseX) * 0.05;
      currentMouseY += (targetMouseY - currentMouseY) * 0.05;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      // Hero height threshold in screen space
      const heroSectionHeight = Math.min(Math.max(height * 0.88, 700), 1000);

      // Center X with subtle mouse parallax tilt
      const centerX = width * 0.5 + currentMouseX * 18;
      
      // Funnel dimensions:
      // In the hero (reversed trumpet): starts wide at y=0, gathers to narrow column at heroSectionHeight
      const wideRadius = Math.max(width * 0.44, 280);
      const columnRadius = Math.min(width * 0.04, 52);

      // Set additive blending for luminous light streak intersection
      ctx.globalCompositeOperation = "lighter";

      // 1. Soft atmospheric central column glow
      const colGlowGrad = ctx.createLinearGradient(
        centerX - columnRadius * 3,
        0,
        centerX + columnRadius * 3,
        0
      );
      colGlowGrad.addColorStop(0, "rgba(31, 138, 87, 0)");
      colGlowGrad.addColorStop(0.35, "rgba(31, 138, 87, 0.03)");
      colGlowGrad.addColorStop(0.5, "rgba(31, 138, 87, 0.09)");
      colGlowGrad.addColorStop(0.65, "rgba(31, 138, 87, 0.03)");
      colGlowGrad.addColorStop(1, "rgba(31, 138, 87, 0)");

      ctx.fillStyle = colGlowGrad;
      ctx.fillRect(centerX - columnRadius * 3, 0, columnRadius * 6, height);

      // 2. Compute radius and 3D position function
      const getPositionAt = (worldY: number, angle: number, jitterR: number) => {
        // Screen Y position takes scroll into account
        // Funnel is anchored to the top of the page (Hero)
        const screenY = worldY - currentScrollY;

        let radius = columnRadius;

        // Reversed funnel shape in the Hero section (worldY < heroSectionHeight)
        if (worldY < heroSectionHeight) {
          // u goes from 0 (very top of hero) to 1 (neck of hero)
          const u = Math.max(0, Math.min(1, worldY / heroSectionHeight));
          // Exponential trumpet flare curve
          const flare = Math.pow(1 - u, 2.3);
          radius = columnRadius + (wideRadius - columnRadius) * flare;
        } else {
          // Continuous middle column flowing down through the rest of the website
          // Subtle organic breathing wave along the cylinder height
          const wave = Math.sin(worldY * 0.004 + angle * 2) * 5;
          radius = columnRadius + wave;
        }

        const effectiveRadius = Math.max(12, radius + jitterR);

        // 3D perspective projection
        // angle around the vertical spine
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        // 3D coordinates:
        // X = center + radius * cos(angle)
        // Z = radius * sin(angle) (depth into screen)
        const z = effectiveRadius * sinA;
        const x = centerX + effectiveRadius * cosA;

        // Depth perspective scale: front particles (z > 0) appear larger and brighter
        const depthNorm = (z + wideRadius) / (wideRadius * 2); // [0, 1]
        const depthScale = 0.55 + depthNorm * 0.7; // [0.55, 1.25]

        return { x, y: screenY, z, depthScale, radius: effectiveRadius };
      };

      // 3. Update & render particles
      const loopHeight = height * 2.2;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Downward vertical flow
        p.y += p.speed;
        p.twinklePhase += p.twinkleSpeed;

        // Wrap around vertically to create seamless endless flow
        if (p.y - currentScrollY > height + 80) {
          p.y = currentScrollY - Math.random() * 80;
        } else if (p.y - currentScrollY < -120) {
          p.y = currentScrollY + height + Math.random() * 60;
        }

        // Current head position
        const curr = getPositionAt(p.y, p.laneAngle, p.laneJitterR);

        // Skip particles that are outside the visible screen bounds
        if (curr.y < -40 || curr.y > height + 40) continue;

        // Previous tail position (streak back up by trail length)
        const prev = getPositionAt(p.y - p.length, p.laneAngle, p.laneJitterR);

        // Brightness & depth calculations
        let dynamicAlpha = p.alpha * curr.depthScale;
        if (p.spark) {
          const twinkle = (Math.sin(p.twinklePhase) + 1) * 0.5;
          dynamicAlpha = Math.min(1, dynamicAlpha * (0.8 + twinkle * 0.8));
        }

        // Fade in softly near the top screen edge and bottom screen edge
        if (curr.y < 60) {
          dynamicAlpha *= Math.max(0, curr.y / 60);
        } else if (curr.y > height - 60) {
          dynamicAlpha *= Math.max(0, (height - curr.y) / 60);
        }

        if (dynamicAlpha <= 0.01) continue;

        const baseColor = colors[p.colorType];
        const strokeColor = `${baseColor}${dynamicAlpha.toFixed(3)})`;

        // Draw particle motion streak (fiber trail)
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.strokeStyle = strokeColor;
        ctx.lineWidth = Math.max(0.6, p.size * curr.depthScale);
        ctx.lineCap = "round";
        ctx.stroke();

        // Draw glowing particle head
        ctx.beginPath();
        const headRadius = Math.max(0.8, (p.size * 0.95 + (p.spark ? 0.8 : 0.3)) * curr.depthScale);
        ctx.arc(curr.x, curr.y, headRadius, 0, Math.PI * 2);
        ctx.fillStyle = `${baseColor}${Math.min(1, dynamicAlpha * 1.3).toFixed(3)})`;
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 h-full w-full opacity-85"
      aria-hidden="true"
    />
  );
}
