/**
 * The catalogue, read the way the build already reads it.
 *
 * `nfts-snapshot` is the endpoint `generate-artworks-fallback.mjs` rewrites the
 * bundled catalogue from, so this is a path that is exercised on every build
 * rather than a second way of asking.
 *
 * **The ladder is walked here, not in a browser.** The page has to try the
 * cached copy before the original because the original's host may refuse a
 * cross-origin read — a restriction that exists only in a browser. Node has no
 * origin, so the original is simply fetched, which is how the night gets a
 * better copy than the page can.
 */

import { readFile } from 'node:fs/promises';

/** Where the backend is, taken from the file the app itself is built against. */
export async function backendUrl(environmentFile = 'src/environments/environment.prod.ts') {
  const said = await readFile(environmentFile, 'utf8');
  const found = said.match(/backendUrl:\s*'([^']+)'/)?.[1];
  if (!found) throw new Error(`no backendUrl found in ${environmentFile}`);
  return found;
}

/**
 * Every painting, with the addresses of each copy of it.
 *
 * In the catalogue's own order, which is the order the site shows and so the
 * order it is least confusing to work through.
 */
export async function catalogue(where) {
  const response = await fetch(`${where}nfts-snapshot`);
  if (!response.ok) throw new Error(`the catalogue answered ${response.status}`);

  const { data } = await response.json();
  if (!Array.isArray(data) || !data.length) throw new Error('the catalogue came back empty');

  return data.map((nft) => ({
    tokenId: String(nft.tokenId),
    name: nft.name || nft.raw?.metadata?.name || `Painting ${nft.tokenId}`,
    // In the order to prefer them. `pngUrl` is left out: it is a conversion of
    // one of the others, not a better copy.
    urls: [nft.image?.originalUrl, nft.image?.cachedUrl, nft.image?.thumbnailUrl].filter(
      (url) => typeof url === 'string' && url
    ),
  }));
}

/**
 * The best copy of a painting that will actually answer, as bytes.
 *
 * Walks down rather than insisting, for the same reason the page does: a copy
 * that is one rung worse is worth far more than a painting that could not be
 * read at all. Which rung it came from is returned, because the engine reduces
 * to 2500px and will not enlarge — so a night that quietly fell back to the
 * thumbnail would otherwise fill the shelf with small assets labelled nothing.
 */
export async function paintingBytes(painting, patience = 120_000) {
  const refused = [];

  for (const [rung, url] of painting.urls.entries()) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(patience) });
      if (!response.ok) throw new Error(String(response.status));
      const bytes = Buffer.from(await response.arrayBuffer());
      if (!bytes.length) throw new Error('nothing came back');
      return { bytes, rung };
    } catch (error) {
      refused.push(`${url.split('/').pop()}: ${error.message}`);
    }
  }

  throw new Error(
    refused.length
      ? `none of its copies could be read (${refused.join('; ')})`
      : 'it has no image stored against it'
  );
}
