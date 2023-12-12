import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SessionQuery } from '@store/session.query';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  public years: Set<string>;

  constructor(
    public router: Router,
    private sessionQuery: SessionQuery
  ) { 
    this.years = this.sessionQuery.getYears;
  }

}
