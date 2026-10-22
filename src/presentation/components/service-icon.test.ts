import { describe, expect, it } from "vitest";

import { iconKeyForService } from "./service-icon";

describe("iconKeyForService", () => {
  it.each([
    ["Carro de som", "car"],
    ["Spot comercial", "spot"],
    ["Vinheta", "jingle"],
    ["Chamada de rádio", "radio"],
    ["Locução", "voice"],
  ])("picks the icon for %s", (name, key) => {
    expect(iconKeyForService(name)).toBe(key);
  });
});
