import { SKETCHES, SKETCH_LIST } from './registry';

/**
 * Which ids are pages, and which are not.
 *
 * A piece saved in the atelier used to resolve at `/generative/<its id>` by
 * existing — the viewer fell back to building one for any unknown id — so every
 * save published a page nobody had decided to publish. Registering a piece is
 * deliberate now, and this is the line that says so.
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
  it('does not answer for a piece nobody registered', () => {
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
