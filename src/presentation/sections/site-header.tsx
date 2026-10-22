import { ButtonLink } from "@/presentation/components/button-link";
import { SocialIcon } from "@/presentation/components/social-icon";
import type { AnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

interface SiteHeaderProps {
  readonly announcer: Pick<AnnouncerViewModel, "name" | "headline" | "whatsapp">;
}

export function SiteHeader({ announcer }: SiteHeaderProps) {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-background/75 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#inicio" className="flex flex-col leading-none">
          <span className="font-display text-xl font-extrabold tracking-wide uppercase">
            {announcer.name}
          </span>
          <span className="text-xs font-medium tracking-[0.25em] text-muted uppercase">
            {announcer.headline}
          </span>
        </a>

        <ButtonLink href={announcer.whatsapp.href} external className="text-sm sm:text-base">
          <SocialIcon network="whatsapp" className="size-5" />
          Orçamento
        </ButtonLink>
      </div>
    </header>
  );
}
