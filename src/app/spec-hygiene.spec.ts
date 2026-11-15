import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

/**
 * The suite's own house rule.
 *
 * `ng test` runs with `isolate: false` — the Angular builder's default, chosen
 * to match the Karma experience it replaced — so all hundred and twenty spec
 * files share one jsdom. A global left stubbed is inherited by whichever file
 * runs next, and which file that is depends on how many workers the machine
 * has: a stub left behind is a test that passes on a sixteen-core laptop and
 * fails on a four-core runner, which is how it was found. `home.component.ts`
 * branches on `IntersectionObserver` being absent, and eleven spec files stub
 * exactly that.
 *
 * Checked by reading the files rather than by discipline, because discipline
 * is what failed. It is the one test here that is about the tests.
 */
function specFiles(dir: string, found: string[] = []): string[] {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) specFiles(path, found);
    else if (entry.name.endsWith('.spec.ts')) found.push(path);
  }
  return found;
}

const sources = () =>
  specFiles('src').map((path) => ({
    path: path.replace(/\\/g, '/'),
    source: readFileSync(path, 'utf8'),
  }));

describe('every spec puts back what it borrows', () => {
  it('leaves no global stubbed for the file that runs next', () => {
    const leaking = sources()
      .filter(({ source }) => source.includes('stubGlobal') && !source.includes('unstubAllGlobals'))
      .map(({ path }) => path);

    expect(leaking).toEqual([]);
  });

  /**
   * The one that actually failed the deploy. `photo-prep.component.spec.ts`
   * assigned `HTMLCanvasElement.prototype.getContext` a fake context with four
   * methods on it. `vi.restoreAllMocks()` restores a spy and cannot restore an
   * assignment, so every later file in that worker drew on it — and a fake
   * context is worse than none, because code that guards against `null` sails
   * straight into it and dies on the first method nobody thought to fake.
   *
   * Which files share a worker depends on the core count, so it passed on
   * twenty-four cores here and failed on the runner's four.
   */
  it('reaches for a prototype with vi.spyOn, which can be put back', () => {
    const assigning = sources()
      .filter(({ source }) => /\.prototype\.[A-Za-z_$][\w$]*\s*=[^=]/.test(source))
      .map(({ path }) => path);

    expect(assigning).toEqual([]);
  });
});
