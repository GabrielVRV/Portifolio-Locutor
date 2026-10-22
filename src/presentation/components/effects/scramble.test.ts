import { describe, expect, it } from "vitest";

import { scrambleFrame, seededRandom } from "./scramble";

const alwaysFirstGlyph = () => 0;

describe("scrambleFrame", () => {
  it("is fully scrambled at the start, keeping spaces", () => {
    expect(scrambleFrame("AB CD", 0, alwaysFirstGlyph)).toBe("AA AA");
  });

  it("resolves the target from left to right", () => {
    expect(scrambleFrame("CARLOS", 0.5, alwaysFirstGlyph)).toBe("CARAAA");
  });

  it("returns the target once complete", () => {
    expect(scrambleFrame("Carlos Artur", 1)).toBe("Carlos Artur");
  });

  it("clamps progress outside 0–1", () => {
    expect(scrambleFrame("AB", 2)).toBe("AB");
    expect(scrambleFrame("AB", -1, alwaysFirstGlyph)).toBe("AA");
  });
});

describe("seededRandom", () => {
  it("repeats the same sequence for the same seed", () => {
    const a = seededRandom(42);
    const b = seededRandom(42);

    expect([a(), a(), a()]).toEqual([b(), b(), b()]);
  });

  it("stays within [0, 1)", () => {
    const random = seededRandom(7);
    for (let i = 0; i < 1000; i++) {
      const value = random();
      expect(value).toBeGreaterThanOrEqual(0);
      expect(value).toBeLessThan(1);
    }
  });
});
