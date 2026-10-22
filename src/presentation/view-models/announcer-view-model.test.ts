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
    services: [{ name: "Spot comercial", description: "Spots que vendem." }],
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
    expect(viewModel.stations).toEqual([{ name: "Band FM", current: false, period: undefined }]);
  });

  it.each([
    [{ station: "A", startYear: 2010, endYear: 2018 }, "2010–2018"],
    [{ station: "A", startYear: 2015, endYear: 2015 }, "2015"],
    [{ station: "A", startYear: 2019, current: true }, "Desde 2019"],
    [{ station: "A", current: true }, "Atualmente"],
    [{ station: "A", endYear: 2005 }, "2005"],
    [{ station: "A" }, undefined],
  ])("formats the period of %o as %s", (experience, period) => {
    const viewModel = toAnnouncerViewModel(
      announcer({ experiences: [createRadioExperience(experience)] }),
    );

    expect(viewModel.stations[0]?.period).toBe(period);
  });
});
