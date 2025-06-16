import { Observable } from "rxjs";
import { ArtworkDomain } from "./artwork";
import { Nft } from "./artwork.entity";

export interface ArtworkPort extends ArtworkDomain{
    getArtPiecesObservable(): Observable<Nft[]>;
    getNftByIdObservable(id: string): Observable<Nft | null>;
    getSameArtThanObservable(tokenId: string): Observable<Array<Nft>>;
    getNftLenghtByYear(year: string): number;
    getAvailableOptimalUrl(nft: Nft): Observable<string>;
    getLinks(tokenId: string): Observable<string[]>;
    saveNftsLocally(nfts: Array<Nft>): void
}

