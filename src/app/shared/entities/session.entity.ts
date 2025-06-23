import { Nft, NftThumbnail } from "@domain/artwork/artwork.entity";
// import { GennericCanvasData } from "@domain/generative/canvas.entity";

export interface SessionState {
    artPieces: Nft[];
    lastArtPiecesUpdate?: Date;
    imageCache: NftThumbnail[];
    // canvasDataStock?: GennericCanvasData; 
    // canvasDataWeather?: GennericCanvasData; 
}
