import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NftsService } from '@services/nfts.service';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  public years: Set<string>;

  constructor(
    public router: Router,
    private nftService: NftsService
  ) { 
    this.years = this.nftService.getYears();
  }

  ngOnInit(): void {

  }
}
