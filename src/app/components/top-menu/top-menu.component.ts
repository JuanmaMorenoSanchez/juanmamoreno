import { Component, OnInit } from '@angular/core';
import { AlchemyService } from '@services/alchemy.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public userBalance = 0

  constructor(
    private alchemyService: AlchemyService
  ) { }

  ngOnInit(): void {

   
  }

}
