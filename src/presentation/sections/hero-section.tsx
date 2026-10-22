import Image from "next/image";
import { FaChevronDown, FaMicrophoneLines } from "react-icons/fa6";

import { BlurText } from "@/presentation/components/blur-text";
import { ButtonLink } from "@/presentation/components/button-link";
import { OnAirBadge } from "@/presentation/components/on-air-badge";
import { RotatingBadge } from "@/presentation/components/rotating-badge";
import { SocialIcon } from "@/presentation/components/social-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface HeroSectionProps {
  readonly announcer: AnnouncerViewModel;
}

export function HeroSection({ announcer }: HeroSectionProps) {
  const [firstName = "", ...rest] = announcer.name.split(" ");
  const lastName = rest.join(" ");

  return (
    <section
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-svh flex-col items-center justify-center overflow-hidden px-4 pt-28 pb-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_50%_42%,rgb(200_240_49/0.14),transparent_42%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--color-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--color-line)_1px,transparent_1px)] mask-[radial-gradient(ellipse_at_center,#000_20%,transparent_70%)] bg-size-[64px_64px] opacity-40"
      />

      <OnAirBadge>{announcer.headline}</OnAirBadge>

      <div className="relative mt-10 [--name:clamp(3.2rem,15vw,12.5rem)]">
        <h1
          id="hero-title"
          className="text-center font-display text-[length:var(--name)] leading-[0.84] font-black tracking-tight uppercase"
        >
          <span className="sr-only">{announcer.name}</span>
          <BlurText
            decorative
            as="span"
            by="letters"
            text={firstName}
            stagger={70}
            className="block text-signal"
          />
          <BlurText
            decorative
            as="span"
            by="letters"
            text={lastName}
            stagger={70}
            delay={350}
            className="text-outline block"
          />
        </h1>

        <div className="absolute top-1/2 left-1/2 z-10 h-[calc(var(--name)*1.42)] w-[calc(var(--name)*0.82)] -translate-1/2 overflow-hidden rounded-full shadow-[0_30px_80px_-20px] ring-4 shadow-black ring-background transition-transform duration-500 ease-out hover:scale-105 hover:-rotate-3">
          <Image
            src={announcer.photo.src}
            alt={announcer.photo.alt}
            fill
            sizes="(min-width: 1024px) 11rem, 25vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[45%_30%]"
          />
        </div>

        <RotatingBadge
          text={`${announcer.headline} • ${announcer.experienceLabel} • `}
          className="absolute right-0 -bottom-26 z-20 size-24 text-foreground sm:-right-6 sm:-bottom-20 sm:size-36"
        >
          <span className="grid size-11 place-items-center rounded-full bg-signal text-background sm:size-14">
            <FaMicrophoneLines aria-hidden="true" className="size-5 sm:size-6" />
          </span>
        </RotatingBadge>
      </div>

      <BlurText
        text={announcer.tagline}
        delay={900}
        className="mt-30 max-w-xl text-center text-lg font-medium text-balance text-muted sm:mt-24 sm:text-2xl"
      />

      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
        <ButtonLink href={announcer.whatsapp.href} external size="lg">
          <SocialIcon network="whatsapp" className="size-5" />
          Pedir orçamento
        </ButtonLink>
        <ButtonLink href="#radios" variant="ghost" size="lg">
          Ver trajetória
        </ButtonLink>
      </div>

      <a
        href="#radios"
        aria-label="Rolar para a trajetória"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 p-2 text-muted transition-colors hover:text-signal"
      >
        <FaChevronDown aria-hidden="true" className="size-5 motion-safe:animate-bounce-soft" />
      </a>
    </section>
  );
}
