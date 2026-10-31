const LOCAL_URL = "http://localhost:3000";

/**
 * The site's public address, without a trailing slash. `NEXT_PUBLIC_SITE_URL`
 * wins (e.g. to force a domain); otherwise the host's main address is detected
 * from what it sets at build time: `URL` on Netlify, the production domain on
 * Vercel.
 */
export function resolveSiteUrl(env: NodeJS.ProcessEnv = process.env): string {
  const vercelUrl = env.VERCEL_PROJECT_PRODUCTION_URL;
  const url =
    env.NEXT_PUBLIC_SITE_URL ?? env.URL ?? (vercelUrl ? `https://${vercelUrl}` : LOCAL_URL);

  return url.replace(/\/+$/, "");
}
