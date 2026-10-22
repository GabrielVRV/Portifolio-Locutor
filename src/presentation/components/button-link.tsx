import type { ComponentProps } from "react";

import { cn } from "@/shared/lib/cn";

/* Colours come from the section tone, so buttons fit any background. */
const VARIANTS = {
  primary:
    "bg-accent text-on-accent shadow-[0_14px_30px_-14px] shadow-ink/60 hover:shadow-[0_20px_40px_-14px]",
  ghost: "border-2 border-current hover:border-accent hover:bg-accent hover:text-on-accent",
} as const;

const SIZES = {
  md: "min-h-11 px-5 text-xs",
  lg: "min-h-14 px-8 text-sm",
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
        "inline-flex cursor-pointer items-center justify-center gap-2.5 rounded-full font-extrabold tracking-[0.12em] uppercase transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 active:scale-[0.98]",
        VARIANTS[variant],
        SIZES[size],
        className,
      )}
      {...props}
    />
  );
}
