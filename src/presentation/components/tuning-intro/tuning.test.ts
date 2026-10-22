import { describe, expect, it } from "vitest";

import { TUNED_POSITION, frequencyAt, needlePosition, signalStrength } from "./tuning";

describe("needlePosition", () => {
  it("starts at the bottom of the dial", () => {
    expect(needlePosition(0)).toBe(0);
  });

  it("sweeps past the station before settling", () => {
    const samples = Array.from({ length: 101 }, (_, i) => needlePosition(i / 100));

    expect(Math.max(...samples)).toBeGreaterThan(TUNED_POSITION + 0.2);
  });

  it("locks on the tuned position at the end", () => {
    expect(needlePosition(1)).toBeCloseTo(TUNED_POSITION, 10);
  });

  it("stays on the dial", () => {
    for (let i = 0; i <= 100; i++) {
      const position = needlePosition(i / 100);
      expect(position).toBeGreaterThanOrEqual(0);
      expect(position).toBeLessThanOrEqual(1);
    }
  });
});

describe("signalStrength", () => {
  it("is pure static early on and fully clear at the end", () => {
    expect(signalStrength(0.2)).toBe(0);
    expect(signalStrength(1)).toBe(1);
  });

  it("never decreases", () => {
    const samples = Array.from({ length: 101 }, (_, i) => signalStrength(i / 100));

    expect(samples).toEqual([...samples].sort((a, b) => a - b));
  });
});

describe("frequencyAt", () => {
  it.each([
    [0, "88.0"],
    [0.5, "98.0"],
    [1, "108.0"],
    [2, "108.0"],
  ])("maps position %s to %s MHz", (position, frequency) => {
    expect(frequencyAt(position)).toBe(frequency);
  });
});
