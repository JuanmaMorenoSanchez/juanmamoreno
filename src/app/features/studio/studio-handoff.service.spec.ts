import { TestBed } from '@angular/core/testing';
import { StudioHandoffService } from './studio-handoff.service';

/**
 * The contract between the two halves of the studio.
 *
 * It exists so the form below can offer to save or sign before anything has
 * been rendered, and ask for the photograph only when one of them is pressed —
 * which is what removed a row of buttons whose only job was to say "now do the
 * expensive part".
 */
describe('StudioHandoffService', () => {
  let handoff: StudioHandoffService;

  const prepared = () => ({
    file: new File([new Uint8Array([1, 2, 3])], 'painting.jpg', { type: 'image/jpeg' }),
    height: '140,5',
    width: '116',
  });

  beforeEach(() => {
    TestBed.configureTestingModule({});
    handoff = TestBed.inject(StudioHandoffService);
  });

  it('says nothing is ready until the corrector says so', () => {
    expect(handoff.canProduce()).toBe(false);
    expect(handoff.size()).toBeNull();
    expect(handoff.waiting()).toBeNull();
  });

  it('answers an ask with the photograph, once there is one', async () => {
    const asked = handoff.request();
    handoff.handOver(prepared());

    await expect(asked).resolves.toMatchObject({ height: '140,5', width: '116' });
  });

  it('answers an ask that cannot be met, rather than leaving it waiting', async () => {
    // A photograph too large to hold, or corners never placed. The form has to
    // find out; waiting for ever is the one thing it must not do.
    const asked = handoff.request();
    handoff.couldNot();

    await expect(asked).resolves.toBeNull();
  });

  it('answers every ask, not just the first', async () => {
    // Two presses are two asks. A flag would swallow the second and leave it
    // hanging, which is why this counts rather than flips.
    const first = handoff.request();
    const second = handoff.request();
    handoff.handOver(prepared());

    await expect(first).resolves.not.toBeNull();
    await expect(second).resolves.not.toBeNull();
  });

  it('counts the asks, so the corrector notices a second one', () => {
    const before = handoff.asksForPhotograph();
    void handoff.request();
    void handoff.request();

    expect(handoff.asksForPhotograph()).toBe(before + 2);
  });

  it('counts the clearings, so a second certificate clears the studio again', () => {
    // The same reason the asks are counted: a flag would be set already by the
    // time the second certificate was stored, and the corrector would keep the
    // photograph it had just finished with.
    expect(handoff.startsAgain()).toBe(0);
    handoff.startAgain();
    handoff.startAgain();

    expect(handoff.startsAgain()).toBe(2);
  });

  it('drops the photograph it is holding when the studio starts again', () => {
    handoff.handOver(prepared());

    handoff.startAgain();

    expect(handoff.waiting()).toBeNull();
  });

  it('hands the photograph over only once', () => {
    handoff.handOver(prepared());

    expect(handoff.take()).not.toBeNull();
    // Preparing a second and thinking better of it must not leave the first
    // lying about for the next mint to pick up.
    expect(handoff.take()).toBeNull();
  });
});
