import { easeOutCubic } from "@/shared/lib/motion";

/*
 * Choreography of the tuning intro, as pure functions of normalized time
 * t ∈ [0, 1]: the needle sweeps past the station, comes back, wobbles and
 * locks on while the signal (the name) comes through the static.
 */

export const MIN_FREQUENCY = 88;
export const MAX_FREQUENCY = 108;

/** Where the needle rests once tuned, as a share of the dial. */
export const TUNED_POSITION = 0.65;

const SWEEP_END = 0.55;
const OVERSHOOT = 0.94;

const clamp01 = (value: number) => Math.min(1, Math.max(0, value));
const easeInOut = (t: number) => (t < 0.5 ? 2 * t * t : 1 - (-2 * t + 2) ** 2 / 2);

/** Needle position on the dial (0 = 88 MHz, 1 = 108 MHz). */
export function needlePosition(t: number): number {
  const time = clamp01(t);

  if (time < SWEEP_END) {
    return easeInOut(time / SWEEP_END) * OVERSHOOT;
  }

  const settle = (time - SWEEP_END) / (1 - SWEEP_END);
  const base = OVERSHOOT + (TUNED_POSITION - OVERSHOOT) * easeOutCubic(settle);
  // A small, fading wobble, like a hand on a tuning knob.
  const wobble = Math.sin(settle * Math.PI * 5) * 0.012 * (1 - settle);
  return base + wobble;
}

/** How much of the signal has come through the static (0 → 1). */
export function signalStrength(t: number): number {
  return clamp01((clamp01(t) - 0.45) / 0.5);
}

/** Frequency shown for a needle position, e.g. "101.0". */
export function frequencyAt(position: number): string {
  return (MIN_FREQUENCY + clamp01(position) * (MAX_FREQUENCY - MIN_FREQUENCY)).toFixed(1);
}
