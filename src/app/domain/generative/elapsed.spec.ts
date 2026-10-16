import { elapsed } from './elapsed';

/**
 * A duration, said the way a person says it.
 *
 * The boundaries are the whole of this: 59 to 60 and 3599 to 3600 are where a
 * format like this goes wrong, and looking at a page tells you about neither.
 */
describe('elapsed', () => {
  it('counts seconds while there are only seconds', () => {
    expect(elapsed(0)).toBe('0s');
    expect(elapsed(47)).toBe('47s');
    expect(elapsed(59)).toBe('59s');
  });

  it('turns over to minutes at a minute', () => {
    expect(elapsed(60)).toBe('1m');
    expect(elapsed(61)).toBe('1m 01s');
    expect(elapsed(1247)).toBe('20m 47s');
  });

  it('pads the seconds, so the number does not jump about as it counts', () => {
    expect(elapsed(69)).toBe('1m 09s');
  });

  it('turns over to hours at an hour, and drops the seconds there', () => {
    // Nobody waiting on a two-hour clip cares about the odd seven seconds,
    // and the number only gets longer for them.
    expect(elapsed(3599)).toBe('59m 59s');
    expect(elapsed(3600)).toBe('1h');
    expect(elapsed(3660)).toBe('1h 01m');
    expect(elapsed(7447)).toBe('2h 04m');
  });

  it('says nothing silly about a number that is not one', () => {
    expect(elapsed(Number.NaN)).toBe('0s');
    expect(elapsed(-5)).toBe('0s');
    expect(elapsed(Number.POSITIVE_INFINITY)).toBe('0s');
  });

  it('rounds rather than truncating, since the engine sends fractions', () => {
    expect(elapsed(59.6)).toBe('1m');
    expect(elapsed(0.4)).toBe('0s');
  });
});
