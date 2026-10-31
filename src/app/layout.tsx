import type { Metadata, Viewport } from "next";
import { Anton, Manrope } from "next/font/google";

import { getAnnouncerProfile } from "@/main/container";
import { resolveSiteUrl } from "@/main/site-url";
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

/** Public token that proves ownership of the site to Google Search Console. */
const GOOGLE_SITE_VERIFICATION = "uTJk0qud0dG4KlkWdgdVeqFKrqpUpdfmGjK4F-_fvtk";

export async function generateMetadata(): Promise<Metadata> {
  const { name, seo } = await getAnnouncerProfile.execute();

  return {
    metadataBase: new URL(resolveSiteUrl()),
    title: seo.title,
    description: seo.description,
    alternates: { canonical: "/" },
    verification: { google: GOOGLE_SITE_VERIFICATION },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: "/",
      siteName: name,
      type: "website",
      locale: "pt_BR",
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
