import { describe, expect, it } from "vitest";

import { announcerViewModelFixture } from "@/presentation/testing/announcer-view-model-fixture";

import { buildCarouselItems } from "./stations-carousel";

describe("buildCarouselItems", () => {
  const items = buildCarouselItems(announcerViewModelFixture.stations);

  it("inserts a photo tile after every two stations", () => {
    expect(items.map((item) => item.kind)).toEqual(["station", "station", "photo", "station"]);
  });

  it("cycles card themes so neighbours never look alike", () => {
    const themes = items.flatMap((item) => (item.kind === "station" ? [item.theme] : []));

    expect(themes).toEqual(["signal", "dark", "light"]);
  });

  it("returns nothing without stations", () => {
    expect(buildCarouselItems([])).toEqual([]);
  });
});
