/**
 * The archive's shapes, proved rather than trusted.
 *
 * `backup.mjs` and `restore.mjs` cannot be run here — both need a network and a
 * signed-in gcloud — so everything with a decision in it lives in `shape.mjs`,
 * and this is what holds it honest. The cases are the ones that would otherwise
 * be found the day the archive is read back in anger: an empty array arriving
 * as no array at all, a timestamp losing its microseconds, a partial refresh
 * backdating the nine gigabytes it did not touch.
 */

import assert from 'node:assert/strict';
import { test } from 'node:test';
import {
  decodeBytes,
  emptyManifest,
  plainDocument,
  plainValue,
  readManifest,
  recordPart,
  recordSkipped,
  typedDocument,
  typedValue,
  word,
} from './shape.mjs';

test('a document keeps its id and its fields, flat', () => {
  assert.deepEqual(
    plainDocument({
      name: 'projects/juanmamoreno/databases/(default)/documents/posts/abc123',
      fields: { tokenId: { stringValue: '14' }, posted: { booleanValue: true } },
    }),
    { id: 'abc123', tokenId: '14', posted: true }
  );
});

test('an empty array arrives with no values at all and must stay an array', () => {
  // The real shape from the rest api, and the reason this test exists: `urls:
  // []` in the dump on disk comes back as `{ arrayValue: {} }`, which reads as
  // null in the obvious implementation and silently empties every such field.
  assert.deepEqual(plainValue({ arrayValue: {} }), []);
  assert.deepEqual(plainValue({ mapValue: {} }), {});
});

test('a timestamp matches the dump already on disk, to the nanosecond', () => {
  assert.deepEqual(plainValue({ timestampValue: '2026-09-10T12:00:09.256000000Z' }), {
    _seconds: 1789041609,
    _nanoseconds: 256000000,
  });
  // Below the millisecond, which Date.parse throws away and the string keeps.
  assert.equal(
    plainValue({ timestampValue: '2026-09-10T12:00:09.123456789Z' })._nanoseconds,
    123456789
  );
});

test('an integer too large for a number keeps its digits', () => {
  assert.equal(plainValue({ integerValue: '42' }), 42);
  assert.equal(plainValue({ integerValue: '9007199254740993' }), '9007199254740993');
});

test('a document survives the round trip back to the api', () => {
  const was = {
    id: 'abc123',
    tokenId: '14',
    urls: [],
    count: 3,
    nested: { why: 'because' },
    createdAt: { _seconds: 1789041609, _nanoseconds: 256000000 },
  };
  const typed = typedDocument(was);
  // The id is the address, not a field: writing it back would add one.
  assert.equal(typed.id, undefined);
  assert.deepEqual(typed.urls, { arrayValue: { values: [] } });
  assert.deepEqual(typed.count, { integerValue: '3' });
  assert.deepEqual(typed.nested, { mapValue: { fields: { why: { stringValue: 'because' } } } });
  assert.match(typed.createdAt.timestampValue, /^2026-09-10T12:00:09/);
  // Back again, and the same document. A round trip through the api cannot keep
  // anything below the millisecond, which is one more reason the archive holds
  // the plain form rather than the api's own.
  assert.deepEqual(plainDocument({ name: 'x/y/abc123', fields: typed }), was);
});

test("a nested id is a field and is kept, unlike the document's own", () => {
  // The bug this exists to stop, and it was in the shipped first draft: the id
  // filter ran recursively, so every map with an `id` key lost it. 198 of the
  // 2201 documents in the real archive have one — each `posts` record holds the
  // id Instagram answered with at `response.id` — and a restore would have put
  // the collection back with the network's own reference to each post gone.
  // Found by running the conversion over the archive, not by this file.
  const was = {
    id: 'abc123',
    response: { id: '1752600673534102' },
    deeper: { one: { id: 'kept too' } },
    inAList: [{ id: 'also kept' }],
  };
  const typed = typedDocument(was);
  assert.equal(typed.id, undefined, "the document's own id is still not a field");
  assert.deepEqual(plainDocument({ name: 'x/y/abc123', fields: typed }), was);
});

test('null and undefined do not become the string "null"', () => {
  assert.deepEqual(typedValue(null), { nullValue: null });
  assert.deepEqual(typedValue(undefined), { nullValue: null });
  assert.equal(plainValue({ nullValue: null }), null);
});

test('a solidity bytes return decodes to the json the contract holds', () => {
  const json = '{"name":"Mañaneo I"}';
  const body = Buffer.from(json, 'utf8');
  const hex =
    '0x' +
    (32).toString(16).padStart(64, '0') +
    body.length.toString(16).padStart(64, '0') +
    body.toString('hex').padEnd(Math.ceil(body.length / 32) * 64, '0');
  assert.equal(decodeBytes(hex), json);
});

test('a token id becomes a 32-byte word', () => {
  assert.equal(word(186), '0'.repeat(62) + 'ba');
  assert.equal(word(186).length, 64);
});

test('a refresh of one part leaves the others at the date they were taken', () => {
  // The failure this prevents: running --only firestore and having the manifest
  // claim the eight gigabytes of atelier layers were copied this morning.
  let manifest = recordPart(emptyManifest(), {
    what: 'buckets/juanmamoreno-atelier',
    kind: 'bucket',
    bytes: 9223526558,
    takenAt: '2026-10-01T00:00:00.000Z',
  });
  manifest = recordPart(manifest, {
    what: 'firestore/posts.json',
    kind: 'firestore',
    documents: 392,
    takenAt: '2026-11-24T00:00:00.000Z',
  });
  manifest = recordPart(manifest, {
    what: 'firestore/posts.json',
    kind: 'firestore',
    documents: 393,
    takenAt: '2026-11-25T00:00:00.000Z',
  });

  assert.equal(manifest.parts.length, 2, 'the same part twice replaces, never doubles');
  const bucket = manifest.parts.find((part) => part.what === 'buckets/juanmamoreno-atelier');
  assert.equal(bucket.takenAt, '2026-10-01T00:00:00.000Z');
  const posts = manifest.parts.find((part) => part.what === 'firestore/posts.json');
  assert.equal(posts.documents, 393);
});

test('what was left out on purpose is recorded, so a gap is never a mystery', () => {
  const manifest = recordSkipped(emptyManifest(), 'instagram-token', 'a live credential');
  assert.deepEqual(manifest.skipped, [{ what: 'instagram-token', why: 'a live credential' }]);
  // Twice does not double it either.
  assert.equal(recordSkipped(manifest, 'instagram-token', 'changed my wording').skipped.length, 1);
});

test('a manifest of another version is treated as absent, not merged into', () => {
  assert.deepEqual(readManifest('{"version":99,"parts":[{"what":"x"}]}'), emptyManifest());
  assert.deepEqual(readManifest('not json at all'), emptyManifest());
  assert.deepEqual(readManifest(''), emptyManifest());
  assert.equal(readManifest('{"version":1,"parts":[{"what":"x"}]}').parts.length, 1);
});
