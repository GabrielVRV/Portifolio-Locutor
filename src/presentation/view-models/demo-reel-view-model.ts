import { DEMO_REEL_CATEGORY_LABELS, type DemoReel } from "@/domain/entities/demo-reel";
import { formatClock } from "@/shared/lib/time";

export interface DemoReelChapterViewModel {
  readonly title: string;
  readonly categoryLabel: string;
  readonly startInSeconds: number;
  readonly startLabel: string;
}

/**
 * Plain, serializable data a player needs to render a demo reel.
 */
export interface DemoReelViewModel {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly categoryLabel: string;
  readonly audioSrc: string;
  readonly durationInSeconds: number;
  readonly durationLabel: string;
  readonly featured: boolean;
  readonly chapters: readonly DemoReelChapterViewModel[];
  readonly waveform: readonly number[];
}

/** Bars drawn when a reel has no measured waveform: a gentle, even shape. */
const FALLBACK_BARS = 72;

function fallbackWaveform(): number[] {
  return Array.from({ length: FALLBACK_BARS }, (_, i) => 0.45 + 0.35 * Math.abs(Math.sin(i * 0.7)));
}

export function toDemoReelViewModel(reel: DemoReel): DemoReelViewModel {
  return {
    id: reel.id,
    title: reel.title,
    description: reel.description,
    categoryLabel: DEMO_REEL_CATEGORY_LABELS[reel.category],
    audioSrc: reel.audioSrc,
    durationInSeconds: reel.durationInSeconds,
    durationLabel: formatClock(reel.durationInSeconds),
    featured: reel.featured,
    chapters: reel.chapters.map((chapter) => ({
      title: chapter.title,
      categoryLabel: DEMO_REEL_CATEGORY_LABELS[chapter.category],
      startInSeconds: chapter.startInSeconds,
      startLabel: formatClock(chapter.startInSeconds),
    })),
    waveform: reel.waveform.length > 0 ? reel.waveform : fallbackWaveform(),
  };
}
