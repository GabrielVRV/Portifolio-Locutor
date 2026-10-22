import { getAnnouncerProfile } from "@/main/container";
import { DialProgress } from "@/presentation/components/effects/dial-progress";
import { Marquee } from "@/presentation/components/marquee";
import { TuningIntro } from "@/presentation/components/tuning-intro/tuning-intro";
import { AboutSection } from "@/presentation/sections/about-section";
import { ContactSection } from "@/presentation/sections/contact-section";
import { HeroSection } from "@/presentation/sections/hero-section";
import { ProcessSection } from "@/presentation/sections/process-section";
import { ServicesSection } from "@/presentation/sections/services-section";
import { SiteFooter } from "@/presentation/sections/site-footer";
import { SiteHeader } from "@/presentation/sections/site-header";
import { StationsSection } from "@/presentation/sections/stations-section";
import { toAnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

export default async function HomePage() {
  const announcer = toAnnouncerViewModel(await getAnnouncerProfile.execute());

  return (
    <>
      <TuningIntro name={announcer.name} headline={announcer.headline} />
      <SiteHeader announcer={announcer} />
      <main>
        <HeroSection announcer={announcer} />
        {announcer.services.length > 0 && (
          <Marquee
            items={announcer.services.map((service) => service.name)}
            className="border-y border-line py-6 font-serif text-4xl italic sm:text-6xl"
          />
        )}
        <AboutSection announcer={announcer} />
        <ServicesSection announcer={announcer} />
        <StationsSection announcer={announcer} />
        <ProcessSection />
        <ContactSection announcer={announcer} />
      </main>
      <SiteFooter name={announcer.name} />
      <DialProgress />
    </>
  );
}
