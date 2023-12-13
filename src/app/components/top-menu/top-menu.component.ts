import { Component } from '@angular/core';
import { VALIDTRAITS } from '@constants/nft.constants';
import { SessionQuery } from '@store/session.query';
@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss']
})
export class TopMenuComponent {

  constructor(
    private sessionQuery: SessionQuery
  ) { 
  }

  get years(): Set<string> {
    return this.sessionQuery.years;
  }

}
