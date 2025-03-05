import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { SessionState } from '@models/session.model';

export function createInitialState(): SessionState {
    return {
        artPieces: [],
        lastArtPiecesUpdate: undefined,
        imageCache: [],
        canvasDataStock: undefined,
        canvasDataWeather: undefined
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}