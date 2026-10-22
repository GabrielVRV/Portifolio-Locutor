import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const VARIANTS = {
  primary:
    "bg-linear-to-br from-gold-light via-gold to-gold-deep text-background shadow-[0_12px_40px_-12px] shadow-gold/60 hover:shadow-[0_16px_50px_-10px] hover:shadow-gold/80",
  ghost:
    "border border-line bg-surface/60 text-foreground backdrop-blur hover:border-gold/60 hover:text-gold",
} as const;

const SIZES = {
  md: "min-h-11 px-5",
  lg: "min-h-14 px-8 sm:text-sm",
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
        "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-mono text-xs font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
