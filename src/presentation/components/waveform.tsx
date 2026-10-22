import { cn } from "@/shared/lib/cn";

/** Bar heights (share of the container) and animation offsets, like a voice. */
const BARS = [
  [0.35, 0],
  [0.6, 180],
  [0.9, 60],
  [0.5, 300],
  [1, 120],
  [0.7, 420],
  [0.4, 240],
  [0.85, 30],
  [0.55, 360],
  [0.75, 150],
  [0.3, 480],
  [0.65, 90],
] as const;

interface WaveformProps {
  readonly className?: string;
}

/**
 * Decorative voice waveform in the current text colour. Static under reduced
 * motion.
 */
export function Waveform({ className }: WaveformProps) {
  return (
    <div aria-hidden="true" className={cn("flex h-8 items-center gap-[3px]", className)}>
      {BARS.map(([height, delay], index) => (
        <span
          key={index}
          className="w-[3px] rounded-full bg-current motion-safe:animate-waveform"
          style={{ height: `${height * 100}%`, animationDelay: `${delay}ms` }}
        />
      ))}
    </div>
  );
}
