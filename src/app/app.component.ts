import { Component, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NftsService } from '@services/nfts.service';
import { Nft } from 'alchemy-sdk';
import translationsEN from "@translations/en.json";
import translationsES from "@translations/es.json";
import { TopMenuComponent } from './components/top-menu/top-menu.component';
import { ShareButtonComponent } from './components/share-button/share-button.component';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [TopMenuComponent, ShareButtonComponent]
})
export class AppComponent {
  private translateService = inject(TranslateService);
  private nftsService = inject(NftsService);

  constructor( ) {
    this.translateService.setTranslation('en-EN', translationsEN);
    this.translateService.setTranslation('es-ES', translationsES);
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
      console.log("Missing metadata count: ", tokenIds.length);
    });
  }
}
