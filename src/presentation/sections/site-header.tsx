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

function initials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join(".")
    .slice(0, 3);
}

export function SiteHeader({ announcer }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 rounded-full border border-line bg-background/60 py-2 pr-2 pl-6 backdrop-blur-xl">
        <a
          href="#inicio"
          aria-label={`${announcer.name}, voltar ao início`}
          className="font-serif text-2xl italic"
        >
          {initials(announcer.name)}
          <span className="text-gold">.</span>
        </a>

        <nav aria-label="Principal" className="hidden md:block">
          <ul className="flex items-center gap-8 font-mono text-[11px] tracking-[0.2em] text-muted uppercase">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors duration-200 hover:text-gold">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href={announcer.whatsapp.href} external>
          <SocialIcon network="whatsapp" className="size-4" />
          Orçamento
        </ButtonLink>
      </div>
    </header>
  );
}
