import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { ImageResponse } from "next/og";

import { getAnnouncerProfile } from "@/main/container";
import { toAnnouncerViewModel } from "@/presentation/view-models/announcer-view-model";

/*
 * The card shown when the link is shared on WhatsApp and social networks.
 * Generated at build time from the profile, so it never goes out of date.
 */

export const alt = "Carlos Artur, locutor e radialista";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const INK = "#0b0b0b";
const BRAND = "#ffd400";
const PAPER = "#faf8f2";
const DISC_SIZE = 530;
const DISC_RIGHT = 44;
const DISC_BOTTOM = 24;
const PORTRAIT_SIZE = 590;

export default async function OpenGraphImage() {
  const announcer = toAnnouncerViewModel(await getAnnouncerProfile.execute());
  const [font, portrait] = await Promise.all([
    readFile(join(process.cwd(), "assets/fonts/Anton-Regular.ttf")),
    readFile(join(process.cwd(), "assets/carlos-artur-recorte.png")),
  ]);
  const [firstName, ...rest] = announcer.name.toUpperCase().split(" ");
  const portraitSrc = `data:image/png;base64,${portrait.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        background: BRAND,
        color: INK,
        fontFamily: "Anton",
        padding: "56px 0 0 72px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", width: 640 }}>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: INK,
            color: PAPER,
            fontSize: 28,
            letterSpacing: 2,
            padding: "8px 24px",
            borderRadius: 999,
          }}
        >
          {announcer.headline.toUpperCase()}
        </div>
        <div style={{ display: "flex", flexDirection: "column", marginTop: 20, fontSize: 138 }}>
          <span style={{ lineHeight: 1.08 }}>{firstName}</span>
          <span style={{ lineHeight: 1.08 }}>{rest.join(" ")}</span>
        </div>
        <div style={{ display: "flex", fontSize: 40, marginTop: 8 }}>
          {announcer.experienceLabel.toUpperCase()}
        </div>
        <div
          style={{
            display: "flex",
            alignSelf: "flex-start",
            background: INK,
            color: BRAND,
            fontSize: 38,
            letterSpacing: 1,
            padding: "10px 30px",
            borderRadius: 999,
            marginTop: 22,
          }}
        >
          {announcer.whatsapp.display}
        </div>
      </div>

      <div
        style={{
          position: "absolute",
          right: DISC_RIGHT,
          bottom: DISC_BOTTOM,
          width: DISC_SIZE,
          height: DISC_SIZE,
          borderRadius: 999,
          background: PAPER,
        }}
      />
      {/* Clipped by the disc's round bottom, so the head rises above it like on the site */}
      <div
        style={{
          position: "absolute",
          right: DISC_RIGHT,
          bottom: DISC_BOTTOM,
          width: DISC_SIZE,
          height: PORTRAIT_SIZE,
          display: "flex",
          overflow: "hidden",
          borderBottomLeftRadius: DISC_SIZE / 2,
          borderBottomRightRadius: DISC_SIZE / 2,
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src={portraitSrc}
          width={PORTRAIT_SIZE}
          height={PORTRAIT_SIZE}
          style={{ position: "absolute", left: (DISC_SIZE - PORTRAIT_SIZE) / 2, bottom: 0 }}
        />
      </div>
    </div>,
    { ...size, fonts: [{ name: "Anton", data: font, style: "normal", weight: 400 }] },
  );
}
