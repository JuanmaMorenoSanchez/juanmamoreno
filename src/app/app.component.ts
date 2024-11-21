import { Component } from '@angular/core';
import { CERTIFICATESCOLLECTIONADRESS } from '@constants/nft.constants';
import { NftsService } from '@services/nfts.service';
import { Nft } from 'alchemy-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private nftsService: NftsService
  ) {
    this.getAppData();
  }

  getAppData() {
    this.nftsService.getNfts(CERTIFICATESCOLLECTIONADRESS).subscribe((nfts: Array<Nft>) => {
      console.log("paintings: ", nfts)
    }); 
  }
}
