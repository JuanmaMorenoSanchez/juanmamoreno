import { Component, inject, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { MEDIUM_MAX_BYTES, MEDIUM_MIN_SIDE } from '@domain/artwork/image-sizes';
import { TranslatePipe } from '@ngx-translate/core';
import { MediumImageService } from '@shared/services/medium-image.service';
import CommonUtils from '@shared/utils/common.utils';

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
  private readonly medium = inject(MediumImageService);

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
    await this.download(async (blob) => ({
      blob: await this.medium.toMedium(blob),
      extension: 'jpg',
    }));
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
