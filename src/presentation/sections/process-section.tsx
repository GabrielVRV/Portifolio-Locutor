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
      className="scroll-mt-24 border-t border-line py-28 sm:py-40"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeading id="process-title" index="04" label="Como funciona">
          Simples como <em>apertar o play</em>.
        </SectionHeading>

        <Reveal as="ol" className="group relative mt-20 grid gap-12 md:grid-cols-3 md:gap-8">
          {/* Signal line drawn across the steps as they come into view */}
          <span
            aria-hidden="true"
            className="absolute top-[calc(5.5rem+5px)] right-0 left-0 hidden h-px origin-left scale-x-0 bg-linear-to-r from-gold via-gold/40 to-transparent transition-transform delay-300 duration-[1600ms] ease-out group-data-[visible=true]:scale-x-100 md:block"
          />
          {STEPS.map((step, index) => (
            <li key={step.title} className="relative">
              <span className="block text-gold-gradient font-serif text-7xl leading-none italic">
                {String(index + 1).padStart(2, "0")}
              </span>
              <span
                aria-hidden="true"
                className="relative mt-4 block size-3 rounded-full border-2 border-gold bg-background"
              />
              <h3 className="mt-8 font-serif text-3xl">{step.title}</h3>
              <p className="mt-3 max-w-xs text-muted">{step.description}</p>
            </li>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
