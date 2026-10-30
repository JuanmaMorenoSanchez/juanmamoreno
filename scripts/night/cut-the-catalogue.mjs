#!/usr/bin/env node
/**
 * Cuts the catalogue into its parts, overnight, with nobody watching.
 *
 * One painting at a time: the vision model says what is in it, the segmenter
 * cuts each of those things out, arithmetic throws away the masks that have
 * escaped, and what is left is kept as an asset. Everything a painting was asked and
 * answered is written down, so the next night starts where this one stopped and
 * the catalogue can actually finish.
 *
 * **Two passes, because the card holds one model.** `/describe` evicts whatever
 * is resident before it loads the 30B vision model, and the segmenter evicts
 * that in turn. Interleaving them per painting would mean a hundred and eighty
 * model loads; so every painting is described first, then the card is handed
 * over once and every painting is cut.
 *
 * **There is no browser in this.** There was: keeping is the artist's alone, the
 * credential lived in the atelier page's own storage, so the night drove Chrome
 * and pressed the page's save button. That could not be made to work, for a
 * reason outside this repository — Google refuses its sign-in screens to a
 * browser something is driving, so the one step that needed a real browser was
 * the only step a driven one could not do. The night now carries its own
 * credential from `gcloud` and posts to the same endpoint the page posts to;
 * `shelf.mjs` has the whole of it.
 *
 *   node scripts/night/cut-the-catalogue.mjs --limit 10
 *   node scripts/night/cut-the-catalogue.mjs --until 08:00
 *
 * All it needs is a signed-in `gcloud` on this machine, which is checked before
 * anything is cut. If it is not: `gcloud auth login`.
 */

import { writeFile } from 'node:fs/promises';

import { backendUrl, catalogue, paintingBytes } from './catalogue.mjs';
import { BACKGROUND, decide } from './judge.mjs';
import * as ledgerOf from './ledger.mjs';
import { credential, fileBytes, keep, kindFor, sizeOf } from './shelf.mjs';
import { ASKING, subjectsIn } from './subjects.mjs';

/** Where the engine answers. The same address the page uses. */
const ENGINE = 'http://127.0.0.1:7860';

/**
 * Beside the hand and the verdicts about the painters, in the folder git
 * ignores: this is a fact about one laptop, not about the work.
 */
const LOCAL = 'atelier-engine/local';

/** The shorter side to cut from, which is the medium download the site offers. */
const SHORTEST = 2500;

/**
 * How long to let one painting's cut take.
 *
 * Generous. Six phrases through the detector and the segmenter is seconds on a
 * warm card and a couple of minutes on a cold one, and a night that gives up
 * on a slow painting has thrown away the model load as well.
 */
const CUT_PATIENCE = 600_000;

const said = (...parts) => console.log(parts.join(' '));

function options(argv) {
  const flag = (name, fallback = null) => {
    const at = argv.indexOf(`--${name}`);
    return at === -1 ? fallback : (argv[at + 1] ?? fallback);
  };
  const there = (name) => argv.includes(`--${name}`);

  return {
    backend: flag('backend', null),
    engine: flag('engine', ENGINE),
    ledger: flag('ledger', `${LOCAL}/night.json`),
    report: flag('report', `${LOCAL}/night-report.md`),
    until: flag('until', '08:00'),
    limit: Number(flag('limit', '0')) || Infinity,
    describeOnly: there('describe-only'),
    cutOnly: there('cut-only'),
    dry: there('dry'),
  };
}

/**
 * When to stop, as a moment.
 *
 * The next time the clock reads that, which for a job started at one in the
 * morning is this morning and for a job started by hand in the afternoon is
 * tomorrow. The task scheduler stops it too; this is so the run ends between
 * paintings and writes its report rather than being killed mid-save.
 */
function deadline(until, now = new Date()) {
  const [hour, minute] = until.split(':').map(Number);
  const stop = new Date(now);
  stop.setHours(hour, minute ?? 0, 0, 0);
  if (stop <= now) stop.setDate(stop.getDate() + 1);
  return stop;
}

/** Whether the engine is up, and what it says about itself. */
async function engineUp(engine) {
  const response = await fetch(`${engine}/health`, { signal: AbortSignal.timeout(10_000) }).catch(
    () => null
  );
  return response?.ok ? response.json() : null;
}

/** What is in this painting, according to the model that can see it. */
async function describe(engine, bytes) {
  const response = await fetch(`${engine}/describe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      prompt: ASKING,
      images: [bytes.toString('base64')],
      // A list of six short lines. The default allows an essay, and a model
      // given room for one will write one.
      most_tokens: 200,
    }),
    signal: AbortSignal.timeout(CUT_PATIENCE),
  });
  if (!response.ok) throw new Error(`describe answered ${response.status}`);
  return subjectsIn((await response.json()).text);
}

/** The painting cut into the things named, as files on this machine. */
async function cut(engine, bytes, labels) {
  const form = new FormData();
  form.append('image', new Blob([bytes]), 'painting.jpg');
  form.append('labels', labels.join('\n'));
  form.append('shortest', String(SHORTEST));
  const response = await fetch(`${engine}/cut`, {
    method: 'POST',
    body: form,
    signal: AbortSignal.timeout(CUT_PATIENCE),
  });
  if (!response.ok) throw new Error(`cut answered ${response.status}`);
  return response.json();
}

/** Hands the card back, so the next pass can have all of it. */
async function evict(engine) {
  await fetch(`${engine}/evict`, { method: 'POST' }).catch(() => null);
}

async function main() {
  const how = options(process.argv.slice(2));
  const backend = how.backend ?? (await backendUrl());

  const stopAt = deadline(how.until);
  const timeLeft = () => stopAt.getTime() - Date.now();
  said(`Until ${stopAt.toLocaleTimeString()}, keeping at ${backend}, through ${how.engine}.`);

  const health = await engineUp(how.engine);
  if (!health) throw new Error(`nothing answering at ${how.engine} — start the engine first`);

  // Asked for before a single painting is cut. A credential that is not there
  // is the failure that costs a whole night, and it costs nothing to find out
  // now: a cut is minutes of card time spent on something that cannot be kept.
  if (!how.dry) await credential();

  const ledger = await ledgerOf.read(how.ledger);
  const paintings = await catalogue(backend);
  said(`${paintings.length} paintings in the catalogue.`);

  const trouble = [];
  let touched = 0;

  // Pass one: what is in each painting. One model load for all of them.
  if (!how.cutOnly) {
    const toDescribe = paintings.filter((one) => !ledgerOf.described(ledger, one.tokenId));
    said(`\nDescribing ${toDescribe.length} paintings nobody has looked at yet.`);

    for (const painting of toDescribe) {
      if (timeLeft() <= 0 || touched >= how.limit) break;
      try {
        const { bytes } = await paintingBytes(painting);
        const subjects = await describe(how.engine, bytes);
        if (!subjects.length) {
          // Named rather than retried. A painting the model would not list
          // anything in is a painting to look at by hand, and asking again
          // tomorrow spends the same minute on the same answer.
          ledgerOf.recordSubjects(ledger, painting.tokenId, painting.name, [BACKGROUND]);
          ledgerOf.recordRefused(ledger, painting.tokenId, BACKGROUND, 'nothing was named in it');
          trouble.push(`${painting.tokenId} ${painting.name}: nothing was named in it`);
        } else {
          ledgerOf.recordSubjects(ledger, painting.tokenId, painting.name, [
            ...subjects,
            BACKGROUND,
          ]);
          said(`  ${painting.tokenId} ${painting.name}: ${subjects.join(', ')}`);
        }
      } catch (error) {
        trouble.push(`${painting.tokenId} ${painting.name}: ${error.message}`);
      }
      await ledgerOf.write(how.ledger, ledger);
      touched += 1;
    }
  }

  // Pass two: cut what was named, and keep what survives.
  if (!how.describeOnly) {
    await evict(how.engine);
    // A limit is how many paintings to take through each pass, not how many to
    // touch in all: `--limit 10` on a first night means ten described and then
    // those ten cut, which spent as one number would have cut nothing at all.
    touched = 0;

    const toCut = paintings.filter((one) => ledgerOf.leftToCut(ledger, one.tokenId).length);
    said(`\n${toCut.length} paintings have things left to cut.`);

    for (const painting of toCut) {
      if (timeLeft() <= 0 || touched >= how.limit) break;

      const wanted = ledgerOf.leftToCut(ledger, painting.tokenId);
      const labels = wanted.filter((subject) => subject !== BACKGROUND);
      said(`\n  ${painting.tokenId} ${painting.name}: ${wanted.join(', ')}`);

      try {
        const { bytes, rung } = await paintingBytes(painting);
        if (rung > 0) said('    (not the original copy — the asset will be smaller)');

        const made = labels.length ? await cut(how.engine, bytes, labels) : {};
        const { keeping, refused } = decide(made, wanted);

        for (const one of refused) {
          ledgerOf.recordRefused(ledger, painting.tokenId, one.subject, one.why);
          said(`    ${one.subject}: ${one.why}`);
        }

        for (const one of keeping) {
          if (how.dry) {
            said(`    ${one.subject}: would keep ${one.file}`);
            continue;
          }
          const cutBytes = await fileBytes(how.engine, one.file);
          const { width, height } = sizeOf(cutBytes);
          await keep(backend, cutBytes, {
            // The painting's own name, so an asset says which canvas it came
            // out of, and the subject as its kind, so it says which part.
            name: painting.name,
            tokenId: painting.tokenId,
            kind: kindFor(one.subject),
            width,
            height,
          });
          ledgerOf.recordKept(ledger, painting.tokenId, one.subject, one.file);
          said(`    ${one.subject}: kept, ${width}×${height}`);
        }
      } catch (error) {
        // The painting is left in the ledger with its subjects and no
        // verdicts, so tomorrow tries it again. A failure here is a cold card
        // or a credential, not a decision about the painting.
        trouble.push(`${painting.tokenId} ${painting.name}: ${error.message}`);
        said(`    ${error.message}`);
        if (/identity token|hand over an identity|shelf answered 40/.test(error.message)) {
          said('    Stopping: nothing can be kept without a credential.');
          break;
        }
      }

      await ledgerOf.write(how.ledger, ledger);
      touched += 1;
    }
  }

  await ledgerOf.write(how.ledger, ledger);
  const counted = ledgerOf.tally(ledger);
  const report = [
    `# The night of ${new Date().toISOString().slice(0, 10)}`,
    '',
    `- ${counted.paintings} of ${paintings.length} paintings looked at`,
    `- ${counted.done} finished`,
    `- ${counted.kept} assets kept`,
    `- ${counted.refused} cuts refused`,
    '',
    trouble.length ? '## What went wrong\n' : '## Nothing went wrong.',
    ...trouble.map((one) => `- ${one}`),
    '',
  ].join('\n');
  await writeFile(how.report, report, 'utf8');
  said(`\n${report}`);
  said(`Written to ${how.report}`);
}

main().catch((error) => {
  console.error(`\nThe night stopped: ${error.message}`);
  process.exitCode = 1;
});
