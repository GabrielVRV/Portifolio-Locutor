import { describe, expect, it } from "vitest";

import { getAnnouncerProfile, listDemoReelCategories, listDemoReels } from "./container";

/**
 * Runs the real use cases against the real `content/` files, so invalid
 * content breaks CI instead of the deployed site.
 */
describe("content", () => {
  it("has a valid announcer profile", async () => {
    await expect(getAnnouncerProfile.execute()).resolves.toMatchObject({ name: "Carlos Artur" });
  });

  it("has valid demo reels", async () => {
    await expect(listDemoReels.execute()).resolves.toBeInstanceOf(Array);
    await expect(listDemoReelCategories.execute()).resolves.toBeInstanceOf(Array);
  });
});
