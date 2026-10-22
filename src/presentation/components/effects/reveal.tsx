"use client";

import type { ElementType, ReactNode } from "react";

import { useInView } from "@/presentation/hooks/use-in-view";
import { cn } from "@/shared/lib/cn";

interface RevealProps {
  readonly children: ReactNode;
  /** Milliseconds to wait after entering the viewport. */
  readonly delay?: number;
  readonly as?: ElementType;
  readonly className?: string;
}

/**
 * Fades its content up once it scrolls into view (see `.reveal` in globals.css).
 */
export function Reveal({ children, delay = 0, as: Tag = "div", className }: RevealProps) {
  const [ref, inView] = useInView<HTMLElement>();

  return (
    <Tag
      ref={ref}
      data-visible={inView}
      className={cn("reveal", className)}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
