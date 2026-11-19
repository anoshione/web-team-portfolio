import Image from "next/image";
import { cn } from "@/lib/utils";

export interface BrowserFrameProps {
  title?: string;
  url?: string;
  image?: string;
  aspect?: "video" | "auto" | "wide";
  className?: string;
  variant?: "default" | "compact";
}

export function BrowserFrame({
  title = "Promise System Console",
  url = "app.promise.internal",
  image,
  aspect = "video",
  className,
  variant = "default",
}: BrowserFrameProps) {
  // Clean up URL for display
  const displayUrl = url.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <div
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-white/[0.08] bg-surface shadow-2xl transition-all duration-300 hover:border-accent/40",
        className
      )}
    >
      <div className="browser-frame-inner flex flex-col h-full w-full origin-center will-change-transform transition-transform duration-300 group-hover:scale-[1.02]">
        {/* Browser Chrome Header */}
        <div className="flex h-10 w-full items-center justify-between border-b border-white/[0.08] bg-bg/70 px-4 backdrop-blur-sm">
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
              Active
            </span>
          </div>
        </div>

        {/* Browser Window Body */}
        <div
          className={cn(
            "relative w-full overflow-hidden bg-bg/50",
            aspect === "video" && "aspect-[16/10]",
            aspect === "wide" && "aspect-[16/9]",
            aspect === "auto" && "h-full min-h-[220px]"
          )}
        >
          {/* REPLACE WITH REAL IMAGE: pass image prop (e.g. image="/screenshots/project.webp") */}
          {image ? (
            <Image
              src={image}
              alt={title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover object-top"
            />
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
