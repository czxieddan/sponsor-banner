import { createTheme } from "./createTheme";

export const buyMeACoffeeTheme = createTheme({
  id: "buymeacoffee",
  aliases: ["buymeacoffee", "bmc", "buy-me-a-coffee"],
  label: "Buy Me a Coffee",
  title: "Sponsor",
  footer: "by Buy Me a Coffee",
  radius: 48,
  colors: {
    light: {
      background: "#ffdd00",
      foreground: "#000000",
      muted: "#000000",
      logo: "buymeacoffee.svg"
    },
    dark: {
      background: "#000000",
      foreground: "#ffdd00",
      muted: "#ffdd00",
      logo: "buymeacoffee-white.svg"
    }
  }
});
