import { BlurText } from "@/presentation/components/blur-text";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

import { StationsCarousel } from "./stations-carousel";

interface StationsSectionProps {
  readonly announcer: Pick<AnnouncerViewModel, "stations" | "photo" | "experienceLabel">;
}

export function StationsSection({ announcer }: StationsSectionProps) {
  if (announcer.stations.length === 0) return null;

  return (
    <section id="radios" aria-labelledby="stations-title" className="scroll-mt-24 py-24 sm:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div>
          <p className="text-xs font-semibold tracking-[0.3em] text-signal uppercase">Trajetória</p>
          <BlurText
            as="h2"
            id="stations-title"
            text="Passagens pelas rádios"
            stagger={90}
            className="mt-4 font-display text-4xl leading-none font-black tracking-tight uppercase sm:text-6xl"
          />
        </div>
        <p className="max-w-sm text-lg text-muted">
          {announcer.experienceLabel.replace("+", "Mais de ")}, levando voz, credibilidade e energia
          para o dial.
        </p>
      </div>

      <StationsCarousel
        stations={announcer.stations}
        photo={announcer.photo}
        photoCaption={announcer.experienceLabel}
      />

      <ul className="sr-only">
        {announcer.stations.map((station) => (
          <li key={station.name}>
            {station.name}
            {station.period && `, ${station.period}`}
          </li>
        ))}
      </ul>
    </section>
  );
}
