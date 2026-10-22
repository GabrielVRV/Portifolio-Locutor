import type { Photo } from "@/domain/entities/announcer";
import type { StationViewModel } from "@/presentation/view-models/announcer-view-model";
import { cn } from "@/shared/lib/cn";

/*
 * Cards shown on the curved carousel. They are sized with container query
 * units (cqh/cqw) because the carousel scales each tile to its frame.
 */

const STATION_THEMES = {
  signal: "bg-signal text-background",
  dark: "bg-surface-raised text-foreground ring-1 ring-inset ring-line",
  light: "bg-foreground text-background",
} as const;

export type StationCardTheme = keyof typeof STATION_THEMES;

export const STATION_CARD_THEMES = Object.keys(STATION_THEMES) as StationCardTheme[];

interface StationCardProps {
  readonly station: StationViewModel;
  readonly theme: StationCardTheme;
}

export function StationCard({ station, theme }: StationCardProps) {
  return (
    <div
      className={cn(
        "flex size-full flex-col justify-between p-[9cqh] font-display",
        STATION_THEMES[theme],
      )}
    >
      <div className="flex items-center justify-between gap-[4cqh] text-[6.5cqh] font-semibold tracking-[0.18em] uppercase">
        <span className="opacity-70">Rádio</span>
        {station.current ? (
          <span className="flex items-center gap-[2.5cqh] rounded-full bg-background px-[4cqh] py-[1.5cqh] text-foreground">
            <span className="size-[3cqh] rounded-full bg-on-air" />
            No ar hoje
          </span>
        ) : (
          station.period && <span className="opacity-70">{station.period}</span>
        )}
      </div>

      {/* FM dial ticks */}
      <div
        className="h-[9cqh] opacity-40"
        style={{
          backgroundImage:
            "repeating-linear-gradient(90deg, currentColor 0 1.5px, transparent 1.5px 4cqh)",
          maskImage: "linear-gradient(to top, #000 40%, transparent)",
        }}
      />

      <p className="line-clamp-2 text-[15cqh] leading-[0.95] font-extrabold tracking-tight uppercase">
        {station.name}
      </p>
    </div>
  );
}

interface PhotoCardProps {
  readonly photo: Photo;
  readonly caption: string;
}

export function PhotoCard({ photo, caption }: PhotoCardProps) {
  return (
    <div className="relative size-full bg-surface">
      {/* The carousel slices this image into strips, which next/image can't do. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={photo.src}
        alt=""
        draggable={false}
        className="absolute inset-0 size-full object-cover object-[50%_30%]"
      />
      <div className="absolute inset-0 bg-linear-to-t from-background/90 via-transparent to-transparent" />
      <p className="absolute right-[8cqh] bottom-[8cqh] left-[8cqh] font-display text-[10cqh] leading-none font-extrabold text-signal uppercase">
        {caption}
      </p>
    </div>
  );
}
