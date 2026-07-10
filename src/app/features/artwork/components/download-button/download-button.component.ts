import { Component, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { TranslatePipe } from '@ngx-translate/core';
import CommonUtils from '@shared/utils/common.utils';

@Component({
    selector: 'app-download-button',
    templateUrl: './download-button.component.html',
    styleUrl: './download-button.component.scss',
    imports: [MatIconButton, MatTooltip, MatIcon, MatProgressSpinner, TranslatePipe]
})
export class DownloadButtonComponent {
  // Candidate urls for the same image, best quality first
  links = input<string[]>([]);
  name = input<string>();
  isDownloading = false;

  async downloadImage(): Promise<void> {
    this.isDownloading = true;
    try {
      const blob = await this.fetchBestAvailable(this.links());
      const blobUrl = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = blobUrl;
      link.download = `${this.name()}.${CommonUtils.imageExtensionFor(blob)}`;
      link.click();
      URL.revokeObjectURL(blobUrl);
    } catch (error) {
      console.error('Error downloading the image:', error);
    } finally {
      this.isDownloading = false;
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
