import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, ElementRef, input,  SimpleChanges, ViewChild } from '@angular/core';
import { NftsService } from '@services/nfts.service';
import { Nft } from 'alchemy-sdk';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss'],
  animations: [
    trigger('fadeTrigger', [
      state('visible', style({ opacity: 1 })),
      state('hidden', style({ opacity: 0 })),
      transition('visible <=> hidden', animate('0.6s ease-in-out')),
    ]),
  ],
})
export class ImageViewerComponent {

  nfts = input<Nft[]>([]);
  displayIndex = 0;
  hovering = false;
  displayArrows = false;
  displayExpand = false;
  isImgVisible = false;
  isFullScreen  = false;

  @ViewChild('imageElement') imageElement!: ElementRef;

  constructor(
    private nftService: NftsService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.displayArrows = changes['nfts'].currentValue.length > 1;
    this.isImgVisible = false;
  }

  public setHover(hovering: boolean) {
    this.hovering = hovering;
  }

  public nextNft(relativeIndex: number) {
    this.isImgVisible = false;

    this.displayIndex = (this.displayIndex + relativeIndex + this.nfts().length) % this.nfts().length;  
  }

  public getQualityImg(nft: Nft): string {
    return this.nftService.getQualityUrl(nft?.image);
  }

  public getSmallImg(nft: Nft): string {
    return this.nftService.getOptimalUrl(nft?.image);
  }

  public determineBackground(): string {
    return this.isFullScreen ? 'none' : `url(${this.getSmallImg(this.nfts()[this.displayIndex])})`;
  }

  public isFrontalView(nft: Nft): boolean {
    return this.nftService.isFrontalView(nft);
  }

  public onAnimationDone(event: any) {
    if (event.toState === 'hidden') {
      setTimeout(() => {
        this.isImgVisible = true;
      }, 0);
    }
  }

  public handleImageClick() {
    if (!this.isFullScreen) {
      this.displayExpand = true;
      setTimeout(() => {
          this.displayExpand = false;
      }, 2000);
    } else {
        this.exitFullScreen();
    }
  }

  public handleDoubleClick() {
    if (!this.isFullScreen) {
        this.enterFullScreen();
    }
  }

  private enterFullScreen() {
    this.isFullScreen = true;
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
      this.isFullScreen = false;
      if (document.exitFullscreen) {
          document.exitFullscreen();
      } else if ((document as any).webkitExitFullscreen) {
          (document as any).webkitExitFullscreen();
      } else if ((document as any).msExitFullscreen) {
          (document as any).msExitFullscreen();
      }
  }

}
