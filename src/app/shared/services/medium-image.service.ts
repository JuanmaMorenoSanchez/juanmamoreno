import { Injectable } from '@angular/core';
import { MEDIUM_MAX_BYTES, mediumImageSize } from '@domain/artwork/image-sizes';

// Quality steps tried in order when fitting the picture under the size cap.
// Starts high because these are paintings: the first pass usually fits, and the
// lower rungs exist for the few enormous originals.
const JPEG_QUALITY_STEPS = [0.92, 0.85, 0.78, 0.7, 0.6];

/**
 * The medium copy of a painting: at least 2500 px on the shorter side and
 * under 5 MB.
 *
 * In the browser rather than on the backend because the browser has to fetch
 * the original either way, and a service that resizes images would be a
 * deployment to keep in step for something a canvas does.
 *
 * **It has two callers now**, which is why it left the download button it was
 * written in. The other is the atelier: an edit takes eighteen minutes and the
 * input decides what comes out, so working at the small copy and committing to
 * the big one is the whole difference between trying something and waiting
 * through it. Same bytes either way, and the same rule about what "big enough"
 * means.
 */
@Injectable({ providedIn: 'root' })
export class MediumImageService {
  /** The blob reduced to the medium size, or the blob itself if it cannot be. */
  async toMedium(source: Blob): Promise<Blob> {
    const bitmap = await createImageBitmap(source);
    try {
      const target = mediumImageSize(bitmap);
      const canvas = document.createElement('canvas');
      canvas.width = target.width;
      canvas.height = target.height;

      const context = canvas.getContext('2d');
      if (!context) return source;
      context.drawImage(bitmap, 0, 0, target.width, target.height);

      // Step the quality down until it fits. The picture is never shrunk below
      // the minimum to save bytes: the pixel floor is the harder requirement.
      let best: Blob | null = null;
      for (const quality of JPEG_QUALITY_STEPS) {
        const encoded = await this.encode(canvas, quality);
        best = encoded;
        if (encoded.size <= MEDIUM_MAX_BYTES) return encoded;
      }
      return best ?? source;
    } finally {
      bitmap.close();
    }
  }

  private encode(canvas: HTMLCanvasElement, quality: number): Promise<Blob> {
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => (blob ? resolve(blob) : reject(new Error('Could not encode the image'))),
        'image/jpeg',
        quality
      );
    });
  }
}
