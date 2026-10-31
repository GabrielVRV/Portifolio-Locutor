import { describe, expect, it } from "vitest";

import { resolveSiteUrl } from "./site-url";

const env = (values: Record<string, string>) => values as NodeJS.ProcessEnv;

describe("resolveSiteUrl", () => {
  it("prefers an explicit address and trims trailing slashes", () => {
    expect(
      resolveSiteUrl(
        env({
          NEXT_PUBLIC_SITE_URL: "https://carlosartur.com.br/",
          VERCEL_PROJECT_PRODUCTION_URL: "carlos-artur.vercel.app",
        }),
      ),
    ).toBe("https://carlosartur.com.br");
  });

  it("uses the main Netlify address when there is no explicit address", () => {
    expect(resolveSiteUrl(env({ URL: "https://carlos-artur.netlify.app" }))).toBe(
      "https://carlos-artur.netlify.app",
    );
  });

  it("uses the Vercel production domain when there is no explicit address", () => {
    expect(resolveSiteUrl(env({ VERCEL_PROJECT_PRODUCTION_URL: "carlos-artur.vercel.app" }))).toBe(
      "https://carlos-artur.vercel.app",
    );
  });

  it("falls back to localhost in development", () => {
    expect(resolveSiteUrl(env({}))).toBe("http://localhost:3000");
  });
});
