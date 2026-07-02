import { createTheme } from "./createTheme";

export const boostyTheme = createTheme({
  id: "boosty",
  aliases: ["boosty"],
  label: "Boosty",
  title: "Sponsor",
  footer: "by Boosty",
  radius: 48,
  colors: {
    light: {
      background: "#f15f2c",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "boosty.svg"
    },
    dark: {
      background: "#000000",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "boosty.svg"
    }
  }
});
