import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CANVASES } from '@domain/generative/canvas.constants';
import { Subscription } from 'rxjs';
import { CanvasContainerComponent } from './components/canvas-container/canvas-container.component';

@Component({
    selector: 'app-generative-piece',
    templateUrl: './generative-piece.component.html',
    styleUrls: ['./generative-piece.component.scss'],
    imports: [CanvasContainerComponent]
})
export class GenerativePieceComponent implements OnInit, OnDestroy {
  private activatedRoute = inject(ActivatedRoute);
  
  public id: string;
  public logic: (p: any) => void;
  private routeSub?: Subscription;

  constructor( ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.logic = CANVASES.find(canvas => this.id === canvas.id)!.script as (p: any) => void;
  }

  ngOnInit(): void {
    this.routeSub = this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.logic = CANVASES.find(canvas => this.id === canvas.id)!.script as (p: any) => void;
    });
  }

  get foundCanvas(): boolean {
    return !!this.id && !!this.logic;
  }

  ngOnDestroy(): void {
    this.routeSub?.unsubscribe();
  }
}
