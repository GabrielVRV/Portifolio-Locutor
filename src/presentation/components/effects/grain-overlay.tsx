/**
 * Subtle film grain over the whole page, for a tactile, analog feel.
 */
export function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="grain pointer-events-none fixed inset-0 z-[90] opacity-[0.06] mix-blend-overlay"
    />
  );
}
