import { Component } from '@angular/core';
import { FEATUREDCERTIFICATES } from '@constants/nft.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly featuredFilters = FEATUREDCERTIFICATES;
  readonly featuredColumns = 2;

}
