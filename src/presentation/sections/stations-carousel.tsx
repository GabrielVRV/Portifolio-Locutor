"use client";

import { CurvedCarousel } from "@/presentation/components/curved-carousel/curved-carousel";
import {
  STATION_CARD_THEMES,
  StationCard,
  type StationCardTheme,
} from "@/presentation/components/station-card";
import type { StationViewModel } from "@/presentation/view-models/announcer-view-model";

interface CarouselItem {
  readonly station: StationViewModel;
  readonly theme: StationCardTheme;
}

const themeAt = (index: number) =>
  STATION_CARD_THEMES[index % STATION_CARD_THEMES.length] as StationCardTheme;

/**
 * Cycles card themes so neighbouring stations never look alike, including
 * where the carousel loops from the last station back to the first.
 */
export function buildCarouselItems(stations: readonly StationViewModel[]): CarouselItem[] {
  const items = stations.map((station, index) => ({ station, theme: themeAt(index) }));
  const last = items.at(-1);

  if (last && items.length > 1 && last.theme === items[0]?.theme) {
    items[items.length - 1] = { ...last, theme: themeAt(1) };
  }
  return items;
}

interface StationsCarouselProps {
  readonly stations: readonly StationViewModel[];
}

/**
 * Client boundary for the carousel: render functions can't cross from server
 * components, so the cards are chosen here.
 */
export function StationsCarousel({ stations }: StationsCarouselProps) {
  return (
    <CurvedCarousel
      items={buildCarouselItems(stations)}
      renderItem={({ station, theme }) => <StationCard station={station} theme={theme} />}
      className="h-80 w-full sm:h-[min(78svh,680px)] sm:min-h-[380px]"
    />
  );
}
