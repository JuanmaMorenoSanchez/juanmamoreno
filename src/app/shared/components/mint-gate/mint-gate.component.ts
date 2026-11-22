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
import { AskService } from '@shared/services/ask.service';
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
      <!--
        One button, which changes its mind rather than handing the press to a
        second one beside it: over the ceiling it turns the colour of the
        thing it is about to do, says so in its name, and asks before it
        spends.
      -->
      @if (withButton()) {
        <button
          type="button"
          class="gate-go"
          [class.gate-over]="tooDear()"
          [disabled]="stopped()"
          (click)="press()"
        >
          {{ tooDear() ? label() + ' anyway' : label() }}
        </button>
      }

      <!--
        Why it cannot be pressed, where the price is not being shown.
        A row of a queue states no price — it is the same figure on every row
        and is stated once above them — and that left the one arrangement with
        a button and no explanation: no price yet means hard disabled, and the
        row said nothing at all. A button that cannot be pressed and will not
        say why is indistinguishable from a broken one.
      -->
      @if (withButton() && !withPrice() && gas.price() === null) {
        <span class="gate-price">
          @if (gas.unreachable()) {
            The gas price could not be read, so nothing can be written yet.
          } @else {
            reading the gas price…
          }
        </span>
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
  private readonly ask = inject(AskService);

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
  /** Anything else that should stop it — nothing to mint, a request in flight. */
  readonly disabled = input(false);
  readonly mint = output<void>();

  protected readonly tooDear = computed(() => this.gas.price() !== null && !this.gas.affordable());

  /**
   * Stopped before the first price arrives, and for reasons of its own.
   *
   * Not knowing the price is not the same as the price being low, and a button
   * that works for a second before the first answer lands is a button that can
   * be pressed in that second. A dear price no longer stops it: that one is
   * asked about instead, below.
   */
  protected readonly stopped = computed(() => this.disabled() || this.gas.price() === null);

  /**
   * The press, and the question when the price deserves one.
   *
   * Over the ceiling the gate used to refuse and offer a second button
   * beside the first, which is two controls for one decision. One button
   * that changes colour, changes its name and asks before it spends says the
   * same thing and leaves nothing to find. The question is the chance to
   * stop; the ceiling itself is never touched here, because raising it to
   * get past one expensive morning leaves it raised for every quiet one
   * after.
   */
  protected async press(): Promise<void> {
    if (this.stopped()) return;

    const price = this.gas.price();
    if (this.tooDear()) {
      // Asked in the page, never with `window.confirm`. A wallet app's own
      // browser has no JS dialogs unless its host implemented them, and where
      // they are missing the call returns false at once — so this question was
      // answered no before he could read it, and the press did nothing and said
      // nothing. That browser is where the studio is used now.
      const spend = await this.ask.confirm({
        title: 'Gas is over your limit',
        body: [
          `Gas is ${(price as number).toFixed(3)} gwei, over your limit of ${this.gas.limit()} gwei.`,
          'Writing to the chain at that price costs real money — a certificate is about ' +
            'three quarters of a million gas.',
          'Your limit is left where it is.',
        ],
        yes: `${this.label()} at ${(price as number).toFixed(3)} gwei`,
        grave: true,
      });
      if (!spend) return;
    }

    this.mint.emit();
  }

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
