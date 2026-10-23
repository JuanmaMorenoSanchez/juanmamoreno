import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Every colour a stylesheet asks for is a colour something defines.
 *
 * `var(--surface, #fff)` was written in six stylesheets and `--surface` was
 * defined in none, so all six quietly took the fallback. White is right in
 * one of the two themes: the atelier's boxes were white with pale text on
 * them all through dark mode, and nothing anywhere was wrong enough to fail.
 *
 * A fallback is meant to be the value before the theme loads, not the value.
 */
describe('the custom properties the stylesheets ask for', () => {
  const root = 'src';

  const everyFile = (from: string): string[] =>
    readdirSync(from).flatMap((name) => {
      const path = join(from, name);
      if (statSync(path).isDirectory()) return everyFile(path);
      return path.endsWith('.scss') ? [path] : [];
    });

  const files = everyFile(root);
  const all = files.map((path) => readFileSync(path, 'utf8')).join('\n');

  /**
   * Which properties are defined anywhere, in any theme — or set at runtime,
   * from code or from a template binding, which is how a parallax offset and
   * a zoom level arrive and is not the same thing as being missing.
   */
  const everyCode = (from: string): string[] =>
    readdirSync(from).flatMap((name) => {
      const path = join(from, name);
      if (statSync(path).isDirectory()) return everyCode(path);
      return path.endsWith('.ts') || path.endsWith('.html') ? [path] : [];
    });
  const code = everyCode(root)
    .map((path) => readFileSync(path, 'utf8'))
    .join('\n');

  const defined = new Set([
    ...[...all.matchAll(/^\s*(--[\w-]+)\s*:/gm)].map((found) => found[1]),
    ...[...code.matchAll(/setProperty\(\s*[`'"](--[\w-]+)/g)].map((found) => found[1]),
    ...[...code.matchAll(/\[style\.(--[\w-]+)\]/g)].map((found) => found[1]),
  ]);

  /**
   * And which are asked for. Angular Material's own tokens are left out: they
   * are defined by the theme it generates at build time rather than by
   * anything in this repository.
   */
  const asked = new Map<string, string[]>();
  for (const path of files) {
    const text = readFileSync(path, 'utf8');
    for (const found of text.matchAll(/var\(\s*(--[\w-]+)/g)) {
      const name = found[1];
      if (name.startsWith('--mat-') || name.startsWith('--mdc-')) continue;
      asked.set(name, [...(asked.get(name) ?? []), path]);
    }
  }

  it('reads more than a couple of stylesheets, or it is proving nothing', () => {
    expect(files.length).toBeGreaterThan(10);
    expect(asked.size).toBeGreaterThan(3);
  });

  it('defines every one of them', () => {
    const missing = [...asked.entries()]
      .filter(([name]) => !defined.has(name))
      .map(([name, where]) => `${name} — asked for in ${where.join(', ')}`);

    expect(missing).toEqual([]);
  });

  it('defines the panel colour in both themes, not just the light one', () => {
    // The one that broke: a panel on the page — a node on the atelier's
    // canvas, the box the brush is used in, a preview — needs a colour in
    // the dark palette or it is white under pale text.
    const light = readFileSync('src/styles.scss', 'utf8');
    const dark = light.slice(light.indexOf('@mixin dark-palette'));

    expect(light).toContain('--surface:');
    expect(dark).toContain('--surface:');
  });
});
