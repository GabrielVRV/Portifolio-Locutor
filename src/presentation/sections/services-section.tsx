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
      className="tone-ink scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading id="services-title" index="03" label="Serviços">
            Sua mensagem com a <em>voz certa</em>
          </SectionHeading>
          <Reveal as="p" className="max-w-sm text-lg text-muted">
            Escolha o tipo de locução e peça o orçamento direto no WhatsApp, já com o serviço
            escolhido.
          </Reveal>
        </div>

        {/* Middle column sits lower, so the grid reads as a wave, not a table */}
        <ul className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:pb-16 lg:[&>li:nth-child(3n+2)]:translate-y-16">
          {announcer.services.map((service, index) => (
            <Reveal as="li" key={service.name} delay={(index % 3) * 100}>
              <SpotlightCard className="h-full">
                <a
                  href={service.quoteHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex h-full flex-col p-8"
                >
                  <span className="flex items-center justify-between">
                    <span className="grid size-14 place-items-center rounded-full bg-brand text-ink transition-transform duration-500 group-hover:-rotate-12">
                      <ServiceIcon name={service.name} className="size-6" />
                    </span>
                    <span className="font-display text-3xl text-paper/15">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </span>
                  <span className="mt-10 font-display text-4xl leading-none uppercase">
                    {service.name}
                  </span>
                  <span className="mt-4 flex-1 text-muted">{service.description}</span>
                  <span className="mt-8 inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] text-brand uppercase">
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

          <Reveal as="li" delay={(announcer.services.length % 3) * 100}>
            <a
              href={announcer.whatsapp.href}
              target="_blank"
              rel="noopener noreferrer"
              className="tone-brand group flex h-full min-h-72 flex-col justify-between rounded-[2rem] p-8 transition-transform duration-500 hover:-translate-y-1 hover:-rotate-1"
            >
              <span className="text-xs font-extrabold tracking-[0.18em] uppercase">
                Outro projeto?
              </span>
              <span className="font-display text-4xl leading-none uppercase">
                Precisa de algo diferente? Vamos conversar.
              </span>
              <span className="inline-flex items-center gap-2 text-xs font-extrabold tracking-[0.18em] uppercase">
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
