import { defineConfig } from 'vite';

// @datorama/akita ships broken sourcemaps: each .map's "sources" field points
// to a path inside its internal monorepo (e.g. ../../../../../packages/akita/
// src/lib/actions.ts) that was never published to npm, and sourcesContent
// isn't embedded either. Its entry point also uses ESM `export` syntax
// without "type": "module" in package.json, so Vitest cannot require() it
// natively and must transform every one of its source files individually,
// triggering this warning once per file.
//
// Vite's `customLogger` config is not a usable hook here: Vitest always
// overwrites it with its own logger (see createViteLogger in
// vitest/dist/chunks/cli-api*.js), which writes straight to process.stderr
// through a private Console instance. Patching the stream is therefore the
// only interception point available — scoped tightly to this one message so
// no other warning or error is ever affected.
const AKITA_BROKEN_SOURCEMAP =
  /Sourcemap for ".*@datorama[\\/]akita.*" points to missing source files/;

const originalStderrWrite = process.stderr.write.bind(process.stderr);
process.stderr.write = ((chunk: unknown, ...rest: unknown[]) => {
  if (typeof chunk === 'string' && AKITA_BROKEN_SOURCEMAP.test(chunk)) {
    return true;
  }
  return (originalStderrWrite as (...a: unknown[]) => boolean)(chunk, ...rest);
}) as typeof process.stderr.write;

export default defineConfig({
  test: {
    /**
     * Vitest allows a test five seconds by default, which suits a suite that
     * only wires components together. This one also warps whole photographs,
     * fits perspective transforms and renders a catalogue of a hundred and
     * eighty tiles, and three such tests have now failed on time alone —
     * passing on a quiet machine and timing out on a busy one, which on a CI
     * runner means a deploy blocked over nothing.
     *
     * The work is what those tests are for, so they are given room rather than
     * made smaller. A test that has genuinely hung still fails; it takes longer
     * to say so.
     */
    testTimeout: 20000,
  },
});
