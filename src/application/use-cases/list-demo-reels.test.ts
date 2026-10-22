import { describe, expect, it } from "vitest";

import { createDemoReel } from "@/domain/entities/demo-reel";
import type { DemoReelRepository } from "@/domain/repositories/demo-reel-repository";

import { ListDemoReels } from "./list-demo-reels";

const base = { title: "Reel", audioSrc: "/audio/reel.mp3", durationInSeconds: 30 };

const repository: DemoReelRepository = {
  findAll: async () => [
    createDemoReel({ ...base, id: "spot", category: "spot-comercial" }),
    createDemoReel({ ...base, id: "car", category: "carro-de-som", featured: true }),
    createDemoReel({ ...base, id: "jingle", category: "vinheta" }),
  ],
};

describe("ListDemoReels", () => {
  it("lists every reel in showcase order", async () => {
    const reels = await new ListDemoReels(repository).execute();

    expect(reels.map((r) => r.id)).toEqual(["car", "spot", "jingle"]);
  });

  it("filters by category", async () => {
    const reels = await new ListDemoReels(repository).execute({ category: "vinheta" });

    expect(reels.map((r) => r.id)).toEqual(["jingle"]);
  });
});
