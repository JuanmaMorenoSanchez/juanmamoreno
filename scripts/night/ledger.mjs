/**
 * What the night has already done, so it never does it twice.
 *
 * **It has to remember refusals, not only keeps.** A ledger of successes looks
 * sufficient and is not: a painting with one subject that cuts badly is never
 * finished, so it is first in the queue again the next night, and the night
 * after that, and the catalogue never empties. A refusal is a decision and is
 * written down like any other.
 *
 * It lives in `atelier-engine/local/`, beside the hand and the verdicts about
 * the painters' names, because git ignores that folder and this is a fact
 * about one laptop rather than about the work. Losing it costs a re-run, not
 * an asset: what was kept is in the bucket, which is the record that matters.
 */

import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

/** The shape written, so a later version can recognise an earlier one. */
const VERSION = 1;

/** An empty ledger, which is what a machine that has never run a night has. */
export function empty() {
  return { version: VERSION, paintings: {} };
}

/**
 * The ledger on disk, or an empty one.
 *
 * A file that cannot be read or parsed is treated as absent rather than as a
 * reason to stop. The cost of being wrong here is re-cutting paintings that
 * were already done, which is card time; the cost of refusing to start is a
 * whole night.
 */
export async function read(where) {
  try {
    const said = JSON.parse(await readFile(where, 'utf8'));
    if (said?.version !== VERSION || typeof said.paintings !== 'object') return empty();
    return said;
  } catch {
    return empty();
  }
}

/**
 * Writes it, whole, through a temporary file.
 *
 * Renamed rather than written in place: the night writes this after every
 * painting, and a machine that sleeps mid-write would otherwise leave a
 * truncated file that reads as "nothing has ever been done".
 */
export async function write(where, ledger) {
  await mkdir(dirname(where), { recursive: true });
  const beside = `${where}.writing`;
  await writeFile(beside, `${JSON.stringify(ledger, null, 2)}\n`, 'utf8');
  await rename(beside, where);
}

/** What the ledger holds about one painting, creating the entry if it must. */
function entry(ledger, token) {
  ledger.paintings[token] ??= { subjects: [], done: {} };
  const held = ledger.paintings[token];
  held.subjects ??= [];
  held.done ??= {};
  return held;
}

/** Whether this painting has been looked at and its things named. */
export function described(ledger, token) {
  return (ledger.paintings?.[token]?.subjects?.length ?? 0) > 0;
}

/** What was named in it, in the order it was named. */
export function subjectsOf(ledger, token) {
  return [...(ledger.paintings?.[token]?.subjects ?? [])];
}

/** The things named in it that have no verdict yet. */
export function leftToCut(ledger, token) {
  const held = ledger.paintings?.[token];
  if (!held) return [];
  return (held.subjects ?? []).filter((subject) => !held.done?.[subject]);
}

/**
 * Whether this painting is finished and should be skipped.
 *
 * Finished means every thing named in it has been either kept or refused — not
 * that every one of them became an asset. A painting whose six subjects were
 * all refused is as done as one whose six were all kept; the difference is
 * recorded, and visible in the report.
 */
export function finished(ledger, token) {
  return described(ledger, token) && leftToCut(ledger, token).length === 0;
}

/** What was named in a painting, and when it was looked at. */
export function recordSubjects(ledger, token, name, subjects, when = new Date()) {
  const held = entry(ledger, token);
  held.name = name;
  held.subjects = [...subjects];
  held.described = when.toISOString();
  return ledger;
}

/**
 * One thing kept, by the engine's name for the file it was kept from.
 *
 * The file rather than the kind the shelf filed it under: the kind is the
 * subject with a prefix and says nothing new, while the file name is the way
 * back to the exact picture in the engine's folder when an asset turns out
 * wrong.
 */
export function recordKept(ledger, token, subject, file, when = new Date()) {
  entry(ledger, token).done[subject] = { kept: file, when: when.toISOString() };
  return ledger;
}

/** One thing refused, and why — so it is never offered again. */
export function recordRefused(ledger, token, subject, why, when = new Date()) {
  entry(ledger, token).done[subject] = { refused: why, when: when.toISOString() };
  return ledger;
}

/** How far through the catalogue the night has got, for the morning report. */
export function tally(ledger) {
  let paintings = 0;
  let done = 0;
  let kept = 0;
  let refused = 0;

  for (const token of Object.keys(ledger.paintings ?? {})) {
    paintings += 1;
    if (finished(ledger, token)) done += 1;
    for (const verdict of Object.values(ledger.paintings[token].done ?? {})) {
      if (verdict.kept) kept += 1;
      else refused += 1;
    }
  }

  return { paintings, done, kept, refused };
}
