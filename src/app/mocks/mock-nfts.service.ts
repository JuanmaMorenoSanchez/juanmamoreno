import { Nft } from "alchemy-sdk";
import { of } from "rxjs";

export class MockNftsService {
    getNfts() {
      return of([]);
    }

    
  }