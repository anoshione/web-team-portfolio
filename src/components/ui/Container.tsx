import { type HTMLAttributes, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  size?: "default" | "tight" | "wide";
}

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  ({ className, size = "wide", children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "mx-auto w-full px-4 sm:px-6 md:px-8 lg:px-10",
          size === "tight" && "max-w-4xl",
          (size === "default" || size === "wide") && "max-w-[1440px]",
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
