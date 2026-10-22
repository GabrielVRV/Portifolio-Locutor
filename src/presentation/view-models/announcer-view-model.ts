import type { Announcer, Photo } from "@/domain/entities/announcer";
import type { SocialNetwork } from "@/domain/value-objects/social-link";
import { buildWhatsAppLink, formatWhatsAppNumber } from "@/domain/value-objects/whatsapp-number";

const SOCIAL_NETWORK_LABELS: Readonly<Record<SocialNetwork, string>> = {
  instagram: "Instagram",
  facebook: "Facebook",
  youtube: "YouTube",
  tiktok: "TikTok",
};

export interface SocialLinkViewModel {
  readonly network: SocialNetwork;
  readonly label: string;
  readonly url: string;
}

/**
 * Plain, serializable data the UI needs to render the announcer.
 */
export interface AnnouncerViewModel {
  readonly name: string;
  readonly headline: string;
  readonly tagline: string;
  readonly bio: readonly string[];
  readonly experienceLabel: string;
  readonly photo: Photo;
  readonly whatsapp: { readonly href: string; readonly display: string };
  readonly socialLinks: readonly SocialLinkViewModel[];
  readonly stations: readonly string[];
}

export function toAnnouncerViewModel(announcer: Announcer): AnnouncerViewModel {
  const [firstName] = announcer.name.split(" ");
  const quoteMessage = `Olá, ${firstName}! Vim pelo seu site e gostaria de fazer um orçamento.`;
  const years = announcer.yearsOfExperience;

  return {
    name: announcer.name,
    headline: announcer.headline,
    tagline: announcer.tagline,
    bio: announcer.bio,
    experienceLabel: `+${years} ${years === 1 ? "ano" : "anos"} no rádio`,
    photo: announcer.photo,
    whatsapp: {
      href: buildWhatsAppLink(announcer.whatsapp, quoteMessage),
      display: formatWhatsAppNumber(announcer.whatsapp),
    },
    socialLinks: announcer.socialLinks.map((link) => ({
      ...link,
      label: SOCIAL_NETWORK_LABELS[link.network],
    })),
    stations: announcer.experiences.map((experience) => experience.station),
  };
}
