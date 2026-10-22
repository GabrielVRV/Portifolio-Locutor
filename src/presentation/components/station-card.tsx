import type { StationViewModel } from "@/presentation/view-models/announcer-view-model";
import { cn } from "@/shared/lib/cn";

/*
 * Cards shown on the curved carousel. They are sized with container query
 * units (cqh/cqw) because the carousel scales each tile to its frame.
 */

const STATION_THEMES = {
  gold: "bg-linear-to-br from-gold-light via-gold to-gold-deep text-background",
  dark: "bg-surface-raised text-foreground ring-1 ring-inset ring-line",
  cream: "bg-foreground text-background",
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
      <div className="flex items-center justify-between gap-[4cqh] font-mono text-[6cqh] tracking-[0.18em] uppercase">
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

      <p className="line-clamp-2 font-serif text-[19cqh] leading-[0.95] tracking-tight">
        {station.name}
      </p>
    </div>
  );
}
