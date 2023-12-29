import { Component } from '@angular/core';
import { FEATUREDCERTIFICATES, HOMEGREENBACKGROUND, HOMEIA } from '@constants/nft.constants';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly greenBackGroundFilter = HOMEGREENBACKGROUND;
  readonly greenBackGroundColumns = 2;

  readonly IAFilter = HOMEIA;
  readonly IAColumns = 3;

}
