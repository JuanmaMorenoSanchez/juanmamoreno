import { TokenBalancesResponseErc20, Nft } from "alchemy-sdk";

export interface SessionState {
    balances?: TokenBalancesResponseErc20;
    artPieces: Nft[];
    lastArtPiecesUpdate?: Date;
}