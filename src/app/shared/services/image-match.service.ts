import { Injectable, inject, signal } from '@angular/core';
import { defaultIfEmpty, filter, firstValueFrom, take } from 'rxjs';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import type { Nft } from '@domain/artwork/artwork.entity';
import { NEARLY_THE_SAME, fingerprint, fingerprintDistance } from '@domain/image/fingerprint';
import type { Raster } from '@domain/image/raster';

/** How large a picture is reduced to before being fingerprinted. */
const SAMPLE_LONG_SIDE = 64;

export interface ImageMatch {
  tokenId: string;
  name: string;
  /** How many of the sixty-four bits differ. Nought is the same file. */
  distance: number;
}

/** One certificate's picture, reduced to the sixty-four bits it is known by. */
interface KnownPicture {
  tokenId: string;
  name: string;
  mark: string;
}

/**
 * Whether a photograph is one the collection already has.
 *
 * Every certificate carries its own thumbnail inside the token, so the whole
 * collection is already in the browser by the time the studio is open — 186
 * pictures, 364 KB, downloaded as part of the catalogue whatever this does.
 * Nothing is uploaded, nothing is asked of anyone, and no service is called:
 * the comparison costs a quarter of a second of this machine's time, once.
 *
 * What it catches is the same photograph twice, which has happened: a
 * certificate prepared, an error message that wrongly said nothing was stored,
 * and the same painting prepared again. What it will not reliably catch is a
 * different photograph of the same painting — those are genuinely different
 * pictures, and are allowed anyway.
 */
@Injectable({ providedIn: 'root' })
export class ImageMatchService {
  private readonly artworks = inject(ARTWORK_PORT);

  /** Fingerprints of everything already certified, once they have been read. */
  private readonly known = signal<KnownPicture[] | null>(null);
  private reading = false;

  readonly ready = signal(false);

  /**
   * Reads the collection's thumbnails, once.
   *
   * Started early — while a photograph is still being chosen — so that by the
   * time there is anything to compare, there is something to compare it with.
   */
  public async learn(): Promise<void> {
    if (this.reading || this.known() !== null) return;
    this.reading = true;

    try {
      // Waits for the first catalogue that has anything in it. Written with
      // the operators rather than by hand: unsubscribing inside `next` reaches
      // for a subscription that does not exist yet when the source answers
      // synchronously, which is exactly what the store does once it is warm.
      const collection = await firstValueFrom(
        this.artworks.getArtPiecesObservable().pipe(
          filter((nfts) => nfts.length > 0),
          take(1),
          defaultIfEmpty([] as Nft[])
        )
      ).catch(() => [] as Nft[]);

      const read: KnownPicture[] = [];
      for (const nft of collection) {
        const url = nft.image?.thumbnailUrl;
        if (!url) continue;
        const raster = await this.rasterOf(url);
        if (!raster) continue;
        read.push({
          tokenId: String(nft.tokenId),
          name: nft.name ?? '',
          mark: fingerprint(raster),
        });
      }
      this.known.set(read);
      this.ready.set(true);
    } finally {
      this.reading = false;
    }
  }

  /**
   * The certificates whose picture is this picture.
   *
   * Empty is the ordinary answer, and the answer while the collection is still
   * being read — a warning that arrives late is better than one that is wrong.
   */
  public like(raster: Raster): ImageMatch[] {
    const known = this.known();
    if (!known) return [];

    const mark = fingerprint(raster);
    if (!mark) return [];

    return known
      .map(({ tokenId, name, mark: theirs }) => ({
        tokenId,
        name,
        distance: fingerprintDistance(mark, theirs),
      }))
      .filter((one) => one.distance <= NEARLY_THE_SAME)
      .sort((one, other) => one.distance - other.distance);
  }

  /** A picture small enough to fingerprint, or null when it cannot be read. */
  private async rasterOf(url: string): Promise<Raster | null> {
    if (typeof createImageBitmap === 'undefined' || typeof OffscreenCanvas === 'undefined') {
      return null;
    }
    try {
      const bitmap = await createImageBitmap(await (await fetch(url)).blob());
      const scale = SAMPLE_LONG_SIDE / Math.max(bitmap.width, bitmap.height);
      const width = Math.max(1, Math.round(bitmap.width * scale));
      const height = Math.max(1, Math.round(bitmap.height * scale));

      const canvas = new OffscreenCanvas(width, height);
      const context = canvas.getContext('2d', { willReadFrequently: true });
      if (!context) return null;
      context.drawImage(bitmap, 0, 0, width, height);
      bitmap.close();

      const { data } = context.getImageData(0, 0, width, height);
      return { width, height, data: data as Uint8ClampedArray<ArrayBuffer> };
    } catch {
      return null;
    }
  }
}
