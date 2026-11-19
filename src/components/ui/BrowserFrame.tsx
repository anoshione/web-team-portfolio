"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BrowserFrameProps {
  title?: string;
  url?: string;
  image?: string;
  images?: string[];
  aspect?: "video" | "auto" | "wide";
  className?: string;
  variant?: "default" | "compact";
  autoShuffle?: boolean;
}

export function BrowserFrame({
  title = "Promise System Console",
  url = "app.promise.internal",
  image,
  images,
  aspect = "video",
  className,
  variant = "default",
  autoShuffle = true,
}: BrowserFrameProps) {
  // Normalize image list
  const imageList = (images && images.length > 0)
    ? images
    : (image ? [image] : []);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Clean up URL for display
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  // Automated shuffling effect across multiple screenshots
  useEffect(() => {
    if (!autoShuffle || imageList.length <= 1 || isHovered) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    // Add slight random initial offset so cards across grid don't tick in lockstep
    const initialDelay = Math.floor(Math.random() * 1200);
    const startTimeout = setTimeout(() => {
      timerRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % imageList.length);
      }, 3400);
    }, initialDelay);

    return () => {
      clearTimeout(startTimeout);
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [autoShuffle, imageList.length, isHovered]);

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface shadow-2xl transition-all duration-300 hover:border-accent/40",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="browser-frame-inner flex flex-col h-full w-full origin-center will-change-transform transition-transform duration-300 group-hover:scale-[1.015]">
        {/* Browser Chrome Header */}
        <div className="flex h-10 w-full items-center justify-between border-b border-white/[0.08] bg-bg/80 px-4 backdrop-blur-md">
          {/* Three dots / Window controls */}
          <div className="flex items-center gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.15]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.15]" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/[0.15]" />
          </div>

          {/* URL Bar */}
          <div className="mx-2 flex max-w-[280px] flex-1 items-center justify-center rounded-md border border-white/[0.06] bg-surface/90 px-3 py-1 font-mono text-[11px] text-ink/50 sm:max-w-xs">
            <svg
              className="mr-1.5 h-3 w-3 text-accent shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
              />
            </svg>
            <span className="truncate">{displayUrl}</span>
          </div>

          {/* Right action / status indicator */}
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
            <span className="hidden font-mono text-[10px] uppercase tracking-wider text-ink/40 sm:inline">
              {imageList.length > 1
                ? `Shot ${currentIndex + 1} of ${imageList.length}`
                : "Active"}
            </span>
          </div>
        </div>

        {/* Browser Window Body */}
        <div
          className={cn(
            "relative w-full overflow-hidden bg-bg/50 select-none",
            aspect === "video" && "aspect-[16/10]",
            aspect === "wide" && "aspect-[16/9]",
            aspect === "auto" && "h-full min-h-[220px]"
          )}
        >
          {imageList.length > 0 ? (
            <>
              {imageList.map((imgSrc, idx) => (
                <div
                  key={`${imgSrc}-${idx}`}
                  className={cn(
                    "absolute inset-0 transition-all duration-700 ease-in-out will-change-[opacity,transform]",
                    idx === currentIndex
                      ? "opacity-100 scale-100 z-10"
                      : "opacity-0 scale-[1.03] pointer-events-none z-0"
                  )}
                >
                  <Image
                    src={imgSrc}
                    alt={`${title} - Screenshot ${idx + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover object-top"
                    priority={idx === 0}
                  />
                </div>
              ))}

              {/* Shuffling Dots Indicator Badge (Only shown if 2+ images) */}
              {imageList.length > 1 && (
                <div className="absolute bottom-3 right-3 z-20 flex items-center gap-1.5 rounded-full border border-white/10 bg-black/70 px-2.5 py-1 backdrop-blur-md shadow-lg transition-transform duration-200">
                  <span className="font-mono text-[9px] uppercase tracking-wider text-accent font-semibold mr-0.5">
                    Live Shots
                  </span>
                  {imageList.map((_, dotIdx) => (
                    <button
                      key={dotIdx}
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        e.preventDefault();
                        setCurrentIndex(dotIdx);
                      }}
                      className={cn(
                        "h-1.5 rounded-full transition-all duration-300 cursor-pointer",
                        dotIdx === currentIndex
                          ? "w-4 bg-accent shadow-[0_0_8px_rgba(31,138,87,0.8)]"
                          : "w-1.5 bg-white/30 hover:bg-white/60"
                      )}
                      aria-label={`Switch to screenshot ${dotIdx + 1}`}
                    />
                  ))}
                  <span className="font-mono text-[9px] text-ink/50 ml-1">
                    {currentIndex + 1}/{imageList.length}
                  </span>
                </div>
              )}
            </>
          ) : (
            /* Abstract Dashboard Skeleton */
            <div
              className="flex h-full w-full bg-surface/40 p-4 select-none sm:p-5"
              aria-hidden="true"
            >
              {/* Sidebar Skeleton */}
              <div
                className={cn(
                  "hidden flex-col gap-3 border-r border-white/[0.06] pr-4 sm:flex",
                  variant === "compact" ? "w-14" : "w-36"
                )}
              >
                <div className="h-4 w-20 rounded bg-white/[0.1]" />
                <div className="mt-2 flex flex-col gap-2">
                  <div className="h-3 w-full rounded bg-accent/30" />
                  <div className="h-3 w-5/6 rounded bg-white/[0.06]" />
                  <div className="h-3 w-4/6 rounded bg-white/[0.06]" />
                  <div className="h-3 w-5/6 rounded bg-white/[0.06]" />
                </div>
                <div className="mt-auto h-3 w-12 rounded bg-white/[0.04]" />
              </div>

              {/* Main Content Area */}
              <div className="flex flex-1 flex-col gap-3 pl-0 sm:pl-4">
                {/* Header Bar Skeleton */}
                <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
                  <div className="space-y-1">
                    <div className="h-4 w-28 rounded bg-white/[0.14]" />
                    <div className="h-2.5 w-16 rounded bg-white/[0.06]" />
                  </div>
                  <div className="h-6 w-16 rounded-md border border-accent/40 bg-accent/15" />
                </div>

                {/* Metric Cards Skeleton */}
                <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  <div className="rounded-lg border border-white/[0.06] bg-bg/80 p-2.5">
                    <div className="h-2 w-10 rounded bg-white/[0.08]" />
                    <div className="mt-2 h-4 w-14 rounded bg-accent/70" />
                    <div className="mt-1 h-1.5 w-12 rounded bg-white/[0.04]" />
                  </div>
                  <div className="rounded-lg border border-white/[0.06] bg-bg/80 p-2.5">
                    <div className="h-2 w-12 rounded bg-white/[0.08]" />
                    <div className="mt-2 h-4 w-12 rounded bg-ink/70" />
                    <div className="mt-1 h-1.5 w-8 rounded bg-accent/40" />
                  </div>
                  <div className="hidden rounded-lg border border-white/[0.06] bg-bg/80 p-2.5 sm:block">
                    <div className="h-2 w-14 rounded bg-white/[0.08]" />
                    <div className="mt-2 h-4 w-10 rounded bg-ink/50" />
                    <div className="mt-1 h-1.5 w-10 rounded bg-white/[0.04]" />
                  </div>
                </div>

                {/* Data Table / Chart Visualization Skeleton */}
                <div className="flex flex-1 flex-col justify-between rounded-lg border border-white/[0.06] bg-bg/60 p-3">
                  <div className="flex items-center justify-between pb-2 border-b border-white/[0.04]">
                    <div className="h-2.5 w-24 rounded bg-white/[0.08]" />
                    <div className="h-2 w-10 rounded bg-accent/30" />
                  </div>

                  {/* Bars / Data rows */}
                  <div className="flex items-end gap-2 pt-3 h-16 sm:h-20">
                    <div className="h-[45%] w-full rounded-t bg-white/[0.08]" />
                    <div className="h-[75%] w-full rounded-t bg-accent/50" />
                    <div className="h-[60%] w-full rounded-t bg-white/[0.08]" />
                    <div className="h-[90%] w-full rounded-t bg-accent/80" />
                    <div className="h-[50%] w-full rounded-t bg-white/[0.08]" />
                    <div className="h-[80%] w-full rounded-t bg-accent/60" />
                    <div className="h-[65%] w-full rounded-t bg-white/[0.08]" />
                  </div>

                  <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-ink/30">
                    <span>SYS_ID #9042</span>
                    <span className="text-accent/70">OPERATIONAL</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
