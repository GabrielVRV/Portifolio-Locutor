import { DEMO_REEL_CATEGORIES, type DemoReelCategory } from "@/domain/entities/demo-reel";
import type { DemoReelRepository } from "@/domain/repositories/demo-reel-repository";

/**
 * Lists only the categories that have at least one demo reel or chapter, so
 * the showcase never offers an empty filter.
 */
export class ListDemoReelCategories {
  constructor(private readonly demoReels: DemoReelRepository) {}

  async execute(): Promise<DemoReelCategory[]> {
    const reels = await this.demoReels.findAll();
    const used = new Set(
      reels.flatMap((reel) => [reel.category, ...reel.chapters.map((chapter) => chapter.category)]),
    );

    return DEMO_REEL_CATEGORIES.filter((category) => used.has(category));
  }
}
