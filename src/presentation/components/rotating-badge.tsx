import type { ReactNode } from "react";

import { cn } from "@/shared/lib/cn";

interface RotatingBadgeProps {
  /** Text written around the circle; repeated to fill it. */
  readonly text: string;
  /** Content in the middle of the badge. */
  readonly children?: ReactNode;
  readonly className?: string;
}

/**
 * A round "sticker" with text spinning along its edge.
 */
export function RotatingBadge({ text, children, className }: RotatingBadgeProps) {
  const id = `badge-path-${text.length}`;

  return (
    <div className={cn("relative grid size-28 place-items-center sm:size-36", className)}>
      <svg
        viewBox="0 0 100 100"
        aria-hidden="true"
        className="absolute inset-0 size-full motion-safe:animate-spin-slow"
      >
        <defs>
          <path id={id} d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0" />
        </defs>
        <text className="fill-current text-[8.5px] font-extrabold tracking-[0.12em] uppercase">
          <textPath href={`#${id}`} textLength="238" lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </svg>
      {children}
    </div>
  );
}
