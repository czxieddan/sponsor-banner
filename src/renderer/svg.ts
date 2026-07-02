import { createElement } from "react";
import satori from "satori";
import { SponsorBanner } from "../components/SponsorBanner";
import { getFonts } from "./fonts";
import { getLogoDataUri } from "./logos";
import type { BannerRenderInput } from "./types";

export const renderSvg = async (input: BannerRenderInput) => {
  const [fonts, logo] = await Promise.all([getFonts(), getLogoDataUri(input.palette.logo)]);
  const element = createElement(SponsorBanner, {
    logo,
    logoLabel: input.theme.label,
    title: input.title,
    name: input.name,
    footer: input.footer,
    width: input.width,
    height: input.height,
    radius: input.radius,
    padding: input.padding,
    background: input.palette.background,
    foreground: input.palette.foreground,
    muted: input.palette.muted
  });

  return satori(element, {
    width: input.width,
    height: input.height,
    fonts
  });
};
