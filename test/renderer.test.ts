import { describe, expect, it } from "vitest";
import { renderPng } from "../src/renderer/png";
import { resolveBannerRequest } from "../src/renderer/request";
import { renderSvg } from "../src/renderer/svg";
import { platformRegistry } from "../src/themes";

const readTheme = (id: string) => {
  const theme = platformRegistry.get(id);

  if (!theme) {
    throw new Error(`${id} theme missing`);
  }

  return theme;
};

describe("renderer", () => {
  it("renders patreon svg through satori", async () => {
    const request = resolveBannerRequest(
      readTheme("patreon"),
      "RHoiScribe.svg",
      new URLSearchParams()
    );
    const svg = await renderSvg(request.render);

    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('width="1200"');
    expect(svg).toContain('height="400"');
  });

  it("renders afdian gradient style through satori", async () => {
    const request = resolveBannerRequest(
      readTheme("afdian"),
      "ParadoxArt.svg",
      new URLSearchParams("w=600&h=200")
    );
    const svg = await renderSvg(request.render);

    expect(svg).toContain("linearGradient");
    expect(svg).toContain("#8b63df");
    expect(svg).toContain("#a77af0");
  });

  it("renders png through resvg", async () => {
    const request = resolveBannerRequest(
      readTheme("patreon"),
      "RHoiScribe.png",
      new URLSearchParams()
    );
    const svg = await renderSvg(request.render);
    const png = await renderPng(svg, 1);

    expect([...png.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
  });
});
