/**
 * The networks a painting can have been posted to, and the mark each wears.
 *
 * **Instagram appears twice on purpose.** The feed and a reel are two different
 * things to have done with a painting — one is a photograph, the other is a
 * video somebody sat and watched — and while both wore the same mark the studio
 * could not tell them apart.
 *
 * The ids are the strings the api records, spelled exactly as it spells them:
 * `instagram reel video` is what the nightly run writes, spaces and all. Each
 * one's mark is drawn by `NetworkIconComponent`.
 */
export interface Network {
  id: string;
  /** Read out where the icon cannot be seen, and shown on hover. */
  label: string;
}

export const NETWORKS: readonly Network[] = [
  { id: 'instagram', label: 'Instagram' },
  { id: 'instagram reel video', label: 'an Instagram reel' },
  { id: 'bluesky', label: 'Bluesky' },
  { id: 'facebook', label: 'Facebook' },
];
