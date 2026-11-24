#!/usr/bin/env node
/**
 * A copy of everything the site is made of, on his own disk.
 *
 *   node scripts/backup/backup.mjs                     everything
 *   node scripts/backup/backup.mjs --only firestore    the part that changes
 *   node scripts/backup/backup.mjs --to D:/somewhere   another disk
 *   node scripts/backup/backup.mjs --dry-run           what it would do
 *
 * **Why this exists.** The paintings' permanence does not depend on Google: the
 * certificates carry their own metadata on Ethereum and the web-sized copies are
 * on Arweave, and both outlive any bill. Everything else does depend on it. The
 * essays, the career, what is sold, what has been posted, the record of each
 * painting and the eight gigabytes the nights have cut exist in exactly one
 * place, behind one account. This writes them somewhere that is not that
 * account, in a format nothing has to be running to read.
 *
 * **It takes nothing on trust and signs in as nobody.** There is no key here and
 * no `env.json`: the credential is his own gcloud sign-in, read at the moment it
 * is needed. So this runs on his laptop and nowhere else, which is the right
 * place for the one program that can read every collection at once.
 *
 * **Three things are deliberately not copied.** `instagram-token` is a live
 * credential and a backup of it is a credential on a disk; the chain is not
 * copied *back* from here, because it is the chain; and `gs://*_cloudbuild` and
 * `gs://run-sources-*` are build leftovers that the next push replaces. Each
 * one is written into the manifest as skipped, with its reason, so the page says
 * so rather than leaving a gap that looks like an oversight.
 */

import { execFileSync } from 'node:child_process';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import {
  decodeBytes,
  emptyManifest,
  plainDocument,
  readManifest,
  recordPart,
  recordSkipped,
  sha256,
  word,
} from './shape.mjs';

const PROJECT = 'juanmamoreno';

/**
 * Beside the repositories, not inside one.
 *
 * `juanmamoreno-archive` already holds the IPFS copy of the old collection, the
 * 186 originals and a dump of the collections as they stood on 10 September,
 * and its README says why it is there: "deliberately outside both repositories:
 * it is roughly a gigabyte, and it is not source code". Ten gigabytes inside an
 * Angular repository would fight the build's file watcher and sit one `git add
 * -f` away from being published. `.gitignore` carries `backup/` all the same,
 * so pointing `--to` inside the repository is safe rather than clever.
 */
const DEFAULT_TO = join(process.cwd(), '..', 'juanmamoreno-archive', 'current');

/** The certificates, holding their own metadata. See nft-constants.ts. */
const CONTRACT = '0x6E8b1D55B3fb934149b1125964a9c01a87995548';
/** Free, keyless, and the endpoint the backend itself reads. */
const RPC = 'https://ethereum-rpc.publicnode.com';
/** The ids are sparse — 2 to 196 with gaps — so the range is swept. */
const LAST_ID = 400;

/**
 * Collections never written to disk.
 *
 * One entry, and it is the only one that matters: these two documents are a
 * working Instagram credential. His standing rule is that no credential is
 * stored, and a dump of this collection is a credential stored in the plainest
 * possible way, in a folder with no password on it. It is also the one thing
 * here that cannot be restored from a backup anyway — a token has an expiry, so
 * a copy of last month's is worth nothing.
 */
const NEVER = { 'instagram-token': 'a live credential, which is never written to disk' };

/** Buckets the next deploy rebuilds, so copying them archives nothing. */
const DERIVED = {
  [`${PROJECT}_cloudbuild`]: 'build leftovers, replaced by the next push',
  [`run-sources-${PROJECT}-europe-west1`]: 'uploaded sources, replaced by the next push',
};

const how = {
  to: flag('to', DEFAULT_TO),
  only: flag('only', 'everything'),
  dryRun: process.argv.includes('--dry-run'),
};

function flag(name, fallback) {
  const at = process.argv.indexOf(`--${name}`);
  return at === -1 ? fallback : (process.argv[at + 1] ?? fallback);
}

function wants(part) {
  return how.only === 'everything' || how.only === part;
}

function say(line) {
  console.log(line);
}

/**
 * His own gcloud sign-in, as a bearer token.
 *
 * Not a service-account key, which would have to live somewhere, and not
 * application-default credentials, which are not set up on this machine. The
 * token lasts an hour, which is longer than the firestore and chain passes and
 * shorter than a full bucket mirror — so it is read again for each pass rather
 * than once at the top.
 */
function token() {
  try {
    return execFileSync('gcloud', ['auth', 'print-access-token'], {
      encoding: 'utf8',
      shell: true,
    }).trim();
  } catch {
    throw new Error(
      'gcloud could not give an access token. Run `gcloud auth login` and try again.'
    );
  }
}

/** Written through a temporary file: a half-written archive reads as a whole one. */
async function put(where, text) {
  if (how.dryRun) return text.length;
  await mkdir(dirname(where), { recursive: true });
  const beside = `${where}.writing`;
  await writeFile(beside, text, 'utf8');
  await rename(beside, where);
  return Buffer.byteLength(text);
}

// ───────────────────────────── Firestore ─────────────────────────────

const FIRESTORE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;

async function ask(url, bearer, body) {
  const res = await fetch(url, {
    method: body ? 'POST' : 'GET',
    headers: { authorization: `Bearer ${bearer}`, 'content-type': 'application/json' },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) throw new Error(`${res.status} from ${url.split('?')[0]}`);
  return res.json();
}

/**
 * Which collections there are, asked rather than listed here.
 *
 * The backend's `paths.ts` names eighteen and the database holds seventeen,
 * four of which that file has never heard of — `atelier-spend`, `cron-runs`,
 * `post-insights`, `vision-search` — and three of the named ones are empty
 * today and will not be forever. A hardcoded list would therefore already be
 * wrong, and would go on being wrong silently, which is the one failure a
 * backup must not have.
 */
async function collectionNames(bearer) {
  const answer = await ask(`${FIRESTORE}:listCollectionIds`, bearer, { pageSize: 300 });
  return (answer.collectionIds ?? []).sort();
}

/** Every document in one collection, following the pages to the end. */
async function documentsIn(name, bearer) {
  const documents = [];
  let pageToken;
  do {
    const url = new URL(`${FIRESTORE}/${name}`);
    url.searchParams.set('pageSize', '300');
    if (pageToken) url.searchParams.set('pageToken', pageToken);
    const page = await ask(url.toString(), bearer);
    for (const held of page.documents ?? []) documents.push(plainDocument(held));
    pageToken = page.nextPageToken;
  } while (pageToken);
  return documents;
}

async function firestore(manifest) {
  const bearer = token();
  const names = await collectionNames(bearer);
  say(`firestore: ${names.length} collections`);

  for (const name of names) {
    if (NEVER[name]) {
      manifest = recordSkipped(manifest, name, NEVER[name]);
      say(`  ${name.padEnd(18)} skipped — ${NEVER[name]}`);
      continue;
    }
    const documents = await documentsIn(name, bearer);
    const text = `${JSON.stringify(documents, null, 2)}\n`;
    const what = `firestore/${name}.json`;
    const bytes = await put(join(how.to, what), text);
    manifest = recordPart(manifest, {
      what,
      kind: 'firestore',
      name,
      documents: documents.length,
      bytes,
      sha256: sha256(text),
      takenAt: new Date().toISOString(),
    });
    say(`  ${name.padEnd(18)} ${String(documents.length).padStart(5)} documents`);
  }
  return manifest;
}

// ─────────────────────────────── Chain ───────────────────────────────

async function ethCall(data, attempts = 5) {
  for (let i = 0; i < attempts; i += 1) {
    try {
      const res = await fetch(RPC, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'eth_call',
          params: [{ to: CONTRACT, data }, 'latest'],
        }),
      });
      const body = await res.json();
      if (body.result) return body.result;
      if (body.error) throw new Error(body.error.message);
    } catch (error) {
      if (i === attempts - 1) throw error;
    }
    await new Promise((resolve) => setTimeout(resolve, 800 * (i + 1)));
  }
  throw new Error('unreachable');
}

/**
 * Every certificate, exactly as the contract serves it.
 *
 * The raw json of `record(uint256)` and not the shape the site turns it into:
 * this is the one copy whose job is to be the original, and a reshaped original
 * is a derivative. Inside each one is the small image as a data url, so the
 * painting itself — at the size the chain holds it — is in this file too.
 *
 * `totalSupply()` is read first and written beside the tokens, because a short
 * answer and a complete one look identical otherwise. The day the collection
 * was minted, an indexer served 87 of 186 and looked perfectly healthy.
 */
async function chain(manifest) {
  const expected = Number(BigInt(await ethCall('0x18160ddd')));
  say(`chain: ${CONTRACT} says it holds ${expected}`);

  const tokens = [];
  const unreadable = [];
  for (let id = 1; id <= LAST_ID; id += 1) {
    let present = false;
    try {
      present = BigInt(await ethCall(`0x4f558e79${word(id)}`)) === 1n;
    } catch {
      unreadable.push(id);
      continue;
    }
    if (!present) continue;
    try {
      tokens.push({
        tokenId: String(id),
        record: decodeBytes(await ethCall(`0x2c16cd8a${word(id)}`)),
      });
    } catch {
      unreadable.push(id);
    }
    if (tokens.length % 25 === 0) say(`  ${tokens.length} read…`);
  }

  // Said rather than thrown. A short sweep is still worth keeping — it is more
  // than was on disk a minute ago — but it must never be mistaken for the
  // collection, so the count the contract gave is written beside it.
  if (tokens.length !== expected) {
    say(`  WARNING: read ${tokens.length} of the ${expected} on chain.`);
  }
  if (unreadable.length)
    say(`  ${unreadable.length} ids could not be read: ${unreadable.join(', ')}`);

  const text = `${JSON.stringify({ contract: CONTRACT, chain: 'ethereum', expected, tokens }, null, 2)}\n`;
  const what = 'chain/certificates.json';
  const bytes = await put(join(how.to, what), text);
  return recordPart(manifest, {
    what,
    kind: 'chain',
    name: CONTRACT,
    tokens: tokens.length,
    expected,
    complete: tokens.length === expected,
    bytes,
    sha256: sha256(text),
    takenAt: new Date().toISOString(),
  });
}

// ─────────────────────────────── Buckets ──────────────────────────────

function gcloud(args) {
  return execFileSync('gcloud', args, { encoding: 'utf8', shell: true, maxBuffer: 1 << 28 });
}

/**
 * The buckets, mirrored down.
 *
 * **Additive on purpose: no `--delete-unmatched-destination-objects`.** That
 * flag is what makes an rsync a mirror, and a mirror is the wrong thing here. If
 * a bucket is ever emptied — by a mistake, a billing lapse, or somebody who
 * should not have the keys — the next run of this would faithfully empty the
 * copy too, and the backup would destroy itself at the exact moment it was
 * needed. So nothing here ever deletes. The cost is that a file deliberately
 * removed from a bucket stays on disk, which is a tidiness problem, and
 * tidiness is not what this program is for.
 */
async function buckets(manifest) {
  const listed = gcloud(['storage', 'ls'])
    .split('\n')
    .map((line) =>
      line
        .trim()
        .replace(/^gs:\/\//, '')
        .replace(/\/$/, '')
    )
    .filter(Boolean);

  for (const bucket of listed) {
    if (DERIVED[bucket]) {
      manifest = recordSkipped(manifest, `gs://${bucket}`, DERIVED[bucket]);
      say(`  ${bucket.padEnd(38)} skipped — ${DERIVED[bucket]}`);
      continue;
    }
    const what = `buckets/${bucket}`;
    const into = join(how.to, what);
    say(`  ${bucket.padEnd(38)} copying…`);
    if (!how.dryRun) {
      await mkdir(into, { recursive: true });
      gcloud(['storage', 'rsync', '--recursive', `gs://${bucket}`, into]);
    }

    // Asked of the bucket, not counted on disk: what the copy should hold is
    // the useful number, and a difference is then visible instead of agreed to.
    const du = gcloud(['storage', 'du', '--summarize', `gs://${bucket}`])
      .trim()
      .split(/\s+/);
    manifest = recordPart(manifest, {
      what,
      kind: 'bucket',
      name: bucket,
      bytes: Number(du[0]) || 0,
      takenAt: new Date().toISOString(),
    });
    say(`  ${bucket.padEnd(38)} ${(Number(du[0]) / 1e6).toFixed(1)} MB`);
  }
  return manifest;
}

// ──────────────────────────────── Run ─────────────────────────────────

const manifestAt = join(how.to, 'manifest.json');
let manifest = readManifest(await readFile(manifestAt, 'utf8').catch(() => ''));
if (manifest.parts.length === 0) manifest = emptyManifest();

say(`Writing to ${how.to}${how.dryRun ? ' (dry run — nothing will be written)' : ''}`);

if (wants('firestore')) manifest = await firestore(manifest);
if (wants('chain')) manifest = await chain(manifest);
if (wants('buckets')) {
  say('buckets:');
  manifest = await buckets(manifest);
}

manifest.takenAt = new Date().toISOString();
await put(manifestAt, `${JSON.stringify(manifest, null, 2)}\n`);

const bytes = manifest.parts.reduce((sum, part) => sum + (part.bytes ?? 0), 0);
say(`\n${manifest.parts.length} parts, ${(bytes / 1e9).toFixed(2)} GB. Manifest at ${manifestAt}`);
if (how.dryRun) say('Dry run: nothing was written.');
