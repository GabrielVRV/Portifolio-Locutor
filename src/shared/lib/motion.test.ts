import { afterEach, describe, expect, it, vi } from "vitest";

import { animate, easeOutCubic } from "./motion";

describe("easeOutCubic", () => {
  it("starts at 0, ends at 1 and moves fastest at the start", () => {
    expect(easeOutCubic(0)).toBe(0);
    expect(easeOutCubic(1)).toBe(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5);
  });
});

describe("animate", () => {
  afterEach(() => {
    vi.useRealTimers();
  });

  it("reports progress until it reaches 1", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    const frames: number[] = [];

    animate(
      100,
      (progress) => frames.push(progress),
      (t) => t,
    );
    vi.advanceTimersByTime(200);

    expect(frames.at(-1)).toBe(1);
    expect(frames).toEqual([...frames].sort((a, b) => a - b));
  });

  it("can be cancelled", () => {
    vi.useFakeTimers({ toFake: ["requestAnimationFrame", "cancelAnimationFrame", "performance"] });
    const onFrame = vi.fn();

    const cancel = animate(100, onFrame);
    cancel();
    vi.advanceTimersByTime(200);

    expect(onFrame).not.toHaveBeenCalled();
  });
});
