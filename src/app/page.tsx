import { getAnnouncerProfile, listDemoReels } from "@/main/container";
import { DialProgress } from "@/presentation/components/effects/dial-progress";
import { Marquee } from "@/presentation/components/marquee";
import { TuningIntro } from "@/presentation/components/tuning-intro/tuning-intro";
import { WaveDivider } from "@/presentation/components/wave-divider";
import { AboutSection } from "@/presentation/sections/about-section";
import { ContactSection } from "@/presentation/sections/contact-section";
import { HeroSection } from "@/presentation/sections/hero-section";
import { ListenSection } from "@/presentation/sections/listen-section";
import { ProcessSection } from "@/presentation/sections/process-section";
import { ServicesSection } from "@/presentation/sections/services-section";
import { SiteFooter } from "@/presentation/sections/site-footer";
import { SiteHeader } from "@/presentation/sections/site-header";
import { StationsSection } from "@/presentation/sections/stations-section";
import { toAnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";
import { toDemoReelViewModel } from "@/presentation/view-models/demo-reel-view-model";

export default async function HomePage() {
  const [profile, reels] = await Promise.all([
    getAnnouncerProfile.execute(),
    listDemoReels.execute(),
  ]);
  const announcer = toAnnouncerViewModel(profile);
  const demoReels = reels.map(toDemoReelViewModel);
  const hasDemo = demoReels.length > 0;
  // The section right after the hero sets the colour the hero's wave flows into.
  const afterHero = hasDemo ? "ink" : "paper";

  return (
    <>
      <TuningIntro name={announcer.name} headline={announcer.headline} />
      <SiteHeader announcer={announcer} />
      <main>
        <HeroSection announcer={announcer} hasDemo={hasDemo} />
        <WaveDivider
          className={afterHero === "ink" ? "bg-brand text-ink" : "bg-brand text-paper"}
        />
        {announcer.services.length > 0 && (
          <div className="relative z-10 -my-6 overflow-x-clip py-4 sm:-my-10">
            <Marquee
              items={announcer.services.map((service) => service.name)}
              accentClassName={afterHero === "ink" ? "text-ink" : "text-brand"}
              className={`${afterHero === "ink" ? "tone-brand" : "tone-ink"} mx-[-5%] -rotate-2 py-5 font-display text-4xl uppercase shadow-2xl shadow-ink/30 sm:text-6xl`}
            />
          </div>
        )}
        {hasDemo && (
          <>
            <ListenSection reels={demoReels} announcer={announcer} />
            <WaveDivider className="bg-ink text-paper" />
          </>
        )}
        <AboutSection announcer={announcer} />
        <WaveDivider className="bg-paper text-ink" />
        <ServicesSection announcer={announcer} />
        <WaveDivider className="bg-ink text-paper" />
        <StationsSection announcer={announcer} />
        <WaveDivider className="bg-paper text-brand" />
        <ProcessSection />
        <WaveDivider className="bg-brand text-ink" />
        <ContactSection announcer={announcer} />
      </main>
      <SiteFooter name={announcer.name} headline={announcer.headline} />
      <DialProgress />
    </>
  );
}
