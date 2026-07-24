import { BelieveSketch } from './believe.sketch';
import { DustSketch } from './dust.sketch';
import { SketchFactory } from './sketch';
import { WindDirectionSketch } from './wind-direction.sketch';

export interface SketchEntry {
  /** Human label (used by the menu). */
  label: string;
  /** Creates a fresh sketch instance. */
  factory: SketchFactory;
}

// Route id (`/generative/:id`) → sketch. Add new sketches here.
export const SKETCHES: Record<string, SketchEntry> = {
  believe: { label: 'Believe', factory: () => new BelieveSketch() },
  dust: { label: 'Dust', factory: () => new DustSketch() },
  // 'wind-direction': { label: 'Wind direction', factory: () => new WindDirectionSketch() },
};

export const SKETCH_LIST = Object.entries(SKETCHES).map(([id, entry]) => ({
  id,
  label: entry.label,
}));
