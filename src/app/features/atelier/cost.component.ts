import { ChangeDetectionStrategy, Component, computed, inject, input } from '@angular/core';
import { AtelierOperation, AtelierService } from './atelier.service';

/**
 * What this press costs, written beside the thing that presses it.
 *
 * Every button in the atelier spends real money, and the gap between pressing
 * one and finding out is otherwise a month. So the price rides on the button
 * itself — read from the api, never typed into a template, so a price that
 * moves moves here too instead of going quietly out of date.
 *
 * Silent until the prices have arrived. A badge reading `$0.00` before the
 * answer came back would be worse than no badge at all.
 */
@Component({
  selector: 'app-cost',
  templateUrl: './cost.component.html',
  styleUrl: './cost.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CostComponent {
  private atelier = inject(AtelierService);

  /** Which operation the button it sits on performs. */
  readonly operation = input.required<AtelierOperation>();

  /** How many calls one press makes, when a press makes more than one. */
  readonly calls = input(1);

  readonly price = computed(() => {
    const prices = this.atelier.prices();
    if (!prices) return undefined;

    const each = prices.prices[this.operation()];
    return { usd: round(each.usd * this.calls()), what: each.what };
  });

  /** `$0.005` rather than `$0.01`: at these sizes the cents are the whole number. */
  readonly label = computed(() => {
    const price = this.price();
    return price ? `~$${price.usd.toFixed(price.usd < 0.01 ? 3 : 2)}` : '';
  });

  /**
   * True once the day's allowance would not cover another one of these.
   *
   * The button is disabled by the page; this says why, next to the price, so
   * a button that has stopped working explains itself where it stopped.
   */
  readonly beyondCeiling = computed(() => {
    const prices = this.atelier.prices();
    const price = this.price();
    return Boolean(prices && price && price.usd > prices.left);
  });
}

function round(usd: number): number {
  return Math.round(usd * 1000) / 1000;
}
