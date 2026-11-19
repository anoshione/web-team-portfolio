import { type AnchorHTMLAttributes, type ButtonHTMLAttributes, forwardRef } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

type CommonProps = {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  isMagnetic?: boolean;
};

export type ButtonAsButton = CommonProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonAsLink = CommonProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

export type ButtonProps = ButtonAsButton | ButtonAsLink;

export const Button = forwardRef<HTMLButtonElement | HTMLAnchorElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", isMagnetic = false, children, ...props }, ref) => {
    const baseStyles =
      "relative group inline-flex items-center justify-center font-medium transition-all duration-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent active:scale-[0.98] select-none cursor-pointer disabled:opacity-50 disabled:pointer-events-none overflow-hidden z-10";

    const variantStyles = {
      primary:
        "bg-accent text-ink border border-accent/80 shadow-[0_0_20px_rgba(31,138,87,0.45)] hover:border-accent hover:shadow-[0_0_35px_rgba(34,197,94,0.7),0_0_15px_rgba(31,138,87,0.9)] before:absolute before:inset-0 before:z-[-1] before:bg-white/10 before:origin-bottom before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-350 before:ease-out",
      outline:
        "border border-white/[0.08] bg-surface text-ink hover:border-accent hover:shadow-[0_0_20px_rgba(31,138,87,0.35)] hover:text-ink before:absolute before:inset-0 before:z-[-1] before:bg-white/[0.06] before:origin-bottom before:scale-y-0 hover:before:scale-y-100 before:transition-transform before:duration-350 before:ease-out",
      ghost:
        "text-ink/80 hover:text-ink hover:bg-white/[0.04]",
    };

    const sizeStyles = {
      sm: "h-9 px-4 text-xs tracking-wide rounded-xl gap-2",
      md: "h-11 px-5 text-sm tracking-wide rounded-xl gap-2.5",
      lg: "h-13 px-7 text-base tracking-wide rounded-2xl gap-3",
    };

    const combinedClassName = cn(
      baseStyles,
      variantStyles[variant],
      sizeStyles[size],
      className
    );

    const magneticProp = isMagnetic || variant === "primary" ? { "data-magnetic": "" } : {};

    if ("href" in props && props.href) {
      const { href, ...linkProps } = props as ButtonAsLink;
      const isInternal = href.startsWith("/") || href.startsWith("#");

      if (isInternal) {
        return (
          <Link
            ref={ref as React.Ref<HTMLAnchorElement>}
            href={href}
            className={combinedClassName}
            {...magneticProp}
            {...linkProps}
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          ref={ref as React.Ref<HTMLAnchorElement>}
          href={href}
          className={combinedClassName}
          {...magneticProp}
          {...linkProps}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={combinedClassName}
        {...magneticProp}
        {...(props as ButtonAsButton)}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
