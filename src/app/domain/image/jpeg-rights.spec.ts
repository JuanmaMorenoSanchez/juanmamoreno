import { describe, expect, it } from 'vitest';
import { copyrightNotice, withRights } from './jpeg-rights';

/** A jpeg only as far as this matters: the start marker and some scan data. */
function fakeJpeg(): Uint8Array {
  const body = new Uint8Array(64);
  for (let i = 0; i < body.length; i++) body[i] = (i * 37) % 251;
  return Uint8Array.from([0xff, 0xd8, 0xff, 0xdb, ...body, 0xff, 0xd9]);
}

const text = (bytes: Uint8Array) => new TextDecoder().decode(bytes);

const RIGHTS = {
  artist: 'Juanma Moreno Sánchez',
  webStatement: 'https://www.juanmamoreno.com/terms',
  year: 2026,
};

describe('writing rights into a jpeg', () => {
  it('leaves every byte of the image untouched', () => {
    const source = fakeJpeg();
    const stamped = withRights(source, RIGHTS);

    // Everything from the start marker onwards is still there, in order, once
    // the inserted segments are skipped. Rights cost nothing in quality only if
    // this holds.
    const tail = stamped.subarray(stamped.length - (source.length - 2));
    expect(Array.from(tail)).toEqual(Array.from(source.subarray(2)));
    expect(stamped[0]).toBe(0xd8 - 0xd8 + 0xff);
    expect(stamped[1]).toBe(0xd8);
  });

  it('writes two APP1 segments whose lengths describe themselves', () => {
    const stamped = withRights(fakeJpeg(), RIGHTS);

    let at = 2;
    const found: string[] = [];
    for (let i = 0; i < 2; i++) {
      expect(stamped[at]).toBe(0xff);
      expect(stamped[at + 1]).toBe(0xe1);
      const length = (stamped[at + 2] << 8) | stamped[at + 3];
      found.push(text(stamped.subarray(at + 4, at + 4 + 30)));
      at += 2 + length;
    }

    expect(found[0].startsWith('Exif\0\0')).toBe(true);
    expect(found[1].startsWith('http://ns.adobe.com/xap/1.0/')).toBe(true);
  });

  it('carries the name and the notice in both blocks', () => {
    const whole = text(withRights(fakeJpeg(), RIGHTS));

    // Four times: as the author in exif and again in xmp, and inside the
    // notice in each of them.
    expect(whole.match(/Juanma Moreno Sánchez/g)?.length).toBe(4);
    expect(whole.match(/© 2026 Juanma Moreno Sánchez\. All rights reserved\./g)?.length).toBe(2);
    expect(whole).toContain('xmpRights:Marked>True');
    expect(whole).toContain('https://www.juanmamoreno.com/terms');
  });

  it('keeps an accented name intact rather than flattening it', () => {
    const whole = text(withRights(fakeJpeg(), { artist: 'José Ángel Múñoz', year: 2026 }));
    expect(whole).toContain('José Ángel Múñoz');
  });

  // Escaped in the xmp, which is xml, and left alone in the exif, which is not
  // — a reader of the exif field should see the name the artist actually uses.
  it('escapes a name in the xmp and writes it plainly in the exif', () => {
    const whole = text(withRights(fakeJpeg(), { artist: 'Ruiz & Co <studio>', year: 2026 }));

    expect(whole).toContain('Ruiz &amp; Co &lt;studio&gt;');
    // Twice, both in the exif block — as the author and inside its notice —
    // and never inside the xml.
    expect(whole.match(/Ruiz & Co <studio>/g)?.length).toBe(2);
    expect(whole.split('<x:xmpmeta')[1]).not.toContain('<studio>');
  });

  it('leaves the file alone when there is no name to write', () => {
    const source = fakeJpeg();
    expect(withRights(source, { artist: '   ' })).toBe(source);
  });

  it('leaves alone anything that is not a jpeg', () => {
    const notJpeg = Uint8Array.from([0x89, 0x50, 0x4e, 0x47]);
    expect(withRights(notJpeg, RIGHTS)).toBe(notJpeg);
  });

  it('omits the web statement when there is none', () => {
    const whole = text(withRights(fakeJpeg(), { artist: 'A Painter', year: 2026 }));
    expect(whole).not.toContain('WebStatement');
  });
});

describe('the notice itself', () => {
  it('is built from the year and the name', () => {
    expect(copyrightNotice({ artist: 'A Painter', year: 2019 })).toBe(
      '© 2019 A Painter. All rights reserved.'
    );
  });

  it('gives way to one written by hand', () => {
    expect(copyrightNotice({ artist: 'A Painter', notice: 'CC BY-NC 4.0', year: 2019 })).toBe(
      'CC BY-NC 4.0'
    );
  });
});
