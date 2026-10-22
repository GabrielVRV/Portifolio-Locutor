import { z } from "zod";

import { type Announcer, createAnnouncer } from "@/domain/entities/announcer";
import { createRadioExperience } from "@/domain/entities/radio-experience";
import type { AnnouncerRepository } from "@/domain/repositories/announcer-repository";
import { SOCIAL_NETWORKS } from "@/domain/value-objects/social-link";
import { parseWhatsAppNumber } from "@/domain/value-objects/whatsapp-number";

import { parseSource } from "./parse-source";

const year = z.int().min(1900).max(2100);

const announcerSchema = z.object({
  name: z.string(),
  headline: z.string(),
  bio: z.array(z.string().min(1)).min(1),
  yearsOfExperience: z.int(),
  location: z.string().optional(),
  photo: z.object({ src: z.string().min(1), alt: z.string().min(1) }),
  whatsapp: z.string(),
  socialLinks: z.array(z.object({ network: z.enum(SOCIAL_NETWORKS), url: z.url() })),
  experiences: z.array(
    z.object({
      station: z.string(),
      city: z.string().optional(),
      startYear: year.optional(),
      endYear: year.optional(),
      current: z.boolean().optional(),
    }),
  ),
});

/**
 * Reads the announcer profile from JSON content (e.g. `content/announcer.json`).
 */
export class JsonAnnouncerRepository implements AnnouncerRepository {
  constructor(
    private readonly raw: unknown,
    private readonly source = "announcer.json",
  ) {}

  async getProfile(): Promise<Announcer> {
    const data = parseSource(announcerSchema, this.raw, this.source);

    return createAnnouncer({
      ...data,
      whatsapp: parseWhatsAppNumber(data.whatsapp),
      experiences: data.experiences.map(createRadioExperience),
    });
  }
}
