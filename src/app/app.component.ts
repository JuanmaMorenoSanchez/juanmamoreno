import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { CERTIFICATESCOLLECTIONADRESS } from '@constants/nft.constants';
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
    private httpClient: HttpClient,    

  ) {
    this.getAppData();
  }

  getAppData() {
    this.nftsService.getNfts(CERTIFICATESCOLLECTIONADRESS).subscribe((nfts: Array<Nft>) => {
      console.log("paintings: ", nfts)
      const tokenIds: Array<string> = [];
      nfts.forEach(nft => {
        if (!nft.image?.thumbnailUrl) {
          tokenIds.push(nft.tokenId);
        }
      });
      const onlyFirst = [tokenIds[0]]; //avoid overwelming alchemy by doing it one each time
      if (tokenIds.length) this.httpClient.post(environment.backendUrl+'refresh-metadata', onlyFirst).subscribe((res: any) => {
        console.log("res: ", res);
      });
      console.log("Missing metadata count: ", tokenIds.length)
    }); 
  }
}
