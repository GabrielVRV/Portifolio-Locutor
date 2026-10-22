const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&@$▓▒░";

/**
 * One frame of a "decoding" effect: the first `progress` share of `target` is
 * resolved, the rest is random glyphs. Spaces stay put so word shapes read early.
 */
export function scrambleFrame(
  target: string,
  progress: number,
  random: () => number = Math.random,
): string {
  const chars = Array.from(target);
  const resolved = Math.floor(Math.min(1, Math.max(0, progress)) * chars.length);

  return chars
    .map((char, index) => {
      if (index < resolved || char === " ") return char;
      return GLYPHS[Math.floor(random() * GLYPHS.length)];
    })
    .join("");
}

/**
 * Deterministic pseudo-random numbers (LCG), so a scrambled first frame is
 * identical on the server and in the browser.
 */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0;
  return () => {
    state = (state * 1664525 + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
}
