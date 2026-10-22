import type { Metadata, Viewport } from "next";
import { Instrument_Serif, JetBrains_Mono, Manrope } from "next/font/google";

import { getAnnouncerProfile } from "@/main/container";
import { CursorSpotlight } from "@/presentation/components/effects/cursor-spotlight";
import { GrainOverlay } from "@/presentation/components/effects/grain-overlay";
import { INTRO_BOOT_SCRIPT } from "@/presentation/components/tuning-intro/intro-boot";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export async function generateMetadata(): Promise<Metadata> {
  const announcer = await getAnnouncerProfile.execute();
  const title = `${announcer.name} | ${announcer.headline}`;
  const description = announcer.bio[0];

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "profile",
      locale: "pt_BR",
      images: [{ url: announcer.photo.src, alt: announcer.photo.alt }],
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#0a0907",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // The intro boot script sets data attributes on <html> before hydration.
      suppressHydrationWarning
      className={`${manrope.variable} ${instrumentSerif.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        {children}
        <CursorSpotlight />
        <GrainOverlay />
      </body>
    </html>
  );
}
