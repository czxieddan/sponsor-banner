import { readFile } from "node:fs/promises";
import path from "node:path";

const sourceRoot = path.join(process.cwd(), "src");

export const assetPath = (...segments: readonly string[]) => path.join(sourceRoot, ...segments);

export const readBinaryAsset = async (...segments: readonly string[]) =>
  readFile(assetPath(...segments));

export const readTextAsset = async (...segments: readonly string[]) =>
  readFile(assetPath(...segments), "utf8");
