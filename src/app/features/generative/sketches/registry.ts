import { BelieveSketch } from './believe.sketch';
import { SketchFactory } from './sketch';
import { WindDirectionSketch } from './wind-direction.sketch';

export interface SketchEntry {
  /** Human label (used by the menu). */
  label: string;
  /** Creates a fresh sketch instance. */
  factory: SketchFactory;
  /** Whether this sketch can be reseeded by a mic-detected sound peak, same as a click. */
  soundReactive?: boolean;
}

// Route id (`/generative/:id`) → sketch. Add new sketches here.
export const SKETCHES: Record<string, SketchEntry> = {
  believe: { label: 'Believe', factory: () => new BelieveSketch(), soundReactive: true },
  // 'wind-direction': { label: 'Wind direction', factory: () => new WindDirectionSketch() },
};

export const SKETCH_LIST = Object.entries(SKETCHES).map(([id, entry]) => ({
  id,
  label: entry.label,
}));
