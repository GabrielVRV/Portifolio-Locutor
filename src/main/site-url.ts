const LOCAL_URL = "http://localhost:3000";

/**
 * The site's public address, without a trailing slash. `NEXT_PUBLIC_SITE_URL`
 * wins (e.g. a custom domain on any host); on Vercel the production domain is
 * detected automatically.
 */
export function resolveSiteUrl(env: NodeJS.ProcessEnv = process.env): string {
  const url =
    env.NEXT_PUBLIC_SITE_URL ??
    (env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
      : LOCAL_URL);

  return url.replace(/\/+$/, "");
}
