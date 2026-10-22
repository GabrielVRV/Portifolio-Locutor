interface SiteFooterProps {
  readonly name: string;
}

const DEVELOPER = { name: "GabrielVRV", url: "https://github.com/GabrielVRV" };

export function SiteFooter({ name }: SiteFooterProps) {
  return (
    <footer className="border-t border-line px-4 py-8 text-sm text-muted sm:px-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {name}. Todos os direitos reservados.
        </p>
        <p>
          Desenvolvido por{" "}
          <a
            href={DEVELOPER.url}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-foreground underline-offset-4 hover:text-signal hover:underline"
          >
            {DEVELOPER.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
