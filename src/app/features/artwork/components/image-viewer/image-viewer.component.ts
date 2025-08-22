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

  // NEEDED FIX getLatestVersionIndex da valores raros. está mal está mal. Dice que el default no es el que debiera

  defaultDisplayIndex: number = 0; // arreglar para casos edgy
  currentDisplayIndex: WritableSignal<number> = signal(
    this.defaultDisplayIndex
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
      const currentImage = this.nfts()[this.currentDisplayIndex()];
      this.previewImage.set('none');
      this.qualityImage.set('none');
      this.artworkService
        .getAvailableOptimalUrl(currentImage)
        .subscribe((url) => {
          this.previewImage.set(this.isFullScreen() ? 'none' : `url(${url})`);
        });
      this.qualityImage.set(
        this.artworkService.getNftQualityUrl(currentImage?.image) || 'none'
      );
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
