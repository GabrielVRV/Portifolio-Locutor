import { describe, expect, it } from "vitest";

import { type Announcer, createAnnouncer } from "@/domain/entities/announcer";
import { createRadioExperience } from "@/domain/entities/radio-experience";
import type { AnnouncerRepository } from "@/domain/repositories/announcer-repository";
import { parseWhatsAppNumber } from "@/domain/value-objects/whatsapp-number";

import { GetAnnouncerProfile } from "./get-announcer-profile";

const announcer: Announcer = createAnnouncer({
  name: "Carlos Artur",
  headline: "Locutor e radialista",
  tagline: "Slogan",
  bio: ["Bio"],
  services: [{ name: "Spot comercial", description: "Spots que vendem." }],
  yearsOfExperience: 20,
  photo: { src: "/images/carlos-artur.jpg", alt: "Carlos Artur" },
  whatsapp: parseWhatsAppNumber("19997355358"),
  socialLinks: [],
  experiences: [
    createRadioExperience({ station: "Old", startYear: 2000, endYear: 2005 }),
    createRadioExperience({ station: "Current", startYear: 2020, current: true }),
  ],
});

const repository: AnnouncerRepository = { getProfile: async () => announcer };

describe("GetAnnouncerProfile", () => {
  it("returns the profile with the career ordered by recency", async () => {
    const profile = await new GetAnnouncerProfile(repository).execute();

    expect(profile.name).toBe("Carlos Artur");
    expect(profile.experiences.map((e) => e.station)).toEqual(["Current", "Old"]);
  });
});
