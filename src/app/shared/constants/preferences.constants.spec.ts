import { vi } from 'vitest';
import {
  PREFERENCE_KEYS,
  readPreference,
  readStoredText,
  writePreference,
} from './preferences.constants';

describe('remembered preferences', () => {
  beforeEach(() => localStorage.clear());
  afterEach(() => vi.unstubAllGlobals());

  it('gives back what was written', () => {
    writePreference(PREFERENCE_KEYS.THEME, 'dark');

    expect(readPreference(PREFERENCE_KEYS.THEME, ['light', 'dark'])).toBe('dark');
  });

  it('answers with nothing when the reader has never chosen', () => {
    expect(readPreference(PREFERENCE_KEYS.THEME, ['light', 'dark'])).toBeNull();
  });

  // The stored value outlives the version of the site that wrote it, and
  // anybody can edit it by hand. A value the caller has no case for must read
  // as no preference at all, or the page ends up in a state it cannot leave.
  it('refuses a value it was not offered', () => {
    localStorage.setItem('juanmamoreno.theme', 'sepia');

    expect(readPreference(PREFERENCE_KEYS.THEME, ['light', 'dark'])).toBeNull();
  });

  it('namespaces what it writes, so it cannot collide with anything else here', () => {
    writePreference(PREFERENCE_KEYS.SORT_METHOD, 'size');

    expect(localStorage.getItem('juanmamoreno.catalogue.sort')).toBe('size');
    expect(localStorage.getItem('catalogue.sort')).toBeNull();
  });

  // The mediums are not known until the catalogue has loaded, so this one
  // cannot be validated on the way out.
  it('hands back an unvalidated value for the preferences whose values it cannot know', () => {
    writePreference(PREFERENCE_KEYS.MEDIUM, 'Watercolor on paper');

    expect(readStoredText(PREFERENCE_KEYS.MEDIUM)).toBe('Watercolor on paper');
  });

  /**
   * There is no `window` at all while the 388 pages are prerendered, and no
   * storage in a browser with it turned off. Either has to mean "no
   * preference": a build that dies writing one down would take the whole site
   * with it.
   */
  it('treats storage it cannot reach as no preference rather than as a failure', () => {
    vi.stubGlobal('window', {
      get localStorage(): Storage {
        throw new Error('storage is disabled');
      },
    });

    expect(() => writePreference(PREFERENCE_KEYS.THEME, 'dark')).not.toThrow();
    expect(readPreference(PREFERENCE_KEYS.THEME, ['light', 'dark'])).toBeNull();
    expect(readStoredText(PREFERENCE_KEYS.THEME)).toBeNull();
  });
});
