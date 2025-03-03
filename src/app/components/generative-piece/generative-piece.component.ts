import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CANVASES } from '@constants/canvas.constants';
import { Canvas } from '@models/canvas.models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-generative-piece',
  templateUrl: './generative-piece.component.html',
  styleUrls: ['./generative-piece.component.scss']
})
export class GenerativePieceComponent implements OnInit, OnDestroy {

  public id: string;
  public logic: (p: any) => void;
  private routeSub?: Subscription;

  constructor(
    private activatedRoute: ActivatedRoute,
  ) {
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
