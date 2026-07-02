import { createTheme } from "./createTheme";

export const fanboxTheme = createTheme({
  id: "fanbox",
  aliases: ["fanbox", "pixivfanbox", "pixiv-fanbox"],
  label: "Pixiv FANBOX",
  title: "Sponsor",
  footer: "by Pixiv FANBOX",
  radius: 48,
  colors: {
    light: {
      background: "#0096fa",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "fanbox.svg"
    },
    dark: {
      background: "#003c64",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "fanbox.svg"
    }
  }
});
