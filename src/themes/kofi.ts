import { createTheme } from "./createTheme";

export const kofiTheme = createTheme({
  id: "kofi",
  aliases: ["kofi", "ko-fi", "ko_fi"],
  label: "Ko-fi",
  title: "Sponsor",
  footer: "by Ko-fi",
  radius: 48,
  colors: {
    light: {
      background: "#ff6433",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "kofi.svg"
    },
    dark: {
      background: "#202020",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "kofi.svg"
    }
  }
});
