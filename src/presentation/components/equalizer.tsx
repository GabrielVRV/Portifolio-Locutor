import { cn } from "@/shared/lib/cn";

const BAR_DELAYS_MS = [0, 320, 140, 460, 80, 380, 220, 520, 40, 300, 180, 420];

interface EqualizerProps {
  readonly className?: string;
}

/**
 * Decorative VU-meter bars. Static when the user prefers reduced motion.
 */
export function Equalizer({ className }: EqualizerProps) {
  return (
    <div aria-hidden="true" className={cn("flex h-10 items-end gap-1", className)}>
      {BAR_DELAYS_MS.map((delay, index) => (
        <span
          key={index}
          style={{ animationDelay: `${delay}ms` }}
          className="h-full w-1.5 origin-bottom scale-y-50 rounded-full bg-linear-to-t from-dial to-on-air motion-safe:animate-equalizer"
        />
      ))}
    </div>
  );
}
