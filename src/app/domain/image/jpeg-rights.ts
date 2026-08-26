/**
 * Putting the artist's name and copyright into the file the studio hands back.
 *
 * A canvas writes a jpeg with no metadata at all — no author, no rights, no
 * colour profile — so a corrected painting left the studio anonymous. That
 * matters more for these files than for most: a reproduction of a painting is
 * exactly the kind of image that travels, gets re-hosted, and arrives somewhere
 * with nobody attached to it.
 *
 * Costs nothing in quality. Both blocks below are header segments that sit
 * before the compressed image, so writing them moves no pixel: the scan data is
 * copied through byte for byte, which the tests check rather than assume.
 *
 * Three vocabularies, because different software reads different ones — exif is
 * what file managers and most viewers show, xmp is what Adobe's tools read and
 * what Google Images uses for licensing. Both are written so they agree.
 */

export interface Rights {
  /** The name that goes in as author. Nothing is written without one. */
  artist: string;
  /** Defaults to "© {year} {artist}. All rights reserved." */
  notice?: string;
  /** A page setting out the terms, if there is one. */
  webStatement?: string;
  /** Overridable so a test does not change answer in January. */
  year?: number;
}

const SOI = 0xffd8;
const APP1 = 0xffe1;

const EXIF_HEADER = 'Exif\0\0';
const XMP_NAMESPACE = 'http://ns.adobe.com/xap/1.0/\0';

/** Exif tag numbers for the two fields worth writing. */
const TAG_ARTIST = 0x013b;
const TAG_COPYRIGHT = 0x8298;
const TYPE_ASCII = 2;

const utf8 = new TextEncoder();

export function copyrightNotice(rights: Rights): string {
  const year = rights.year ?? new Date().getFullYear();
  return (rights.notice ?? '').trim() || `© ${year} ${rights.artist.trim()}. All rights reserved.`;
}

/**
 * Builds the exif block: a tiff header, then one directory holding the two
 * strings and pointing at nothing after itself.
 *
 * The strings go in as utf-8. Exif calls these fields ASCII, which has no room
 * for the á in an artist's own name, and every reader worth the name treats
 * them as utf-8 in practice — the alternative is writing "Juanma Moreno
 * S?nchez" into his own photographs. The xmp block carries the same text in a
 * format that specifies utf-8 outright, so anything strict has a correct copy.
 */
function exifSegment(rights: Rights): Uint8Array {
  const fields = [
    { tag: TAG_ARTIST, value: rights.artist.trim() },
    { tag: TAG_COPYRIGHT, value: copyrightNotice(rights) },
  ];

  const encoded = fields.map(({ tag, value }) => ({
    tag,
    bytes: Uint8Array.from([...utf8.encode(value), 0]),
  }));

  const HEADER = 8;
  const ENTRY = 12;
  const directory = 2 + encoded.length * ENTRY + 4;
  // Anything longer than four bytes lives after the directory and is referenced
  // by an offset from the start of the tiff header.
  let cursor = HEADER + directory;
  const offsets = encoded.map(({ bytes }) => {
    const at = cursor;
    cursor += bytes.length;
    return bytes.length > 4 ? at : null;
  });

  const out = new Uint8Array(cursor);
  const view = new DataView(out.buffer);

  // Little-endian tiff header.
  out[0] = 0x49;
  out[1] = 0x49;
  view.setUint16(2, 42, true);
  view.setUint32(4, HEADER, true);

  view.setUint16(HEADER, encoded.length, true);
  encoded.forEach(({ tag, bytes }, index) => {
    const at = HEADER + 2 + index * ENTRY;
    view.setUint16(at, tag, true);
    view.setUint16(at + 2, TYPE_ASCII, true);
    view.setUint32(at + 4, bytes.length, true);
    const offset = offsets[index];
    if (offset === null) {
      out.set(bytes, at + 8);
    } else {
      view.setUint32(at + 8, offset, true);
      out.set(bytes, offset);
    }
  });
  // No second directory: there is no thumbnail to point at.
  view.setUint32(HEADER + 2 + encoded.length * ENTRY, 0, true);

  return concat(utf8.encode(EXIF_HEADER), out);
}

function xmpSegment(rights: Rights): Uint8Array {
  const artist = escapeXml(rights.artist.trim());
  const notice = escapeXml(copyrightNotice(rights));
  const statement = rights.webStatement?.trim()
    ? `\n        <xmpRights:WebStatement>${escapeXml(rights.webStatement.trim())}</xmpRights:WebStatement>`
    : '';

  const packet = `<?xpacket begin="﻿" id="W5M0MpCehiHzreSzNTczkc9d"?>
<x:xmpmeta xmlns:x="adobe:ns:meta/">
  <rdf:RDF xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#">
    <rdf:Description rdf:about=""
        xmlns:dc="http://purl.org/dc/elements/1.1/"
        xmlns:xmpRights="http://ns.adobe.com/xap/1.0/rights/">
      <dc:creator><rdf:Seq><rdf:li>${artist}</rdf:li></rdf:Seq></dc:creator>
      <dc:rights><rdf:Alt><rdf:li xml:lang="x-default">${notice}</rdf:li></rdf:Alt></dc:rights>
      <xmpRights:Marked>True</xmpRights:Marked>${statement}
    </rdf:Description>
  </rdf:RDF>
</x:xmpmeta>
<?xpacket end="w"?>`;

  return concat(utf8.encode(XMP_NAMESPACE), utf8.encode(packet));
}

/**
 * Returns the jpeg with the two segments inserted straight after the start
 * marker, which is where a reader expects them and where nothing else has to
 * move to make room.
 *
 * Given a file that is not a jpeg, or a name that is only whitespace, it hands
 * back what it was given: a studio that refused to save because a field was
 * empty would be worse than one that saves an unattributed file.
 */
export function withRights(jpeg: Uint8Array, rights: Rights): Uint8Array {
  if (!rights.artist?.trim()) return jpeg;
  if (jpeg.length < 2 || readUint16(jpeg, 0) !== SOI) return jpeg;

  const segments = [exifSegment(rights), xmpSegment(rights)].map(wrapApp1);
  const total = segments.reduce((sum, segment) => sum + segment.length, 0);

  const out = new Uint8Array(jpeg.length + total);
  out.set(jpeg.subarray(0, 2), 0);
  let at = 2;
  for (const segment of segments) {
    out.set(segment, at);
    at += segment.length;
  }
  out.set(jpeg.subarray(2), at);
  return out;
}

/** Marker, then a length that counts itself, then the payload. */
function wrapApp1(payload: Uint8Array): Uint8Array {
  const length = payload.length + 2;
  if (length > 0xffff) {
    throw new Error('That rights block is too long for one jpeg segment.');
  }
  const out = new Uint8Array(payload.length + 4);
  const view = new DataView(out.buffer);
  view.setUint16(0, APP1);
  view.setUint16(2, length);
  out.set(payload, 4);
  return out;
}

function readUint16(bytes: Uint8Array, at: number): number {
  return (bytes[at] << 8) | bytes[at + 1];
}

function concat(a: Uint8Array, b: Uint8Array): Uint8Array {
  const out = new Uint8Array(a.length + b.length);
  out.set(a, 0);
  out.set(b, a.length);
  return out;
}

function escapeXml(text: string): string {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}
