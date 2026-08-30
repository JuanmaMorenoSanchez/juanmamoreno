export interface ArtCritic {
  tokenId: string;
  artworkName: string;
  translated: Array<TranslatedCritic>;
  /**
   * Whether the artist has rewritten any of this by hand.
   *
   * Only ever present on the reply to a request the backend has authenticated
   * as his: the public route strips it, so a reader cannot learn it from the
   * network tab any more than from the page.
   */
  edited?: boolean;
  /** When the essay was first written, and when its text last changed. */
  createdAt?: string;
  updatedAt?: string;
}

export interface TranslatedCritic {
  lang: string;
  title: string;
  // The essay already rendered to HTML by the backend, links included.
  html: string;
  /**
   * The markdown the html was made from. The canonical form, and so the one
   * put in front of the artist when he edits: editing the html would mean
   * editing the derived copy and losing the original.
   */
  body?: string;
}
