import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const VARIANTS = {
  primary:
    "bg-on-air-strong text-white shadow-lg shadow-on-air-strong/25 hover:bg-on-air-strong/90 hover:shadow-on-air-strong/40",
  ghost:
    "border border-line bg-surface/60 text-foreground hover:border-foreground/30 hover:bg-surface",
} as const;

const SIZES = {
  md: "min-h-11 px-5 text-base",
  lg: "min-h-13 px-7 text-lg",
} as const;

interface ButtonLinkProps extends ComponentProps<"a"> {
  readonly variant?: keyof typeof VARIANTS;
  readonly size?: keyof typeof SIZES;
  readonly external?: boolean;
}

/**
 * An anchor styled as a button. External links open in a new tab safely.
 */
export function ButtonLink({
  variant = "primary",
  size = "md",
  external = false,
  className,
  ...props
}: ButtonLinkProps) {
  return (
    <a
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
      className={cn(
        "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-display font-bold tracking-wide uppercase transition-all duration-200 active:scale-[0.98]",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
