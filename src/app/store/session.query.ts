import { Injectable } from '@angular/core';
import { VALIDTRAITS } from '@constants/nft.constants';
import { Query } from '@datorama/akita';
import { SessionState } from '@models/session.model';
import { SessionStore } from '@store/session.store';

@Injectable({ providedIn: 'root' })
export class SessionQuery extends Query<SessionState> {  
    // selectBalancesObservable = this.select(state => state.balances);
    selectArtPiecesObservable = this.select(({ artPieces }) => artPieces);
    selectArtPiecesMetadataObservable = this.select(({ artPiecesMetadata }) => artPiecesMetadata);
    
    // get selectBalances() {
    //     return this.getValue().balances
    // }

    get selectArtPieces() {
        return this.getValue().artPieces
    }

    get selectArtPiecesMetadata() {
        return this.getValue().artPiecesMetadata
    }
 
    get selectLastArtPiecesUpdate() {
        return this.getValue().lastArtPiecesUpdate
    }

    get years(): Set<number> {
        return new Set(
            this.getValue().artPiecesMetadata.map((artPiece) => {
              return Number(artPiece.traits.find((trait)  => trait.trait_type === VALIDTRAITS.YEAR)?.value)
            }).filter(year => year).sort().reverse() as Array<number>
        );
    }

    constructor(protected override store: SessionStore) {
        super(store);
    }
}