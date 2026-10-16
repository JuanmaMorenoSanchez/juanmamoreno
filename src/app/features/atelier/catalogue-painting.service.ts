import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import type { Nft } from '@domain/artwork/artwork.entity';
import { MediumImageService } from '@shared/services/medium-image.service';

/**
 * How good a copy to work from.
 *
 * `web` is the small one the site draws with, a hundred kilobytes or so.
 * `high` is the original reduced to the medium download — at least 2500 px on
 * the shorter side and under 5 MB — which is what the site already offers a
 * buyer and the largest thing worth putting through a model.
 */
export type Wanted = 'web' | 'high';

/** A painting fetched by its token id, and which copy of it was obtained. */
export interface FetchedPainting {
  blob: Blob;
  name: string;
  /** Which of the stored copies this is, so the page can say. */
  quality: 'original' | 'cached' | 'thumbnail';
  width: number;
  height: number;
  /** True when the original was reduced on the way in. */
  reduced?: boolean;
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
 * purpose. This is asked which it wants.
 *
 * **Two qualities, because a run is eighteen minutes.** What goes in decides
 * what comes out, at the same size, so a graph tried at the small copy
 * finishes in a fraction of the time and answers the only question being asked
 * of a first attempt: is this the right instruction. The big copy is for the
 * run he means to keep. The same seed at a different size is a different
 * picture, so the final run is a run and not a resize.
 *
 * It walks down the ladder rather than insisting, because the best copy lives
 * on a host that may refuse a cross-origin read, and a lower-resolution
 * painting with a note saying so beats an error.
 */
@Injectable({ providedIn: 'root' })
export class CataloguePaintingService {
  private readonly artwork = inject(ARTWORK_PORT);
  private readonly medium = inject(MediumImageService);

  /** The painting with that token id, as bytes. Throws with something readable. */
  async byId(id: string, wanted: Wanted = 'web'): Promise<FetchedPainting> {
    const token = id.trim();
    if (!token) throw new Error('type a token id');

    const nft = await firstValueFrom(this.artwork.getNftByIdObservable(token)).catch(() => null);
    if (!nft) throw new Error(`there is no painting ${token} in the catalogue`);

    // `nft.name` is what the rest of the site reads a title from; the one in
    // the raw metadata is not always filled in, and "Painting 195" tells you
    // nothing about whether you fetched the painting you meant.
    const name = nft.name || nft.raw?.metadata?.name || `Painting ${token}`;
    const refused: string[] = [];

    // Asked for the web copy, the original is not even attempted: it is tens
    // of megabytes on a slow host, and the point of asking for the small one
    // is not to wait for it.
    const ladder =
      wanted === 'high' ? LADDER : LADDER.filter((rung) => rung.quality !== 'original');

    for (const rung of ladder) {
      const url = nft.image?.[rung.field];
      if (typeof url !== 'string' || !url) continue;
      try {
        const response = await fetch(url, { mode: 'cors', cache: 'no-store' });
        if (!response.ok) throw new Error(String(response.status));
        const fetched = await response.blob();

        // The original goes through the same reduction a buyer's download
        // does. Unreduced it is forty megabytes of canvas weave, which no
        // model here reads and every one of them has to resize first.
        //
        // A browser that cannot do it hands back the original untouched, and
        // says so rather than claiming a reduction that did not happen: the
        // page prints this, and a wrong note about what is on the canvas is
        // worse than no note.
        let blob = fetched;
        let reduced = false;
        if (wanted === 'high' && rung.quality === 'original') {
          const smaller = await this.medium.toMedium(fetched).catch(() => null);
          if (smaller) {
            blob = smaller;
            reduced = true;
          }
        }

        const { width, height } = await measure(blob);
        return { blob, name, quality: rung.quality, width, height, reduced };
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
