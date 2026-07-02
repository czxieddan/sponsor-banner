import type { ThemeDefinition } from "./types";

export const createTheme = <const T extends ThemeDefinition>(theme: T) => theme;
