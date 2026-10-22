import { describe, expect, it } from "vitest";

import { JsonDemoReelRepository } from "./json-demo-reel-repository";
import { InvalidContentError } from "./parse-source";

const reel = {
  id: "spot-supermercado",
  title: "Spot supermercado",
  category: "spot-comercial",
  audioSrc: "/audio/spot-supermercado.mp3",
  durationInSeconds: 30,
};

describe("JsonDemoReelRepository", () => {
  it("maps valid content to domain demo reels", async () => {
    const [demoReel] = await new JsonDemoReelRepository([
      { ...reel, recordedAt: "2025-03-10", featured: true },
    ]).findAll();

    expect(demoReel).toMatchObject({ id: "spot-supermercado", featured: true });
    expect(demoReel?.recordedAt?.getFullYear()).toBe(2025);
  });

  it("accepts an empty list", async () => {
    await expect(new JsonDemoReelRepository([]).findAll()).resolves.toEqual([]);
  });

  it.each([
    ["unknown category", [{ ...reel, category: "podcast" }]],
    ["invalid date", [{ ...reel, recordedAt: "10/03/2025" }]],
    ["duplicated ids", [reel, reel]],
  ])("rejects %s", async (_, content) => {
    await expect(new JsonDemoReelRepository(content).findAll()).rejects.toThrow(
      InvalidContentError,
    );
  });
});
