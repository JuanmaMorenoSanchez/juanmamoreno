import { Nft } from "alchemy-sdk";
import { NftThumbnail } from "./nfts.models";
import { CanvasesStates } from "./canvas.models";

export interface SessionState {
    artPieces: Nft[];
    lastArtPiecesUpdate?: Date;
    imageCache: NftThumbnail[];
    canvasesData?: CanvasesStates; 
}
