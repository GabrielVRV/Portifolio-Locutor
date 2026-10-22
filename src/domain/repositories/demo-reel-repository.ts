import type { DemoReel } from "@/domain/entities/demo-reel";

export interface DemoReelRepository {
  findAll(): Promise<DemoReel[]>;
}
