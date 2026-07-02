export type ThemeMode = "light" | "dark";

export interface ThemePalette {
  readonly background: string;
  readonly foreground: string;
  readonly muted: string;
  readonly logo: string;
}

export interface ThemeDefinition {
  readonly id: string;
  readonly aliases: readonly string[];
  readonly label: string;
  readonly title: string;
  readonly footer: string;
  readonly radius: number;
  readonly colors: Readonly<Record<ThemeMode, ThemePalette>>;
}

export interface ThemeRegistry {
  get(platform: string): ThemeDefinition | undefined;
  list(): readonly ThemeDefinition[];
  ids(): readonly string[];
}
