import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

const VARIANTS = {
  primary:
    "bg-signal text-background shadow-[0_0_40px_-8px] shadow-signal/60 hover:shadow-[0_0_56px_-6px] hover:shadow-signal/80",
  ghost:
    "border border-line bg-surface/60 text-foreground backdrop-blur hover:border-signal/60 hover:text-signal",
} as const;

const SIZES = {
  md: "min-h-11 px-5 text-sm",
  lg: "min-h-14 px-7 text-base",
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
        "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-display font-semibold tracking-wide uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
