"use client";

import { type ElementType, useEffect } from "react";

import { useInView } from "@/presentation/hooks/use-in-view";
import { animate, prefersReducedMotion } from "@/shared/lib/motion";

import { scrambleFrame } from "./scramble";

interface ScrambleTextProps {
  readonly text: string;
  readonly durationMs?: number;
  readonly as?: ElementType;
  readonly className?: string;
}

/**
 * Text that "decodes" from random glyphs when scrolled into view, like a
 * signal coming through. Screen readers always get the final text.
 */
export function ScrambleText({
  text,
  durationMs = 900,
  as: Tag = "span",
  className,
}: ScrambleTextProps) {
  const [ref, inView] = useInView<HTMLElement>(0.6);

  useEffect(() => {
    const element = ref.current;
    if (!element || !inView || prefersReducedMotion()) return;

    return animate(
      durationMs,
      (progress) => {
        element.textContent = scrambleFrame(text, progress);
      },
      (t) => t,
    );
  }, [inView, text, durationMs, ref]);

  return (
    <Tag className={className}>
      <span className="sr-only">{text}</span>
      <span ref={ref} aria-hidden="true">
        {text}
      </span>
    </Tag>
  );
}
