import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
} from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { GasPriceService } from '@shared/services/gas-price.service';

/**
 * A button that will not let a certificate be written while gas is expensive.
 *
 * Writing one costs about three quarters of a million gas, so the price of gas
 * is the whole of what it costs — the same certificate is a few cents on a quiet
 * morning and several pounds on a busy afternoon. The price is therefore part of
 * the decision and belongs beside the button rather than on a website somewhere
 * else.
 *
 * Used in both places a certificate can be written from: the studio, and the
 * list of the ones put off until later.
 */
@Component({
  selector: 'app-mint-gate',
  imports: [DecimalPipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <div class="gate">
      <button type="button" class="gate-go" [disabled]="stopped()" (click)="mint.emit()">
        {{ label() }}
      </button>

      @if (gas.price(); as price) {
        <span class="gate-price" [class.gate-dear]="tooDear()">
          @if (tooDear()) {
            Too expensive! {{ price | number: '1.2-3' }} gwei
          } @else {
            {{ price | number: '1.2-3' }} gwei
          }
          @if (gas.unreachable()) {
            <em>(last known)</em>
          }
        </span>
      } @else {
        <span class="gate-price">reading the gas price…</span>
      }
    </div>
  `,
  styles: `
    .gate {
      display: flex;
      align-items: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .gate-go {
      font: inherit;
      padding: 0.6rem 1.4rem;
      border: 1px solid currentColor;
      border-radius: 3px;
      background: transparent;
      color: inherit;
      cursor: pointer;
    }

    .gate-go[disabled] {
      opacity: 0.45;
      cursor: not-allowed;
    }

    .gate-price {
      font-size: 0.85rem;
      opacity: 0.75;
      font-variant-numeric: tabular-nums;
    }

    /* The one thing here that has to be noticed rather than read. */
    .gate-dear {
      opacity: 1;
      color: #b3261e;
      font-weight: 600;
    }

    .gate-price em {
      font-style: normal;
      opacity: 0.7;
    }
  `,
})
export class MintGateComponent {
  protected readonly gas = inject(GasPriceService);

  readonly label = input('Mint');
  /** Anything else that should stop it — nothing to mint, a request in flight. */
  readonly disabled = input(false);
  readonly mint = output<void>();

  protected readonly tooDear = computed(
    () => this.gas.price() !== null && !this.gas.affordable()
  );

  /**
   * Also stopped before the first price arrives.
   *
   * Not knowing the price is not the same as the price being low, and a button
   * that works for a second before the first answer lands is a button that can
   * be pressed in that second.
   */
  protected readonly stopped = computed(
    () => this.disabled() || this.gas.price() === null || this.tooDear()
  );

  constructor() {
    const stop = this.gas.watch();
    inject(DestroyRef).onDestroy(stop);
  }
}
