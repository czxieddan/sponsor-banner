import { describe, expect, it } from "vitest";
import { platformRegistry } from "../src/themes";

describe("platformRegistry", () => {
  it("contains built in sponsor platforms", () => {
    expect(platformRegistry.ids()).toEqual([
      "patreon",
      "github",
      "kofi",
      "buymeacoffee",
      "afdian",
      "opencollective",
      "liberapay",
      "fanbox",
      "boosty"
    ]);
  });

  it("resolves aliases without route switches", () => {
    expect(platformRegistry.get("github-sponsors")?.id).toBe("github");
    expect(platformRegistry.get("ko-fi")?.id).toBe("kofi");
  });
});
