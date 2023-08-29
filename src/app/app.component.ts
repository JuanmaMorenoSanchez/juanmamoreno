import { Component } from '@angular/core';
import { AlchemyService } from '@services/alchemy.service';
import { SessionQuery } from '@store/session.query';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  // public userMaticBalance = 0

  constructor(
    private alchemyService: AlchemyService,
  ) {

    // I have to call this functions somewhere
    // this.alchemyService.fetchUserBalance();
    this.alchemyService.fetchJuanmaNFTs() // i dont like it here. move

  } 
}
