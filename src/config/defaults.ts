import { existsSync } from "node:fs";
import { relative, resolve, sep } from "node:path";

const loadEnv = () => {
  const envPath = resolve(process.cwd(), ".env");

  if (existsSync(envPath)) {
    process.loadEnvFile(envPath);
  }
};

const trimTrailingSlash = (value: string) => value.replace(/\/+$/, "");
const urlSchemePattern = /^[a-z][a-z\d+.-]*:/i;

const isExternalHref = (value: string) => urlSchemePattern.test(value) || value.startsWith("//");

const normalizeLocalAsset = (value: string) => {
  const normalized = value.trim().replaceAll("\\", "/").replace(/^\.\//, "");
  const segments = normalized.split("/").filter(Boolean);

  if (segments.length === 0 || segments.includes("..")) {
    return {
      filePath: "",
      href: value
    };
  }

  const cwd = resolve(process.cwd());
  const filePath = resolve(cwd, ...segments);
  const localRelativePath = relative(cwd, filePath);

  if (localRelativePath.startsWith("..") || localRelativePath.includes(`..${sep}`)) {
    return {
      filePath: "",
      href: value
    };
  }

  return {
    filePath,
    href: `/${segments.map(encodeURIComponent).join("/")}`
  };
};

const resolveFavicon = (value: string) => {
  const trimmed = value.trim();

  if (!trimmed) {
    return {
      filePath: "",
      href: ""
    };
  }

  if (isExternalHref(trimmed) || trimmed.startsWith("/")) {
    return {
      filePath: "",
      href: trimmed
    };
  }

  return normalizeLocalAsset(trimmed);
};

loadEnv();

const siteFaviconUrl = process.env.SITE_FAVICON_URL ?? "";
const siteFavicon = resolveFavicon(siteFaviconUrl);

export const serverConfig = {
  port: Number.parseInt(process.env.PORT ?? "43173", 10),
  publicBaseUrl: trimTrailingSlash(process.env.PUBLIC_BASE_URL ?? "http://localhost:43173"),
  siteTitle: process.env.SITE_TITLE ?? "Sponsor Banner",
  siteFooter: process.env.SITE_FOOTER ?? "Sponsor banner images for README files and project pages",
  siteFaviconUrl,
  siteFaviconHref: siteFavicon.href,
  siteFaviconFilePath: siteFavicon.filePath
} as const;

export const imageDefaults = {
  width: 1200,
  height: 400,
  radius: 48,
  padding: 48,
  scale: 1,
  title: "Sponsor"
} as const;

export const imageLimits = {
  width: { min: 320, max: 4096 },
  height: { min: 120, max: 2048 },
  radius: { min: 0, max: 240 },
  padding: { min: 16, max: 240 },
  scale: { min: 1, max: 3 }
} as const;

export const cacheConfig = {
  control: "public, max-age=31536000, immutable"
} as const;
