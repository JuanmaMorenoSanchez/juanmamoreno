import { isRawPhotograph, largestEmbeddedJpeg } from './raw-preview';

/**
 * A file with the shape of a NEF, built here rather than read from disk.
 *
 * The first version of this read a fixture out of the machine's temp directory,
 * which passed on the machine that wrote it and nowhere else — including the
 * deploy, where it failed. A test that depends on something outside the
 * repository is a test that says nothing about the repository.
 *
 * What it has to be is the shape a raw file has: a TIFF header, the camera's
 * menu thumbnail, a stretch standing in for sensor data, then the full-size
 * preview. What is under test is finding the right byte range among those, so
 * the blocks need the markers a JPEG opens and closes with and nothing else.
 * That the range decodes was measured separately, in a browser, against the
 * artist's own 21.4 MB NEF: three embedded JPEGs, the largest 6016 × 4000.
 */
const jpegOfSize = (bytes: number, fill: number): number[] => {
  const block = new Array<number>(bytes).fill(fill);
  block[0] = 0xff;
  block[1] = 0xd8;
  block[2] = 0xff;
  block[3] = 0xe1;
  block[bytes - 2] = 0xff;
  block[bytes - 1] = 0xd9;
  return block;
};

const THUMBNAIL_BYTES = 4_000;
const FULL_SIZE_BYTES = 40_000;

const rawFile = () =>
  new Uint8Array([
    0x4d,
    0x4d,
    0x00,
    0x2a,
    0x00,
    0x00,
    0x00,
    0x08,
    ...jpegOfSize(THUMBNAIL_BYTES, 0x11),
    ...new Array<number>(20_000).fill(0x7f),
    ...jpegOfSize(FULL_SIZE_BYTES, 0x22),
    ...new Array<number>(1_024).fill(0x00),
  ]);

const isJpeg = (bytes: Uint8Array | null) =>
  !!bytes &&
  bytes[0] === 0xff &&
  bytes[1] === 0xd8 &&
  bytes[bytes.length - 2] === 0xff &&
  bytes[bytes.length - 1] === 0xd9;

describe('the photograph inside a raw file', () => {
  it('knows which files a browser will refuse to open', () => {
    expect(isRawPhotograph('DSC_0195.NEF')).toBe(true);
    expect(isRawPhotograph('DSC_0195.nef')).toBe(true);
    expect(isRawPhotograph('shot.cr2')).toBe(true);
    expect(isRawPhotograph('shot.arw')).toBe(true);
    expect(isRawPhotograph('painting.jpg')).toBe(false);
    expect(isRawPhotograph('painting.png')).toBe(false);
    expect(isRawPhotograph('not a photograph at all.pdf')).toBe(false);
  });

  it('does not ask the operating system what it thinks', () => {
    // It asked, once, meaning to be careful — and Windows answered `image/nef`,
    // which was read as a claim the browser could open the file. The artist got
    // "that file could not be read as an image" for a perfectly good NEF.
    // Whatever any registry says, a file named .nef is a raw.
    expect(isRawPhotograph('DSC_0101.NEF')).toBe(true);
    expect(isRawPhotograph('  DSC_0101.NEF  ')).toBe(true);
  });

  it('finds the full-size photograph, not the menu thumbnail', () => {
    // Both are inside; the small one is what a camera shows in its own menus
    // and is no use as a reproduction.
    const found = largestEmbeddedJpeg(rawFile());

    expect(isJpeg(found)).toBe(true);
    expect(found!.length).toBe(FULL_SIZE_BYTES);
  });

  it('gives back a whole JPEG, opening and closing markers included', () => {
    // Handed straight to the browser to decode, so it has to be complete.
    const found = largestEmbeddedJpeg(rawFile())!;

    expect(found[0]).toBe(0xff);
    expect(found[1]).toBe(0xd8);
    expect(found[found.length - 2]).toBe(0xff);
    expect(found[found.length - 1]).toBe(0xd9);
  });

  it('says so rather than guessing when there is no photograph inside', () => {
    const notARaw = new Uint8Array(200000).fill(0x42);

    expect(largestEmbeddedJpeg(notARaw)).toBeNull();
  });

  it('ignores a stray marker that could not be a picture', () => {
    // Whether what is found is big enough to reproduce a painting is decided
    // after decoding, where the dimensions can be read. This only skips what
    // could not be a picture at all.
    const stray = new Uint8Array(3000);
    stray.set([0xff, 0xd8, 0xff], 100);
    stray.set([0xff, 0xd9], 400);

    expect(largestEmbeddedJpeg(stray)).toBeNull();
  });
});
