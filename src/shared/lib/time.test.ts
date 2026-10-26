import { describe, expect, it } from "vitest";

import { formatClock } from "./time";

describe("formatClock", () => {
  it.each([
    [0, "0:00"],
    [9.9, "0:09"],
    [74.76, "1:14"],
    [600, "10:00"],
    [-3, "0:00"],
    [Number.NaN, "0:00"],
    [Number.POSITIVE_INFINITY, "0:00"],
  ])("formats %s as %s", (seconds, clock) => {
    expect(formatClock(seconds)).toBe(clock);
  });
});
