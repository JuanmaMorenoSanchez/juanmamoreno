import { META_DESCRIPTION_LIMIT, metaDescription } from './meta-description';

describe('cutting a description to what a search result shows', () => {
  it('leaves a short one exactly as it is', () => {
    const short = 'Oil on canvas, 2020.';

    expect(metaDescription(short)).toBe(short);
  });

  it('never hands over more than a search result will show', () => {
    // Token 71's real description ran to five hundred and thirty-nine.
    const long =
      'The boy, bathed in a halo of light, offers a small, almost imperceptible gesture. ' +
      'Around him the paint thickens into something that is not quite a room and not quite a field. ' +
      'The colour drains at the edges, as if the picture were remembering itself badly.';

    expect(metaDescription(long).length).toBeLessThanOrEqual(META_DESCRIPTION_LIMIT + 1);
  });

  it('stops at the end of a sentence when one is near enough the end', () => {
    const text =
      'A tangle of limbs against a sky brushed with the blue of longing. ' +
      'Figures morph and merge, skin melding with the landscape, punctuated by flashes of crimson.';

    expect(metaDescription(text)).toBe(
      'A tangle of limbs against a sky brushed with the blue of longing.'
    );
  });

  it('does not throw away most of the text to find a full stop', () => {
    // The sentence ends after eight characters; stopping there would say
    // nothing at all, so it runs on and cuts at a word instead.
    const text = 'A pause. ' + 'and then a very long unbroken clause '.repeat(8);
    const cut = metaDescription(text);

    expect(cut).not.toBe('A pause.');
    expect(cut.endsWith('…')).toBe(true);
  });

  it('cuts at a word, never through one', () => {
    const text = 'word '.repeat(80);

    expect(metaDescription(text)).not.toMatch(/wor…$/);
    expect(metaDescription(text).endsWith('…')).toBe(true);
  });

  it('says it was cut, so the reader is not left mid-thought', () => {
    expect(metaDescription('x '.repeat(200)).endsWith('…')).toBe(true);
  });

  it('does not leave a comma or a space hanging before the ellipsis', () => {
    const text = 'A room, a chair, a window, and a great deal more besides, '.repeat(5);

    expect(metaDescription(text)).not.toMatch(/[,;:\s]…$/);
  });

  it('flattens the whitespace a generated paragraph arrives with', () => {
    expect(metaDescription('Two   sentences.\n\nOn separate lines.')).toBe(
      'Two sentences. On separate lines.'
    );
  });

  it('has nothing to say about nothing', () => {
    expect(metaDescription('')).toBe('');
    expect(metaDescription(undefined as unknown as string)).toBe('');
  });
});
