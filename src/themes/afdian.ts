import { createTheme } from "./createTheme";

export const afdianTheme = createTheme({
  id: "afdian",
  aliases: ["afdian", "aifadian", "afd"],
  label: "AFDIAN",
  title: "Sponsor",
  footer: "by AFDIAN",
  radius: 48,
  colors: {
    light: {
      background: "linear-gradient(90deg, #8b63df 0%, #a77af0 100%)",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "afdian.svg"
    },
    dark: {
      background: "#946ce6",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "afdian.svg"
    }
  }
});
