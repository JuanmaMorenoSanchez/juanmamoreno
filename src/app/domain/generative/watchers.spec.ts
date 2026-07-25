import { WatcherField } from './watchers';

describe('WatcherField', () => {
  it('seeds the requested number of watchers', () => {
    const field = new WatcherField(800, 600, 5);
    expect(field.list.length).toBe(5);
  });

  it('keeps openness within [0, 1] and appears/hides over time', () => {
    const field = new WatcherField(800, 600, 6);
    const safeRadius = 80;
    let sawVisible = false;
    let sawHidden = false;

    // Simulate ~30s: every watcher should appear and hide at least once, and
    // openness must always stay in range.
    for (let t = 0; t < 30; t += 0.05) {
      field.update(t, safeRadius);
      for (const w of field.list) {
        expect(w.openness).toBeGreaterThanOrEqual(0);
        expect(w.openness).toBeLessThanOrEqual(1);
        if (w.openness > 0.5) sawVisible = true;
        if (w.openness === 0) sawHidden = true;
      }
    }

    expect(sawVisible).toBe(true);
    expect(sawHidden).toBe(true);
  });

  it('never places a visible watcher within the safe radius of the centre', () => {
    const field = new WatcherField(800, 600, 8);
    const safeRadius = 100;
    for (let t = 0; t < 30; t += 0.05) {
      field.update(t, safeRadius);
      for (const w of field.list) {
        if (w.openness > 0) {
          const dist = Math.hypot(w.x - 400, w.y - 300);
          expect(dist).toBeGreaterThanOrEqual(safeRadius - 1e-6);
        }
      }
    }
  });
});
