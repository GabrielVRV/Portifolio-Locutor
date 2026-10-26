import { describe, expect, it } from "vitest";

import { createDemoReel } from "@/domain/entities/demo-reel";

import { toDemoReelViewModel } from "./demo-reel-view-model";

const reel = createDemoReel({
  id: "demo",
  title: "Demo de apresentação",
  category: "apresentacao",
  audioSrc: "/audio/demo.mp3",
  durationInSeconds: 74.76,
  featured: true,
  chapters: [
    { title: "Notícia", category: "noticia", startInSeconds: 15 },
    { title: "Ofertas", category: "spot-comercial", startInSeconds: 30.1 },
  ],
  waveform: [0.2, 1],
});

describe("toDemoReelViewModel", () => {
  it("labels the duration, category and chapters", () => {
    const viewModel = toDemoReelViewModel(reel);

    expect(viewModel).toMatchObject({
      durationLabel: "1:14",
      categoryLabel: "Apresentação",
      featured: true,
      waveform: [0.2, 1],
    });
    expect(viewModel.chapters).toEqual([
      { title: "Notícia", categoryLabel: "Notícia", startInSeconds: 15, startLabel: "0:15" },
      {
        title: "Ofertas",
        categoryLabel: "Spot comercial",
        startInSeconds: 30.1,
        startLabel: "0:30",
      },
    ]);
  });

  it("draws an even fallback waveform when none was measured", () => {
    const { waveform } = toDemoReelViewModel({ ...reel, waveform: [] });

    expect(waveform.length).toBeGreaterThan(0);
    expect(waveform.every((level) => level > 0 && level <= 1)).toBe(true);
  });
});
