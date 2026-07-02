import type { SatoriOptions } from "satori";
import { readBinaryAsset } from "../config/assets";

type SatoriFont = NonNullable<SatoriOptions["fonts"]>[number];

let fontCache: Promise<SatoriFont[]> | undefined;

export const getFonts = () => {
  fontCache ??= Promise.all([
    readBinaryAsset("fonts", "Inter-Regular.ttf"),
    readBinaryAsset("fonts", "Inter-Bold.ttf")
  ]).then(([regular, bold]): SatoriFont[] => [
    {
      name: "Inter",
      data: regular,
      weight: 400,
      style: "normal"
    },
    {
      name: "Inter",
      data: bold,
      weight: 700,
      style: "normal"
    }
  ]);

  return fontCache;
};
