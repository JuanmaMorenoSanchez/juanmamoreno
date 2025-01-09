import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { environment } from '@environments/environment';
import { NftsService } from '@services/nfts.service';
import { Nft } from 'alchemy-sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private nftsService: NftsService,
    private httpClient: HttpClient
  ) {
    this.getAppData();
  }

  getAppData() {
  
    this.nftsService.getNfts().subscribe((nfts: Array<Nft>) => {
      const tokenIds: Array<string> = [];
      nfts.forEach(nft => {
        if (!nft.image?.thumbnailUrl) {
          tokenIds.push(nft.tokenId);
        }
      });
      // if (tokenIds.length) this.httpClient.post(environment.backendUrl+'refresh-metadata', tokenIds).subscribe((res: any) => {
      //   console.log("Refresh metadata res : ", res);
      // });
      console.log("Missing metadata count: ", tokenIds.length)
    });
  }
}
