/**
 * The last frame of a clip, as a picture.
 *
 * This is how a clip becomes something the atelier can work from. The engine
 * takes an image and a sentence; it has never taken a video, and asking it to
 * answered *that file is not an image* with the mp4 already uploaded. But a
 * clip's final frame is exactly what `scenes` hands to the scene after it
 * inside a single run — so continuing a kept clip hours later is the same
 * operation, done to a file off the shelf instead of to one in memory.
 *
 * Decoded here rather than on the engine. The bytes are already in the browser
 * — the shelf fetched them to draw the thumbnail — and a video element is a
 * decoder the page already has.
 */

/**
 * How far before the end to seek, in seconds.
 *
 * Not the duration itself. `currentTime = duration` is past the last frame and
 * browsers disagree about what to do with it: some clamp back into the frame,
 * some give a blank canvas. A fiftieth of a second lands inside the final
 * frame of anything up to 50fps, and a clip from this engine runs at 24.
 */
const NEARLY_THE_END = 0.02;

/** Where to seek to, for a clip of this length. */
export function justBeforeTheEnd(duration: number): number {
  return Math.max(0, duration - NEARLY_THE_END);
}

/** The frame a continuation should start from, as a png. */
export async function lastFrame(clip: string): Promise<Blob> {
  const video = document.createElement('video');
  // Muted and without controls: this one is never seen or heard. Autoplay
  // policy blocks a seek on an unmuted element in some browsers, which looked
  // like a clip that would not load.
  video.muted = true;
  video.preload = 'auto';
  video.src = clip;

  try {
    await happens(video, 'loadeddata');

    // Said rather than hung on. An mp4 whose header never arrived has a
    // duration of Infinity, `currentTime` becomes NaN, and the seek we are
    // about to wait for never completes — so the page would have sat there
    // with no message and nothing to press.
    if (!Number.isFinite(video.duration) || video.duration <= 0) {
      throw new Error('that clip does not say how long it is, so its last frame cannot be found');
    }

    video.currentTime = justBeforeTheEnd(video.duration);
    await happens(video, 'seeked');

    const canvas = document.createElement('canvas');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const paper = canvas.getContext('2d');
    if (!paper) throw new Error('this browser would not give a canvas to draw the frame on');
    paper.drawImage(video, 0, 0);

    return await new Promise<Blob>((frame, no) => {
      canvas.toBlob(
        (blob) => (blob ? frame(blob) : no(new Error('the frame could not be made a picture'))),
        // A png, because this is going into a model as a starting point and a
        // jpeg would put its own artefacts in the frame the next clip is
        // built on.
        'image/png'
      );
    });
  } finally {
    // Let go of the decoder. Without it the element holds the whole clip for
    // as long as the page is open, and the shelf has several.
    video.removeAttribute('src');
    video.load();
  }
}

/**
 * How big a clip is, by loading it and asking.
 *
 * The box that filmed a clip reports its shape, because a video cannot be
 * measured by loading it into an `Image` and decoding one costs megabytes for
 * two numbers. But a clip recovered from the engine's folder has no box behind
 * it any more — the run it belonged to is over — and the shelf needs its size
 * to say which copy of the painting it was made from.
 *
 * `metadata` is enough: the dimensions are in the header and no frame has to
 * be decoded.
 */
export async function clipSize(clip: Blob): Promise<{ width: number; height: number }> {
  const url = URL.createObjectURL(clip);
  const video = document.createElement('video');
  video.muted = true;
  video.preload = 'metadata';
  video.src = url;

  try {
    await happens(video, 'loadedmetadata');
    return { width: video.videoWidth, height: video.videoHeight };
  } finally {
    URL.revokeObjectURL(url);
    video.removeAttribute('src');
    video.load();
  }
}

/** The next one of an event, or the element's own complaint about why not. */
function happens(video: HTMLVideoElement, named: string): Promise<void> {
  return new Promise<void>((done, no) => {
    const over = () => {
      video.removeEventListener(named, fine);
      video.removeEventListener('error', bad);
    };
    const fine = () => {
      over();
      done();
    };
    const bad = () => {
      over();
      no(new Error('that clip could not be decoded in this browser'));
    };
    video.addEventListener(named, fine, { once: true });
    video.addEventListener('error', bad, { once: true });
  });
}
