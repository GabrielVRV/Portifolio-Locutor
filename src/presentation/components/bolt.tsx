import type { CSSProperties } from "react";

import { cn } from "@/shared/lib/cn";

interface BoltProps {
  readonly className?: string;
  /** Delays the flicker so a group of bolts never blinks in sync. */
  readonly delayMs?: number;
  readonly style?: CSSProperties;
}

/**
 * A lightning bolt like the ones sparking around the logo. Flickers like an
 * electric charge; static under reduced motion.
 */
export function Bolt({ className, delayMs = 0, style }: BoltProps) {
  return (
    <svg
      viewBox="0 0 24 48"
      aria-hidden="true"
      className={cn("h-12 w-6 motion-safe:animate-bolt", className)}
      style={{ animationDelay: `${delayMs}ms`, ...style }}
    >
      <path d="M15 0 3 26h8L6 48l15-30h-8l6-18Z" fill="currentColor" />
    </svg>
  );
}
