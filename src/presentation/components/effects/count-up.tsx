"use client";

import { useEffect } from "react";

import { useInView } from "@/presentation/hooks/use-in-view";
import { animate, prefersReducedMotion } from "@/shared/lib/motion";

interface CountUpProps {
  readonly value: number;
  readonly prefix?: string;
  readonly suffix?: string;
  readonly durationMs?: number;
  readonly className?: string;
}

function formatCount(n: number, prefix: string, suffix: string): string {
  return `${prefix}${Math.round(n).toLocaleString("pt-BR")}${suffix}`;
}

/**
 * Counts from zero up to `value` when scrolled into view. The final value is
 * server-rendered, so crawlers and no-JS visitors always see the real number.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
  durationMs = 1800,
  className,
}: CountUpProps) {
  const [ref, inView] = useInView<HTMLSpanElement>(0.5);
  const final = formatCount(value, prefix, suffix);

  useEffect(() => {
    const element = ref.current;
    if (!element || prefersReducedMotion()) return;

    if (!inView) {
      element.textContent = formatCount(0, prefix, suffix);
      return;
    }

    return animate(durationMs, (progress) => {
      element.textContent = formatCount(value * progress, prefix, suffix);
    });
  }, [inView, value, prefix, suffix, durationMs, ref]);

  return (
    <span className={className}>
      <span className="sr-only">{final}</span>
      <span ref={ref} aria-hidden="true">
        {final}
      </span>
    </span>
  );
}
