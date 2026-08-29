import { artworkTokenIdFrom } from './artwork-link';

describe('recognising a link to one of the artist"s own paintings', () => {
  it('reads the token id out of the address the essays actually use', () => {
    expect(artworkTokenIdFrom('https://www.juanmamoreno.com/artwork/134')).toBe('134');
  });

  it('accepts the address without the www', () => {
    expect(artworkTokenIdFrom('https://juanmamoreno.com/artwork/21')).toBe('21');
  });

  it('accepts the Spanish page, which is the same painting', () => {
    expect(artworkTokenIdFrom('https://www.juanmamoreno.com/es/artwork/58')).toBe('58');
  });

  it('accepts a relative link, since only our own pages are written that way', () => {
    expect(artworkTokenIdFrom('/artwork/7')).toBe('7');
    expect(artworkTokenIdFrom('/es/artwork/7')).toBe('7');
  });

  it('does not mind a trailing slash, which is how the pages are served', () => {
    expect(artworkTokenIdFrom('https://juanmamoreno.com/artwork/134/')).toBe('134');
  });

  it('ignores a query or a fragment hanging off the end', () => {
    expect(artworkTokenIdFrom('/artwork/134?from=essay')).toBe('134');
    expect(artworkTokenIdFrom('/artwork/134#detail')).toBe('134');
  });

  it('says nothing about a link to somebody else', () => {
    expect(artworkTokenIdFrom('https://www.museoreinasofia.es/artwork/134')).toBeNull();
    expect(artworkTokenIdFrom('https://en.wikipedia.org/wiki/Berlin_Street_Scene')).toBeNull();
  });

  it('is not fooled by our name appearing inside another host', () => {
    expect(artworkTokenIdFrom('https://juanmamoreno.com.evil.test/artwork/1')).toBeNull();
    expect(artworkTokenIdFrom('https://notjuanmamoreno.com/artwork/1')).toBeNull();
  });

  it('says nothing about our own pages that are not paintings', () => {
    expect(artworkTokenIdFrom('https://juanmamoreno.com/about')).toBeNull();
    expect(artworkTokenIdFrom('https://juanmamoreno.com/artworks')).toBeNull();
    expect(artworkTokenIdFrom('/artwork/not-a-number')).toBeNull();
  });

  it('ignores anything that is not an http link at all', () => {
    expect(artworkTokenIdFrom('mailto:someone@example.com')).toBeNull();
    expect(artworkTokenIdFrom('javascript:alert(1)')).toBeNull();
    expect(artworkTokenIdFrom('')).toBeNull();
    expect(artworkTokenIdFrom('not a url')).toBeNull();
  });
});
