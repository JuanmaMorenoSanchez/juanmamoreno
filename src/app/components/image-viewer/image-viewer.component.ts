import { Component, ElementRef, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { Nft } from 'alchemy-sdk';
import { GalleryComponent } from 'ng-gallery';
import { Lightbox } from 'ng-gallery/lightbox';

@Component({
  selector: 'app-image-viewer',
  templateUrl: './image-viewer.component.html',
  styleUrls: ['./image-viewer.component.scss']
})
export class ImageViewerComponent implements OnChanges {

  readonly loadingStrategy = 'lazy';
  readonly galleryId = 'gallery';

  @Input() nfts!: Array<Nft> | null;
  
  @ViewChild(GalleryComponent) gallery!: GalleryComponent;

  constructor(
    public lightbox: Lightbox,
  ) {}

  ngOnChanges(changes: SimpleChanges) {
    this.gallery?.reset();
    this.addNftsToGallery(changes['nfts'].currentValue as Array<Nft>);
  }

  ngAfterViewInit() {
    this.nfts && this.addNftsToGallery(this.nfts);
  }


  private addNftsToGallery(nfts: Array<Nft>): void {
    nfts.forEach(nft => {
      this.gallery?.addImage({ src: nft.media[0].gateway, thumb: nft.media[0].thumbnail || nft.media[0].gateway });
    })
  }
}
