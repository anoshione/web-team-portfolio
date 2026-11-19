import { type HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export interface SectionLabelProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export function SectionLabel({ className, children, ...props }: SectionLabelProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-accent font-semibold",
        className
      )}
      {...props}
    >
      <span className="inline-block h-1.5 w-1.5 rounded-full bg-accent shadow-[0_0_8px_#22c55e,0_0_14px_#1F8A57]" />
      <span>{children}</span>
    </div>
  );
}
