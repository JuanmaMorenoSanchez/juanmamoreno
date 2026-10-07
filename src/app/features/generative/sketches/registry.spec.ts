import { SKETCHES, SKETCH_LIST } from './registry';

/**
 * Which ids are pages, and which are not.
 *
 * An unknown id used to resolve by existing — the viewer fell back to building
 * a sketch for whatever it was handed — so a page could appear that nobody had
 * decided to publish. An id that is not registered is not a page, and this is
 * the line that says so.
 */
describe('the sketch registry', () => {
  it('holds the sketches that are written by hand', () => {
    expect(Object.keys(SKETCHES)).toContain('believe');
    expect(Object.keys(SKETCHES)).toContain('hide');
  });

  /**
   * The id of the piece that exists in the bucket today. If this ever starts
   * resolving without somebody having added it on purpose, the fallback is
   * back.
   */
  it('does not answer for an id nobody registered', () => {
    expect(SKETCHES['rockets-win-i']).toBeUndefined();
    expect(SKETCHES['any-saved-piece']).toBeUndefined();
  });

  it('lists exactly what it holds, for the menu', () => {
    expect(SKETCH_LIST.map((entry) => entry.id)).toEqual(Object.keys(SKETCHES));
    for (const entry of SKETCH_LIST) {
      expect(entry.label).toBeTruthy();
    }
  });

  /** Every registration builds something, piece or hand-written alike. */
  it('can build each one it holds', () => {
    for (const entry of Object.values(SKETCHES)) {
      expect(typeof entry.factory).toBe('function');
    }
  });
});
