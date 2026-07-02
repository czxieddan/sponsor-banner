import { createTheme } from "./createTheme";

export const openCollectiveTheme = createTheme({
  id: "opencollective",
  aliases: ["opencollective", "open-collective", "oc"],
  label: "Open Collective",
  title: "Sponsor",
  footer: "by Open Collective",
  radius: 48,
  colors: {
    light: {
      background: "#7fadf2",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "opencollective.svg"
    },
    dark: {
      background: "#297eff",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "opencollective.svg"
    }
  }
});
