import { FaArrowRight } from "react-icons/fa6";

import { Reveal } from "@/presentation/components/effects/reveal";
import { SpotlightCard } from "@/presentation/components/effects/spotlight-card";
import { SectionHeading } from "@/presentation/components/section-heading";
import { ServiceIcon } from "@/presentation/components/service-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface ServicesSectionProps {
  readonly announcer: Pick<AnnouncerViewModel, "services" | "whatsapp">;
}

export function ServicesSection({ announcer }: ServicesSectionProps) {
  if (announcer.services.length === 0) return null;

  return (
    <section
      id="servicos"
      aria-labelledby="services-title"
      className="scroll-mt-24 border-t border-line py-28 sm:py-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="services-title" index="02" label="Serviços">
            Sua mensagem com a <em>voz certa</em>.
          </SectionHeading>
          <Reveal as="p" className="max-w-sm text-lg text-muted">
            Escolha o tipo de locução e peça o orçamento direto no WhatsApp, já com o serviço
            escolhido.
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {announcer.services.map((service, index) => (
            <Reveal as="li" key={service.name} delay={index * 80}>
              <SpotlightCard className="h-full">
                <a
                  href={service.quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col p-8"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-full border border-gold/40 text-gold transition-colors duration-500 group-hover:bg-gold group-hover:text-background">
                      <ServiceIcon name={service.name} className="size-5" />
                    </span>
                    <span className="font-mono text-xs text-muted">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="mt-12 font-serif text-4xl leading-none">{service.name}</span>
                  <span className="mt-4 flex-1 text-muted">{service.description}</span>
                  <span className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] text-gold uppercase">
                    Pedir orçamento
                    <FaArrowRight
                      aria-hidden="true"
                      className="size-3 transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </span>
                </a>
              </SpotlightCard>
            </Reveal>
          ))}

          <Reveal as="li" delay={announcer.services.length * 80}>
            <a
              href={announcer.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full min-h-72 flex-col justify-between rounded-3xl bg-linear-to-br from-gold-light via-gold to-gold-deep p-8 text-background transition-transform duration-500 hover:-translate-y-1"
            >
              <span className="font-mono text-[11px] tracking-[0.2em] uppercase">
                Outro projeto?
              </span>
              <span className="font-serif text-4xl leading-tight">
                Precisa de algo diferente? <em>Vamos conversar.</em>
              </span>
              <span className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.2em] uppercase">
                Falar no WhatsApp
                <FaArrowRight
                  aria-hidden="true"
                  className="size-3 transition-transform duration-300 group-hover:translate-x-1"
                />
              </span>
            </a>
          </Reveal>
        </ul>
      </div>
    </section>
  );
}
