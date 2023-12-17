import { Component } from '@angular/core';
import { NftsService } from '@services/nfts.service';
import { NFT } from 'opensea-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private nftsService: NftsService,
  ) {
    this.getAppData();
  }

  getAppData() {
    return this.nftsService.getArt().subscribe((nfts: Array<NFT>) => {
      return nfts.forEach(nft => {
        this.nftsService.getArtById(nft.identifier);
      });
    }); 
  }
}
