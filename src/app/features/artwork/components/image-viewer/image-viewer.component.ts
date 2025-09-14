import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  model,
  signal,
  ViewChild,
} from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  imports: [MatIcon],
})
export class ImageViewerComponent {
  private artworkService = inject(ARTWORK_PORT);

  nfts = input<Nft[]>([]);
  description = input<string>('No description');
  displayIndex = model<number>(0);

  previewImage = signal<string>('none');
  qualityImage = signal<string>('none');

  isFullScreen = signal<boolean>(false);
  hiResLoaded = signal<boolean>(false);
  displayArrows = computed(() => this.nfts().length > 1);

  readonly isImgVisible = signal<boolean>(true);
  hovering = false;
  displayExpand = false;

  @ViewChild('imageElement') imageElement!: ElementRef;

  constructor() {
    effect(() => {
      this.loadCurrentImage();
    });
  }

  public setHover(hovering: boolean) {
    this.hovering = hovering;
  }

  public nextNft(relativeIndex: number) {
    const newIndex =
      (this.displayIndex() + relativeIndex + this.nfts().length) %
      this.nfts().length;
    this.displayIndex.set(newIndex);
  }

  public handleImageClick() {
    if (this.displayExpand) {
      this.enterFullScreen();
    } else {
      if (!this.isFullScreen()) {
        this.displayExpand = true;
        setTimeout(() => {
          this.displayExpand = false;
        }, 2000);
      } else {
        this.exitFullScreen();
      }
    }
  }

  public handleDoubleClick() {
    if (!this.isFullScreen()) {
      this.enterFullScreen();
    }
  }

  public onHiResLoad() {
    this.hiResLoaded.set(true);
  }

  public onHiResLoadError() {
    this.displayIndex.set(0);
    this.hiResLoaded.set(true);
  }

  private loadCurrentImage(): void {
    const currentImage = this.nfts()[this.displayIndex()];

    if (!currentImage && this.nfts().length > 0) {
      this.displayIndex.set(0);
      return;
    }

    if (!currentImage) return;

    this.previewImage.set('none');
    this.qualityImage.set('none');
    this.hiResLoaded.set(false);

    if (!this.isFullScreen()) {
      this.artworkService
        .getAvailableOptimalUrl(currentImage)
        .subscribe((url) => this.previewImage.set(`url(${url})`));
    }

    const qualityUrl = this.artworkService.getNftQualityUrl(currentImage.image);
    this.qualityImage.set(qualityUrl || 'none');
  }

  private enterFullScreen() {
    this.isFullScreen.set(true);
    const elem = this.imageElement.nativeElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if ((elem as any).webkitRequestFullscreen) {
      (elem as any).webkitRequestFullscreen();
    } else if ((elem as any).msRequestFullscreen) {
      (elem as any).msRequestFullscreen();
    }
  }

  private exitFullScreen() {
    this.isFullScreen.set(false);
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if ((document as any).webkitExitFullscreen) {
      (document as any).webkitExitFullscreen();
    } else if ((document as any).msExitFullscreen) {
      (document as any).msExitFullscreen();
    }
  }
}
