import { readFileSync } from 'node:fs';
import { isRawPhotograph, largestEmbeddedJpeg } from './raw-preview';

/**
 * Built to the shape of a NEF — a TIFF header, the camera's menu thumbnail,
 * a stretch standing in for sensor data, then the full-size preview — because
 * that is the arrangement this has to find its way through, and a real raw is
 * forty megabytes of it.
 */
const rawFile = () => new Uint8Array(readFileSync('C:/Users/User/AppData/Local/Temp/fake.nef'));

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
    expect(isRawPhotograph('painting.jpg', 'image/jpeg')).toBe(false);
    expect(isRawPhotograph('painting.png', 'image/png')).toBe(false);
  });

  it('finds the full-size photograph, not the menu thumbnail', () => {
    // Both are inside; the small one is what a camera shows in its own menus
    // and is no use as a reproduction.
    const found = largestEmbeddedJpeg(rawFile());

    expect(isJpeg(found)).toBe(true);
    expect(found!.length).toBeGreaterThan(5000);
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
