import { Component } from '@angular/core';
import { AlchemyService } from '@services/alchemy.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private alchemyService: AlchemyService
  ) {

    // I have to call this functions somewhere
    this.alchemyService.fetchUserBalance();
    this.alchemyService.fetchJuanmaNFTs()
  } 
}
