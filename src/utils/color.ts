const shortHex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
const fullHex = /^#?([a-f\d]{6})$/i;

export const normalizeHex = (value: string | null): string | undefined => {
  if (!value) {
    return undefined;
  }

  const trimmed = value.trim();
  const short = trimmed.match(shortHex);

  if (short?.[1] && short[2] && short[3]) {
    return `#${short[1]}${short[1]}${short[2]}${short[2]}${short[3]}${short[3]}`.toLowerCase();
  }

  const full = trimmed.match(fullHex);

  if (!full?.[1]) {
    return undefined;
  }

  return `#${full[1]}`.toLowerCase();
};
