#!/usr/bin/env node
/**
 * Putting a part of the archive back.
 *
 *   node scripts/backup/restore.mjs firestore posts              what it would do
 *   node scripts/backup/restore.mjs firestore posts --yes        do it
 *   node scripts/backup/restore.mjs bucket juanmamoreno-originals --yes
 *   node scripts/backup/restore.mjs firestore posts --to-project somewhere-else
 *
 * **It refuses by default.** Nothing happens without `--yes`: a restore is the
 * one operation here that can destroy the thing it is meant to protect, and it
 * is run perhaps twice in a lifetime, so the cost of typing four more
 * characters is nothing against the cost of a half-remembered command doing
 * what it says. Without `--yes` it prints what it would write and stops.
 *
 * **It never deletes.** A document in the archive is written over whatever is
 * there now; a document that exists now and not in the archive is left exactly
 * as it is, and so is a field. This is a restore, not a reconciliation, and the
 * difference matters the day it is used in anger: the one thing worse than a
 * stale collection is a command meant to repair it removing the half that was
 * still good.
 *
 * **There is no chain restore, and there cannot be.** The certificates are on
 * Ethereum and that is not a thing a program puts back — `chain/certificates.json`
 * is there so the metadata can be read, and moved, without a node and without
 * Google, not so it can be rewritten. Asked for one, this says so.
 *
 * On a guarded page at /backups the same commands are shown with the folder
 * already filled in, which is the only way this is ever meant to be typed.
 */

import { execFileSync } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { typedDocument } from './shape.mjs';

const DEFAULT_FROM = join(process.cwd(), '..', 'juanmamoreno-archive', 'current');

const [kind, name] = process.argv.slice(2).filter((arg) => !arg.startsWith('--'));
const how = {
  from: flag('from', DEFAULT_FROM),
  project: flag('to-project', 'juanmamoreno'),
  yes: process.argv.includes('--yes'),
};

function flag(flagName, fallback) {
  const at = process.argv.indexOf(`--${flagName}`);
  return at === -1 ? fallback : (process.argv[at + 1] ?? fallback);
}

function stop(why) {
  console.error(why);
  process.exit(1);
}

if (!kind || !name) {
  stop(
    'Usage: restore.mjs firestore <collection> [--yes]\n' +
      '       restore.mjs bucket <bucket-name> [--yes]\n' +
      `       --from <dir>   (default ${DEFAULT_FROM})`
  );
}

if (kind === 'chain') {
  stop(
    'The chain is not restored from a backup. The certificates are on Ethereum and\n' +
      'carry their own metadata; chain/certificates.json is a readable copy of what\n' +
      'they say, for moving the catalogue elsewhere — not a thing to write back.'
  );
}

function token() {
  try {
    return execFileSync('gcloud', ['auth', 'print-access-token'], {
      encoding: 'utf8',
      shell: true,
    }).trim();
  } catch {
    stop('gcloud could not give an access token. Run `gcloud auth login` and try again.');
  }
}

async function firestore() {
  const at = join(how.from, 'firestore', `${name}.json`);
  const documents = JSON.parse(await readFile(at, 'utf8').catch(() => stop(`No backup at ${at}`)));
  if (!Array.isArray(documents)) stop(`${at} is not a list of documents.`);

  console.log(`${documents.length} documents in ${at}`);
  console.log(`They would be written to ${how.project} / ${name}, overwriting by id.`);
  if (!how.yes) {
    console.log('\nNothing was written. Add --yes to do it.');
    return;
  }

  const bearer = token();
  const base = `https://firestore.googleapis.com/v1/projects/${how.project}/databases/(default)/documents/${name}`;
  let written = 0;
  const failed = [];

  for (const document of documents) {
    if (!document?.id) {
      failed.push('(a document with no id)');
      continue;
    }
    // PATCH with no updateMask: the fields given are written, and a field the
    // live document has and the archive does not is left alone. Upsert, never
    // erase — the same choice the copy down makes by not deleting.
    const res = await fetch(`${base}/${encodeURIComponent(document.id)}`, {
      method: 'PATCH',
      headers: { authorization: `Bearer ${bearer}`, 'content-type': 'application/json' },
      body: JSON.stringify({ fields: typedDocument(document) }),
    });
    if (res.ok) written += 1;
    else failed.push(`${document.id} (${res.status})`);
  }

  console.log(`${written} written.`);
  if (failed.length) {
    console.error(`${failed.length} failed: ${failed.slice(0, 20).join(', ')}`);
    process.exit(1);
  }
}

function bucket() {
  const from = join(how.from, 'buckets', name);
  console.log(`${from}  →  gs://${name}`);
  console.log('Nothing in the bucket that is absent here would be deleted.');
  if (!how.yes) {
    console.log('\nNothing was uploaded. Add --yes to do it.');
    return;
  }
  // The same additive rsync as the copy down, in the other direction.
  execFileSync('gcloud', ['storage', 'rsync', '--recursive', from, `gs://${name}`], {
    stdio: 'inherit',
    shell: true,
  });
}

if (kind === 'firestore') await firestore();
else if (kind === 'bucket') bucket();
else stop(`Do not know how to restore "${kind}". It is firestore, or bucket.`);
