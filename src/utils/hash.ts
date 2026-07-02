import { createHash } from "node:crypto";

export const createEtag = (input: string | Uint8Array) => {
  const hash = createHash("sha256").update(input).digest("base64url");
  return `"${hash}"`;
};
