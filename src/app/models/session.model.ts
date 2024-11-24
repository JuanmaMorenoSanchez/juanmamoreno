import { Nft } from "alchemy-sdk";

// export type SortBy = 'size' | 'medium' | 'title';

export interface SessionState {
    // balances?: TokenBalancesResponseErc20;
    artPieces: Nft[];
    // sortBy?: SortBy;
    lastArtPiecesUpdate?: Date;
}
