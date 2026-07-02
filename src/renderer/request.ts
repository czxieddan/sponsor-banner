import { imageDefaults, imageLimits } from "../config/defaults";
import type { ThemeDefinition, ThemeMode } from "../themes";
import { normalizeHex } from "../utils/color";
import { readInteger, readScale } from "../utils/number";
import type { BannerFormat, BannerRequest } from "./types";

const formats = new Set<BannerFormat>(["svg", "png"]);
const extensionPattern = /\.(svg|png)$/i;

const readFormat = (value: string | null): BannerFormat | undefined => {
  if (!value) {
    return undefined;
  }

  const normalized = value.toLowerCase();
  return formats.has(normalized as BannerFormat) ? (normalized as BannerFormat) : undefined;
};

const readMode = (value: string | null): ThemeMode => (value === "dark" ? "dark" : "light");

const safeDecode = (value: string) => {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
};

const readText = (value: string | null, fallback: string, limit: number) => {
  const raw = value?.trim() || fallback;
  return raw.slice(0, limit);
};

const readTarget = (target: string) => {
  const match = target.match(extensionPattern);
  const format = readFormat(match?.[1] ?? null);
  const name = match ? target.slice(0, -match[0].length) : target;
  return {
    name: safeDecode(name || "Sponsor"),
    format
  };
};

export const resolveBannerRequest = (
  theme: ThemeDefinition,
  target: string,
  searchParams: URLSearchParams
): BannerRequest => {
  const parsedTarget = readTarget(target);
  const format = readFormat(searchParams.get("format")) ?? parsedTarget.format ?? "svg";
  const mode = readMode(searchParams.get("theme"));
  const sourcePalette = theme.colors[mode];
  const foreground = normalizeHex(searchParams.get("fg")) ?? sourcePalette.foreground;
  const palette = {
    background: normalizeHex(searchParams.get("bg")) ?? sourcePalette.background,
    foreground,
    muted: foreground === sourcePalette.foreground ? sourcePalette.muted : foreground,
    logo: sourcePalette.logo
  };

  return {
    format,
    scale: readScale(searchParams.get("scale"), imageDefaults.scale, imageLimits.scale),
    render: {
      theme,
      palette,
      name: readText(parsedTarget.name, "Sponsor", 96),
      title: readText(searchParams.get("title"), theme.title || imageDefaults.title, 48),
      footer: readText(searchParams.get("footer"), theme.footer, 64),
      width: readInteger(searchParams.get("w"), imageDefaults.width, imageLimits.width),
      height: readInteger(searchParams.get("h"), imageDefaults.height, imageLimits.height),
      radius: readInteger(searchParams.get("radius"), theme.radius, imageLimits.radius),
      padding: readInteger(searchParams.get("padding"), imageDefaults.padding, imageLimits.padding)
    }
  };
};
