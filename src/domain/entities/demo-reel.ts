import { DomainValidationError } from "@/domain/errors/domain-validation-error";

export const DEMO_REEL_CATEGORIES = [
  "apresentacao",
  "noticia",
  "carro-de-som",
  "spot-comercial",
  "vinheta",
  "chamada",
  "institucional",
  "eventos",
] as const;

export type DemoReelCategory = (typeof DEMO_REEL_CATEGORIES)[number];

export const DEMO_REEL_CATEGORY_LABELS: Readonly<Record<DemoReelCategory, string>> = {
  apresentacao: "Apresentação",
  noticia: "Notícia",
  "carro-de-som": "Carro de som",
  "spot-comercial": "Spot comercial",
  vinheta: "Vinheta",
  chamada: "Chamada de rádio",
  institucional: "Institucional",
  eventos: "Eventos",
};

/**
 * A labelled stretch of a reel, e.g. the news read inside a showreel, so
 * listeners can jump straight to the style they care about.
 */
export interface DemoReelChapter {
  readonly title: string;
  readonly category: DemoReelCategory;
  readonly startInSeconds: number;
}

/**
 * A voice sample that showcases the announcer's work.
 */
export interface DemoReel {
  readonly id: string;
  readonly title: string;
  readonly description?: string;
  readonly category: DemoReelCategory;
  readonly audioSrc: string;
  readonly durationInSeconds: number;
  readonly recordedAt?: Date;
  readonly featured: boolean;
  /** In playback order; empty when the reel is a single piece. */
  readonly chapters: readonly DemoReelChapter[];
  /** Loudness envelope, one 0–1 value per bar, for drawing the real waveform. */
  readonly waveform: readonly number[];
}

export type DemoReelProps = Omit<DemoReel, "featured" | "chapters" | "waveform"> & {
  featured?: boolean;
  chapters?: readonly DemoReelChapter[];
  waveform?: readonly number[];
};

export function createDemoReel(props: DemoReelProps): DemoReel {
  const chapters = props.chapters ?? [];
  const waveform = props.waveform ?? [];

  if (!props.id.trim()) {
    throw new DomainValidationError("Demo reel requires an id");
  }
  if (!props.title.trim()) {
    throw new DomainValidationError(`Demo reel "${props.id}" requires a title`);
  }
  if (!(props.durationInSeconds > 0)) {
    throw new DomainValidationError(`Demo reel "${props.id}" must have a positive duration`);
  }
  chapters.forEach((chapter, index) => {
    const previous = chapters[index - 1];
    if (!chapter.title.trim()) {
      throw new DomainValidationError(`Chapter ${index + 1} of "${props.id}" requires a title`);
    }
    if (chapter.startInSeconds < 0 || chapter.startInSeconds >= props.durationInSeconds) {
      throw new DomainValidationError(`Chapter "${chapter.title}" starts outside "${props.id}"`);
    }
    if (previous && chapter.startInSeconds <= previous.startInSeconds) {
      throw new DomainValidationError(`Chapters of "${props.id}" must be in playback order`);
    }
  });
  if (waveform.some((level) => !(level >= 0 && level <= 1))) {
    throw new DomainValidationError(`Waveform of "${props.id}" must stay between 0 and 1`);
  }

  return { ...props, featured: props.featured ?? false, chapters, waveform };
}

/**
 * Index of the chapter playing at `seconds`, or -1 before the first chapter
 * (or when the reel has none).
 */
export function chapterIndexAt(reel: Pick<DemoReel, "chapters">, seconds: number): number {
  let current = -1;
  reel.chapters.forEach((chapter, index) => {
    if (seconds >= chapter.startInSeconds) current = index;
  });
  return current;
}

/**
 * Featured reels first, then the most recently recorded. Undated reels go last.
 */
export function sortForShowcase(reels: readonly DemoReel[]): DemoReel[] {
  const recordedTime = (reel: DemoReel) => reel.recordedAt?.getTime() ?? Number.NEGATIVE_INFINITY;

  return [...reels].sort((a, b) => {
    const byFeatured = Number(b.featured) - Number(a.featured);
    if (byFeatured !== 0) return byFeatured;

    const byDate = recordedTime(b) - recordedTime(a);
    return Number.isNaN(byDate) ? 0 : byDate;
  });
}
