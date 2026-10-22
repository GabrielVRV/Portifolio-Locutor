import { describe, expect, it } from "vitest";

import { DomainValidationError } from "@/domain/errors/domain-validation-error";

import { type DemoReelProps, createDemoReel, sortForShowcase } from "./demo-reel";

const props = (overrides: Partial<DemoReelProps> = {}): DemoReelProps => ({
  id: "reel-1",
  title: "Spot supermercado",
  category: "spot-comercial",
  audioSrc: "/audio/reel-1.mp3",
  durationInSeconds: 30,
  ...overrides,
});

describe("createDemoReel", () => {
  it("defaults featured to false", () => {
    expect(createDemoReel(props()).featured).toBe(false);
  });

  it.each([
    ["blank id", { id: " " }],
    ["blank title", { title: "" }],
    ["zero duration", { durationInSeconds: 0 }],
    ["NaN duration", { durationInSeconds: Number.NaN }],
  ])("rejects %s", (_, overrides) => {
    expect(() => createDemoReel(props(overrides))).toThrow(DomainValidationError);
  });
});

describe("sortForShowcase", () => {
  it("puts featured first, then most recent, then undated", () => {
    const reels = [
      createDemoReel(props({ id: "undated" })),
      createDemoReel(props({ id: "old", recordedAt: new Date("2020-01-01") })),
      createDemoReel(props({ id: "featured", featured: true })),
      createDemoReel(props({ id: "new", recordedAt: new Date("2025-01-01") })),
    ];

    expect(sortForShowcase(reels).map((reel) => reel.id)).toEqual([
      "featured",
      "new",
      "old",
      "undated",
    ]);
  });
});
