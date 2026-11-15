import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  input,
  output,
  signal,
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
      @if (withButton()) {
        <button type="button" class="gate-go" [disabled]="stopped()" (click)="mint.emit()">
          {{ label() }}
        </button>
      }

      @if (withPrice() && gas.price(); as price) {
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
      } @else if (withPrice()) {
        <span class="gate-price">reading the gas price…</span>
      }

      <!--
        The way past the ceiling, for when the answer is "I know, do it
        anyway". It appears only when the price is what is stopping it, and
        it is a second press rather than a wider limit: raising the ceiling
        to get past one expensive morning leaves it raised for every quiet
        one after.
      -->
      @if (withButton() && tooDear() && !insisting()) {
        <button type="button" class="gate-insist" (click)="insisting.set(true)">Mint anyway</button>
      } @else if (withButton() && insisting()) {
        <span class="gate-price gate-dear">paying over the limit</span>
      }

      @if (withPrice()) {
        <label class="gate-limit">
          limit
          <input
            type="number"
            min="0"
            step="0.01"
            [value]="gas.limit()"
            (input)="retune($event)"
            aria-label="The most to pay for a unit of gas, in gwei"
          />
          gwei
        </label>
      }
    </div>
  `,
  styleUrl: './mint-gate.component.scss',
})
export class MintGateComponent {
  protected readonly gas = inject(GasPriceService);

  readonly label = input('Mint');
  /**
   * Whether there is anything to press.
   *
   * The price, the warning and the ceiling are worth showing where the
   * decision about them is made — which is the list of certificates waiting
   * to be signed — and there is nothing to press there: the contract has no
   * mint function, and signing is done in OpenSea by hand. A button that can
   * never be enabled is the thing this component exists to avoid.
   */
  readonly withButton = input(true);
  /**
   * Whether to state the price here.
   *
   * It is the price of gas and not of a certificate, so it is the same
   * figure on every row of a list — stated once above them rather than
   * repeated beside each, which on a queue of four read as the page
   * shouting one fact four times.
   */
  readonly withPrice = input(true);
  /**
   * Whether the ceiling has been overruled for this press.
   *
   * Reset by nothing: the window is closed or the page left when the work is
   * done, and an insistence that outlived the thing it was for would be a
   * ceiling quietly switched off.
   */
  protected readonly insisting = signal(false);
  /** Anything else that should stop it — nothing to mint, a request in flight. */
  readonly disabled = input(false);
  readonly mint = output<void>();

  protected readonly tooDear = computed(() => this.gas.price() !== null && !this.gas.affordable());

  /**
   * Also stopped before the first price arrives.
   *
   * Not knowing the price is not the same as the price being low, and a button
   * that works for a second before the first answer lands is a button that can
   * be pressed in that second.
   */
  protected readonly stopped = computed(
    () => this.disabled() || this.gas.price() === null || (this.tooDear() && !this.insisting())
  );

  constructor() {
    const stop = this.gas.watch();
    inject(DestroyRef).onDestroy(stop);
  }

  /**
   * The ceiling moved by hand, from the input beside the price.
   *
   * `valueAsNumber` rather than parsing the string ourselves: whatever the
   * browser will not read as a number arrives as `NaN`, which the service
   * ignores, so a half-typed or malformed entry leaves the ceiling where it was
   * rather than dropping it to zero and stopping everything.
   */
  protected retune(event: Event): void {
    this.gas.setLimit((event.target as HTMLInputElement).valueAsNumber);
  }
}
