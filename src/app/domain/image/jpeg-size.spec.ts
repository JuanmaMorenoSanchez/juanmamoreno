import { bytesInDataUri, jpegSize, ratioOfDataUri } from './jpeg-size';

/**
 * A JPEG's header, hand-built: start of image, one segment to walk past, then
 * the frame header carrying the dimensions.
 */
function jpegHeader(width: number, height: number, marker = 0xc0): Uint8Array {
  return new Uint8Array([
    0xff,
    0xd8,
    // An APP0 segment of eight bytes, there to be stepped over rather than read.
    0xff,
    0xe0,
    0x00,
    0x08,
    0x4a,
    0x46,
    0x49,
    0x46,
    0x00,
    0x00,
    // The frame: length, precision, height, width, and the rest unread.
    0xff,
    marker,
    0x00,
    0x11,
    0x08,
    (height >> 8) & 0xff,
    height & 0xff,
    (width >> 8) & 0xff,
    width & 0xff,
    0x03,
    0x01,
    0x22,
    0x00,
  ]);
}

const asDataUri = (bytes: Uint8Array) =>
  'data:image/jpeg;base64,' + btoa(String.fromCharCode(...bytes));

describe('jpegSize', () => {
  it('reads the dimensions out of the frame header', () => {
    expect(jpegSize(jpegHeader(80, 82))).toEqual({ width: 80, height: 82 });
  });

  /** The thumbnail carried inside certificate 152, to four decimal places. */
  it('gives the photograph the shape the painting is not', () => {
    const ratio = jpegSize(jpegHeader(80, 82))!;
    expect(ratio.width / ratio.height).toBeCloseTo(0.9756, 4);
  });

  // Progressive jpegs carry SOF2 instead, and are the same shape either way.
  it('reads a progressive frame as well as a baseline one', () => {
    expect(jpegSize(jpegHeader(112, 168, 0xc2))).toEqual({ width: 112, height: 168 });
  });

  // 0xc4 is a Huffman table, not a frame, however much it looks like one.
  it('walks past a marker in the frame range that is not a frame', () => {
    const bytes = new Uint8Array([
      0xff,
      0xd8,
      0xff,
      0xc4,
      0x00,
      0x06,
      0x00,
      0x01,
      0x02,
      0x03,
      ...jpegHeader(200, 100).slice(2),
    ]);
    expect(jpegSize(bytes)).toEqual({ width: 200, height: 100 });
  });

  it('answers with nothing for something that is not a jpeg', () => {
    expect(jpegSize(new Uint8Array([0x89, 0x50, 0x4e, 0x47]))).toBeNull();
    expect(jpegSize(new Uint8Array([]))).toBeNull();
  });

  /**
   * A segment claiming no length would leave the walk standing still, which is
   * a hang rather than a wrong answer — the worse of the two.
   */
  it('gives up on a segment that claims no length', () => {
    expect(
      jpegSize(new Uint8Array([0xff, 0xd8, 0xff, 0xe0, 0x00, 0x00, 0, 0, 0, 0, 0, 0]))
    ).toBeNull();
  });

  it('refuses a frame that says it is nothing across', () => {
    expect(jpegSize(jpegHeader(0, 82))).toBeNull();
  });
});

describe('bytesInDataUri', () => {
  it('reads the bytes of a base64 data uri', () => {
    expect(bytesInDataUri(asDataUri(jpegHeader(80, 82)))?.[0]).toBe(0xff);
  });

  it('answers with nothing for anything else', () => {
    expect(bytesInDataUri('https://example.test/a.jpg')).toBeNull();
    // Legal, but not what anything here produces, so not guessed at.
    expect(bytesInDataUri('data:image/jpeg,%FF%D8')).toBeNull();
    expect(bytesInDataUri('data:image/jpeg;base64,not valid base64!!')).toBeNull();
  });
});

describe('ratioOfDataUri', () => {
  it('measures a thumbnail without decoding it', () => {
    expect(ratioOfDataUri(asDataUri(jpegHeader(80, 82)))).toBeCloseTo(0.9756, 4);
  });

  it('answers with nothing when there is nothing to measure', () => {
    expect(ratioOfDataUri(undefined)).toBeNull();
    expect(ratioOfDataUri('https://example.test/a.jpg')).toBeNull();
  });
});
