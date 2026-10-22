import { describe, expect, it } from "vitest";

import { CAMERA, hiddenShare, measure, radiusShare, toRadians } from "./geometry";

const desktop = {
  width: 1440,
  height: 720,
  tileHeight: 30,
  aspectRatio: 16 / 10,
  gap: 8,
  bend: toRadians(70),
};

describe("radiusShare", () => {
  it("projects the frame edge exactly at the requested bend", () => {
    const bend = toRadians(60);
    const r = radiusShare(bend);
    const projectedHalfWidth = (r * Math.sin(bend) * CAMERA) / (CAMERA - 1 + Math.cos(bend));

    expect(projectedHalfWidth).toBeCloseTo(0.5, 10);
  });

  it("tightens the cylinder as the bend grows", () => {
    expect(radiusShare(toRadians(80))).toBeLessThan(radiusShare(toRadians(30)));
  });
});

describe("measure", () => {
  it("mounts enough tiles to cover the visible arc on both sides", () => {
    const layout = measure(desktop);
    const pitch = (desktop.aspectRatio + desktop.gap / 100) * layout.unit;

    expect(layout.columns * pitch).toBeGreaterThanOrEqual(2 * layout.limit);
    expect(layout.sweep).toBeGreaterThanOrEqual(layout.limit);
  });

  it("caps the tile width on narrow screens", () => {
    const phone = measure({ ...desktop, width: 375, height: 700 });
    const wide = measure({ ...desktop, width: 375, height: 7000 });

    expect(wide.unit).toBe(phone.unit);
  });

  it("falls back to an empty layout for a zero-sized frame", () => {
    expect(measure({ ...desktop, width: 0 })).toEqual({ columns: 2, sweep: 0, unit: 0, limit: 0 });
  });

  it("never mounts more than 60 tiles", () => {
    expect(measure({ ...desktop, height: 1, tileHeight: 1 }).columns).toBeLessThanOrEqual(60);
  });
});

describe("hiddenShare", () => {
  it("is zero when the loop ends exactly at the visible limit", () => {
    expect(hiddenShare({ columns: 4, sweep: 90, unit: 10, limit: 90 })).toBe(0);
  });

  it("hides the part of the loop beyond the limit", () => {
    expect(hiddenShare({ columns: 4, sweep: 100, unit: 10, limit: 80 })).toBe(10);
  });
});
