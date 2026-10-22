import { cn } from "@/shared/lib/cn";

/** One period of a soft sound wave; drawn twice so it can loop sideways. */
const WAVE = "M0 40 C 120 10, 240 10, 360 40 S 600 70, 720 40 S 960 10, 1080 40 S 1320 70, 1440 40";

interface WaveDividerProps {
  /** Tailwind text colour of the section below, e.g. `text-paper`. */
  readonly className?: string;
  readonly flip?: boolean;
}

/**
 * A sound-wave edge between two sections, filled with the next section's
 * colour (via currentColor). A lighter echo drifts sideways behind it.
 */
export function WaveDivider({ className, flip = false }: WaveDividerProps) {
  const path = `${WAVE} V80 H0 Z`;

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none relative h-12 overflow-hidden sm:h-20", className)}
      style={flip ? { transform: "scaleY(-1)" } : undefined}
    >
      <div className="absolute inset-y-0 left-0 flex w-[200%] opacity-40 motion-safe:animate-wave">
        {[0, 1].map((copy) => (
          <svg
            key={copy}
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="h-full w-1/2 -translate-y-1.5"
          >
            <path d={path} fill="currentColor" />
          </svg>
        ))}
      </div>
      <svg viewBox="0 0 1440 80" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <path d={path} fill="currentColor" />
      </svg>
    </div>
  );
}
