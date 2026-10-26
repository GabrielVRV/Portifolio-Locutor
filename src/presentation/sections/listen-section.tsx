import { DemoReelPlayer } from "@/presentation/components/audio/demo-reel-player";
import { Reveal } from "@/presentation/components/effects/reveal";
import { SectionHeading } from "@/presentation/components/section-heading";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";
import type { DemoReelViewModel } from "@/presentation/view-models/demo-reel-view-model";

interface ListenSectionProps {
  readonly reels: readonly DemoReelViewModel[];
  readonly announcer: Pick<AnnouncerViewModel, "name" | "photo">;
}

export function ListenSection({ reels, announcer }: ListenSectionProps) {
  if (reels.length === 0) return null;

  return (
    <section
      id="ouca"
      aria-labelledby="listen-title"
      className="tone-ink scroll-mt-24 pt-28 pb-24 sm:pt-36 sm:pb-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="listen-title" index="01" label="Ouça">
            Ouça a voz <em>em ação</em>
          </SectionHeading>
          <Reveal as="p" className="max-w-sm text-lg text-muted">
            Uma demo, vários estilos, cada um com a sua trilha. Toque num capítulo para ir direto ao
            que você precisa.
          </Reveal>
        </div>

        <div className="mt-14 space-y-6">
          {reels.map((reel) => (
            <Reveal key={reel.id}>
              <DemoReelPlayer reel={reel} artist={announcer.name} artwork={announcer.photo.src} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
