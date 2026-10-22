import type { IconType } from "react-icons";
import { FaFacebookF, FaInstagram, FaTiktok, FaWhatsapp, FaYoutube } from "react-icons/fa6";

import type { SocialNetwork } from "@/domain/value-objects/social-link";

const ICONS: Readonly<Record<SocialNetwork | "whatsapp", IconType>> = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  youtube: FaYoutube,
  tiktok: FaTiktok,
  whatsapp: FaWhatsapp,
};

interface SocialIconProps {
  readonly network: SocialNetwork | "whatsapp";
  readonly className?: string;
}

export function SocialIcon({ network, className }: SocialIconProps) {
  const Icon = ICONS[network];
  return <Icon aria-hidden="true" className={className} />;
}
