import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "tight" | "wide";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "default", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-5 sm:px-8 md:px-12 lg:px-16",
          size === "tight" && "max-w-4xl",
          size === "default" && "max-w-7xl",
          size === "wide" && "max-w-[1440px]",
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Container.displayName = "Container";
