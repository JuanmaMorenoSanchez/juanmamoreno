import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AtelierService, Prices } from './atelier.service';
import { CostComponent } from './cost.component';

@Component({
  standalone: true,
  imports: [CostComponent],
  template: `<button>Find layers <app-cost operation="segment" /></button>
    <button>Many <app-cost operation="edit" [calls]="4" /></button>`,
})
class HostComponent {}

describe('CostComponent', () => {
  let fixture: ComponentFixture<HostComponent>;
  let atelier: AtelierService;

  const priced: Prices = {
    prices: {
      segment: { operation: 'segment', usd: 0.005, what: 'one pass' },
      inpaint: { operation: 'inpaint', usd: 0.04, what: 'one fill' },
      edit: { operation: 'edit', usd: 0.04, what: 'one variant' },
    },
    ceiling: 5,
    spent: 0,
    left: 5,
    configured: true,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HostComponent] });
    atelier = TestBed.inject(AtelierService);
    fixture = TestBed.createComponent(HostComponent);
  });

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }

  /**
   * The gap between pressing a button and finding out what it cost is
   * otherwise a month. Nothing in the atelier may be pressed without the price
   * being on the thing that presses it.
   */
  it('writes the price beside the button', () => {
    atelier.prices.set(priced);
    fixture.detectChanges();

    expect(text()).toContain('~$0.005');
  });

  /**
   * A badge reading `$0.00` before the answer came back would be worse than
   * no badge: it reads as free.
   */
  it('says nothing at all until it knows the price', () => {
    fixture.detectChanges();

    expect(text()).not.toContain('$');
  });

  it('counts a press that makes several calls', () => {
    atelier.prices.set(priced);
    fixture.detectChanges();

    expect(text()).toContain('~$0.16');
  });

  /** Where a button has stopped working, it says so where it stopped. */
  it('marks a price the day can no longer cover', () => {
    atelier.prices.set({ ...priced, spent: 4.99, left: 0.01 });
    fixture.detectChanges();

    const badges = fixture.nativeElement.querySelectorAll('.cost');
    const over = [...badges].filter((badge: Element) => badge.classList.contains('cost-over'));

    // The 16-cent one is beyond what is left; the half-penny one is not.
    expect(over).toHaveLength(1);
    expect(over[0].textContent?.trim()).toBe('~$0.16');
  });

  it('explains what the money buys', () => {
    atelier.prices.set(priced);
    fixture.detectChanges();

    const badge = fixture.nativeElement.querySelector('.cost') as HTMLElement;
    expect(badge.getAttribute('title')).toContain('one pass');
  });
});
