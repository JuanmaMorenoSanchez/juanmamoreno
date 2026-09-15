import { Component, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import {
  MEDIUM_MAX_BYTES,
  MEDIUM_MIN_SIDE,
  mediumImageSize,
} from '@domain/artwork/image-sizes';
import { TranslatePipe } from '@ngx-translate/core';
import CommonUtils from '@shared/utils/common.utils';

// Quality steps tried in order when fitting a medium download under the size
// cap. Starts high because these are paintings: the first pass usually fits,
// and the lower rungs exist for the few enormous originals.
const JPEG_QUALITY_STEPS = [0.92, 0.85, 0.78, 0.7, 0.6];

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrl: './download-button.component.scss',
  imports: [
    MatIconButton,
    MatTooltip,
    MatIcon,
    MatProgressSpinner,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    TranslatePipe,
  ],
})
export class DownloadButtonComponent {
  // Candidate urls for the same image, best quality first
  links = input<string[]>([]);
  name = input<string>();
  // A signal, not a plain field: the app is zoneless, so the assignment that
  // clears this happens after an await — outside the change detection the click
  // scheduled — and the button would stay disabled with its spinner turning
  // long after the file had been saved.
  readonly isDownloading = signal(false);

  protected readonly minSide = MEDIUM_MIN_SIDE;
  protected readonly maxMegabytes = MEDIUM_MAX_BYTES / 1_000_000;

  /** The original file, untouched, exactly as before. */
  async downloadFull(): Promise<void> {
    await this.download(async (blob) => ({
      blob,
      extension: CommonUtils.imageExtensionFor(blob),
    }));
  }

  /**
   * At least 2500 px on the shorter side and under 5 MB.
   *
   * Done here rather than on the backend because the browser already has to
   * fetch the full file either way, and a second service that resizes images
   * would be a deployment to keep in step for something a canvas does.
   */
  async downloadMedium(): Promise<void> {
    await this.download(async (blob) => ({ blob: await this.toMedium(blob), extension: 'jpg' }));
  }

  private async download(
    prepare: (source: Blob) => Promise<{ blob: Blob; extension: string }>
  ): Promise<void> {
    this.isDownloading.set(true);
    try {
      const source = await this.fetchBestAvailable(this.links());
      const { blob, extension } = await prepare(source);
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${this.name()}.${extension}`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading the image:', error);
    } finally {
      this.isDownloading.set(false);
    }
  }

  private async toMedium(source: Blob): Promise<Blob> {
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

  private async fetchBestAvailable(urls: string[]): Promise<Blob> {
    for (const url of urls) {
      try {
        const response = await fetch(url);
        if (response.ok) return await response.blob();
      } catch {
        console.error('Error fetching image from URL:', url);
      }
    }
    throw new Error('No image source could be downloaded.');
  }
}
