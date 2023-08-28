import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { SessionState } from '@models/session.model';
import { SessionStore } from '@store/session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {  
    selectBalancesObservable = this.select(state => state?.balances);
    selectArtPiecesObservable = this.select(state => state?.artPieces);

    get selectBalances() {
        return this.getValue().balances
    }

    get selectArtPieces() {
        return this.getValue().artPieces
    }

    constructor(protected override store: SessionStore) {
        super(store);
    }
}