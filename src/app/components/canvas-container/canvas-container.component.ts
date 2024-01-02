import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import p5 from 'p5';

@Component({
  selector: 'app-canvas-container',
  templateUrl: './canvas-container.component.html',
  styleUrls: ['./canvas-container.component.scss']
})
export class CanvasContainerComponent {

  @Input() identifier!: string;
  @Input() logic!: (p: any) => void;

  @ViewChild("container") div?: ElementRef;

  private p5: p5 | undefined;
  
  constructor() {
    window.onresize = this.onWindowResize;
  }

  ngOnInit() {
    this.createCanvas();
  }

  private onWindowResize = (e: any) => {
    this.p5?.resizeCanvas(this.div!.nativeElement.offsetWidth, this.div!.nativeElement.offsetHeight);
  }

  private createCanvas = () => {
    this.p5 = new p5(this.logic);
  }

  private destroyCanvas = () => {
    this.p5?.noCanvas();
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
  }
}
