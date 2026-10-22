import type { Announcer, Photo } from "@/domain/entities/announcer";
import type { RadioExperience } from "@/domain/entities/radio-experience";
import type { ServiceOffering } from "@/domain/value-objects/service-offering";
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

export interface ServiceViewModel extends ServiceOffering {
  /** WhatsApp link asking for a quote on this specific service. */
  readonly quoteHref: string;
}

export interface StationViewModel {
  readonly name: string;
  readonly current: boolean;
  /** e.g. "2010–2018", "Desde 2019" or undefined when unknown. */
  readonly period?: string;
}

/**
 * Plain, serializable data the UI needs to render the announcer.
 */
export interface AnnouncerViewModel {
  readonly name: string;
  readonly headline: string;
  readonly tagline: string;
  readonly bio: readonly string[];
  readonly services: readonly ServiceViewModel[];
  readonly yearsOfExperience: number;
  readonly experienceLabel: string;
  readonly photo: Photo;
  readonly portrait: Photo;
  readonly whatsapp: { readonly href: string; readonly display: string };
  readonly socialLinks: readonly SocialLinkViewModel[];
  readonly stations: readonly StationViewModel[];
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
    services: announcer.services.map((service) => ({
      ...service,
      quoteHref: buildWhatsAppLink(
        announcer.whatsapp,
        `Olá, ${firstName}! Vim pelo seu site e gostaria de um orçamento de ${service.name.toLowerCase()}.`,
      ),
    })),
    yearsOfExperience: years,
    experienceLabel: `+${years} ${years === 1 ? "ano" : "anos"} no rádio`,
    photo: announcer.photo,
    portrait: announcer.portrait,
    whatsapp: {
      href: buildWhatsAppLink(announcer.whatsapp, quoteMessage),
      display: formatWhatsAppNumber(announcer.whatsapp),
    },
    socialLinks: announcer.socialLinks.map((link) => ({
      ...link,
      label: SOCIAL_NETWORK_LABELS[link.network],
    })),
    stations: announcer.experiences.map(toStationViewModel),
  };
}

function toStationViewModel({
  station,
  current,
  startYear,
  endYear,
}: RadioExperience): StationViewModel {
  return { name: station, current, period: formatPeriod(current, startYear, endYear) };
}

function formatPeriod(current: boolean, startYear?: number, endYear?: number): string | undefined {
  if (current) return startYear ? `Desde ${startYear}` : "Atualmente";
  if (startYear && endYear)
    return startYear === endYear ? `${startYear}` : `${startYear}–${endYear}`;
  return startYear?.toString() ?? endYear?.toString();
}
