import { DomainValidationError } from "@/domain/errors/domain-validation-error";
import type { SocialLink } from "@/domain/value-objects/social-link";
import type { WhatsAppNumber } from "@/domain/value-objects/whatsapp-number";

import type { RadioExperience } from "./radio-experience";

export interface Photo {
  readonly src: string;
  readonly alt: string;
}

/**
 * The professional profile showcased by the portfolio.
 */
export interface Announcer {
  readonly name: string;
  readonly headline: string;
  readonly tagline: string;
  readonly bio: readonly string[];
  readonly yearsOfExperience: number;
  readonly location?: string;
  readonly photo: Photo;
  readonly whatsapp: WhatsAppNumber;
  readonly socialLinks: readonly SocialLink[];
  readonly experiences: readonly RadioExperience[];
}

export function createAnnouncer(props: Announcer): Announcer {
  if (!props.name.trim()) {
    throw new DomainValidationError("Announcer requires a name");
  }
  if (!Number.isInteger(props.yearsOfExperience) || props.yearsOfExperience < 0) {
    throw new DomainValidationError("Years of experience must be a non-negative integer");
  }

  return props;
}
