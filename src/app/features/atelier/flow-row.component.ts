import { ChangeDetectionStrategy, Component, input, output, signal } from '@angular/core';
import type { FlowDef } from './engine.service';

/**
 * The graphs that arrive already wired up.
 *
 * Its own component, like every other distinct piece of this page — the node
 * canvas, the brush, the two previews. That is the pattern here and it is also
 * what keeps the atelier's stylesheet inside the 6 kB a component stylesheet is
 * allowed: these rules pushed it 255 bytes over and failed the build, which is
 * the sort of thing a budget is for.
 *
 * It knows the name of no node and no flow. Everything here came from the
 * engine, so a flow added to `flows.py` is a button on a deployed site.
 */
@Component({
  selector: 'app-flow-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './flow-row.component.html',
  styleUrl: './flow-row.component.scss',
})
export class FlowRowComponent {
  readonly flows = input.required<FlowDef[]>();
  readonly chosen = output<FlowDef>();

  /** Which flow's long explanation is open, if any. */
  protected readonly explaining = signal<FlowDef | null>(null);

  protected toggle(flow: FlowDef): void {
    this.explaining.update((open) => (open?.key === flow.key ? null : flow));
  }

  protected start(flow: FlowDef): void {
    this.explaining.set(null);
    this.chosen.emit(flow);
  }

  /**
   * A flow's explanation, split into paragraphs.
   *
   * Guarded, like the node help beside it: this page can be newer than the
   * engine on the machine it is talking to, and it crashed once against an
   * engine that predated a field it read.
   */
  protected paragraphs(flow: FlowDef): string[] {
    return (flow.about ?? '').split('\n\n').filter((paragraph) => paragraph.trim().length > 0);
  }
}
