import type { Context } from "hono";
import { cacheConfig } from "../config/defaults";
import { renderPng } from "../renderer/png";
import { resolveBannerRequest } from "../renderer/request";
import { renderSvg } from "../renderer/svg";
import { platformRegistry } from "../themes";
import { createEtag } from "../utils/hash";

const contentTypes = {
  svg: "image/svg+xml; charset=utf-8",
  png: "image/png"
} as const;

export const bannerRoute = async (c: Context) => {
  const platform = c.req.param("platform") ?? "";
  const target = c.req.param("name") ?? "Sponsor";
  const theme = platformRegistry.get(platform);

  if (!theme) {
    return c.text("Unknown Platform", 404);
  }

  const url = new URL(c.req.url);
  const request = resolveBannerRequest(theme, target, url.searchParams);
  const svg = await renderSvg(request.render);
  const body = request.format === "png" ? await renderPng(svg, request.scale) : svg;
  const etag = createEtag(body);
  const headers = new Headers({
    "Cache-Control": cacheConfig.control,
    "Content-Type": contentTypes[request.format],
    ETag: etag
  });

  if (c.req.header("if-none-match") === etag) {
    return new Response(null, {
      status: 304,
      headers
    });
  }

  return new Response(body, {
    status: 200,
    headers
  });
};
