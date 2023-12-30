import { Component } from '@angular/core';
import { WELCOME_ID } from '@constants/canvas.constants';
import { HOMEGREENBACKGROUND, HOMEIA } from '@constants/nft.constants';
import { WELCOME_CANVAS } from 'src/app/canvases/welcome.canvas';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly welcomeCanvasId = WELCOME_ID;
  readonly welcomeScript = WELCOME_CANVAS;

  readonly greenBackGroundFilter = HOMEGREENBACKGROUND;
  readonly greenBackGroundColumns = 2;

  readonly IAFilter = HOMEIA;
  readonly IAColumns = 3;

}
