import { BrandMark } from "@/presentation/components/brand-mark";
import { ButtonLink } from "@/presentation/components/button-link";
import { SocialIcon } from "@/presentation/components/social-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

export const NAV_ITEMS = [
  { label: "Sobre", href: "#sobre" },
  { label: "Serviços", href: "#servicos" },
  { label: "Trajetória", href: "#trajetoria" },
  { label: "Contato", href: "#contato" },
] as const;

interface SiteHeaderProps {
  readonly announcer: Pick<AnnouncerViewModel, "name" | "whatsapp">;
}

export function SiteHeader({ announcer }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-6 sm:pt-4">
      <div className="tone-ink mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full py-2 pr-2 pl-3 shadow-xl shadow-ink/20 sm:pl-4">
        <a
          href="#inicio"
          aria-label={`${announcer.name}, voltar ao início`}
          className="flex items-center gap-2"
        >
          <BrandMark className="size-9 text-paper" />
          <span className="font-display text-xl tracking-wide uppercase">{announcer.name}</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 text-xs font-extrabold tracking-[0.18em] text-muted uppercase">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors duration-200 hover:text-brand">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href={announcer.whatsapp.href} external aria-label="Pedir orçamento">
          <SocialIcon network="whatsapp" className="size-4" />
          <span className="hidden sm:inline">Orçamento</span>
        </ButtonLink>
      </div>
    </header>
  );
}
