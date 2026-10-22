import { z } from "zod";

import { DEMO_REEL_CATEGORIES, type DemoReel, createDemoReel } from "@/domain/entities/demo-reel";
import type { DemoReelRepository } from "@/domain/repositories/demo-reel-repository";

import { parseSource } from "./parse-source";

const demoReelsSchema = z
  .array(
    z.object({
      id: z.string(),
      title: z.string(),
      description: z.string().optional(),
      category: z.enum(DEMO_REEL_CATEGORIES),
      audioSrc: z.string().min(1),
      durationInSeconds: z.number(),
      recordedAt: z.iso.date().optional(),
      featured: z.boolean().optional(),
    }),
  )
  .refine((reels) => new Set(reels.map((reel) => reel.id)).size === reels.length, {
    message: "Demo reel ids must be unique",
  });

/**
 * Reads demo reels from JSON content (e.g. `content/demo-reels.json`).
 */
export class JsonDemoReelRepository implements DemoReelRepository {
  constructor(
    private readonly raw: unknown,
    private readonly source = "demo-reels.json",
  ) {}

  async findAll(): Promise<DemoReel[]> {
    const data = parseSource(demoReelsSchema, this.raw, this.source);

    return data.map(({ recordedAt, ...reel }) =>
      createDemoReel({
        ...reel,
        recordedAt: recordedAt ? new Date(`${recordedAt}T00:00:00`) : undefined,
      }),
    );
  }
}
