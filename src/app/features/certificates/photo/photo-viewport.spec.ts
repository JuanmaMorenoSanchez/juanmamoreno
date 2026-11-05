import { MAX_ZOOM, PhotoViewport, isTypingInto } from './photo-viewport';

/**
 * None of this could be asked before the viewport came out of the component:
 * it needed a photograph, a canvas and a real pointer. It needs a fake
 * scrolling box now.
 */
describe('PhotoViewport', () => {
  let box: { scrollLeft: number; scrollTop: number };
  let view: PhotoViewport;

  const build = (hasPhotograph = true) => {
    box = { scrollLeft: 0, scrollTop: 0 };
    view = new PhotoViewport(() => box as unknown as HTMLElement, () => hasPhotograph);
  };

  const space = (target: unknown = null) =>
    ({ code: 'Space', target, preventDefault: vi.fn() }) as unknown as KeyboardEvent;

  const at = (x: number, y: number) =>
    ({
      clientX: x,
      clientY: y,
      pointerId: 1,
      target: { setPointerCapture: vi.fn() },
      preventDefault: vi.fn(),
    }) as unknown as PointerEvent;

  beforeEach(() => build());

  describe('the magnification', () => {
    it('starts at the whole photograph', () => {
      expect(view.zoom()).toBe(1);
    });

    it('will not go below one or above the limit', () => {
      view.setZoom(0.2);
      expect(view.zoom()).toBe(1);

      view.setZoom(99);
      expect(view.zoom()).toBe(MAX_ZOOM);
    });

    it('treats a value that is not a number as the whole photograph', () => {
      view.setZoom(Number.NaN);
      expect(view.zoom()).toBe(1);
    });

    it('puts the hand away when zoomed back out, since there is nowhere to pan', () => {
      view.setZoom(2);
      view.takeSpace(space());
      expect(view.panning()).toBe(true);

      view.setZoom(1);
      expect(view.panning()).toBe(false);
    });
  });

  describe('claiming the space bar', () => {
    it('takes it when there is a magnified photograph to pan', () => {
      view.setZoom(2);
      const event = space();

      view.takeSpace(event);

      expect(view.panning()).toBe(true);
      // Or the page jumps a screenful down under the picture being panned.
      expect(event.preventDefault).toHaveBeenCalled();
    });

    it('leaves it alone when the photograph is not magnified', () => {
      const event = space();
      view.takeSpace(event);

      expect(view.panning()).toBe(false);
      expect(event.preventDefault).not.toHaveBeenCalled();
    });

    it('leaves it alone when there is no photograph at all', () => {
      build(false);
      view.setZoom(2);

      view.takeSpace(space());

      expect(view.panning()).toBe(false);
    });

    /** The one real cost of claiming it: a caption being typed keeps it. */
    it('leaves it alone while something is being typed into', () => {
      view.setZoom(2);

      view.takeSpace(space({ tagName: 'TEXTAREA' }));

      expect(view.panning()).toBe(false);
    });

    it('gives it back on the key coming up', () => {
      view.setZoom(2);
      view.takeSpace(space());

      view.releaseSpace(space());

      expect(view.panning()).toBe(false);
    });

    it('ignores a key that is not the space bar', () => {
      view.setZoom(2);
      view.takeSpace({ code: 'KeyA', target: null, preventDefault: vi.fn() } as never);

      expect(view.panning()).toBe(false);
    });
  });

  describe('the hand', () => {
    /** The distance dragged is the distance the painting moves, the other way. */
    it('moves the view the opposite way to the pointer, exactly', () => {
      box.scrollLeft = 100;
      box.scrollTop = 50;
      view.startPan(at(200, 200));

      view.pan(at(180, 230));

      expect(box.scrollLeft).toBe(120);
      expect(box.scrollTop).toBe(20);
    });

    it('does nothing when the view was never grabbed', () => {
      view.pan(at(10, 10));

      expect(box.scrollLeft).toBe(0);
      expect(box.scrollTop).toBe(0);
    });

    /**
     * A pointer-up ends the drag, not the hand: the space bar is held, so the
     * next drag pans again. Putting the hand away here dropped out of hand mode
     * on every pan.
     */
    it('keeps the hand after a drag ends while the key is still down', () => {
      view.setZoom(2);
      view.takeSpace(space());
      view.startPan(at(0, 0));

      view.releaseGrab();

      expect(view.panning()).toBe(true);
      // The grab itself is gone, so a stray move does not drag the view.
      view.pan(at(50, 50));
      expect(box.scrollLeft).toBe(0);
    });

    it('forgets the grab and the hand on losing the window', () => {
      view.setZoom(2);
      view.takeSpace(space());
      view.startPan(at(0, 0));

      view.stopPanning();

      expect(view.panning()).toBe(false);
      view.pan(at(50, 50));
      expect(box.scrollLeft).toBe(0);
    });
  });

  it('goes back to the whole photograph with the hand away', () => {
    view.setZoom(3);
    view.takeSpace(space());

    view.reset();

    expect(view.zoom()).toBe(1);
    expect(view.panning()).toBe(false);
  });

  describe('where the space bar already means something', () => {
    it('knows the fields that keep it', () => {
      expect(isTypingInto({ tagName: 'TEXTAREA' } as never)).toBe(true);
      expect(isTypingInto({ tagName: 'SELECT' } as never)).toBe(true);
      expect(isTypingInto({ tagName: 'INPUT', type: 'text' } as never)).toBe(true);
      expect(isTypingInto({ isContentEditable: true, tagName: 'DIV' } as never)).toBe(true);
    });

    it('knows the ones that do not, where Enter does the same job', () => {
      expect(isTypingInto({ tagName: 'INPUT', type: 'range' } as never)).toBe(false);
      expect(isTypingInto({ tagName: 'INPUT', type: 'button' } as never)).toBe(false);
      expect(isTypingInto({ tagName: 'BUTTON' } as never)).toBe(false);
      expect(isTypingInto(null)).toBe(false);
    });
  });
});
