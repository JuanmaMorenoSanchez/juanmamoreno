import { Component } from '@angular/core';
import { NftsService } from '@services/nfts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public userMaticBalance = 0

  constructor(
    private nftsService: NftsService,
  ) {

    // I have to call this functions somewhere
    // this.nftsService.fetchUserBalance();
    this.nftsService.getArt() // i dont like it here. move
    // console.log("this.moralisService.getAlchemyNetwork() ", this.moralisService.getAlchemyNetwork());
  } 
}
