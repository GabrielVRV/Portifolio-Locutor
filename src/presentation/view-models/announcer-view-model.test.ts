import { describe, expect, it } from "vitest";

import { type Announcer, createAnnouncer } from "@/domain/entities/announcer";
import { createRadioExperience } from "@/domain/entities/radio-experience";
import { parseWhatsAppNumber } from "@/domain/value-objects/whatsapp-number";

import { toAnnouncerViewModel } from "./announcer-view-model";

const announcer = (overrides: Partial<Announcer> = {}) =>
  createAnnouncer({
    name: "Carlos Artur",
    headline: "Locutor e radialista",
    tagline: "A voz que faz a cidade parar para ouvir.",
    bio: ["Bio"],
    yearsOfExperience: 20,
    photo: { src: "/images/carlos-artur.jpg", alt: "Carlos Artur" },
    whatsapp: parseWhatsAppNumber("19997355358"),
    socialLinks: [{ network: "instagram", url: "https://www.instagram.com/carlosarturlocutor/" }],
    experiences: [createRadioExperience({ station: "Band FM" })],
    ...overrides,
  });

describe("toAnnouncerViewModel", () => {
  it("builds a WhatsApp quote link greeting by first name", () => {
    const { whatsapp } = toAnnouncerViewModel(announcer());

    expect(whatsapp.display).toBe("(19) 99735-5358");
    expect(decodeURIComponent(whatsapp.href.replaceAll("+", " "))).toBe(
      "https://wa.me/5519997355358?text=Olá, Carlos! Vim pelo seu site e gostaria de fazer um orçamento.",
    );
  });

  it.each([
    [20, "+20 anos no rádio"],
    [1, "+1 ano no rádio"],
  ])("labels %i years of experience", (yearsOfExperience, label) => {
    expect(toAnnouncerViewModel(announcer({ yearsOfExperience })).experienceLabel).toBe(label);
  });

  it("labels social networks and lists station names", () => {
    const viewModel = toAnnouncerViewModel(announcer());

    expect(viewModel.socialLinks).toEqual([
      {
        network: "instagram",
        label: "Instagram",
        url: "https://www.instagram.com/carlosarturlocutor/",
      },
    ]);
    expect(viewModel.stations).toEqual(["Band FM"]);
  });
});
