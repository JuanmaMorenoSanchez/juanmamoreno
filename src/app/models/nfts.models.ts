import { BaseFirestoreObject } from "./common.models";

export interface NftFilters {
    years?: Array<string>;
    idsToExclude?: Array<string>;
}
export interface Trait {
    display_type: unknown;
    max_value: unknown;
    order: unknown;
    trait_count: number;
    trait_type: string;
    value: string;
}

export interface NftThumbnail extends BaseFirestoreObject {
    originalUrl: string,
    thumbnail: string,
    tokenId: string
}
