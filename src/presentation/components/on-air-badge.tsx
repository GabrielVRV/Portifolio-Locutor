import { cn } from "@/shared/lib/cn";

interface OnAirBadgeProps {
  readonly className?: string;
}

/**
 * The studio "on air" light, the visual signature of the portfolio.
 */
export function OnAirBadge({ className }: OnAirBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-on-air/40 bg-background/80 px-3 py-1 font-display text-sm font-bold tracking-[0.2em] text-on-air uppercase backdrop-blur",
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="size-2 rounded-full bg-on-air motion-safe:animate-on-air"
      />
      No ar
    </span>
  );
}
