export interface ArtCritic {
  tokenId: string;
  artworkName: string;
  translated: Array<TranslatedCritic>;
}

export interface TranslatedCritic {
  lang: string;
  title: string;
  // The essay already rendered to HTML by the backend, links included. The
  // backend also stores the markdown it was derived from, which the site has
  // no use for.
  html: string;
}
