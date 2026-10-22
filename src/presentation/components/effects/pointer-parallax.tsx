"use client";

import { type ElementType, type ReactNode, useEffect, useRef } from "react";

import { prefersReducedMotion } from "@/shared/lib/motion";

interface PointerParallaxProps {
  readonly children: ReactNode;
  readonly as?: ElementType;
  readonly className?: string;
}

/**
 * Publishes the pointer position over the element as `--px` and `--py`
 * (−1 → 1 from the centre). Children shift by those values times their own
 * depth, e.g. `translate(calc(var(--px) * 24px), calc(var(--py) * 24px))`.
 * Writes CSS variables directly, so moving the mouse never re-renders React.
 */
export function PointerParallax({ children, as: Tag = "div", className }: PointerParallaxProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion() || !window.matchMedia("(pointer: fine)").matches) {
      return;
    }

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const rect = element.getBoundingClientRect();
        const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
        const y = ((event.clientY - rect.top) / rect.height) * 2 - 1;
        element.style.setProperty("--px", Math.max(-1, Math.min(1, x)).toFixed(3));
        element.style.setProperty("--py", Math.max(-1, Math.min(1, y)).toFixed(3));
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
