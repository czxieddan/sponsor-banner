import { afdianTheme } from "./afdian";
import { boostyTheme } from "./boosty";
import { buyMeACoffeeTheme } from "./buymeacoffee";
import { fanboxTheme } from "./fanbox";
import { githubTheme } from "./github";
import { kofiTheme } from "./kofi";
import { liberapayTheme } from "./liberapay";
import { openCollectiveTheme } from "./opencollective";
import { patreonTheme } from "./patreon";
import type { ThemeDefinition } from "./types";

export const platformThemes = [
  patreonTheme,
  githubTheme,
  kofiTheme,
  buyMeACoffeeTheme,
  afdianTheme,
  openCollectiveTheme,
  liberapayTheme,
  fanboxTheme,
  boostyTheme
] as const satisfies readonly ThemeDefinition[];
