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
  colorHex: string;
  baseAlpha: number;
  spark: boolean;
  twinklePhase: number;
  twinkleSpeed: number;
}

// Static palette colors (zero string allocations in animation loop)
const COLOR_ACCENT = "#1F8A57";   // Brand dark green
const COLOR_EMERALD = "#34D399";  // Bright emerald
const COLOR_MINT = "#86EFAC";     // Pale mint
const COLOR_INK = "#EEF2EF";      // Crisp white/ink spark

export function ParticleFlow() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !ANIM.particles) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animId: number;
    let width = 0;
    let height = 0;
    let dpr = 1;
    let isVisible = true;

    // Fast resize handling matching parent container
    const resize = () => {
      const parent = canvas.parentElement;
      width = parent ? parent.clientWidth : window.innerWidth;
      height = parent ? parent.clientHeight : window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });

    // Pause animation when Hero is scrolled out of viewport for 0% CPU/GPU overhead
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isVisible = entry ? entry.isIntersecting : true;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    // Subtle pointer parallax tilt
    let targetMouseX = 0;
    let currentMouseX = 0;

    const onMouseMove = (e: MouseEvent) => {
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouseMove, { passive: true });

    // Optimized particle count: 240 particles provides dense, gorgeous flow with zero lag
    const PARTICLE_COUNT = width < 768 ? 160 : 250;
    const TOTAL_LANES = 120;
    const particles: Particle[] = [];

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const lane = Math.floor(Math.random() * TOTAL_LANES);
      const laneAngle = (lane / TOTAL_LANES) * Math.PI * 2;

      const rand = Math.random();
      let colorHex = COLOR_ACCENT;
      if (rand > 0.92) colorHex = COLOR_INK;
      else if (rand > 0.72) colorHex = COLOR_MINT;
      else if (rand > 0.42) colorHex = COLOR_EMERALD;

      particles.push({
        laneAngle,
        laneJitterR: (Math.random() - 0.5) * 10,
        y: Math.random() * (height + 100) - 50,
        speed: 1.4 + Math.random() * 2.2,
        length: 12 + Math.random() * 22,
        size: 1.0 + Math.random() * 1.4,
        colorHex,
        baseAlpha: 0.35 + Math.random() * 0.55,
        spark: Math.random() < 0.15,
        twinklePhase: Math.random() * Math.PI * 2,
        twinkleSpeed: 0.04 + Math.random() * 0.06,
      });
    }

    // Main 60-120 FPS render loop
    const render = () => {
      if (!isVisible) {
        // Paused when scrolled past Hero
        animId = requestAnimationFrame(render);
        return;
      }

      currentMouseX += (targetMouseX - currentMouseX) * 0.05;

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const centerX = width * 0.5 + currentMouseX * 14;
      const wideRadius = Math.max(width * 0.45, 260);
      const columnRadius = Math.min(width * 0.045, 48);

      // Additive blending for light streak overlap glow
      ctx.globalCompositeOperation = "lighter";

      // 1. Soft atmospheric central column glow
      const colGlow = ctx.createLinearGradient(
        centerX - columnRadius * 2.5,
        0,
        centerX + columnRadius * 2.5,
        0
      );
      colGlow.addColorStop(0, "rgba(31, 138, 87, 0)");
      colGlow.addColorStop(0.5, "rgba(34, 197, 94, 0.16)");
      colGlow.addColorStop(1, "rgba(31, 138, 87, 0)");
      ctx.fillStyle = colGlow;
      ctx.fillRect(centerX - columnRadius * 2.5, 0, columnRadius * 5, height);

      // 2. Trajectory mapping for reversed trumpet funnel
      const getPos = (y: number, angle: number, jitter: number) => {
        // In the Hero section: u goes from 0 (top) to 1 (bottom)
        const u = Math.max(0, Math.min(1, y / (height * 0.85)));
        // Exponential trumpet curve: wide at top, converging inward
        const flare = Math.pow(1 - u, 2.4);
        const radius = columnRadius + (wideRadius - columnRadius) * flare + jitter;

        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);
        const z = radius * sinA;
        const x = centerX + radius * cosA;

        // Front vs back depth scale
        const depthNorm = (z + wideRadius) / (wideRadius * 2);
        const depthScale = 0.6 + depthNorm * 0.65;

        return { x, y, depthScale };
      };

      // 3. Update & render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.y += p.speed;
        p.twinklePhase += p.twinkleSpeed;

        // Wrap around vertically
        if (p.y > height + 40) {
          p.y = -p.length - Math.random() * 30;
        }

        const curr = getPos(p.y, p.laneAngle, p.laneJitterR);
        if (curr.y < -30 || curr.y > height + 30) continue;

        const prev = getPos(p.y - p.length, p.laneAngle, p.laneJitterR);

        // Alpha calculation without string allocations
        let alpha = p.baseAlpha * curr.depthScale;
        if (p.spark) {
          alpha *= 0.8 + (Math.sin(p.twinklePhase) + 1) * 0.35;
        }

        // Edge fade
        if (curr.y < 50) alpha *= Math.max(0, curr.y / 50);
        else if (curr.y > height - 50) alpha *= Math.max(0, (height - curr.y) / 50);

        if (alpha <= 0.02) continue;

        ctx.globalAlpha = Math.min(1, alpha);
        ctx.strokeStyle = p.colorHex;
        ctx.lineWidth = Math.max(0.7, p.size * curr.depthScale);
        ctx.lineCap = "round";

        // Draw streak line
        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);
        ctx.stroke();

        // Draw particle head
        ctx.fillStyle = p.colorHex;
        ctx.beginPath();
        ctx.arc(curr.x, curr.y, (p.size * 0.9 + (p.spark ? 0.6 : 0.2)) * curr.depthScale, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      observer.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-90"
      aria-hidden="true"
    />
  );
}
