import { describe, expect, it } from "vitest";

import { DomainValidationError } from "@/domain/errors/domain-validation-error";

import { type DemoReelProps, chapterIndexAt, createDemoReel, sortForShowcase } from "./demo-reel";

const props = (overrides: Partial<DemoReelProps> = {}): DemoReelProps => ({
  id: "reel-1",
  title: "Spot supermercado",
  category: "spot-comercial",
  audioSrc: "/audio/reel-1.mp3",
  durationInSeconds: 30,
  ...overrides,
});

describe("createDemoReel", () => {
  it("defaults to not featured, without chapters or waveform", () => {
    expect(createDemoReel(props())).toMatchObject({ featured: false, chapters: [], waveform: [] });
  });

  it("accepts chapters in playback order", () => {
    const chapters = [
      { title: "Apresentação", category: "apresentacao", startInSeconds: 0 },
      { title: "Notícia", category: "noticia", startInSeconds: 15 },
    ] as const;

    expect(createDemoReel(props({ chapters })).chapters).toEqual(chapters);
  });

  it.each([
    ["blank id", { id: " " }],
    ["blank title", { title: "" }],
    ["zero duration", { durationInSeconds: 0 }],
    ["NaN duration", { durationInSeconds: Number.NaN }],
    [
      "chapter past the end",
      { chapters: [{ title: "Fim", category: "eventos", startInSeconds: 30 }] },
    ],
    [
      "chapters out of order",
      {
        chapters: [
          { title: "B", category: "noticia", startInSeconds: 10 },
          { title: "A", category: "apresentacao", startInSeconds: 5 },
        ],
      },
    ],
    ["untitled chapter", { chapters: [{ title: " ", category: "noticia", startInSeconds: 0 }] }],
    ["waveform above 1", { waveform: [0.2, 1.4] }],
  ] as const)("rejects %s", (_, overrides) => {
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

describe("chapterIndexAt", () => {
  const reel = createDemoReel(
    props({
      chapters: [
        { title: "Notícia", category: "noticia", startInSeconds: 2 },
        { title: "Ofertas", category: "spot-comercial", startInSeconds: 15 },
      ],
    }),
  );

  it.each([
    [0, -1],
    [2, 0],
    [14.9, 0],
    [15, 1],
    [29, 1],
  ])("at %ss is chapter %i", (seconds, index) => {
    expect(chapterIndexAt(reel, seconds)).toBe(index);
  });
});
