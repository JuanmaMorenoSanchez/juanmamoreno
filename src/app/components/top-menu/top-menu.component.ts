import { Component, OnInit } from '@angular/core';
import { SessionQuery } from '@store/session.query';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent implements OnInit {

  userBalances;
  // public userMaticBalance = 0

  constructor(    
    private sessionQuery: SessionQuery,
  ) { 
    this.userBalances = this.sessionQuery.selectBalances
  }

  ngOnInit(): void {

   
  }
}
