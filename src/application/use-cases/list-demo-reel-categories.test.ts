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

  it("includes the categories of chapters inside a reel", async () => {
    const repository: DemoReelRepository = {
      findAll: async () => [
        createDemoReel({
          id: "demo",
          title: "Demo",
          category: "apresentacao",
          audioSrc: "/audio/demo.mp3",
          durationInSeconds: 60,
          chapters: [
            { title: "Notícia", category: "noticia", startInSeconds: 10 },
            { title: "Evento", category: "eventos", startInSeconds: 40 },
          ],
        }),
      ],
    };

    await expect(new ListDemoReelCategories(repository).execute()).resolves.toEqual([
      "apresentacao",
      "noticia",
      "eventos",
    ]);
  });

  it("returns nothing when there are no reels", async () => {
    await expect(new ListDemoReelCategories(repositoryWith()).execute()).resolves.toEqual([]);
  });
});
