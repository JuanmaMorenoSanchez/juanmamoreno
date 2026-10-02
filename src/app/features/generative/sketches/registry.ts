import { BelieveSketch } from './believe.sketch';
import { DustSketch } from './dust.sketch';
import { RocketsWinSketch } from './rockets-win.sketch';
import { SketchFactory } from './sketch';

export interface SketchEntry {
  /** Human label (used by the menu). */
  label: string;
  /** Creates a fresh sketch instance. */
  factory: SketchFactory;
}

/**
 * Route id (`/generative/:id`) → sketch. Add new sketches here.
 *
 * A piece cut in the atelier is added here too, by hand, and that is the point:
 * saving a piece used to make it a page at `/generative/<its id>` by existing,
 * so every save published something nobody had decided to publish. It is one
 * line and an import, and it is a decision:
 *
 *     import { pieceSketch } from './piece.sketch';
 *     'rockets-win-i': { label: 'Rockets win I', factory: pieceSketch('rockets-win-i') },
 *
 * The id is the piece's own, as the catalogue page shows it.
 */
export const SKETCHES: Record<string, SketchEntry> = {
  believe: { label: 'Believe', factory: () => new BelieveSketch() },
  hide: { label: 'Hide until everybody is dead', factory: () => new DustSketch() },
  'rockets-win': { label: 'Rockets win', factory: () => new RocketsWinSketch() },
  // 'wind-direction': { label: 'Wind direction', factory: () => new WindDirectionSketch() },
};

export const SKETCH_LIST = Object.entries(SKETCHES).map(([id, entry]) => ({
  id,
  label: entry.label,
}));
