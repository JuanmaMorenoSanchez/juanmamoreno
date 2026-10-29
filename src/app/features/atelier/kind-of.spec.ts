import { kindOf } from './kind-of';

/**
 * What the shelf will say a file is.
 *
 * The case that matters is the first one: a night of cutting puts hundreds of
 * layers in the bucket, and if they all arrive called "layer" the shelf is a
 * wall of identical boxes and nothing can be asked about what is already done.
 */
describe('kindOf', () => {
  it('carries the phrase a layer was cut for', () => {
    expect(kindOf('a1b2c3d4-the-girl.png')).toBe('layer-the-girl');
  });

  it('drops the run it came out of', () => {
    // The same thing cut on two nights is the same kind, not two.
    expect(kindOf('a1b2c3d4-the-chair.png')).toBe(kindOf('99887766-the-chair.png'));
  });

  it('keeps a background a background, whatever was lifted off it', () => {
    expect(kindOf('a1b2c3d4-background.png')).toBe('background');
    expect(kindOf('a1b2c3d4-background-filled.png')).toBe('background');
  });

  it('still knows the other things the engine writes', () => {
    expect(kindOf('a1b2c3d4-depth.png')).toBe('depth');
    expect(kindOf('a1b2c3d4-edit.png')).toBe('edit');
  });

  it('says layer once for a Keep node that was given no name', () => {
    // `_save` writes `<batch>-layer.png` when nothing was typed, and
    // `layer-layer` says nothing twice.
    expect(kindOf('a1b2c3d4-layer.png')).toBe('layer');
  });

  it('files an unprefixed name under itself', () => {
    // Nothing writes one today. A kind is read by people, so a file that
    // arrives without the engine's prefix should still say what it is rather
    // than fall back to the word that means "unknown".
    expect(kindOf('the-girl.png')).toBe('layer-the-girl');
  });

  it('makes a word of a phrase however it was punctuated', () => {
    expect(kindOf('a1b2c3d4-The Girl_2.png')).toBe('layer-the-girl-2');
  });
});
