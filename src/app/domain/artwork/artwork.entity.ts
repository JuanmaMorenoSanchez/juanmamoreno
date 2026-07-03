import { FirestoreObject } from '@shared/entities/firestore-object.entity';

export interface Nft {
  tokenId: string;
  name: string;
  description?: string;
  image: NftImage;
  raw: {
    tokenUri: string;
    metadata: {
      name: string;
      description?: string;
      image: string;
      attributes: Array<Trait>;
    };
  };
  tokenUri?: string;
  timeLastUpdated: string;
  contract: any;
  tokenType: any;
  acquiredAt?: any;
  collection?: any;
  mint?: any;
}

export interface NftImage {
  originalUrl?: string;
  cachedUrl?: string;
  thumbnailUrl?: string;
  pngUrl?: string;
  contentType: string;
  size: number;
}

export interface NftFilters {
  years?: Array<string>;
  idsToExclude?: Array<string>;
}

export interface Trait {
  trait_type: string;
  value: string;
  display_type?: unknown;
  max_value?: unknown;
  order?: unknown;
  trait_count?: number;
}

export interface NftThumbnail extends FirestoreObject {
  originalUrl: string;
  thumbnail: string;
  tokenId: string;
}
