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
        "inline-flex items-center gap-2.5 rounded-full bg-ink px-4 py-2 text-[11px] font-extrabold tracking-[0.2em] text-paper uppercase",
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
