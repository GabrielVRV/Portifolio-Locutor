import type { Announcer } from "@/domain/entities/announcer";

/**
 * schema.org description of the announcer and his services, which tells search
 * engines who this page is about. Only states what the profile states: the
 * area served appears only once the profile has a location.
 */
export function buildStructuredData(announcer: Announcer, siteUrl: string) {
  const image = new URL(announcer.photo.src, siteUrl).toString();
  const telephone = `+${announcer.whatsapp}`;
  const sameAs = announcer.socialLinks.map((link) => link.url);
  const personId = `${siteUrl}/#person`;

  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": personId,
        name: announcer.name,
        jobTitle: announcer.headline,
        description: announcer.bio[0],
        url: siteUrl,
        image,
        telephone,
        sameAs,
      },
      {
        "@type": "ProfessionalService",
        "@id": `${siteUrl}/#service`,
        name: `${announcer.name} | ${announcer.headline}`,
        description: announcer.seo.description,
        url: siteUrl,
        image,
        telephone,
        sameAs,
        founder: { "@id": personId },
        ...(announcer.location && { areaServed: announcer.location }),
        makesOffer: announcer.services.map((service) => ({
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: service.name,
            description: service.description,
          },
        })),
      },
    ],
  };
}

/** Serializes for a <script> tag, escaping `<` so content cannot close it. */
export function serializeJsonLd(data: unknown): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
