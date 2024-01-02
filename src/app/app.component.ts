import { Component } from '@angular/core';
import { NFTMetadata } from '@models/nfts.models';
import { NftsService } from '@services/nfts.service';

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
    this.nftsService.getArt().subscribe((nfts: Array<NFTMetadata>) => {
      console.log("paintings: ", nfts)
    }); 
  }
}
