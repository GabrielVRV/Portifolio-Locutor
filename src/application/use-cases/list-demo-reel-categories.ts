import { DEMO_REEL_CATEGORIES, type DemoReelCategory } from "@/domain/entities/demo-reel";
import type { DemoReelRepository } from "@/domain/repositories/demo-reel-repository";

/**
 * Lists only the categories that have at least one demo reel, so the
 * showcase never offers an empty filter.
 */
export class ListDemoReelCategories {
  constructor(private readonly demoReels: DemoReelRepository) {}

  async execute(): Promise<DemoReelCategory[]> {
    const reels = await this.demoReels.findAll();
    const used = new Set(reels.map((reel) => reel.category));

    return DEMO_REEL_CATEGORIES.filter((category) => used.has(category));
  }
}
