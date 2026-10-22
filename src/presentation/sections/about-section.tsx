import { CountUp } from "@/presentation/components/effects/count-up";
import { Reveal } from "@/presentation/components/effects/reveal";
import { SectionHeading } from "@/presentation/components/section-heading";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface AboutSectionProps {
  readonly announcer: Pick<
    AnnouncerViewModel,
    "bio" | "yearsOfExperience" | "stations" | "services"
  >;
}

export function AboutSection({ announcer }: AboutSectionProps) {
  const stats = [
    { value: announcer.yearsOfExperience, prefix: "+", label: "anos no rádio", featured: true },
    { value: announcer.stations.length, prefix: "", label: "rádios no currículo", featured: false },
    { value: announcer.services.length, prefix: "", label: "tipos de locução", featured: false },
  ];

  return (
    <section id="sobre" aria-labelledby="about-title" className="scroll-mt-24 py-28 sm:py-40">
      <div className="mx-auto grid max-w-7xl gap-16 px-4 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:px-8">
        <div>
          <SectionHeading id="about-title" index="01" label="Sobre">
            Uma voz que a cidade <em>reconhece</em>.
          </SectionHeading>
          <Reveal className="mt-10 max-w-xl space-y-5 text-lg leading-relaxed text-muted">
            {announcer.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        <ul className="grid content-end gap-4 sm:grid-cols-2">
          {stats.map((stat, index) => (
            <Reveal
              as="li"
              key={stat.label}
              delay={index * 120}
              className={
                stat.featured
                  ? "rounded-3xl border border-gold/30 bg-linear-to-br from-gold/10 to-transparent p-8 sm:col-span-2"
                  : "rounded-3xl border border-line bg-surface p-8"
              }
            >
              <CountUp
                value={stat.value}
                prefix={stat.prefix}
                className={
                  stat.featured
                    ? "block text-gold-gradient font-serif text-8xl leading-none sm:text-9xl"
                    : "block font-serif text-6xl leading-none"
                }
              />
              <span className="mt-4 block font-mono text-xs tracking-[0.2em] text-muted uppercase">
                {stat.label}
              </span>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
