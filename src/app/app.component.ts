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

    // This logic is to make sure that all data is fetched on startup
    this.nftsService.getArt().subscribe((nfts: Array<NFT>) => {
      nfts.forEach(nft => {
        this.nftsService.getArtById(nft.identifier);
      })
    })
  } 
}
