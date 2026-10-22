import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

interface OnAirBadgeProps {
  readonly children?: ReactNode;
  readonly className?: string;
}

/**
 * A pill with the studio's blinking red "on air" light.
 */
export function OnAirBadge({ children = "No ar", className }: OnAirBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/70 px-4 py-1.5 text-xs font-semibold tracking-[0.2em] text-foreground uppercase backdrop-blur",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2 rounded-full bg-on-air motion-safe:animate-on-air"
      />
      {children}
    </span>
  );
}
