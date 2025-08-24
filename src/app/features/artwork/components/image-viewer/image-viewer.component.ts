import {
  Component,
  computed,
  effect,
  ElementRef,
  inject,
  input,
  output,
  signal,
  ViewChild,
  WritableSignal,
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

  defaultDisplayIndex = computed(() => {
    const nfts = this.nfts();
    const latestFrontalNft = this.artworkService.getLatestVersion(
      this.artworkService.filterFrontalArtworks(nfts)
    );
    return nfts.findIndex((nft) => nft.tokenId === latestFrontalNft?.tokenId);
  });
  currentDisplayIndex: WritableSignal<number> = signal(
    this.defaultDisplayIndex() || 0
  );

  previewImage = signal<string>('none');
  qualityImage = signal<string>('none');

  isFullScreen = signal<boolean>(false);
  displayIndexOutput = output<number>({
    alias: 'displayIndex',
  });
  displayArrows = computed(() => this.nfts().length > 1);

  readonly isImgVisible = signal<boolean>(true);
  hovering = false;
  displayExpand = false;

  @ViewChild('imageElement') imageElement!: ElementRef;

  constructor() {
    effect(() => {
      this.currentDisplayIndex.set(this.defaultDisplayIndex() || 0);
    });

    effect(() => {
      this.loadCurrentImage();
    });
  }

  public setHover(hovering: boolean) {
    this.hovering = hovering;
  }

  public nextNft(relativeIndex: number) {
    const newIndex =
      (this.currentDisplayIndex() + relativeIndex + this.nfts().length) %
      this.nfts().length;
    this.displayIndexOutput.emit(newIndex);
    this.currentDisplayIndex.set(newIndex);
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

  private loadCurrentImage(): void {
    const currentImage = this.nfts()[this.currentDisplayIndex()];

    if (!currentImage && this.nfts().length > 0) {
      this.currentDisplayIndex.set(0);
      return;
    }

    if (!currentImage) return;

    this.previewImage.set('none');
    this.qualityImage.set('none');

    // Load preview image (only if not in fullscreen)
    if (!this.isFullScreen()) {
      this.artworkService
        .getAvailableOptimalUrl(currentImage)
        .subscribe((url) => this.previewImage.set(`url(${url})`));
    }
    // Load quality image
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
