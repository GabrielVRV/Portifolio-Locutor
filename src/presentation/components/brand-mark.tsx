import { cn } from "@/shared/lib/cn";

interface BrandMarkProps {
  readonly className?: string;
}

/**
 * The logo symbol: a vintage microphone inside a speech bubble, over a yellow
 * disc. Redrawn as SVG so it stays sharp at any size and adapts to the tone.
 */
export function BrandMark({ className }: BrandMarkProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" className={cn("size-10", className)}>
      <circle cx="35" cy="29" r="21" fill="var(--color-brand)" />
      <path
        d="M30 50a22 22 0 1 0-15.4-6.3L10 56l11.6-5.3A22 22 0 0 0 30 50Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinejoin="round"
      />
      <g transform="rotate(-18 31 26)">
        <rect x="25" y="10" width="12" height="19" rx="6" fill="currentColor" />
        <path
          d="M27 15h8M27 18.5h8M27 22h8"
          stroke="var(--color-brand)"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <rect x="29.5" y="29" width="3" height="6" fill="currentColor" />
        <circle cx="31" cy="37" r="2.6" fill="currentColor" />
      </g>
    </svg>
  );
}
