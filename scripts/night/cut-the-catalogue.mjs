#!/usr/bin/env node
/**
 * Cuts the catalogue into its parts, overnight, with nobody watching.
 *
 * One painting at a time: the vision model says what is in it, the segmenter
 * cuts each of those things out, arithmetic throws away the masks that have
 * escaped, and the page keeps what is left. Everything a painting was asked and
 * answered is written down, so the next night starts where this one stopped and
 * the catalogue can actually finish.
 *
 * **Two passes, because the card holds one model.** `/describe` evicts whatever
 * is resident before it loads the 30B vision model, and the segmenter evicts
 * that in turn. Interleaving them per painting would mean a hundred and eighty
 * model loads; so every painting is described first, then the card is handed
 * over once and every painting is cut.
 *
 * **The browser is here for one reason: it is the only thing that can save.**
 * The engine says so itself — keeping is a press in the browser, through the
 * browser's own credential, and nothing on this machine can reach the bucket.
 * So the cut is done over plain http, where it is fast and needs nobody, and
 * the keeping goes through the real page and the real button: the same code
 * path as a press by hand, including its renewal of an hour-old token and its
 * retry of a refused save.
 *
 *   node scripts/night/cut-the-catalogue.mjs --limit 10
 *   node scripts/night/cut-the-catalogue.mjs --until 08:00
 *
 * The first run needs a Chrome profile signed in to the site. Sign in once,
 * by hand, with the profile this uses:
 *   node scripts/night/cut-the-catalogue.mjs --sign-in
 */

import { writeFile } from 'node:fs/promises';
import { chromium } from 'playwright-core';

import { findChrome } from '../../e2e/browser.mjs';
import { backendUrl, catalogue, paintingBytes } from './catalogue.mjs';
import { BACKGROUND, decide } from './judge.mjs';
import * as ledgerOf from './ledger.mjs';
import { ASKING, subjectsIn } from './subjects.mjs';

/** Where the engine answers. The same address the page uses. */
const ENGINE = 'http://127.0.0.1:7860';

/** The site whose page holds the credential. The deployed one, by default. */
const SITE = 'https://juanmamoreno.com';

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
    site: flag('site', SITE),
    engine: flag('engine', ENGINE),
    profile: flag('profile', `${LOCAL}/night-chrome`),
    ledger: flag('ledger', `${LOCAL}/night.json`),
    report: flag('report', `${LOCAL}/night-report.md`),
    until: flag('until', '08:00'),
    limit: Number(flag('limit', '0')) || Infinity,
    describeOnly: there('describe-only'),
    cutOnly: there('cut-only'),
    dry: there('dry'),
    signIn: there('sign-in'),
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

/**
 * When the sign-in in this browser runs out.
 *
 * Read from the token's own expiry claim and nothing else. The credential
 * itself is never returned, printed or written down — the page holds it, the
 * page sends it, and all this needs to know is whether it is still good.
 */
async function signedInUntil(page) {
  return page.evaluate(() => {
    try {
      const token = window.localStorage.getItem('juanmamoreno.adminToken');
      if (!token) return null;
      const claims = JSON.parse(atob(token.split('.')[1]));
      return typeof claims.exp === 'number' ? claims.exp * 1000 : null;
    } catch {
      return null;
    }
  });
}

/**
 * The atelier, open and signed in, or a reason it is not.
 *
 * Reloaded for each painting rather than kept: the shelf's Look button is
 * offered once per visit, and a fresh page is also how the app renews a token
 * that is about to run out.
 */
async function openAtelier(page, site) {
  await page.goto(`${site}/atelier`, { waitUntil: 'domcontentloaded', timeout: 60_000 });
  // The app restores its sign-in and may renew it, which is a round trip to
  // Google. Waited for rather than assumed.
  await page.waitForTimeout(4000);
  const until = await signedInUntil(page);
  if (!until) return 'nobody is signed in to this browser profile';
  if (until < Date.now()) return 'the sign-in in this browser profile has run out';
  return null;
}

/**
 * The page ready to keep this painting's files.
 *
 * Once per painting, not once per file. The token id goes in first because
 * that is what the save reads to file an asset under its painting — a keep
 * with an empty field is an asset belonging to nothing — and the Look button
 * is offered once a visit, after which the shelf stays up with every file on
 * it.
 */
async function readyFor(page, site, token) {
  const why = await openAtelier(page, site);
  if (why) throw new Error(why);

  const field = page.getByTestId('token-id');
  await field.fill(token);
  await field.press('Enter');
  // The painting itself is of no use here — the cut is long since done — but
  // the fetch is what tells the page what the painting is called, and that is
  // the name the asset is filed under.
  await page.getByTestId('chosen').waitFor({ timeout: 60_000 });

  const look = page.getByTestId('look-on-disk');
  if (await look.isDisabled()) {
    throw new Error('the page cannot reach the engine, so it cannot read the files');
  }
  await look.click({ timeout: 30_000 });
}

/**
 * Keeps one file, through the page's own button.
 *
 * Waits for that button to go away rather than for the word Kept to appear
 * anywhere: the shelf holds every file this painting produced, and "something
 * on the page says Kept" is true as soon as the first one is.
 */
async function keep(page, file) {
  const button = page.getByTestId(`recover-${file}`);
  await button.waitFor({ timeout: 60_000 });
  await button.click();
  await button.waitFor({ state: 'detached', timeout: 120_000 });
}

async function main() {
  const how = options(process.argv.slice(2));
  const chrome = findChrome();
  if (!chrome) throw new Error('no Chrome on this machine, so nothing can be kept');

  if (how.signIn) {
    said('Opening the atelier in the profile the night uses. Sign in, then close the window.');
    const context = await chromium.launchPersistentContext(how.profile, {
      executablePath: chrome,
      headless: false,
      viewport: null,
    });
    await (context.pages()[0] ?? (await context.newPage())).goto(`${how.site}/atelier`);
    await context.waitForEvent('close', { timeout: 0 });
    return;
  }

  const stopAt = deadline(how.until);
  const timeLeft = () => stopAt.getTime() - Date.now();
  said(`Until ${stopAt.toLocaleTimeString()}, from ${how.site}, through ${how.engine}.`);

  const health = await engineUp(how.engine);
  if (!health) throw new Error(`nothing answering at ${how.engine} — start the engine first`);

  const ledger = await ledgerOf.read(how.ledger);
  const paintings = await catalogue(await backendUrl());
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

    if (toCut.length) {
      // No browser for a dry run: the browser is here only to keep things, and
      // a dry run keeps nothing.
      const context = how.dry
        ? null
        : await chromium.launchPersistentContext(how.profile, {
            executablePath: chrome,
            headless: false,
            viewport: { width: 1400, height: 1000 },
          });
      const page = context ? (context.pages()[0] ?? (await context.newPage())) : null;

      try {
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

            if (keeping.length && !how.dry) {
              await readyFor(page, how.site, painting.tokenId);
            }
            for (const one of keeping) {
              if (how.dry) {
                said(`    ${one.subject}: would keep ${one.file}`);
                continue;
              }
              await keep(page, one.file);
              ledgerOf.recordKept(ledger, painting.tokenId, one.subject, one.file);
              said(`    ${one.subject}: kept`);
            }
          } catch (error) {
            // The painting is left in the ledger with its subjects and no
            // verdicts, so tomorrow tries it again. A failure here is a cold
            // card or a lapsed sign-in, not a decision about the painting.
            trouble.push(`${painting.tokenId} ${painting.name}: ${error.message}`);
            said(`    ${error.message}`);
            if (/signed in|run out/.test(error.message)) {
              said('    Stopping: nothing can be kept without a sign-in.');
              break;
            }
          }

          await ledgerOf.write(how.ledger, ledger);
          touched += 1;
        }
      } finally {
        await context?.close();
      }
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
