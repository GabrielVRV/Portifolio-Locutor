import { BlurText } from "@/presentation/components/blur-text";
import { ButtonLink } from "@/presentation/components/button-link";
import { SocialIcon } from "@/presentation/components/social-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface ContactSectionProps {
  readonly announcer: Pick<AnnouncerViewModel, "name" | "whatsapp" | "socialLinks" | "services">;
}

export function ContactSection({ announcer }: ContactSectionProps) {
  const services = new Intl.ListFormat("pt-BR", { type: "conjunction" })
    .format(announcer.services)
    .toLowerCase();

  return (
    <section
      id="contato"
      aria-labelledby="contact-title"
      className="relative isolate scroll-mt-24 overflow-hidden border-t border-line px-4 py-28 text-center sm:py-40"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 bottom-0 -z-10 h-2/3 bg-[radial-gradient(ellipse_at_bottom,rgb(200_240_49/0.16),transparent_65%)]"
      />

      <p className="text-xs font-semibold tracking-[0.3em] text-signal uppercase">Contato</p>
      <BlurText
        as="h2"
        id="contact-title"
        text="Bora gravar?"
        by="letters"
        stagger={45}
        className="mt-6 font-display text-[clamp(3rem,13vw,10rem)] leading-[0.85] font-black tracking-tight uppercase"
      />

      {services && (
        <p className="mx-auto mt-8 max-w-xl text-lg text-balance text-muted sm:text-xl">
          {services.charAt(0).toUpperCase() + services.slice(1)}. Chama no WhatsApp e receba seu
          orçamento.
        </p>
      )}

      <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <ButtonLink href={announcer.whatsapp.href} external size="lg">
          <SocialIcon network="whatsapp" className="size-5" />
          {announcer.whatsapp.display}
        </ButtonLink>
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
      </div>
    </section>
  );
}
