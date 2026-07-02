import { readTextAsset } from "../config/assets";

const logoCache = new Map<string, Promise<string>>();

export const getLogoDataUri = (name: string) => {
  const cached = logoCache.get(name);

  if (cached) {
    return cached;
  }

  const loaded = readTextAsset("logos", name).then((svg) => {
    const encoded = Buffer.from(svg).toString("base64");
    return `data:image/svg+xml;base64,${encoded}`;
  });

  logoCache.set(name, loaded);
  return loaded;
};
