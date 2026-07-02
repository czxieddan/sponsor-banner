import { createTheme } from "./createTheme";

export const liberapayTheme = createTheme({
  id: "liberapay",
  aliases: ["liberapay"],
  label: "Liberapay",
  title: "Sponsor",
  footer: "by Liberapay",
  radius: 48,
  colors: {
    light: {
      background: "#f6c915",
      foreground: "#000000",
      muted: "#000000",
      logo: "liberapay.svg"
    },
    dark: {
      background: "#1a171b",
      foreground: "#f6c915",
      muted: "#f6c915",
      logo: "liberapay-white.svg"
    }
  }
});
