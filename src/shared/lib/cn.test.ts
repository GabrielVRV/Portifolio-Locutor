import { describe, expect, it } from "vitest";

import { cn } from "./cn";

describe("cn", () => {
  it("joins truthy class names with a space", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("skips falsy values", () => {
    expect(cn("a", false, null, undefined, "", "b")).toBe("a b");
  });

  it("lets later Tailwind utilities override conflicting ones", () => {
    expect(cn("relative size-28 px-2", "absolute px-4")).toBe("size-28 absolute px-4");
  });
});
