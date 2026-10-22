import { describe, expect, it } from "vitest";

import { type DemoReelCategory, createDemoReel } from "@/domain/entities/demo-reel";
import type { DemoReelRepository } from "@/domain/repositories/demo-reel-repository";

import { ListDemoReelCategories } from "./list-demo-reel-categories";

const repositoryWith = (...categories: DemoReelCategory[]): DemoReelRepository => ({
  findAll: async () =>
    categories.map((category, index) =>
      createDemoReel({
        id: `reel-${index}`,
        title: "Reel",
        category,
        audioSrc: "/audio/reel.mp3",
        durationInSeconds: 30,
      }),
    ),
});

describe("ListDemoReelCategories", () => {
  it("returns only used categories in canonical order", async () => {
    const useCase = new ListDemoReelCategories(
      repositoryWith("eventos", "carro-de-som", "eventos"),
    );

    await expect(useCase.execute()).resolves.toEqual(["carro-de-som", "eventos"]);
  });

  it("returns nothing when there are no reels", async () => {
    await expect(new ListDemoReelCategories(repositoryWith()).execute()).resolves.toEqual([]);
  });
});
