import { Component, inject } from '@angular/core';
import { Nft } from '@domain/artwork/artwork.entity';
import { ArtworkInfraService } from '@infrastructure/artwork/artwork.service';
import { TranslateService } from '@ngx-translate/core';
import { ShareButtonComponent } from '@shared/components/share-button/share-button.component';
import { TopMenuComponent } from '@shared/components/top-menu/top-menu.component';
import { ALLOWED_LANGUAGES } from '@shared/constants/languages.constans';
import translationsEN from "@translations/en.json";
import translationsES from "@translations/es.json";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [TopMenuComponent, ShareButtonComponent]
})
export class AppComponent {
  private translateService = inject(TranslateService);
  private artworkInfraService = inject(ArtworkInfraService);

  constructor( ) {
    this.translateService.setTranslation(ALLOWED_LANGUAGES.ENGLISH, translationsEN);
    this.translateService.setTranslation(ALLOWED_LANGUAGES.SPANISH, translationsES);
    this.translateService.use(this.translateService.getDefaultLang());
    this.getAppData();
  }

  getAppData() {
  
    this.artworkInfraService.getArtPiecesObservable().subscribe((nfts: Array<Nft>) => {
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
