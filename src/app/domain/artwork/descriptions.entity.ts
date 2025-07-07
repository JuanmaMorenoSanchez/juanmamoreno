export interface Descriptions {
  tokenId: string;
  translated: Array<TranslatedDescription>;
}

export interface TranslatedDescription {
  lang: string;
  shortDesc: string;
}
