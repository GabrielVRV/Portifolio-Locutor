import type { CSSProperties, ReactNode } from "react";

import { Reveal } from "@/presentation/components/effects/reveal";
import { cn } from "@/shared/lib/cn";

interface FloatingBubbleProps {
  readonly children: ReactNode;
  /** Position and size inside the cluster, e.g. "top-0 left-0 w-[60%]". */
  readonly placement: string;
  /** Look of the disc itself (background, border, text colour). */
  readonly className?: string;
  /** How far it follows the pointer, in px at the edge of the cluster. */
  readonly depth?: number;
  /** Float cycle; different values keep bubbles out of sync. */
  readonly floatSeconds?: number;
  readonly delayMs?: number;
}

/**
 * A round stat that fades in, bobs gently and drifts with the pointer
 * (inside a PointerParallax). Each motion lives on its own layer so their
 * transforms never fight: reveal → parallax → float.
 */
export function FloatingBubble({
  children,
  placement,
  className,
  depth = 16,
  floatSeconds = 6,
  delayMs = 0,
}: FloatingBubbleProps) {
  return (
    <Reveal as="li" delay={delayMs} className={cn("absolute aspect-square", placement)}>
      <div
        className="size-full transition-transform duration-500 ease-out"
        style={{
          transform: `translate(calc(var(--px, 0) * ${depth}px), calc(var(--py, 0) * ${depth}px))`,
        }}
      >
        <div
          className={cn(
            "grid size-full place-content-center rounded-full text-center transition-transform duration-500 hover:scale-105 motion-safe:animate-float",
            className,
          )}
          style={
            {
              animationDuration: `${floatSeconds}s`,
              animationDelay: `${-delayMs}ms`,
            } as CSSProperties
          }
        >
          {children}
        </div>
      </div>
    </Reveal>
  );
}
