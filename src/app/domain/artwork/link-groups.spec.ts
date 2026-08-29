import { domainOf, groupLinksByDomain, pathOf } from './link-groups';

describe('grouping links by site', () => {
  it('gathers the pages of one site into one entry', () => {
    // The case this exists for: a painting used as a record sleeve, saved by
    // many listeners, is one place and not many.
    const groups = groupLinksByDomain([
      'https://music.example.com/album/1',
      'https://music.example.com/user/ana/favourites',
      'https://music.example.com/user/luis/favourites',
      'https://gallery.example.org/show',
    ]);

    expect(groups).toHaveLength(2);
    expect(groups[0]).toEqual({
      domain: 'music.example.com',
      links: [
        'https://music.example.com/album/1',
        'https://music.example.com/user/ana/favourites',
        'https://music.example.com/user/luis/favourites',
      ],
    });
    expect(groups[1].domain).toBe('gallery.example.org');
  });

  it('puts the busiest site first', () => {
    const groups = groupLinksByDomain([
      'https://one.com/a',
      'https://many.com/a',
      'https://many.com/b',
    ]);

    expect(groups.map((group) => group.domain)).toEqual(['many.com', 'one.com']);
  });

  it('breaks a tie by name, so the order does not wander between visits', () => {
    const groups = groupLinksByDomain(['https://zebra.com/a', 'https://alpha.com/a']);

    expect(groups.map((group) => group.domain)).toEqual(['alpha.com', 'zebra.com']);
  });

  it('counts a site as one place whether or not it says www', () => {
    const groups = groupLinksByDomain(['https://www.site.com/a', 'https://site.com/b']);

    expect(groups).toHaveLength(1);
    expect(groups[0].links).toHaveLength(2);
  });

  it('keeps subdomains apart, because they are different places', () => {
    const groups = groupLinksByDomain(['https://shop.site.com/a', 'https://blog.site.com/b']);

    expect(groups.map((group) => group.domain)).toEqual(['blog.site.com', 'shop.site.com']);
  });

  it('drops anything that is not a link rather than showing it as a site', () => {
    expect(groupLinksByDomain(['not a url', 'https://real.com/a'])).toEqual([
      { domain: 'real.com', links: ['https://real.com/a'] },
    ]);
  });

  it('has nothing to say about nothing', () => {
    expect(groupLinksByDomain([])).toEqual([]);
  });
});

describe('naming the parts of a link', () => {
  it('reads the site off a page', () => {
    expect(domainOf('https://www.arteinformado.com/guia/o/galeria-zunino-122806')).toBe(
      'arteinformado.com'
    );
  });

  it('gives the page on its own, since the site is named above it', () => {
    expect(pathOf('https://www.arteinformado.com/guia/o/galeria-zunino-122806')).toBe(
      '/guia/o/galeria-zunino-122806'
    );
  });

  it('keeps a query, which is often the only thing telling two pages apart', () => {
    expect(pathOf('https://site.com/search?q=painting')).toBe('/search?q=painting');
  });

  it('calls the front page the front page', () => {
    expect(pathOf('https://site.com/')).toBe('/');
  });
});
