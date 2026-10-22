/**
 * Whether the user asked the OS for less motion. Safe to call on the server.
 */
export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

/** Ease-out cubic: fast start, gentle landing. */
export function easeOutCubic(t: number): number {
  return 1 - (1 - t) ** 3;
}

/**
 * Calls `onFrame` with eased progress (0 → 1) over `durationMs` using
 * requestAnimationFrame. Returns a function that cancels the animation.
 */
export function animate(
  durationMs: number,
  onFrame: (progress: number) => void,
  easing: (t: number) => number = easeOutCubic,
): () => void {
  let frame = 0;
  const start = performance.now();

  const tick = (now: number) => {
    const t = Math.min(1, (now - start) / durationMs);
    onFrame(easing(t));
    if (t < 1) frame = requestAnimationFrame(tick);
  };

  frame = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(frame);
}
