import { cn } from "@/shared/lib/cn";

const RINGS = [0, 1.5, 3, 4.5];

interface BroadcastRingsProps {
  readonly className?: string;
}

/**
 * Concentric rings expanding from the centre, like a radio broadcast.
 */
export function BroadcastRings({ className }: BroadcastRingsProps) {
  return (
    <div aria-hidden="true" className={cn("pointer-events-none absolute", className)}>
      {RINGS.map((delay) => (
        <span
          key={delay}
          className="absolute inset-0 scale-50 rounded-full border border-gold/40 opacity-30 motion-safe:animate-broadcast"
          style={{ animationDelay: `${delay}s` }}
        />
      ))}
    </div>
  );
}
