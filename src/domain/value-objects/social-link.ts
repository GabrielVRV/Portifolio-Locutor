export const SOCIAL_NETWORKS = ["instagram", "facebook", "youtube", "tiktok"] as const;

export type SocialNetwork = (typeof SOCIAL_NETWORKS)[number];

export interface SocialLink {
  readonly network: SocialNetwork;
  readonly url: string;
}
