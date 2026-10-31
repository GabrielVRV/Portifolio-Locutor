import type { MetadataRoute } from "next";

import { resolveSiteUrl } from "@/main/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: resolveSiteUrl(), lastModified: new Date() }];
}
