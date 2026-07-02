export interface NumberRange {
  readonly min: number;
  readonly max: number;
}

export const clamp = (value: number, range: NumberRange) =>
  Math.min(Math.max(value, range.min), range.max);

export const readInteger = (value: string | null, fallback: number, range: NumberRange) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseInt(value, 10);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return clamp(parsed, range);
};

export const readScale = (value: string | null, fallback: number, range: NumberRange) => {
  if (!value) {
    return fallback;
  }

  const parsed = Number.parseFloat(value);

  if (!Number.isFinite(parsed)) {
    return fallback;
  }

  return clamp(parsed, range);
};
