import { Reveal } from "@/presentation/components/effects/reveal";
import { SectionHeading } from "@/presentation/components/section-heading";

const STEPS = [
  {
    title: "Chama no WhatsApp",
    description: "Conte o que você precisa: spot, vinheta, chamada ou carro de som.",
  },
  {
    title: "Envie o texto",
    description: "Mande o texto ou a ideia do anúncio, junto com o prazo que você precisa.",
  },
  {
    title: "Receba a gravação",
    description: "Áudio pronto para tocar no rádio, no carro de som ou nas redes sociais.",
  },
] as const;

export function ProcessSection() {
  return (
    <section
      id="como-funciona"
      aria-labelledby="process-title"
      className="tone-brand scroll-mt-24 py-24 sm:py-32"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="process-title" index="05" label="Como funciona" align="center">
          Simples como <em>apertar o play</em>
        </SectionHeading>

        {/* Steps as speech bubbles, stepping down like a conversation */}
        <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-6 md:pb-20">
          {STEPS.map((step, index) => (
            <Reveal
              as="li"
              key={step.title}
              delay={index * 150}
              className={index === 1 ? "md:translate-y-10" : index === 2 ? "md:translate-y-20" : ""}
            >
              <div className="tone-ink relative rounded-[2rem] p-8 shadow-[0_24px_50px_-24px] shadow-ink/60">
                <span className="font-display text-7xl leading-none text-brand">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-display text-3xl uppercase">{step.title}</h3>
                <p className="mt-3 text-muted">{step.description}</p>
                <svg
                  aria-hidden="true"
                  viewBox="0 0 40 30"
                  className="absolute -bottom-6 left-10 h-7 w-9 text-ink"
                >
                  <path d="M0 0h40L6 30Z" fill="currentColor" />
                </svg>
              </div>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
