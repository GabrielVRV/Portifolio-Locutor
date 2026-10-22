import type { Metadata, Viewport } from "next";
import { Anton, Manrope } from "next/font/google";

import { getAnnouncerProfile } from "@/main/container";
import { GrainOverlay } from "@/presentation/components/effects/grain-overlay";
import { INTRO_BOOT_SCRIPT } from "@/presentation/components/tuning-intro/intro-boot";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const anton = Anton({
  variable: "--font-anton",
  subsets: ["latin"],
  weight: "400",
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
  themeColor: "#ffd400",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      // The intro boot script sets data attributes on <html> before hydration.
      suppressHydrationWarning
      className={`${manrope.variable} ${anton.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INTRO_BOOT_SCRIPT }} />
      </head>
      <body className="min-h-dvh overflow-x-clip">
        {children}
        <GrainOverlay />
      </body>
    </html>
  );
}
