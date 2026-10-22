import { describe, expect, it } from "vitest";

import { DomainValidationError } from "@/domain/errors/domain-validation-error";
import { parseWhatsAppNumber } from "@/domain/value-objects/whatsapp-number";

import { type Announcer, createAnnouncer } from "./announcer";

const validProps: Announcer = {
  name: "Carlos Artur",
  headline: "Locutor e radialista",
  bio: ["Bio"],
  yearsOfExperience: 20,
  photo: { src: "/images/carlos-artur.jpg", alt: "Carlos Artur" },
  whatsapp: parseWhatsAppNumber("19997355358"),
  socialLinks: [],
  experiences: [],
};

describe("createAnnouncer", () => {
  it("creates a valid announcer", () => {
    expect(createAnnouncer(validProps)).toEqual(validProps);
  });

  it("rejects a blank name", () => {
    expect(() => createAnnouncer({ ...validProps, name: " " })).toThrow(DomainValidationError);
  });

  it.each([-1, 2.5])("rejects %s years of experience", (yearsOfExperience) => {
    expect(() => createAnnouncer({ ...validProps, yearsOfExperience })).toThrow(
      DomainValidationError,
    );
  });
});
