export interface PublishedText {
  title: string;
  /** Absent where the piece carries no byline, such as a listing. */
  author?: string;
  publication: string;
  year: number;
  /** Translation key: what kind of piece this is (essay, interview, press). */
  kind: string;
  /** Translation key: one line, ours, saying why it is worth opening. */
  note: string;
  url: string;
}
