import { Bolt } from "@/presentation/components/bolt";
import type { StationViewModel } from "@/presentation/view-models/announcer-view-model";
import { cn } from "@/shared/lib/cn";

/*
 * Cards shown on the curved carousel. They are sized with container query
 * units (cqh/cqw) because the carousel scales each tile to its frame.
 */

const STATION_THEMES = {
  brand: "bg-brand text-ink",
  ink: "bg-ink text-paper",
  paper: "bg-white text-ink ring-2 ring-inset ring-ink",
} as const;

export type StationCardTheme = keyof typeof STATION_THEMES;

export const STATION_CARD_THEMES = Object.keys(STATION_THEMES) as StationCardTheme[];

interface StationCardProps {
  readonly station: StationViewModel;
  readonly theme: StationCardTheme;
}

export function StationCard({ station, theme }: StationCardProps) {
  return (
    <div className={cn("flex size-full flex-col justify-between p-[9cqh]", STATION_THEMES[theme])}>
      <div className="flex items-center justify-between gap-[4cqh] text-[6cqh] font-extrabold tracking-[0.18em] uppercase">
        <span className="flex items-center gap-[2cqh]">
          <Bolt className="h-[8cqh] w-[4cqh]" />
          Rádio
        </span>
        {station.current ? (
          <span className="flex items-center gap-[2.5cqh] rounded-full bg-on-air px-[4cqh] py-[1.5cqh] text-white">
            <span className="size-[3cqh] rounded-full bg-white" />
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
            "repeating-linear-gradient(90deg, currentColor 0 2px, transparent 2px 4cqh)",
          maskImage: "linear-gradient(to top, #000 40%, transparent)",
        }}
      />

      {/* Roomy line height: tight lines clip the accents of capitals (Á) */}
      <p className="line-clamp-2 pt-[2cqh] font-display text-[16cqh] leading-[1.1] uppercase">
        {station.name}
      </p>
    </div>
  );
}
