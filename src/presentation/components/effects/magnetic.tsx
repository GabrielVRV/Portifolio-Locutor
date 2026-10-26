"use client";

import { type ReactNode, useRef } from "react";

import { cn } from "@/shared/lib/cn";
import { prefersReducedMotion } from "@/shared/lib/motion";

interface MagneticProps {
  readonly children: ReactNode;
  /** Share of the pointer offset the content follows (0–1). */
  readonly strength?: number;
  readonly className?: string;
}

/**
 * Pulls its content slightly towards the pointer while hovered, like a magnet.
 */
export function Magnetic({ children, strength = 0.3, className }: MagneticProps) {
  const ref = useRef<HTMLSpanElement>(null);

  const move = (event: React.PointerEvent<HTMLSpanElement>) => {
    const element = ref.current;
    if (!element || event.pointerType !== "mouse" || prefersReducedMotion()) return;

    const rect = element.getBoundingClientRect();
    const x = (event.clientX - rect.left - rect.width / 2) * strength;
    const y = (event.clientY - rect.top - rect.height / 2) * strength;
    element.style.transform = `translate(${x}px, ${y}px)`;
  };

  const reset = () => {
    if (ref.current) ref.current.style.transform = "";
  };

  return (
    <span
      ref={ref}
      onPointerMove={move}
      onPointerLeave={reset}
      className={cn("inline-flex transition-transform duration-300 ease-out", className)}
    >
      {children}
    </span>
  );
}
