import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import type { Nft } from '@domain/artwork/artwork.entity';

/** A painting fetched by its token id, and which copy of it was obtained. */
export interface FetchedPainting {
  blob: Blob;
  name: string;
  /** Which of the stored copies this is, so the page can say. */
  quality: 'original' | 'cached' | 'thumbnail';
  width: number;
  height: number;
}

/** How good each copy is, best first. */
const LADDER: Array<{ field: keyof Nft['image']; quality: FetchedPainting['quality'] }> = [
  { field: 'originalUrl', quality: 'original' },
  { field: 'cachedUrl', quality: 'cached' },
  { field: 'thumbnailUrl', quality: 'thumbnail' },
];

/**
 * Typing a token id instead of finding the file.
 *
 * **Deliberately not `getAvailableOptimalUrl`.** That one is for drawing a tile
 * and prefers a thumbnail, with the multi-MB original kept out of the race on
 * purpose. Here the opposite is wanted: cutting a layer from a 95 KB copy gives
 * a 95 KB layer, and the original is the only one worth the eighteen minutes an
 * edit costs.
 *
 * It walks down the ladder rather than insisting, because the best copy lives
 * on a host that may refuse a cross-origin read, and a lower-resolution
 * painting with a note saying so beats an error.
 */
@Injectable({ providedIn: 'root' })
export class CataloguePaintingService {
  private readonly artwork = inject(ARTWORK_PORT);

  /** The painting with that token id, as bytes. Throws with something readable. */
  async byId(id: string): Promise<FetchedPainting> {
    const token = id.trim();
    if (!token) throw new Error('type a token id');

    const nft = await firstValueFrom(this.artwork.getNftByIdObservable(token)).catch(() => null);
    if (!nft) throw new Error(`there is no painting ${token} in the catalogue`);

    // `nft.name` is what the rest of the site reads a title from; the one in
    // the raw metadata is not always filled in, and "Painting 195" tells you
    // nothing about whether you fetched the painting you meant.
    const name = nft.name || nft.raw?.metadata?.name || `Painting ${token}`;
    const refused: string[] = [];

    for (const rung of LADDER) {
      const url = nft.image?.[rung.field];
      if (typeof url !== 'string' || !url) continue;
      try {
        const response = await fetch(url, { mode: 'cors', cache: 'no-store' });
        if (!response.ok) throw new Error(String(response.status));
        const blob = await response.blob();
        const { width, height } = await measure(blob);
        return { blob, name, quality: rung.quality, width, height };
      } catch {
        // Almost always the host refusing a cross-origin read. Noted and
        // stepped past rather than thrown, so a worse copy can still be had.
        refused.push(rung.quality);
      }
    }

    throw new Error(
      refused.length
        ? `${name} is in the catalogue, but its image could not be read (tried: ${refused.join(', ')}). ` +
            'Its host is probably refusing a cross-origin read — choose the file instead.'
        : `${name} has no image stored against it`
    );
  }
}

/**
 * The size of the thing fetched, so the page can say what it got.
 *
 * Never waits long. The size is shown and nothing depends on it, while a blob
 * that is not a picture — or a browser that will not decode one — leaves
 * `onload` and `onerror` both unfired for ever. That hung the tests at twenty
 * seconds apiece, and it would have hung the page on a corrupt download.
 */
function measure(blob: Blob, patience = 3000): Promise<{ width: number; height: number }> {
  const unknown = { width: 0, height: 0 };
  return new Promise((resolve) => {
    let url: string;
    try {
      url = URL.createObjectURL(blob);
    } catch {
      resolve(unknown);
      return;
    }

    let settled = false;
    const done = (size: { width: number; height: number }) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      URL.revokeObjectURL(url);
      resolve(size);
    };

    const timer = setTimeout(() => done(unknown), patience);
    const image = new Image();
    image.onload = () => done({ width: image.naturalWidth, height: image.naturalHeight });
    image.onerror = () => done(unknown);
    image.src = url;
  });
}
