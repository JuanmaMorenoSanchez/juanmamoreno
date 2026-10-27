import { justBeforeTheEnd, lastFrame } from './last-frame';

/**
 * jsdom decodes nothing, so the video and the canvas are stood in for.
 *
 * What that still catches is everything that was actually wrong: seeking past
 * the end, drawing before the seek has landed, drawing at the element's layout
 * size instead of the clip's, and waiting forever on a clip with no duration.
 */
interface FakeVideo {
  muted: boolean;
  preload: string;
  src: string;
  duration: number;
  videoWidth: number;
  videoHeight: number;
  currentTime: number;
  drawnAt: number | null;
  letGo: boolean;
}

function fakeClip(about: Partial<FakeVideo> = {}) {
  const listeners = new Map<string, (() => void)[]>();
  const video = {
    muted: false,
    preload: '',
    src: '',
    duration: 3,
    videoWidth: 832,
    videoHeight: 480,
    currentTime: 0,
    drawnAt: null as number | null,
    letGo: false,
    ...about,

    addEventListener(named: string, call: () => void) {
      listeners.set(named, [...(listeners.get(named) ?? []), call]);
      // The two the reader waits for, answered on the next tick so the order
      // is the real one: it must have asked before it is told.
      if (named === 'loadeddata') setTimeout(call, 0);
      if (named === 'seeked') setTimeout(call, 0);
    },
    removeEventListener() {
      /* nothing is asserted on removal; the element is thrown away */
    },
    removeAttribute() {
      video.letGo = true;
    },
    load() {
      /* a real one frees the decoder here */
    },
  };
  return video;
}

function fakeCanvas(video: { currentTime: number; drawnAt: number | null }) {
  const canvas = {
    width: 0,
    height: 0,
    getContext: () => ({
      drawImage: () => {
        // When the frame was taken, which is the thing worth knowing.
        video.drawnAt = video.currentTime;
      },
    }),
    toBlob: (back: (blob: Blob | null) => void) => back(new Blob(['png'], { type: 'image/png' })),
  };
  return canvas;
}

function standingIn(video: ReturnType<typeof fakeClip>) {
  const canvas = fakeCanvas(video);
  const made = vi
    .spyOn(document, 'createElement')
    .mockImplementation(((what: string) => (what === 'video' ? video : canvas)) as never);
  return { canvas, made };
}

describe('justBeforeTheEnd', () => {
  it('lands inside the last frame rather than past it', () => {
    // `currentTime = duration` is beyond the final frame, and browsers
    // disagree about whether to clamp back into it or hand over a blank.
    expect(justBeforeTheEnd(3)).toBeLessThan(3);
    expect(justBeforeTheEnd(3)).toBeGreaterThan(3 - 1 / 24);
  });

  it('never asks for a time before the clip starts', () => {
    expect(justBeforeTheEnd(0.01)).toBe(0);
  });
});

describe('lastFrame', () => {
  afterEach(() => vi.restoreAllMocks());

  it('gives back the frame as a png', async () => {
    const video = fakeClip();
    standingIn(video);

    const frame = await lastFrame('blob:clip');
    expect(frame.type).toBe('image/png');
  });

  it('draws the end of the clip, not the beginning', async () => {
    const video = fakeClip({ duration: 3 });
    standingIn(video);

    await lastFrame('blob:clip');
    // The whole point: the next clip has to carry on from where this one
    // stopped, and starting it from frame one would film the same seconds again.
    expect(video.drawnAt).toBeGreaterThan(2.9);
  });

  it('draws at the clip own pixel size', async () => {
    const video = fakeClip({ videoWidth: 672, videoHeight: 832 });
    const { canvas } = standingIn(video);

    await lastFrame('blob:clip');
    expect([canvas.width, canvas.height]).toEqual([672, 832]);
  });

  it('refuses a clip that does not say how long it is', async () => {
    // An mp4 whose header never arrived. The seek would be to NaN and the
    // event waited for would never come — a page sitting there with no message.
    const video = fakeClip({ duration: Infinity });
    standingIn(video);

    await expect(lastFrame('blob:clip')).rejects.toThrow('how long it is');
  });

  it('lets go of the decoder, even when it failed', async () => {
    const video = fakeClip({ duration: Infinity });
    standingIn(video);

    await lastFrame('blob:clip').catch(() => undefined);
    expect(video.letGo).toBe(true);
  });

  it('mutes the element, because an unmuted one may not be allowed to seek', async () => {
    const video = fakeClip();
    standingIn(video);

    await lastFrame('blob:clip');
    expect(video.muted).toBe(true);
  });
});
