import { Injectable } from '@angular/core';
import { VALIDTRAITS } from '@constants/nft.constants';
import { Query } from '@datorama/akita';
import { SessionState } from '@models/session.model';
import { SessionStore } from '@store/session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {
    selectArtPiecesObservable = this.select(({ artPieces }) => [...artPieces]);

    get selectArtPieces() {
        return this.getValue().artPieces
    }

    get selectLastArtPiecesUpdate() {
        return this.getValue().lastArtPiecesUpdate
    }

    get years(): Set<number> {
        return new Set(
            this.getValue().artPieces?.map((artPiece) => {
                return Number(artPiece.raw.metadata!['attributes'].find((trait: any)  => trait['trait_type'] === VALIDTRAITS.YEAR)!['value'])
            }).filter(year => year).sort().reverse() as Array<number>
        );
    }

    constructor(protected override store: SessionStore) {
        super(store);
    }
}