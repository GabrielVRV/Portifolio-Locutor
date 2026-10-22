"use client";

import { type ReactNode, useRef } from "react";

import { cn } from "@/shared/lib/cn";

interface SpotlightCardProps {
  readonly children: ReactNode;
  readonly className?: string;
}

/**
 * A card whose border and surface light up in brand yellow around the pointer.
 */
export function SpotlightCard({ children, className }: SpotlightCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const track = (event: React.PointerEvent<HTMLDivElement>) => {
    const element = ref.current;
    if (!element) return;
    const rect = element.getBoundingClientRect();
    element.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    element.style.setProperty("--my", `${event.clientY - rect.top}px`);
  };

  return (
    <div
      ref={ref}
      onPointerMove={track}
      className={cn(
        "group relative overflow-hidden rounded-[2rem] border border-line bg-surface p-px transition-[border-color,transform] duration-500 hover:-translate-y-1 hover:border-transparent",
        className,
      )}
    >
      {/* Border glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), var(--color-brand), transparent 45%)",
        }}
      />
      <div className="relative h-full rounded-[calc(2rem-1px)] bg-surface">
        {/* Surface glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgb(255 212 0 / 0.1), transparent 50%)",
          }}
        />
        <div className="relative h-full">{children}</div>
      </div>
    </div>
  );
}
