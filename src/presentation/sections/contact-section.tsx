import { BlurText } from "@/presentation/components/blur-text";
import { Bolt } from "@/presentation/components/bolt";
import { BroadcastRings } from "@/presentation/components/broadcast-rings";
import { ButtonLink } from "@/presentation/components/button-link";
import { Magnetic } from "@/presentation/components/effects/magnetic";
import { Reveal } from "@/presentation/components/effects/reveal";
import { ScrambleText } from "@/presentation/components/effects/scramble-text";
import { SocialIcon } from "@/presentation/components/social-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface ContactSectionProps {
  readonly announcer: Pick<AnnouncerViewModel, "name" | "whatsapp" | "socialLinks" | "services">;
}

export function ContactSection({ announcer }: ContactSectionProps) {
  const services = new Intl.ListFormat("pt-BR", { type: "conjunction" })
    .format(announcer.services.map((service) => service.name))
    .toLowerCase();

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="tone-ink relative isolate scroll-mt-24 overflow-hidden px-4 py-28 text-center sm:py-40"
    >
      <BroadcastRings className="top-1/2 left-1/2 -z-10 aspect-square w-[min(120vw,960px)] -translate-1/2" />

      <p className="flex items-center justify-center gap-2 text-xs font-extrabold tracking-[0.25em] text-muted uppercase">
        <Bolt className="h-4 w-2 text-brand" />
        <ScrambleText text="05 — Contato" />
      </p>
      <h2
        id="contact-title"
        className="mt-6 font-display text-[clamp(4.5rem,16vw,13rem)] leading-[0.85] uppercase"
      >
        <span className="sr-only">Bora gravar?</span>
        <BlurText decorative as="span" by="letters" text="Bora" stagger={70} className="block" />
        <BlurText
          decorative
          as="span"
          by="letters"
          text="gravar?"
          stagger={70}
          delay={280}
          className="block text-brand"
        />
      </h2>

      {services && (
        <Reveal as="p" className="mx-auto mt-8 max-w-xl text-lg text-balance text-muted sm:text-xl">
          {services.charAt(0).toUpperCase() + services.slice(1)}. Chama no WhatsApp e receba seu
          orçamento.
        </Reveal>
      )}

      <Reveal
        delay={150}
        className="mt-12 flex flex-col items-center justify-center gap-3 sm:flex-row"
      >
        <Magnetic>
          <ButtonLink href={announcer.whatsapp.href} external size="lg">
            <SocialIcon network="whatsapp" className="size-5" />
            {announcer.whatsapp.display}
          </ButtonLink>
        </Magnetic>
        <div className="flex gap-3">
          {announcer.socialLinks.map((link) => (
            <ButtonLink
              key={link.network}
              href={link.url}
              external
              variant="ghost"
              size="lg"
              aria-label={`${link.label} de ${announcer.name}`}
              className="aspect-square px-0"
            >
              <SocialIcon network={link.network} className="size-5" />
            </ButtonLink>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
