/**
 * The networks a painting can have been posted to, and the mark each wears.
 *
 * **Instagram appears twice on purpose.** The feed and a reel are two different
 * things to have done with a painting — one is a photograph, the other is a
 * video somebody sat and watched — and while both wore the same mark the studio
 * could not tell them apart.
 *
 * The ids are the strings the api records, spelled exactly as it spells them:
 * `instagram reel video` is what the nightly run writes, spaces and all.
 */
export interface Network {
  id: string;
  /** Two or three letters, because a row has six of these and no room for words. */
  mark: string;
  label: string;
}

export const NETWORKS: readonly Network[] = [
  { id: 'instagram', mark: 'IG', label: 'Instagram' },
  { id: 'instagram reel video', mark: 'RE', label: 'an Instagram reel' },
  { id: 'threads', mark: 'TH', label: 'Threads' },
  { id: 'bluesky', mark: 'BS', label: 'Bluesky' },
  { id: 'facebook', mark: 'FB', label: 'Facebook' },
];
