import { getAnnouncerProfile } from "@/main/container";
import { HeroSection } from "@/presentation/sections/hero-section";
import { SiteHeader } from "@/presentation/sections/site-header";
import { toAnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

export default async function HomePage() {
  const announcer = toAnnouncerViewModel(await getAnnouncerProfile.execute());

  return (
    <>
      <SiteHeader announcer={announcer} />
      <main>
        <HeroSection announcer={announcer} />
      </main>
    </>
  );
}
