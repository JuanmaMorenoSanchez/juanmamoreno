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