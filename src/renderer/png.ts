import { Resvg } from "@resvg/resvg-js";
import sharp from "sharp";

export const renderPng = async (svg: string, scale: number) => {
  const resvg = new Resvg(svg, {
    fitTo: {
      mode: "zoom",
      value: scale
    }
  });
  const png = resvg.render().asPng();
  return sharp(png).png({ compressionLevel: 9, adaptiveFiltering: true }).toBuffer();
};
