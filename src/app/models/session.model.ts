import { Nft } from "alchemy-sdk";
import { NftThumbnail } from "./nfts.models";
import { GennericCanvasData } from "./canvas.models";

export interface SessionState {
    artPieces: Nft[];
    lastArtPiecesUpdate?: Date;
    imageCache: NftThumbnail[];
    canvasDataStock?: GennericCanvasData; 
    canvasDataWeather?: GennericCanvasData; 
}
