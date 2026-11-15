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

describe('every spec puts back the globals it stubs', () => {
  it('leaves nothing stubbed for the file that runs next', () => {
    const leaking = specFiles('src')
      .filter((path) => {
        const source = readFileSync(path, 'utf8');
        return source.includes('stubGlobal') && !source.includes('unstubAllGlobals');
      })
      .map((path) => path.replace(/\\/g, '/'));

    expect(leaking).toEqual([]);
  });
});
