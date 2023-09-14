import { OwnedNft, TokenBalancesResponseErc20 } from "alchemy-sdk";

export interface SessionState {
    balances?: TokenBalancesResponseErc20;
    artPieces: OwnedNft[]; // this class is extended by alchemy to add pagination if needed
    lastArtPiecesUpdate?: Date;
}