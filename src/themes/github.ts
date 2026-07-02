import { createTheme } from "./createTheme";

export const githubTheme = createTheme({
  id: "github",
  aliases: ["github", "githubsponsors", "github-sponsors"],
  label: "GitHub Sponsors",
  title: "Sponsor",
  footer: "by GitHub Sponsors",
  radius: 48,
  colors: {
    light: {
      background: "#ea4aaa",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "github.svg"
    },
    dark: {
      background: "#24292f",
      foreground: "#ffffff",
      muted: "#ffffff",
      logo: "github.svg"
    }
  }
});
