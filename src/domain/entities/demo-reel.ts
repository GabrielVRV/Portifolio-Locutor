import { DomainValidationError } from "@/domain/errors/domain-validation-error";

export const DEMO_REEL_CATEGORIES = [
  "carro-de-som",
  "spot-comercial",
  "vinheta",
  "chamada",
  "institucional",
  "eventos",
] as const;

export type DemoReelCategory = (typeof DEMO_REEL_CATEGORIES)[number];

export const DEMO_REEL_CATEGORY_LABELS: Readonly<Record<DemoReelCategory, string>> = {
  "carro-de-som": "Carro de som",
  "spot-comercial": "Spot comercial",
  vinheta: "Vinheta",
  chamada: "Chamada de rádio",
  institucional: "Institucional",
  eventos: "Eventos",
};

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
}

export type DemoReelProps = Omit<DemoReel, "featured"> & { featured?: boolean };

export function createDemoReel(props: DemoReelProps): DemoReel {
  if (!props.id.trim()) {
    throw new DomainValidationError("Demo reel requires an id");
  }
  if (!props.title.trim()) {
    throw new DomainValidationError(`Demo reel "${props.id}" requires a title`);
  }
  if (!(props.durationInSeconds > 0)) {
    throw new DomainValidationError(`Demo reel "${props.id}" must have a positive duration`);
  }

  return { ...props, featured: props.featured ?? false };
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
