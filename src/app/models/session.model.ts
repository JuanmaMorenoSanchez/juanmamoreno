import { Nft } from "alchemy-sdk";
import { NftThumbnail } from "./nfts.models";

export interface SessionState {
    artPieces: Nft[];
    lastArtPiecesUpdate?: Date;
    imageCache: NftThumbnail[];
}
