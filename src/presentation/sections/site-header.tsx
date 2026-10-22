import { ButtonLink } from "@/presentation/components/button-link";
import { SocialIcon } from "@/presentation/components/social-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

const NAV_ITEMS = [
  { label: "Início", href: "#inicio" },
  { label: "Rádios", href: "#radios" },
  { label: "Contato", href: "#contato" },
] as const;

interface SiteHeaderProps {
  readonly announcer: Pick<AnnouncerViewModel, "name" | "whatsapp">;
}

function initials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2);
}

export function SiteHeader({ announcer }: SiteHeaderProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4 sm:px-6">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 rounded-full border border-line bg-background/60 py-2 pr-2 pl-5 backdrop-blur-xl">
        <a
          href="#inicio"
          aria-label={`${announcer.name}, voltar ao início`}
          className="font-display text-lg font-black tracking-tight uppercase"
        >
          {initials(announcer.name)}
          <span className="text-signal">.</span>
        </a>

        <nav aria-label="Principal" className="hidden sm:block">
          <ul className="flex items-center gap-8 text-sm font-semibold text-muted">
            {NAV_ITEMS.map((item) => (
              <li key={item.href}>
                <a href={item.href} className="transition-colors duration-200 hover:text-signal">
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ButtonLink href={announcer.whatsapp.href} external>
          <SocialIcon network="whatsapp" className="size-4.5" />
          Orçamento
        </ButtonLink>
      </div>
    </header>
  );
}
