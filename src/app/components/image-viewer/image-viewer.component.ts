import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, input,  SimpleChanges } from '@angular/core';
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
  isImgVisible = false;

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

  public isFrontalView(nft: Nft): boolean {
    return this.nftService.isFrontalView(nft);
  }

  onAnimationDone(event: any) {
    if (event.toState === 'hidden') {
      setTimeout(() => {
        this.isImgVisible = true;
      }, 0);
    }
  }

}
