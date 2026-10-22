"use client";

import { useEffect, useRef } from "react";

/**
 * A soft gold light that follows the mouse. Only on devices with a fine
 * pointer; positions are written straight to CSS variables, so moving the
 * mouse never re-renders React.
 */
export function CursorSpotlight() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element || !window.matchMedia("(pointer: fine)").matches) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        element.style.setProperty("--x", `${event.clientX}px`);
        element.style.setProperty("--y", `${event.clientY}px`);
        element.style.opacity = "1";
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-30 opacity-0 transition-opacity duration-700"
      style={{
        background:
          "radial-gradient(600px circle at var(--x, 50%) var(--y, 50%), rgb(233 185 73 / 0.07), transparent 60%)",
      }}
    />
  );
}
