import { FaMicrophoneLines, FaPlay } from "react-icons/fa6";

import { BlurText } from "@/presentation/components/blur-text";
import { ButtonLink } from "@/presentation/components/button-link";
import { Magnetic } from "@/presentation/components/effects/magnetic";
import { Reveal } from "@/presentation/components/effects/reveal";
import { OnAirBadge } from "@/presentation/components/on-air-badge";
import { Portrait } from "@/presentation/components/portrait";
import { RotatingBadge } from "@/presentation/components/rotating-badge";
import { SocialIcon } from "@/presentation/components/social-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface HeroSectionProps {
  readonly announcer: AnnouncerViewModel;
  /** Whether there is a demo to listen to; the secondary call to action points to it. */
  readonly hasDemo?: boolean;
}

export function HeroSection({ announcer, hasDemo = false }: HeroSectionProps) {
  const [firstName = "", ...rest] = announcer.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="tone-brand relative isolate overflow-x-clip"
    >
      {/* Soft halftone texture */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(rgb(11_11_11/0.08)_1.2px,transparent_1.2px)] mask-[linear-gradient(to_bottom,#000,transparent_80%)] bg-size-[18px_18px]"
      />

      <div className="mx-auto grid min-h-svh max-w-7xl items-center gap-12 px-4 pt-28 pb-16 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:px-8 lg:pt-32">
        {/* Centred on phones, where it stacks above the portrait; left-aligned beside it */}
        <div className="text-center lg:text-left">
          <OnAirBadge>{announcer.headline}</OnAirBadge>

          <h1
            id="hero-title"
            className="mt-6 font-display text-[clamp(4.5rem,13vw,10.5rem)] leading-[0.98] tracking-[0.03em] uppercase"
          >
            <span className="sr-only">{announcer.name}</span>
            <BlurText decorative as="span" by="letters" text={firstName} className="block" />
            <BlurText
              decorative
              as="span"
              by="letters"
              text={lastName}
              delay={300}
              className="block"
            />
          </h1>

          <BlurText
            text={announcer.tagline}
            delay={700}
            stagger={50}
            className="mx-auto mt-6 max-w-md text-xl font-semibold text-muted sm:text-2xl lg:mx-0"
          />

          <Reveal
            delay={900}
            className="mx-auto mt-10 flex max-w-sm flex-col gap-3 sm:max-w-none sm:flex-row sm:justify-center lg:justify-start"
          >
            <Magnetic className="w-full sm:w-auto">
              <ButtonLink href={announcer.whatsapp.href} external size="lg" className="w-full">
                <SocialIcon network="whatsapp" className="size-5" />
                Pedir orçamento
              </ButtonLink>
            </Magnetic>
            {hasDemo ? (
              <ButtonLink href="#ouca" variant="ghost" size="lg">
                <FaPlay aria-hidden="true" className="size-3.5" />
                Ouvir a demo
              </ButtonLink>
            ) : (
              <ButtonLink href="#sobre" variant="ghost" size="lg">
                Conheça o trabalho
              </ButtonLink>
            )}
          </Reveal>

          <Reveal
            delay={1100}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3 lg:justify-start"
          >
            <a
              href={announcer.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-display text-2xl tracking-wide hover:underline"
            >
              {announcer.whatsapp.display}
            </a>
            <span aria-hidden="true" className="h-6 w-px bg-ink/30" />
            <ul className="flex gap-2">
              {announcer.socialLinks.map((link) => (
                <li key={link.network}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${link.label} de ${announcer.name}`}
                    className="grid size-11 place-items-center rounded-full border-2 border-ink transition-colors hover:bg-ink hover:text-brand"
                  >
                    <SocialIcon network={link.network} className="size-4" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={300} className="mx-auto w-full max-w-sm sm:max-w-md lg:max-w-lg">
          <Portrait portrait={announcer.portrait}>
            <RotatingBadge
              text={`${announcer.headline} • ${announcer.name} • `}
              className="absolute top-0 -left-2 size-24 text-ink sm:-left-4 sm:size-32"
            >
              <span className="grid size-12 place-items-center rounded-full bg-ink text-brand">
                <FaMicrophoneLines aria-hidden="true" className="size-5" />
              </span>
            </RotatingBadge>
          </Portrait>
        </Reveal>
      </div>
    </section>
  );
}
