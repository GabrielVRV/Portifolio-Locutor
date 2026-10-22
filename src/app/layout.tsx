import type { Metadata, Viewport } from "next";
import { Manrope, Unbounded } from "next/font/google";

import { getAnnouncerProfile } from "@/main/container";

import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

// Static weights: the variable font has overlapping contours that show up in outlined text.
const unbounded = Unbounded({
  variable: "--font-unbounded",
  subsets: ["latin"],
  weight: ["600", "800", "900"],
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
  themeColor: "#070707",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="pt-BR" className={`${manrope.variable} ${unbounded.variable}`}>
      <body className="min-h-dvh overflow-x-clip">{children}</body>
    </html>
  );
}
