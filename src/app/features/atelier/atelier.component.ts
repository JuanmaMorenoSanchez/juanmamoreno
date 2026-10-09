import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { AtelierEngineService, type CutResult } from './engine.service';

/**
 * Cutting a painting into layers, with the models running on this machine.
 *
 * **This page does nothing without the local engine**, which is a Python
 * service started by hand in `atelier-engine/`. It is not a web page that
 * happens to be slow when the backend is down — it is a front end for a process
 * on this computer, and opened from anywhere else it can only say so. That is
 * why the first thing it draws is whether the engine answered.
 *
 * Nothing it produces is saved anywhere until he says so. The layers live in
 * the engine's own folder and are shown from there; the bucket and Firestore
 * are not touched, because a generative tool that saves by itself fills a
 * bucket with rejects.
 */
@Component({
  selector: 'app-atelier',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './atelier.component.html',
  styleUrl: './atelier.component.scss',
})
export class AtelierComponent {
  protected readonly engine = inject(AtelierEngineService);

  protected readonly painting = signal<File | null>(null);
  protected readonly preview = signal<string | null>(null);
  protected readonly labels = signal('a girl\na blue shirt');
  protected readonly fillBehind = signal(true);

  protected readonly busy = signal(false);
  protected readonly failure = signal<string | null>(null);
  protected readonly result = signal<CutResult | null>(null);

  protected readonly named = computed(() =>
    this.labels()
      .split('\n')
      .map((line) => line.trim())
      .filter(Boolean)
  );

  protected readonly ready = computed(
    () =>
      !this.busy() &&
      !this.engine.unreachable() &&
      this.painting() !== null &&
      this.named().length > 0
  );

  constructor() {
    void this.engine.check();
  }

  protected chose(event: Event): void {
    const file = (event.target as HTMLInputElement).files?.[0] ?? null;
    const old = this.preview();
    if (old) URL.revokeObjectURL(old);

    this.painting.set(file);
    this.preview.set(file ? URL.createObjectURL(file) : null);
    this.result.set(null);
    this.failure.set(null);
  }

  protected async cut(): Promise<void> {
    const painting = this.painting();
    if (!painting) return;

    this.busy.set(true);
    this.failure.set(null);
    this.result.set(null);
    try {
      this.result.set(await this.engine.cut(painting, this.named(), this.fillBehind()));
    } catch (error) {
      this.failure.set(error instanceof Error ? error.message : 'the engine did not answer');
    } finally {
      this.busy.set(false);
      void this.engine.check();
    }
  }

  protected layerUrl(file: string): string {
    return this.engine.layerUrl(file);
  }

  /** Nought to one as a percentage, for the figures beside each layer. */
  protected percent(fraction: number): string {
    return `${(fraction * 100).toFixed(1)}%`;
  }
}
