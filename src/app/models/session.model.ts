import { NFT } from "opensea-js";
import { NFTMetadata } from "./nfts.models";

export interface SessionState {
    // balances?: TokenBalancesResponseErc20;
    artPieces: NFT[];
    artPiecesMetadata: NFTMetadata[];
    lastArtPiecesUpdate?: Date;
}