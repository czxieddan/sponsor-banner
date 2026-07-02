import { platformThemes } from "./platforms";
import type { ThemeDefinition, ThemeRegistry } from "./types";

const normalizePlatform = (value: string) => value.toLowerCase().replaceAll(/[^a-z0-9]/g, "");

class PlatformRegistry implements ThemeRegistry {
  private readonly themes: readonly ThemeDefinition[];
  private readonly index: ReadonlyMap<string, ThemeDefinition>;

  constructor(themes: readonly ThemeDefinition[]) {
    this.themes = themes;
    this.index = new Map(
      themes.flatMap((theme) => [
        [normalizePlatform(theme.id), theme],
        ...theme.aliases.map((alias) => [normalizePlatform(alias), theme] as const)
      ])
    );
  }

  get(platform: string) {
    return this.index.get(normalizePlatform(platform));
  }

  list() {
    return this.themes;
  }

  ids() {
    return this.themes.map((theme) => theme.id);
  }
}

export const platformRegistry = new PlatformRegistry(platformThemes);
