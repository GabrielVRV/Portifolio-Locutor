import { getAnnouncerProfile } from "@/main/container";
import { Marquee } from "@/presentation/components/marquee";
import { ContactSection } from "@/presentation/sections/contact-section";
import { HeroSection } from "@/presentation/sections/hero-section";
import { SiteFooter } from "@/presentation/sections/site-footer";
import { SiteHeader } from "@/presentation/sections/site-header";
import { StationsSection } from "@/presentation/sections/stations-section";
import { toAnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

export default async function HomePage() {
  const announcer = toAnnouncerViewModel(await getAnnouncerProfile.execute());

  return (
    <>
      <SiteHeader announcer={announcer} />
      <main>
        <HeroSection announcer={announcer} />
        {announcer.services.length > 0 && (
          <Marquee
            items={announcer.services}
            className="-rotate-2 border-y-2 border-background bg-signal py-4 font-display text-2xl font-black text-background uppercase sm:text-4xl"
          />
        )}
        <StationsSection announcer={announcer} />
        <ContactSection announcer={announcer} />
      </main>
      <SiteFooter name={announcer.name} />
    </>
  );
}
