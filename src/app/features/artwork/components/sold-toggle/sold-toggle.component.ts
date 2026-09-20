import { Component, computed, inject, input, signal } from '@angular/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { AvailabilityService } from '@shared/services/availability.service';

/**
 * Sold, or not, said by the artist from wherever he is standing.
 *
 * It sits beside the line that gives the year, the medium and the size, next to
 * the dot it turns on — the control and the thing it changes in the same glance
 * — rather than in the row of icons above, which is what any reader may press.
 *
 * **Not on the catalogue grid**, where it would be quicker and where a mistaken
 * tap on a tile would tell the world a painting is sold, on a page with nothing
 * to confirm what was tapped. Here there is one painting, named and measured,
 * and its dot answers immediately.
 *
 * Drawn only for the signed-in artist. The api refuses everybody else, which is
 * what makes it safe; not drawing it for everybody else is what makes it tidy.
 */
@Component({
  selector: 'app-sold-toggle',
  standalone: true,
  imports: [MatSlideToggleModule, MatTooltipModule, TranslatePipe],
  template: `
    @if (visible()) {
      <span class="sold-toggle">
        <mat-slide-toggle
          [checked]="sold()"
          [disabled]="saving()"
          (change)="mark($event.checked)"
          [matTooltip]="'availability.explain' | translate"
        >
          {{ (sold() ? 'sold' : 'availability.available') | translate }}
        </mat-slide-toggle>
        @if (failed()) {
          <small class="sold-toggle-failed">{{ 'availability.failed' | translate }}</small>
        }
      </span>
    }
  `,
  styles: [
    `
      .sold-toggle {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        margin-left: 0.75rem;
        vertical-align: middle;
        font-size: 0.75rem;
        opacity: 0.85;
      }

      .sold-toggle-failed {
        color: var(--mat-sys-error, #b3261e);
      }
    `,
  ],
})
export class SoldToggleComponent {
  private readonly availability = inject(AvailabilityService);
  private readonly auth = inject(AdminAuthService);

  readonly tokenId = input.required<string>();

  protected readonly visible = computed(() => this.auth.isAdmin());
  protected readonly sold = computed(() => this.availability.isSold(this.tokenId()));
  protected readonly saving = signal(false);
  protected readonly failed = signal(false);

  /**
   * States which of the two it means rather than asking for a toggle, so a
   * second impatient press cannot undo the first by arriving late.
   */
  protected async mark(sold: boolean): Promise<void> {
    this.saving.set(true);
    this.failed.set(false);
    try {
      await this.availability.set(this.tokenId(), sold);
    } catch {
      this.failed.set(true);
    } finally {
      this.saving.set(false);
    }
  }
}
