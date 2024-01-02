import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CANVASES } from '@constants/canvas.constants';
import { Canvas } from '@models/canvas.models';

@Component({
  selector: 'app-generative-piece',
  templateUrl: './generative-piece.component.html',
  styleUrls: ['./generative-piece.component.scss']
})
export class GenerativePieceComponent {

  public id: string;
  public logic: (p: any) => void;

  constructor(
    private activatedroute: ActivatedRoute,
  ) {
    this.id = this.activatedroute.snapshot.params['id'];
    this.logic = CANVASES.find(canvas => this.id === canvas.id)!.script as (p: any) => void;
  }

  get foundCanvas(): boolean {
    return !!this.id && !!this.logic;
  }

}
