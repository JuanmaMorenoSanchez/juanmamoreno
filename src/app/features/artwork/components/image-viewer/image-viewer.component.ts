import {
  Component,
  effect,
  ElementRef,
  inject,
  input,
  OnChanges,
  OnInit,
  output,
  signal,
  SimpleChanges,
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
export class ImageViewerComponent implements OnInit, OnChanges {
  private artworkService = inject(ARTWORK_PORT);

  nfts = input<Nft[]>([]);
  description = input<string>('No description');
  displayIndex: WritableSignal<number> = signal(0);
  previewImage = signal<string>('none');
  isFullScreen = signal<boolean>(false);
  displayIndexOutput = output<number>({
    alias: 'displayIndex',
  });
  readonly isImgVisible = signal<boolean>(false);
  hovering = false;
  displayArrows = false;
  displayExpand = false;

  @ViewChild('imageElement') imageElement!: ElementRef;

  constructor() {
    effect(() => {
      this.isImgVisible.set(false);
      const nfts = this.nfts();
      const displayIndex = this.displayIndex();
      const isFullScreen = this.isFullScreen();
      this.artworkService
        .getAvailableOptimalUrl(nfts[displayIndex])
        .subscribe((url) => {
          this.previewImage.set(isFullScreen ? 'none' : `url(${url})`);
        });
    });
  }

  ngOnInit() {
    this.displayIndex.set(
      this.artworkService.getLatestVersionIndex(this.nfts())
    );
  }

  ngOnChanges(changes: SimpleChanges) {
    this.displayArrows = changes['nfts']?.currentValue?.length > 1; // quitar y poner en efecto??
    this.displayIndexOutput.emit(
      this.artworkService.getLatestVersionIndex(this.nfts())
    );
    this.displayIndex.set(
      this.artworkService.getLatestVersionIndex(this.nfts())
    );
  }

  public setHover(hovering: boolean) {
    this.hovering = hovering;
  }

  public nextNft(relativeIndex: number) {
    this.isImgVisible.set(false);
    const newIndex =
      (this.displayIndex() + relativeIndex + this.nfts().length) %
      this.nfts().length;
    this.displayIndexOutput.emit(newIndex);
    this.displayIndex.set(newIndex);
  }

  public imageLoad() {
    this.isImgVisible.set(true);
  }

  public getQualityImg(nft: Nft): string {
    const baseUrl = this.artworkService.getNftQualityUrl(nft?.image);
    return `${baseUrl}?v=${Date.now()}`; // 👈 changes every time = reload guaranteed
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
