import { Component, ElementRef, inject, Input, SimpleChanges, ViewChild } from '@angular/core';
import { SessionQuery } from '@shared/store/session.query';
import { SessionStore } from '@shared/store/session.store';
import p5 from 'p5';

@Component({
    selector: 'app-canvas-container',
    templateUrl: './canvas-container.component.html',
    styleUrls: ['./canvas-container.component.scss']
})
export class CanvasContainerComponent {
  private sessionQuery = inject(SessionQuery);
  private store = inject(SessionStore);
  

  @Input() identifier!: string; // TODO: update to signal input
  @Input() logic!: (p: any, sessionQuery?: SessionQuery, store?: SessionStore) => void;

  @ViewChild("container") div?: ElementRef;

  private p5: p5 | undefined;
  
  constructor( ) {
    window.onresize = this.onWindowResize;
  }

  ngOnInit() {
    this.createCanvas();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['logic'] && !changes['logic'].firstChange) {
      this.destroyCanvas();
      this.createCanvas();
    }
  }

  private onWindowResize = (e: any) => {
    this.p5?.resizeCanvas(this.div!.nativeElement.offsetWidth, this.div!.nativeElement.offsetHeight);
  }

  private createCanvas = () => {
    this.p5 = new p5((p) => this.logic(p, this.sessionQuery, this.store));
  }

  private destroyCanvas = () => {
    this.p5?.noCanvas();
  }

  ngOnDestroy(): void {
    this.destroyCanvas();
  }
}
