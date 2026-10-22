import { describe, expect, it } from "vitest";

import { announcerViewModelFixture } from "@/presentation/testing/announcer-view-model-fixture";

import { buildCarouselItems } from "./stations-carousel";

describe("buildCarouselItems", () => {
  it("keeps only stations, in order", () => {
    const items = buildCarouselItems(announcerViewModelFixture.stations);

    expect(items.map((item) => item.station.name)).toEqual([
      "Massa FM",
      "Band FM",
      "Rádio Difusora",
    ]);
  });

  it("cycles card themes so neighbours never look alike", () => {
    const stations = [...announcerViewModelFixture.stations, ...announcerViewModelFixture.stations];

    expect(buildCarouselItems(stations).map((item) => item.theme)).toEqual([
      "brand",
      "ink",
      "paper",
      "brand",
      "ink",
      "paper",
    ]);
  });

  it("avoids matching themes where the loop wraps around", () => {
    const stations = [
      ...announcerViewModelFixture.stations,
      announcerViewModelFixture.stations[0]!,
    ];

    expect(buildCarouselItems(stations).map((item) => item.theme)).toEqual([
      "brand",
      "ink",
      "paper",
      "ink",
    ]);
  });

  it("returns nothing without stations", () => {
    expect(buildCarouselItems([])).toEqual([]);
  });
});
