import Image from "next/image";
import { FaArrowDown, FaMicrophoneLines } from "react-icons/fa6";

import { BlurText } from "@/presentation/components/blur-text";
import { ButtonLink } from "@/presentation/components/button-link";
import { Magnetic } from "@/presentation/components/effects/magnetic";
import { Reveal } from "@/presentation/components/effects/reveal";
import { OnAirBadge } from "@/presentation/components/on-air-badge";
import { RotatingBadge } from "@/presentation/components/rotating-badge";
import { SocialIcon } from "@/presentation/components/social-icon";
import { Waveform } from "@/presentation/components/waveform";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface HeroSectionProps {
  readonly announcer: AnnouncerViewModel;
}

export function HeroSection({ announcer }: HeroSectionProps) {
  const [firstName = "", ...rest] = announcer.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(50%_60%_at_75%_40%,rgb(233_185_73/0.13),transparent),radial-gradient(40%_40%_at_10%_90%,rgb(184_134_43/0.08),transparent)]"
      />

      <div className="mx-auto grid min-h-svh max-w-7xl items-center gap-16 px-4 pt-32 pb-24 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8">
        <div>
          <OnAirBadge>{announcer.headline}</OnAirBadge>

          <h1
            id="hero-title"
            className="mt-8 font-serif text-[clamp(4.5rem,13vw,10.5rem)] leading-[0.82] tracking-tight"
          >
            <span className="sr-only">{announcer.name}</span>
            <BlurText decorative as="span" by="letters" text={firstName} className="block" />
            <BlurText
              decorative
              as="span"
              by="letters"
              text={lastName}
              delay={300}
              className="block pl-[0.6em] italic [&_.blur-text-segment]:text-gold-gradient [&_.blur-text-segment]:pr-[0.04em]"
            />
          </h1>

          <BlurText
            text={announcer.tagline}
            delay={700}
            stagger={50}
            className="mt-8 max-w-md text-lg text-muted sm:text-xl"
          />

          <Reveal delay={900} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Magnetic>
              <ButtonLink href={announcer.whatsapp.href} external size="lg">
                <SocialIcon network="whatsapp" className="size-4" />
                Pedir orçamento
              </ButtonLink>
            </Magnetic>
            <ButtonLink href="#sobre" variant="ghost" size="lg">
              Conheça o trabalho
            </ButtonLink>
          </Reveal>
        </div>

        <Reveal delay={400} className="relative mx-auto w-full max-w-sm lg:max-w-md">
          <figure className="relative aspect-[4/5]">
            <div
              aria-hidden="true"
              className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full rounded-b-[2rem] border border-gold/40"
            />
            <div className="group absolute inset-0 overflow-hidden rounded-t-full rounded-b-[2rem] border border-line bg-surface">
              <Image
                src={announcer.photo.src}
                alt={announcer.photo.alt}
                fill
                sizes="(min-width: 1024px) 28rem, 24rem"
                loading="eager"
                fetchPriority="high"
                className="object-cover object-[50%_25%] saturate-[0.85] sepia-[0.15] transition duration-700 group-hover:scale-105 group-hover:saturate-100 group-hover:sepia-0"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-linear-to-t from-background via-background/20 to-transparent"
              />
              <figcaption className="absolute inset-x-6 bottom-6 flex items-end justify-between gap-4">
                <span>
                  <span className="block font-mono text-[10px] tracking-[0.25em] text-gold uppercase">
                    Experiência
                  </span>
                  <span className="mt-1 block font-serif text-3xl leading-none">
                    {announcer.experienceLabel}
                  </span>
                </span>
                <Waveform />
              </figcaption>
            </div>

            <RotatingBadge
              text={`${announcer.headline} • ${announcer.experienceLabel} • `}
              className="absolute top-6 -left-3 size-24 text-gold sm:top-10 sm:-left-14 sm:size-32"
            >
              <span className="grid size-12 place-items-center rounded-full bg-linear-to-br from-gold-light to-gold-deep text-background">
                <FaMicrophoneLines aria-hidden="true" className="size-5" />
              </span>
            </RotatingBadge>
          </figure>
        </Reveal>
      </div>

      <a
        href="#sobre"
        aria-label="Rolar para a próxima seção"
        className="absolute bottom-8 left-4 hidden items-center gap-3 font-mono text-[10px] tracking-[0.25em] text-muted uppercase transition-colors hover:text-gold sm:left-6 sm:flex lg:left-8"
      >
        <FaArrowDown aria-hidden="true" className="size-3 motion-safe:animate-bounce-soft" />
        Role para ouvir a história
      </a>
    </section>
  );
}
