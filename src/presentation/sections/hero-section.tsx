import Image from "next/image";

import { ButtonLink } from "@/presentation/components/button-link";
import { Equalizer } from "@/presentation/components/equalizer";
import { OnAirBadge } from "@/presentation/components/on-air-badge";
import { SocialIcon } from "@/presentation/components/social-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface HeroSectionProps {
  readonly announcer: AnnouncerViewModel;
}

export function HeroSection({ announcer }: HeroSectionProps) {
  return (
    <section id="inicio" aria-labelledby="hero-title" className="relative isolate overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(60%_50%_at_15%_0%,rgb(201_36_30/0.22),transparent),radial-gradient(40%_40%_at_90%_60%,rgb(242_180_65/0.08),transparent)]"
      />

      <div className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-10 sm:px-6 sm:py-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16 lg:px-8 lg:py-24">
        <div>
          <p className="font-display text-sm font-bold tracking-[0.3em] text-dial uppercase sm:text-base">
            {announcer.headline} · {announcer.experienceLabel}
          </p>

          <h1
            id="hero-title"
            className="mt-4 font-display text-6xl leading-[0.9] font-extrabold tracking-tight uppercase sm:text-7xl lg:text-8xl"
          >
            {announcer.name}
          </h1>

          <p className="mt-6 max-w-xl text-2xl leading-snug font-medium text-balance sm:text-3xl">
            {announcer.tagline}
          </p>

          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <ButtonLink href={announcer.whatsapp.href} external size="lg">
              <SocialIcon network="whatsapp" className="size-6" />
              Pedir orçamento
            </ButtonLink>

            {announcer.socialLinks.map((link) => (
              <ButtonLink
                key={link.network}
                href={link.url}
                external
                variant="ghost"
                size="lg"
                aria-label={`${link.label} de ${announcer.name}`}
              >
                <SocialIcon network={link.network} className="size-5" />
                <span aria-hidden="true">{link.label}</span>
              </ButtonLink>
            ))}
          </div>

          {announcer.stations.length > 0 && (
            <div className="mt-12 border-t border-line pt-6">
              <h2 className="text-xs font-semibold tracking-[0.25em] text-muted uppercase">
                Passagens por
              </h2>
              <ul className="mt-3 flex flex-wrap gap-x-6 gap-y-2 font-display text-lg font-semibold tracking-wide text-foreground/90 uppercase">
                {announcer.stations.map((station) => (
                  <li key={station}>{station}</li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <figure className="relative order-first mx-auto w-full max-w-72 sm:max-w-md lg:order-none">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-line bg-surface shadow-2xl shadow-black/60">
            <Image
              src={announcer.photo.src}
              alt={announcer.photo.alt}
              fill
              sizes="(min-width: 1024px) 28rem, (min-width: 640px) 28rem, 100vw"
              fetchPriority="high"
              loading="eager"
              className="object-cover"
            />
            <div
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-linear-to-t from-background via-background/60 to-transparent"
            />
            <OnAirBadge className="absolute top-5 left-5" />
            <figcaption className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-4">
              <span className="font-display text-2xl leading-none font-extrabold tracking-wide uppercase">
                {announcer.experienceLabel}
              </span>
              <Equalizer />
            </figcaption>
          </div>
        </figure>
      </div>
    </section>
  );
}
