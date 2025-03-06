import { Component } from '@angular/core';
import { BELIEVE_ID } from '@constants/canvas.constants';
import { BELIEVE_CANVAS } from 'src/app/canvases/believe.canvas';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent {

  readonly believeCanvasId = BELIEVE_ID;
  readonly believeScript = BELIEVE_CANVAS;

}
