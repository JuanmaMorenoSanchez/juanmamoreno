import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { GasPriceService } from '@shared/services/gas-price.service';
import { MintGateComponent } from './mint-gate.component';

/**
 * The price of gas is the whole of what a certificate costs — the same one is a
 * few cents on a quiet morning and several pounds on a busy afternoon — so it
 * belongs beside the button rather than on a website somewhere else.
 */
describe('MintGateComponent', () => {
  const build = (gwei: number | null, unreachable = false) => {
    const price = signal(gwei);
    const stale = signal(unreachable);
    let watching = 0;

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [MintGateComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: GasPriceService,
          useValue: {
            price,
            unreachable: stale,
            affordable: () => price() !== null && (price() as number) <= 0.7,
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
      host: fixture.nativeElement as HTMLElement,
      watching: () => watching,
    };
  };

  const button = (host: HTMLElement) => host.querySelector('button') as HTMLButtonElement;

  it('lets a certificate be written when gas is cheap', () => {
    const { host } = build(0.06);

    expect(button(host).disabled).toBe(false);
    expect(host.textContent).toContain('0.06');
  });

  it('says so plainly and refuses when gas is dear', () => {
    const { host } = build(1.4);

    expect(button(host).disabled).toBe(true);
    expect(host.textContent).toContain('Too expensive!');
  });

  it('refuses at anything above the limit, not merely far above it', () => {
    const { host } = build(0.71);
    expect(button(host).disabled).toBe(true);
  });

  it('allows exactly the limit', () => {
    const { host } = build(0.7);
    expect(button(host).disabled).toBe(false);
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
    expect(button(host).disabled).toBe(false);

    price.set(2);
    fixture.detectChanges();

    expect(button(host).disabled).toBe(true);
    expect(host.textContent).toContain('Too expensive!');
  });

  it('stops asking for the price once it is gone', () => {
    const { fixture, watching } = build(0.05);
    expect(watching()).toBe(1);

    fixture.destroy();

    expect(watching()).toBe(0);
  });
});
