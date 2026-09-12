import { PhotoBrush } from './photo-brush';

/** The mask, the two settings, and which way the next stroke goes. */
describe('PhotoBrush', () => {
  const target = { width: 400, height: 300 };

  beforeEach(() => localStorage.clear());

  it('starts with nothing selected, which means everywhere', () => {
    expect(new PhotoBrush().hasArea()).toBe(false);
  });

  it('selects where it is put', () => {
    const brush = new PhotoBrush();

    brush.dab({ x: 200, y: 150 }, target, false);

    expect(brush.hasArea()).toBe(true);
  });

  it('takes it back again', () => {
    const brush = new PhotoBrush();
    brush.dab({ x: 200, y: 150 }, target, false);

    brush.dab({ x: 200, y: 150 }, target, true);
    brush.dab({ x: 200, y: 150 }, target, true);

    expect(brush.hasArea()).toBe(false);
  });

  it('unselects everything at once', () => {
    const brush = new PhotoBrush();
    brush.dab({ x: 200, y: 150 }, target, false);

    brush.clear();

    expect(brush.hasArea()).toBe(false);
  });

  it('reverses whichever tool is in hand while shift is held', () => {
    const brush = new PhotoBrush();

    expect(brush.erases(false)).toBe(false);
    expect(brush.erases(true)).toBe(true);

    brush.use('erase');
    expect(brush.erases(false)).toBe(true);
    // The other one, for as long as the key is down.
    expect(brush.erases(true)).toBe(false);
  });

  it('turns brushing on when a tool is picked up', () => {
    const brush = new PhotoBrush();

    brush.use('erase');

    // Choosing a brush and then finding the photograph does not answer is a
    // fault with nothing to show for it.
    expect(brush.selecting()).toBe(true);
  });

  it('keeps the size within what the slider offers', () => {
    const brush = new PhotoBrush();

    brush.setRadius(500);
    expect(brush.radius()).toBe(60);
    brush.setRadius(0);
    expect(brush.radius()).toBe(1);
    brush.setSoftness(-20);
    expect(brush.softness()).toBe(0);
  });

  it('remembers the size between sessions', () => {
    new PhotoBrush().setRadius(17);

    expect(new PhotoBrush().radius()).toBe(17);
  });
});
