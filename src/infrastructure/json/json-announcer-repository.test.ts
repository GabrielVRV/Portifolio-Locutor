import { describe, expect, it } from "vitest";

import { DomainValidationError } from "@/domain/errors/domain-validation-error";

import { JsonAnnouncerRepository } from "./json-announcer-repository";
import { InvalidContentError } from "./parse-source";

const validContent = {
  name: "Carlos Artur",
  headline: "Locutor e radialista",
  tagline: "Slogan",
  bio: ["Bio"],
  services: [{ name: "Spot comercial", description: "Spots que vendem." }],
  yearsOfExperience: 20,
  photo: { src: "/images/carlos-artur.jpg", alt: "Carlos Artur" },
  portrait: { src: "/images/carlos-artur-recorte.webp", alt: "Carlos Artur" },
  whatsapp: "(19) 99735-5358",
  socialLinks: [{ network: "instagram", url: "https://www.instagram.com/carlosarturlocutor/" }],
  experiences: [{ station: "Band FM" }, { station: "Massa FM", startYear: 2015, current: true }],
};

describe("JsonAnnouncerRepository", () => {
  it("maps valid content to the domain announcer", async () => {
    const announcer = await new JsonAnnouncerRepository(validContent).getProfile();

    expect(announcer.whatsapp).toBe("5519997355358");
    expect(announcer.experiences).toEqual([
      { station: "Band FM", current: false },
      { station: "Massa FM", startYear: 2015, current: true },
    ]);
  });

  it("reports the source when content has the wrong shape", async () => {
    const repository = new JsonAnnouncerRepository({ ...validContent, bio: [] }, "my-file.json");

    await expect(repository.getProfile()).rejects.toThrow(InvalidContentError);
    await expect(repository.getProfile()).rejects.toThrow(/my-file\.json/);
  });

  it("rejects unknown social networks", async () => {
    const repository = new JsonAnnouncerRepository({
      ...validContent,
      socialLinks: [{ network: "orkut", url: "https://orkut.com" }],
    });

    await expect(repository.getProfile()).rejects.toThrow(InvalidContentError);
  });

  it("propagates domain rule violations", async () => {
    const repository = new JsonAnnouncerRepository({ ...validContent, whatsapp: "123" });

    await expect(repository.getProfile()).rejects.toThrow(DomainValidationError);
  });
});
