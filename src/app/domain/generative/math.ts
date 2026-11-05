// Pure, dependency-free numeric helpers used by the generative sketches.

export const map = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number => outMin + ((value - inMin) / (inMax - inMin)) * (outMax - outMin);

export const clamp = (value: number, min: number, max: number): number =>
  Math.min(max, Math.max(min, value));

/** Random float in [min, max). */
export const rand = (min: number, max: number): number => min + Math.random() * (max - min);

/** Random integer in [min, max]. */
export const randInt = (min: number, max: number): number => Math.floor(rand(min, max + 1));
