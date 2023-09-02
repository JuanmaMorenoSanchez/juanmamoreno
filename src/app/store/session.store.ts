import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { SessionState } from '@models/session.model';

export function createInitialState(): SessionState {
    return {
        balances: undefined,
        artPieces: []
    };
}

@Injectable({ providedIn: 'root' })
@StoreConfig({ name: 'session' })
export class SessionStore extends Store<SessionState> {
  constructor() {
    super(createInitialState());
  }
}