/**
 * Whether a title has been used before, or nearly.
 *
 * Titles carry meaning in this collection: certificates that share one are the
 * same painting photographed more than once — a detail, the back, a second
 * view — and the site groups them on that basis. Twenty-four of the first
 * hundred and eighty-six are grouped that way.
 *
 * So a title is not free text. Typing an existing one joins that painting's
 * group, which is right when it is another view of it and wrong when it is a
 * different painting that happens to be similarly named. And mistyping a title
 * by one letter does the opposite: it quietly splits a painting from its own
 * other photographs, and nothing ever says so.
 *
 * Neither is an error. Both are worth a word before the certificate is written,
 * since the name goes on chain and, once frozen, stays there.
 */

/** How far apart two titles can be and still be worth mentioning. */
const NEARLY = 3;

export type TitleMatch = {
  tokenId: string;
  name: string;
  /** Exactly the same title, allowing for case, accents and spacing. */
  same: boolean;
};

/**
 * Titles compared the way a person reads them rather than the way they are
 * stored: case, accents and punctuation are all ways of writing the same name,
 * and none of them should hide a collision.
 */
export function comparableTitle(title: string): string {
  return title
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

/**
 * The edit distance between two titles, counting no further than it needs to.
 *
 * Stops once the answer is certain to be over the limit, which on a collection
 * of a few hundred titles is most of them after two or three rows.
 */
export function editDistance(a: string, b: string, limit = NEARLY): number {
  if (a === b) return 0;
  if (Math.abs(a.length - b.length) > limit) return limit + 1;

  let previous = Array.from({ length: b.length + 1 }, (_, index) => index);
  for (let i = 1; i <= a.length; i += 1) {
    const current = [i];
    let best = i;
    for (let k = 1; k <= b.length; k += 1) {
      const cost = a[i - 1] === b[k - 1] ? 0 : 1;
      current[k] = Math.min(current[k - 1] + 1, previous[k] + 1, previous[k - 1] + cost);
      if (current[k] < best) best = current[k];
    }
    if (best > limit) return limit + 1;
    previous = current;
  }
  return previous[b.length];
}

/**
 * The titles already used that this one would collide with.
 *
 * Exact matches first, since those are the ones that actually group, then the
 * near misses in order of how near. An empty list is the ordinary answer.
 */
export function titlesLike(
  title: string,
  existing: Array<{ tokenId: string; name: string }>
): TitleMatch[] {
  const wanted = comparableTitle(title);
  if (wanted.length < 2) return [];

  const matches: Array<TitleMatch & { distance: number }> = [];
  for (const artwork of existing) {
    const distance = editDistance(comparableTitle(artwork.name ?? ''), wanted);
    if (distance > NEARLY) continue;
    matches.push({
      tokenId: String(artwork.tokenId),
      name: artwork.name,
      same: distance === 0,
      distance,
    });
  }

  return matches
    .sort((one, other) => one.distance - other.distance || one.tokenId.localeCompare(other.tokenId))
    .map(({ tokenId, name, same }) => ({ tokenId, name, same }));
}
