import type { ThemeDefinition, ThemePalette } from "../themes";

export type BannerFormat = "svg" | "png";

export interface BannerRenderInput {
  readonly theme: ThemeDefinition;
  readonly palette: ThemePalette;
  readonly name: string;
  readonly title: string;
  readonly footer: string;
  readonly width: number;
  readonly height: number;
  readonly radius: number;
  readonly padding: number;
}

export interface BannerRequest {
  readonly render: BannerRenderInput;
  readonly format: BannerFormat;
  readonly scale: number;
}
