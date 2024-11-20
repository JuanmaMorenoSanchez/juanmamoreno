import { Component, input } from '@angular/core';

@Component({
  selector: 'app-download-button',
  templateUrl: './download-button.component.html',
  styleUrl: './download-button.component.scss'
})
export class DownloadButtonComponent {
  link = input<string>();
  name = input<string>();
  isDownloading = false;

  downloadImage(): void {
    this.isDownloading = true
    fetch(this.link()!)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch the image.');
        }
        return response.blob();
      })
      .then(blob => {
        const blobUrl = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = blobUrl;
        link.download = `${this.name()}.jpg`;
        link.click();
        URL.revokeObjectURL(blobUrl);
      })
      .catch(error => {
        console.error('Error downloading the image:', error);
      })
      .finally(() => {
        this.isDownloading = false; // Reset the state
      });;
  }
}
