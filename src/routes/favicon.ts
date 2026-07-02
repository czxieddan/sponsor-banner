import { readFile } from "node:fs/promises";
import { extname } from "node:path";
import type { Context } from "hono";
import { cacheConfig, serverConfig } from "../config/defaults";

const contentTypes: Record<string, string> = {
  ".ico": "image/x-icon",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".svg": "image/svg+xml; charset=utf-8",
  ".webp": "image/webp"
};

export const faviconRoute = async (c: Context) => {
  if (!serverConfig.siteFaviconFilePath) {
    return c.notFound();
  }

  try {
    const body = await readFile(serverConfig.siteFaviconFilePath);
    const extension = extname(serverConfig.siteFaviconFilePath).toLowerCase();

    return new Response(body, {
      headers: {
        "Cache-Control": cacheConfig.control,
        "Content-Type": contentTypes[extension] ?? "application/octet-stream"
      }
    });
  } catch {
    return c.text("Favicon Not Found", 404);
  }
};
