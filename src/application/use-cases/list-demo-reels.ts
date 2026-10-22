import { type DemoReel, type DemoReelCategory, sortForShowcase } from "@/domain/entities/demo-reel";
import type { DemoReelRepository } from "@/domain/repositories/demo-reel-repository";

export interface ListDemoReelsInput {
  readonly category?: DemoReelCategory;
}

/**
 * Lists demo reels in showcase order, optionally filtered by category.
 */
export class ListDemoReels {
  constructor(private readonly demoReels: DemoReelRepository) {}

  async execute({ category }: ListDemoReelsInput = {}): Promise<DemoReel[]> {
    const reels = await this.demoReels.findAll();
    const filtered = category ? reels.filter((reel) => reel.category === category) : reels;

    return sortForShowcase(filtered);
  }
}
