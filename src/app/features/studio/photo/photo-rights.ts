import { computed, signal } from '@angular/core';
import { copyrightNotice, type Rights } from '@domain/image/jpeg-rights';

const ARTIST_KEY = 'juanmamoreno.studio.artist';
const NOTICE_KEY = 'juanmamoreno.studio.notice';
const STATEMENT_KEY = 'juanmamoreno.studio.webStatement';

/**
 * What the rights fields say before anybody types in them.
 *
 * These were placeholders, which meant the answer was right there on screen and
 * still had to be typed out every time — and a photograph left the studio
 * unattributed if it was not. They are the same every time, so they are the
 * values now.
 */
export const DEFAULT_ARTIST = 'Juanma Moreno Sánchez';
export const DEFAULT_STATEMENT = 'https://www.juanmamoreno.com/terms';

/**
 * The notice, worked out when the page loads rather than written into the
 * source, so the year is this year. It is only ever stored if it is typed in,
 * so a field left alone goes on saying the right year next January instead of
 * the one it was first shown in.
 */
export function defaultNotice(): string {
  return `© ${new Date().getFullYear()} ${DEFAULT_ARTIST}`;
}

/**
 * What was typed here last time, or the default when nothing ever was.
 *
 * Absent and empty are kept apart: `getItem` answers null for a key that was
 * never written and '' for one deliberately cleared. Treating them alike would
 * mean a field could not be emptied — it would fill itself in again on the next
 * visit, which is its own kind of wrong.
 */
function remembered(key: string, fallback = ''): string {
  try {
    return window.localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

function remember(key: string, value: string): void {
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Storage off. The field holds for this session, which is enough.
  }
}

/**
 * Who made the painting, and on what terms it may be shown.
 *
 * A canvas encodes a jpeg with no author, no rights and no colour profile, so
 * every corrected painting used to leave the studio anonymous — and a
 * reproduction of a painting is exactly the kind of image that travels and
 * arrives somewhere with nobody attached to it. Remembered between sessions,
 * because it is the same answer every time.
 *
 * Its own object because none of it has anything to do with correcting a
 * photograph: it is what gets written into the file afterwards.
 */
export class PhotoRights {
  readonly artist = signal(remembered(ARTIST_KEY, DEFAULT_ARTIST));
  readonly notice = signal(remembered(NOTICE_KEY, defaultNotice()));
  readonly webStatement = signal(remembered(STATEMENT_KEY, DEFAULT_STATEMENT));

  /** Nothing to attribute without a name, so nothing is written at all. */
  readonly rights = computed<Rights | null>(() => {
    const artist = this.artist().trim();
    if (!artist) return null;
    return {
      artist,
      notice: this.notice().trim() || undefined,
      webStatement: this.webStatement().trim() || undefined,
    };
  });

  readonly noticePreview = computed(() =>
    this.artist().trim() ? copyrightNotice(this.rights() as Rights) : ''
  );

  setArtist(value: string): void {
    this.artist.set(value);
    remember(ARTIST_KEY, value);
  }

  setNotice(value: string): void {
    this.notice.set(value);
    remember(NOTICE_KEY, value);
  }

  setWebStatement(value: string): void {
    this.webStatement.set(value);
    remember(STATEMENT_KEY, value);
  }
}
