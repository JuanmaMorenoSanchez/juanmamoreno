import { NFT } from "opensea-js";

export interface NftFilters {
    years?: Array<string>;
}

export interface NFTMetadata extends NFT {
    traits: Array<Trait>;
}

export interface Trait {
    display_type: unknown;
    max_value: unknown;
    order: unknown;
    trait_count: number;
    trait_type: string;
    value: string;
}