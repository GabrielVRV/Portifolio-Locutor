"use client";

import type { Photo } from "@/domain/entities/announcer";
import { CurvedCarousel } from "@/presentation/components/curved-carousel/curved-carousel";
import {
  PhotoCard,
  STATION_CARD_THEMES,
  StationCard,
  type StationCardTheme,
} from "@/presentation/components/station-card";
import type { StationViewModel } from "@/presentation/view-models/announcer-view-model";

type CarouselItem =
  | {
      readonly kind: "station";
      readonly station: StationViewModel;
      readonly theme: StationCardTheme;
    }
  | { readonly kind: "photo" };

/** A photo tile after every this many stations, to break the rhythm. */
const PHOTO_EVERY = 2;

export function buildCarouselItems(stations: readonly StationViewModel[]): CarouselItem[] {
  return stations.flatMap((station, index): CarouselItem[] => {
    const card: CarouselItem = {
      kind: "station",
      station,
      theme: STATION_CARD_THEMES[index % STATION_CARD_THEMES.length] as StationCardTheme,
    };
    return (index + 1) % PHOTO_EVERY === 0 ? [card, { kind: "photo" }] : [card];
  });
}

interface StationsCarouselProps {
  readonly stations: readonly StationViewModel[];
  readonly photo: Photo;
  readonly photoCaption: string;
}

/**
 * Client boundary for the carousel: render functions can't cross from server
 * components, so the cards are chosen here.
 */
export function StationsCarousel({ stations, photo, photoCaption }: StationsCarouselProps) {
  return (
    <CurvedCarousel
      items={buildCarouselItems(stations)}
      renderItem={(item) =>
        item.kind === "station" ? (
          <StationCard station={item.station} theme={item.theme} />
        ) : (
          <PhotoCard photo={photo} caption={photoCaption} />
        )
      }
      className="h-80 w-full sm:h-[min(78svh,680px)] sm:min-h-[380px]"
    />
  );
}
