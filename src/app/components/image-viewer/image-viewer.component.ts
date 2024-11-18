import { Component, HostBinding, input, Input, OnChanges, Signal, SimpleChanges, ViewChild } from '@angular/core';
import { NftsService } from '@services/nfts.service';
import { Nft } from 'alchemy-sdk';
import { GalleryComponent } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent {

  nfts = input<Nft[]>([]);
  displayIndex = 0;
  hovering = false;
  displayArrows = false;

  constructor(
    public lightbox: Lightbox,
    private nftService: NftsService,
  ) {
  }

  ngOnChanges(changes: SimpleChanges) {
    this.displayArrows = changes['nfts'].currentValue.length > 1;
  }

  public setHover(hovering: boolean) {
    this.hovering = hovering;
  }

  public nextNft(relativeIndex: number) {
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

  // private findFrontalView(nfts: Nft[]): Nft {
  //   return nfts.find(nft => this.nftService.isFrontalView(nft) || this.nfts()[0])!
  // }

}
