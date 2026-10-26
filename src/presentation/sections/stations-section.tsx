import { Reveal } from "@/presentation/components/effects/reveal";
import { SectionHeading } from "@/presentation/components/section-heading";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

import { StationsCarousel } from "./stations-carousel";

interface StationsSectionProps {
  readonly announcer: Pick<AnnouncerViewModel, "stations" | "experienceLabel">;
}

export function StationsSection({ announcer }: StationsSectionProps) {
  if (announcer.stations.length === 0) return null;

  return (
    <section
      id="trajetoria"
      aria-labelledby="stations-title"
      className="tone-paper scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <SectionHeading id="stations-title" index="04" label="Trajetória">
          Passagens pelas <em>rádios</em>
        </SectionHeading>
        <Reveal as="p" className="max-w-sm text-lg text-muted">
          {announcer.experienceLabel.replace("+", "Mais de ")}, levando voz, credibilidade e energia
          para o dial.
        </Reveal>
      </div>

      <StationsCarousel stations={announcer.stations} />

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
