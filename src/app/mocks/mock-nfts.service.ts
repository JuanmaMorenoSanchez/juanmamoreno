import { Nft } from "alchemy-sdk";
import { of } from "rxjs";

export class MockNftsService {

    getNfts() {
      return of([]);
    }

    getSameArtThanObservable() {
      return of([]);
    }

    getTraitValue() {
      return 'traitValue';
    }

    isFrontalView() {
      return false;
    }

    getQualityUrl() {
      return 'qualityUrl';
    }
  }