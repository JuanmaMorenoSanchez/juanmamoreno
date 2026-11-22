import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { Question } from '@shared/components/confirm-dialog/confirm-dialog.component';
import { AskService } from '@shared/services/ask.service';
import { GasPriceService } from '@shared/services/gas-price.service';
import { MintGateComponent } from './mint-gate.component';

/**
 * The price of gas is the whole of what a certificate costs — the same one is a
 * few cents on a quiet morning and several pounds on a busy afternoon — so it
 * belongs beside the button rather than on a website somewhere else.
 */
describe('MintGateComponent', () => {
  /**
   * The question, asked in the page.
   *
   * It was `window.confirm`, which every one of these tests stubbed — and a
   * wallet app's own browser has no such dialog, so the real one returned false
   * at once and the press did nothing and said nothing. A stub of a thing that
   * does not exist on the device is a test that cannot fail.
   */
  const dialog = { answer: true, asked: [] as Question[] };

  beforeEach(() => {
    dialog.answer = true;
    dialog.asked = [];
  });

  const build = (gwei: number | null, unreachable = false) => {
    const price = signal(gwei);
    const stale = signal(unreachable);
    const limit = signal<number>(GasPriceService.LIMIT);
    /** Every ceiling handed to the service, nonsense included. */
    const asked: number[] = [];
    let watching = 0;

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [MintGateComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: AskService,
          useValue: {
            confirm: (question: Question) => {
              dialog.asked.push(question);
              return Promise.resolve(dialog.answer);
            },
          },
        },
        {
          provide: GasPriceService,
          useValue: {
            price,
            unreachable: stale,
            limit,
            affordable: () => price() !== null && (price() as number) <= limit(),
            // Records rather than judges: which numbers are worth keeping is the
            // service's business, and is tested there.
            setLimit: (asked_: number) => asked.push(asked_),
            watch: () => {
              watching += 1;
              return () => {
                watching -= 1;
              };
            },
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(MintGateComponent);
    fixture.detectChanges();
    return {
      fixture,
      price,
      limit,
      asked,
      host: fixture.nativeElement as HTMLElement,
      watching: () => watching,
    };
  };

  const button = (host: HTMLElement) => host.querySelector('button') as HTMLButtonElement;
  const limitInput = (host: HTMLElement) =>
    host.querySelector('.gate-limit input') as HTMLInputElement;

  it('lets a certificate be written when gas is cheap', () => {
    const { host } = build(0.06);

    expect(button(host).disabled).toBe(false);
    expect(host.textContent).toContain('0.06');
  });

  it('says so plainly and asks before it spends when gas is dear', () => {
    const { host } = build(1.4);

    expect(host.textContent).toContain('Too expensive!');
    expect(button(host).classList).toContain('gate-over');
    expect(button(host).textContent).toContain('Mint anyway');
  });

  it('warns at anything above the limit, not merely far above it', () => {
    const { host } = build(GasPriceService.LIMIT + 0.01);
    expect(button(host).classList).toContain('gate-over');
  });

  it('allows exactly the limit, with nothing to confirm', () => {
    const { host } = build(GasPriceService.LIMIT);
    expect(button(host).disabled).toBe(false);
    expect(button(host).classList).not.toContain('gate-over');
    expect(button(host).textContent).not.toContain('anyway');
  });

  it('refuses before the first price has arrived', () => {
    // Not knowing the price is not the same as the price being low, and a
    // button that works for a second before the answer lands can be pressed in
    // that second.
    const { host } = build(null);

    expect(button(host).disabled).toBe(true);
    expect(host.textContent).toContain('reading the gas price');
  });

  it('keeps showing the last price when the endpoint goes quiet, and says it is old', () => {
    // Clearing it would turn a moment's bad network into "unknown, do not mint".
    const { host } = build(0.05, true);

    expect(button(host).disabled).toBe(false);
    expect(host.textContent).toContain('last known');
  });

  it('can be stopped for reasons of its own as well', () => {
    const { fixture, host } = build(0.05);
    fixture.componentRef.setInput('disabled', true);
    fixture.detectChanges();

    expect(button(host).disabled).toBe(true);
  });

  it('reacts to the price changing under it', () => {
    const { fixture, host, price } = build(0.05);
    expect(button(host).classList).not.toContain('gate-over');

    price.set(2);
    fixture.detectChanges();

    expect(button(host).classList).toContain('gate-over');
    expect(host.textContent).toContain('Too expensive!');
  });

  /**
   * "Too expensive!" without the figure it is being judged against is a refusal
   * with no argument. The ceiling is shown beside it, in the input that moves
   * it, so seeing it and changing it are the same gesture.
   */
  it('shows the ceiling the price is judged against', () => {
    const { host } = build(1.4);

    expect(limitInput(host).valueAsNumber).toBe(GasPriceService.LIMIT);
  });

  it('hands a typed ceiling to the service', () => {
    const { host, asked } = build(1.4);
    const input = limitInput(host);

    input.value = '2';
    input.dispatchEvent(new Event('input'));

    expect(asked).toEqual([2]);
  });

  it('hands on an emptied input as NaN rather than as zero', () => {
    // Zero would be a ceiling nothing clears. The service ignores NaN, so the
    // ceiling that was there stands while he is still typing.
    const { host, asked } = build(1.4);
    const input = limitInput(host);

    input.value = '';
    input.dispatchEvent(new Event('input'));

    expect(asked).toHaveLength(1);
    expect(Number.isNaN(asked[0])).toBe(true);
  });

  it('stops warning about a dear price once the ceiling is above it', () => {
    const { fixture, host, limit } = build(1.4);
    expect(button(host).classList).toContain('gate-over');
    expect(host.textContent).toContain('Too expensive!');

    limit.set(2);
    fixture.detectChanges();

    expect(button(host).classList).not.toContain('gate-over');
    expect(host.textContent).not.toContain('Too expensive!');
  });

  it('stops asking for the price once it is gone', () => {
    const { fixture, watching } = build(0.05);
    expect(watching()).toBe(1);

    fixture.destroy();

    expect(watching()).toBe(0);
  });

  /**
   * The way past the ceiling, for when the answer is "I know, do it anyway".
   *
   * The same button, not a second one beside it: two controls for one
   * decision is the page asking twice. Asked for rather than a wider limit —
   * raising the ceiling to get past one expensive morning leaves it raised
   * for every quiet one afterwards, which is how a guard stops being one.
   */
  describe('insisting', () => {
    /** The one button, which is the way past the ceiling as well. */
    const insist = (host: HTMLElement): HTMLButtonElement | null =>
      host.querySelector('.gate-over');

    /** Every press that reached the parent. */
    const watchMint = (fixture: ReturnType<typeof build>['fixture']) => {
      let presses = 0;
      fixture.componentInstance.mint.subscribe(() => {
        presses += 1;
      });
      return () => presses;
    };

    it('asks nothing while the price is within the ceiling', () => {
      const { fixture, host } = build(0.05);
      const presses = watchMint(fixture);

      expect(insist(host)).toBeNull();
      button(host).click();

      expect(presses()).toBe(1);
      expect(dialog.asked).toEqual([]);
    });

    /** One decision, one control. The second button was the page asking twice. */
    it('is the same button, wearing the warning', () => {
      const { host } = build(2);

      expect(host.querySelectorAll('button')).toHaveLength(1);
      expect(insist(host)).toBe(button(host));
      expect(button(host).disabled).toBe(false);
    });

    it('names the action it is insisting on', () => {
      const { fixture, host } = build(2);
      fixture.componentRef.setInput('label', 'Correct on chain');
      fixture.detectChanges();

      expect(insist(host)!.textContent).toContain('Correct on chain anyway');
    });

    /**
     * One press, not a press that unlocks a press. The price and the ceiling
     * are already on the page, so a banner repeating them and a second button
     * to hunt for was the gate arguing with somebody who had read its
     * argument.
     */
    it('mints on the one press, once the confirmation is accepted', async () => {
      const { fixture, host } = build(2);
      const presses = watchMint(fixture);

      insist(host)!.click();
      await fixture.whenStable();

      expect(presses()).toBe(1);
      // The figure it is being judged against is in the question, because the
      // row it is pressed from does not show the price.
      const said = dialog.asked[0].body.join(' ');
      expect(said).toContain('2.000 gwei');
      expect(said).toContain(`limit of ${GasPriceService.LIMIT} gwei`);
    });

    it('does nothing at all when the confirmation is dismissed', async () => {
      const { fixture, host } = build(2);
      const presses = watchMint(fixture);
      dialog.answer = false;

      insist(host)!.click();
      await fixture.whenStable();
      fixture.detectChanges();

      expect(presses()).toBe(0);
      // Still there, still red: dismissing a question changes nothing.
      expect(insist(host)).not.toBeNull();
      expect(host.textContent).toContain('Too expensive!');
    });

    // A press that costs money is not reached because something else is wrong.
    it('is itself stopped when the gate is stopped for another reason', () => {
      const { fixture, host } = build(2);
      const presses = watchMint(fixture);
      fixture.componentRef.setInput('disabled', true);
      fixture.detectChanges();

      expect(insist(host)!.disabled).toBe(true);
      insist(host)!.click();

      expect(presses()).toBe(0);
    });

    // The ceiling is a standing limit, not a thing one expensive morning
    // widens: nothing here touches it.
    it('leaves the limit where it was', async () => {
      const { fixture, host, asked } = build(2);

      insist(host)!.click();
      await fixture.whenStable();

      expect(asked).toEqual([]);
    });
  });

  /**
   * The price is worth showing where the decision about it is made — the list
   * of certificates waiting to be signed — and there is nothing to press
   * there, because the contract has no mint function and signing is done in
   * OpenSea by hand.
   */
  it('shows the price with no button where there is nothing to press', () => {
    const { fixture, host } = build(0.05);
    fixture.componentRef.setInput('withButton', false);
    fixture.detectChanges();

    expect(host.querySelector('.gate-go')).toBeNull();
    expect(host.textContent).toContain('gwei');
    expect(host.querySelector('.gate-limit')).not.toBeNull();
  });

  /**
   * The price of gas is the same figure on every row of a list, so it is
   * stated once above them. Four copies of "Too expensive! 0.195 gwei" on
   * one page was it shouting a single fact.
   */
  it('can keep the button and leave the price to be said once elsewhere', () => {
    const { fixture, host } = build(2);
    fixture.componentRef.setInput('withPrice', false);
    fixture.detectChanges();

    expect(host.querySelector('.gate-go')).not.toBeNull();
    expect(host.querySelector('.gate-limit')).toBeNull();
    expect(host.textContent).not.toContain('gwei');
    // The warning travels with the button, since the row shows no price of
    // its own: without it a dear morning would look like a quiet one here.
    expect(host.querySelector('.gate-over')).not.toBeNull();
  });

  /**
   * The arrangement that said nothing at all.
   *
   * A row of a queue states no price, and with no price yet the button is hard
   * disabled — so the row was a Mint button that could not be pressed, with
   * nothing anywhere explaining why. On a phone a disabled outline button is
   * barely distinguishable from a live one, and `cursor: not-allowed` means
   * nothing to a finger. That is what "the UI does not do anything" looks like
   * from the inside, and it is not a broken button.
   */
  describe('a button with no price beside it', () => {
    const quiet = () => {
      const { fixture, host } = build(null);
      fixture.componentRef.setInput('withPrice', false);
      fixture.detectChanges();
      return host;
    };

    it('says it is still waiting for the price', () => {
      const host = quiet();

      expect(button(host).disabled).toBe(true);
      expect(host.textContent).toContain('reading the gas price');
    });

    it('says so when the price could not be read at all', () => {
      const { fixture, host } = build(null, true);
      fixture.componentRef.setInput('withPrice', false);
      fixture.detectChanges();

      expect(button(host).disabled).toBe(true);
      expect(host.textContent).toContain('could not be read');
    });

    // Once there is a price the button speaks for itself.
    it('says nothing extra once the price is known', () => {
      const { fixture, host } = build(0.05);
      fixture.componentRef.setInput('withPrice', false);
      fixture.detectChanges();

      expect(button(host).disabled).toBe(false);
      expect(host.textContent).not.toContain('gas price');
    });
  });
});
