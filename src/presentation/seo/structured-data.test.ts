import { describe, expect, it } from "vitest";

import { type Announcer, createAnnouncer } from "@/domain/entities/announcer";
import { parseWhatsAppNumber } from "@/domain/value-objects/whatsapp-number";

import { buildStructuredData, serializeJsonLd } from "./structured-data";

const announcer = (overrides: Partial<Announcer> = {}) =>
  createAnnouncer({
    name: "Carlos Artur",
    headline: "Locutor e radialista",
    tagline: "Slogan",
    seo: { title: "Título", description: "Descrição" },
    bio: ["Bio"],
    services: [{ name: "Carro de som", description: "Chamadas de rua." }],
    yearsOfExperience: 30,
    photo: { src: "/images/carlos-artur.jpg", alt: "Carlos Artur" },
    portrait: { src: "/images/carlos-artur-recorte.webp", alt: "Carlos Artur" },
    whatsapp: parseWhatsAppNumber("19997355358"),
    socialLinks: [{ network: "instagram", url: "https://www.instagram.com/carlosarturlocutor/" }],
    experiences: [],
    ...overrides,
  });

const service = (data: ReturnType<typeof buildStructuredData>) =>
  data["@graph"][1] as Record<string, unknown>;

describe("buildStructuredData", () => {
  const data = buildStructuredData(announcer(), "https://carlos-artur.vercel.app");

  it("describes the person with absolute URLs and an international phone", () => {
    expect(data["@graph"][0]).toMatchObject({
      "@type": "Person",
      name: "Carlos Artur",
      image: "https://carlos-artur.vercel.app/images/carlos-artur.jpg",
      telephone: "+5519997355358",
      sameAs: ["https://www.instagram.com/carlosarturlocutor/"],
    });
  });

  it("lists the services as offers", () => {
    expect(service(data).makesOffer).toEqual([
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Carro de som",
          description: "Chamadas de rua.",
        },
      },
    ]);
  });

  it("states an area served only when the profile has a location", () => {
    expect(service(data)).not.toHaveProperty("areaServed");

    const located = buildStructuredData(announcer({ location: "Campinas" }), "https://x.dev");
    expect(service(located).areaServed).toBe("Campinas");
  });
});

describe("serializeJsonLd", () => {
  it("escapes tags so content cannot break out of the script", () => {
    expect(serializeJsonLd({ name: "</script>" })).toBe('{"name":"\\u003c/script>"}');
  });
});
