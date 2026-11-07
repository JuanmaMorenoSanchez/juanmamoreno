export interface Nft {
  tokenId: string;
  name: string;
  description?: string;
  image: NftImage;
  raw: {
    tokenUri?: string;
    metadata: {
      name?: string;
      description?: string;
      image?: string;
      attributes: Array<Trait>;
    };
  };
  tokenUri?: string;
  timeLastUpdated?: string;
  contract?: unknown;
  tokenType?: unknown;
  acquiredAt?: unknown;
  collection?: unknown;
  mint?: unknown;
}

export interface NftImage {
  originalUrl?: string;
  cachedUrl?: string;
  thumbnailUrl?: string;
  pngUrl?: string;
  contentType?: string;
  size?: number;
}

export interface NftFilters {
  years?: Array<string>;
  idsToExclude?: Array<string>;
  /**
   * Exactly these artworks and no others, when the caller has already chosen
   * them. The artwork page does: it counts how many thumbnails fill whole rows
   * before it asks for any, which a filter by year cannot express.
   */
  idsToInclude?: Array<string>;
}

export interface Trait {
  trait_type: string;
  value: string;
  display_type?: unknown;
  max_value?: unknown;
  order?: unknown;
  trait_count?: number;
}

export interface NftThumbnail {
  originalUrl: string;
  thumbnail: string;
  tokenId: string;
  createdAt: string;
  updatedAt: string;
}
