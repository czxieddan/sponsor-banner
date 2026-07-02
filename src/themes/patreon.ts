import { createTheme } from "./createTheme";

export const patreonTheme = createTheme({
  id: "patreon",
  aliases: ["patreon"],
  label: "Patreon",
  title: "Sponsor",
  footer: "by Patreon",
  radius: 48,
  colors: {
    light: {
      background: "#000000",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "patreon.svg"
    },
    dark: {
      background: "#000000",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "patreon.svg"
    }
  }
});
