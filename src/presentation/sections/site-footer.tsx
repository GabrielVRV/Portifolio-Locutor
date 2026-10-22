import { BrandMark } from "@/presentation/components/brand-mark";

import { NAV_ITEMS } from "./site-header";

interface SiteFooterProps {
  readonly name: string;
  readonly headline: string;
}

const DEVELOPER = { name: "GabrielVRV", url: "https://github.com/GabrielVRV" };

export function SiteFooter({ name, headline }: SiteFooterProps) {
  return (
    <footer className="tone-ink border-t border-line px-4 pt-16 pb-28 sm:px-6 lg:pb-24">
      <div className="mx-auto flex max-w-7xl flex-col gap-10">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
          <div className="flex items-center gap-4">
            <BrandMark className="size-16 text-paper" />
            <div>
              <p className="font-display text-4xl uppercase">{name}</p>
              <p className="text-xs font-extrabold tracking-[0.2em] text-muted uppercase">
                {headline}
              </p>
            </div>
          </div>
          <nav aria-label="Rodapé">
            <ul className="flex flex-wrap gap-x-8 gap-y-3 text-xs font-extrabold tracking-[0.18em] text-muted uppercase">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a href={item.href} className="transition-colors hover:text-brand">
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
        <div className="flex flex-col justify-between gap-2 border-t border-line pt-6 text-sm text-muted sm:flex-row">
          <p>
            © {new Date().getFullYear()} {name}. Todos os direitos reservados.
          </p>
          <p>
            Desenvolvido por{" "}
            <a
              href={DEVELOPER.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-paper underline-offset-4 hover:text-brand hover:underline"
            >
              {DEVELOPER.name}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
