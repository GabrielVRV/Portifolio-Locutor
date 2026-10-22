import { describe, expect, it } from "vitest";

import { DomainValidationError } from "@/domain/errors/domain-validation-error";

import { buildWhatsAppLink, formatWhatsAppNumber, parseWhatsAppNumber } from "./whatsapp-number";

describe("parseWhatsAppNumber", () => {
  it.each([
    ["19997355358", "5519997355358"],
    ["(19) 99735-5358", "5519997355358"],
    ["+55 19 99735-5358", "5519997355358"],
    ["1932345678", "551932345678"],
  ])("normalizes %s to %s", (raw, expected) => {
    expect(parseWhatsAppNumber(raw)).toBe(expected);
  });

  it.each(["", "12345", "09997355358", "19897355358", "199973553581234"])(
    "rejects invalid number %s",
    (raw) => {
      expect(() => parseWhatsAppNumber(raw)).toThrow(DomainValidationError);
    },
  );
});

describe("formatWhatsAppNumber", () => {
  it("formats mobile numbers", () => {
    expect(formatWhatsAppNumber(parseWhatsAppNumber("19997355358"))).toBe("(19) 99735-5358");
  });

  it("formats landline numbers", () => {
    expect(formatWhatsAppNumber(parseWhatsAppNumber("1932345678"))).toBe("(19) 3234-5678");
  });
});

describe("buildWhatsAppLink", () => {
  const number = parseWhatsAppNumber("19997355358");

  it("builds a link without message", () => {
    expect(buildWhatsAppLink(number)).toBe("https://wa.me/5519997355358");
  });

  it("encodes the pre-filled message", () => {
    expect(buildWhatsAppLink(number, "Olá, Carlos! Quero um orçamento")).toBe(
      "https://wa.me/5519997355358?text=Ol%C3%A1%2C+Carlos%21+Quero+um+or%C3%A7amento",
    );
  });
});
