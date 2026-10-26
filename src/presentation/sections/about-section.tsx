import { Bolt } from "@/presentation/components/bolt";
import { CountUp } from "@/presentation/components/effects/count-up";
import { PointerParallax } from "@/presentation/components/effects/pointer-parallax";
import { Reveal } from "@/presentation/components/effects/reveal";
import { FloatingBubble } from "@/presentation/components/floating-bubble";
import { SectionHeading } from "@/presentation/components/section-heading";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface AboutSectionProps {
  readonly announcer: Pick<
    AnnouncerViewModel,
    "bio" | "yearsOfExperience" | "stations" | "services"
  >;
}

export function AboutSection({ announcer }: AboutSectionProps) {
  return (
    <section
      id="sobre"
      aria-labelledby="about-title"
      className="tone-paper scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-4 sm:px-6 lg:grid-cols-2 lg:gap-24 lg:px-8">
        <div>
          <SectionHeading id="about-title" index="02" label="Sobre">
            Uma voz que a cidade <em>reconhece</em>
          </SectionHeading>
          <Reveal className="mt-8 max-w-xl space-y-5 text-lg leading-relaxed text-muted">
            {announcer.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </Reveal>
        </div>

        {/* Stats as floating bubbles that drift with the pointer */}
        <PointerParallax
          as="ul"
          className="[container-type:inline-size] relative mx-auto aspect-square w-full max-w-md"
        >
          <FloatingBubble
            placement="top-0 left-0 w-[60%]"
            className="bg-brand shadow-[0_30px_60px_-30px] shadow-ink/50"
            depth={14}
            floatSeconds={7}
          >
            <CountUp
              value={announcer.yearsOfExperience}
              prefix="+"
              className="block font-display text-[22cqw] leading-none"
            />
            <span className="mt-1 block text-[3.4cqw] font-extrabold tracking-[0.2em] uppercase">
              anos no rádio
            </span>
          </FloatingBubble>

          <FloatingBubble
            placement="top-[22%] right-0 w-[42%]"
            className="tone-ink"
            depth={-22}
            floatSeconds={5.5}
            delayMs={150}
          >
            <CountUp
              value={announcer.stations.length}
              className="block font-display text-[15cqw] leading-none text-brand"
            />
            <span className="mt-1 block px-[4cqw] text-[2.8cqw] font-extrabold tracking-[0.18em] uppercase">
              rádios no currículo
            </span>
          </FloatingBubble>

          <FloatingBubble
            placement="bottom-0 left-[30%] w-[40%]"
            className="border-[3px] border-ink bg-paper"
            depth={28}
            floatSeconds={6.5}
            delayMs={300}
          >
            <CountUp
              value={announcer.services.length}
              className="block font-display text-[14cqw] leading-none"
            />
            <span className="mt-1 block px-[4cqw] text-[2.8cqw] font-extrabold tracking-[0.18em] uppercase">
              tipos de locução
            </span>
          </FloatingBubble>

          <Bolt className="absolute right-[12%] bottom-[18%] h-[14cqw] w-[7cqw] rotate-12 text-brand-deep" />
          <Bolt
            className="absolute top-[2%] right-[22%] h-[10cqw] w-[5cqw] -rotate-12 text-ink"
            delayMs={900}
          />
        </PointerParallax>
      </div>
    </section>
  );
}
