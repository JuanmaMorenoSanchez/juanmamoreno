/**
 * Turning what the apis answer into what the archive keeps, and nothing else.
 *
 * Separated from the two programs that use it because this is the part with
 * decisions in it, and the part a test can reach: neither `backup.mjs` nor
 * `restore.mjs` can be run without a network and a signed-in gcloud, so
 * anything they hold is trusted rather than proved.
 *
 * The format is not invented here. `juanmamoreno-archive/firestore-2026-09-10/`
 * already holds one dump per collection — an array of documents, each its `id`
 * and its fields, timestamps written as `{ _seconds, _nanoseconds }` — and
 * matching it is worth more than any improvement on it: the two dumps can then
 * be read by the same eye and the same program, and the older one does not
 * quietly become a different kind of thing.
 */

import { createHash } from 'node:crypto';

/** The shape of a manifest, so a later version can recognise an earlier one. */
export const VERSION = 1;

/**
 * One value, as the Firestore rest api spells it, in plain javascript.
 *
 * The rest api types every value — `{ stringValue: 'x' }` — where the admin sdk
 * hands back the value itself. That typing is worth losing: a plain archive can
 * be read by anything, and the whole point of this copy is that it outlives the
 * database it came from. Two types are kept in their wrapped form because
 * nothing in plain json can hold them: a timestamp, which matches the admin
 * sdk's own `{ _seconds, _nanoseconds }` and so matches the dump already on
 * disk, and bytes, which stay base64 and say so.
 */
export function plainValue(value) {
  if (!value || typeof value !== 'object') return null;
  if ('nullValue' in value) return null;
  if ('stringValue' in value) return value.stringValue;
  if ('booleanValue' in value) return value.booleanValue;
  if ('doubleValue' in value) return Number(value.doubleValue);
  if ('integerValue' in value) {
    // int64 over the wire, as a string. Narrowing it to a number is right for
    // every count and id here and wrong in the one case it would be silent
    // about, so that case keeps the string rather than losing digits.
    const asNumber = Number(value.integerValue);
    return Number.isSafeInteger(asNumber) ? asNumber : value.integerValue;
  }
  if ('timestampValue' in value) {
    const ms = Date.parse(value.timestampValue);
    if (Number.isNaN(ms)) return value.timestampValue;
    // Nanoseconds past the second, from the string rather than from `ms`, which
    // has already thrown away everything below the millisecond.
    const fraction = /\.(\d+)/.exec(value.timestampValue)?.[1] ?? '';
    return {
      _seconds: Math.floor(ms / 1000),
      _nanoseconds: Number(fraction.padEnd(9, '0').slice(0, 9)),
    };
  }
  if ('bytesValue' in value) return { _base64: value.bytesValue };
  if ('referenceValue' in value) return value.referenceValue;
  if ('geoPointValue' in value) return value.geoPointValue;
  // An empty array arrives as `{ arrayValue: {} }` with no `values` at all, and
  // an empty map likewise. Both must come out empty rather than null.
  if ('arrayValue' in value) return (value.arrayValue.values ?? []).map(plainValue);
  if ('mapValue' in value) return plainFields(value.mapValue.fields ?? {});
  return null;
}

/** Every field of a document or a map, in plain javascript. */
export function plainFields(fields) {
  return Object.fromEntries(Object.entries(fields).map(([key, held]) => [key, plainValue(held)]));
}

/**
 * One document, as the archive keeps it: its id, then its fields.
 *
 * `id` first and not nested, because that is how the dump on disk has it and
 * how every program here already reads a record. A document whose own fields
 * include an `id` would collide — none does, and if one ever did the field is
 * the one that matters, so it wins.
 */
export function plainDocument(document) {
  const id = String(document.name ?? '')
    .split('/')
    .pop();
  return { id, ...plainFields(document.fields ?? {}) };
}

/**
 * The reverse, for a restore: plain javascript as the rest api wants it back.
 *
 * Only the types `plainValue` can produce, which is the only promise worth
 * making: this reads the archive, not arbitrary json. A timestamp is recognised
 * by its two keys, which is why they were kept.
 */
export function typedValue(value) {
  if (value === null || value === undefined) return { nullValue: null };
  if (typeof value === 'string') return { stringValue: value };
  if (typeof value === 'boolean') return { booleanValue: value };
  if (typeof value === 'number') {
    return Number.isInteger(value) ? { integerValue: String(value) } : { doubleValue: value };
  }
  if (Array.isArray(value)) return { arrayValue: { values: value.map(typedValue) } };
  if (typeof value === 'object') {
    if ('_seconds' in value) {
      const ms = value._seconds * 1000 + Math.floor((value._nanoseconds ?? 0) / 1e6);
      return { timestampValue: new Date(ms).toISOString() };
    }
    if ('_base64' in value) return { bytesValue: value._base64 };
    return { mapValue: { fields: typedFields(value) } };
  }
  return { nullValue: null };
}

/**
 * Every key of a map, as the rest api wants it back. Nothing is dropped here.
 *
 * Used for nested maps as well as for a document, which is why it drops
 * nothing: see `typedDocument` for the one key that is not a field.
 */
export function typedFields(plain) {
  return Object.fromEntries(Object.entries(plain).map(([key, held]) => [key, typedValue(held)]));
}

/**
 * One whole document, as the rest api wants it back: its fields without its id.
 *
 * **`id` is dropped here and nowhere deeper, and that distinction is the whole
 * reason this function exists.** At the top level `id` is the document's
 * address, not one of its fields, and writing it back would add a field the
 * original never had. Inside a map it is an ordinary key — and 198 of the 2201
 * documents in the archive have one, because every `posts` record holds the id
 * Instagram answered with under `response.id`. Filtering inside `typedFields`
 * deleted every one of them, silently, and a restore would have put the
 * collection back with the network's own reference to each post missing. The
 * synthetic test passed; running the conversion over the real archive is what
 * found it.
 */
export function typedDocument(plain) {
  const { id, ...fields } = plain;
  void id;
  return typedFields(fields);
}

/**
 * A solidity `bytes` return, as a string.
 *
 * The same three steps as the backend's `CertificatesService.decodeBytes`, and
 * deliberately a copy rather than a shared module: these are two repositories,
 * and the reason this archive exists at all is that one day one of them may not
 * be there. Eighteen lines duplicated is the price of that, and it is cheap.
 */
export function decodeBytes(hex) {
  const body = hex.slice(2);
  const offset = Number(BigInt(`0x${body.slice(0, 64)}`)) * 2;
  const length = Number(BigInt(`0x${body.slice(offset, offset + 64)}`)) * 2;
  return Buffer.from(body.slice(offset + 64, offset + 64 + length), 'hex').toString('utf8');
}

/** A 32-byte word holding one number, for an `eth_call` argument. */
export function word(value) {
  return BigInt(value).toString(16).padStart(64, '0');
}

export function sha256(bytes) {
  return createHash('sha256').update(bytes).digest('hex');
}

/** A manifest with nothing in it, which is what a first run starts from. */
export function emptyManifest() {
  return { version: VERSION, parts: [], skipped: [] };
}

/**
 * The manifest on disk, or an empty one.
 *
 * A manifest of another version is treated as absent rather than merged into:
 * the parts in it mean whatever that version meant by them, and guessing is how
 * a backup comes to describe itself wrongly — which is worse than not
 * describing itself at all, because the page believes it.
 */
export function readManifest(text) {
  try {
    const said = JSON.parse(text);
    if (said?.version !== VERSION || !Array.isArray(said.parts)) return emptyManifest();
    return { ...emptyManifest(), ...said };
  } catch {
    return emptyManifest();
  }
}

/**
 * One part recorded, replacing whatever was known about it before.
 *
 * **Every part carries its own `takenAt`, and this is the whole reason.** A
 * refresh of the firestore collections alone is the ordinary way to run this —
 * it takes seconds, where the buckets take an hour — and a single date at the
 * top of the manifest would then say the nine gigabytes of paintings were
 * copied this morning when they were copied in October. A backup that lies
 * about its own age is worse than a stale one, because nobody goes and looks.
 */
export function recordPart(manifest, part) {
  const parts = manifest.parts.filter((held) => held.what !== part.what);
  parts.push(part);
  parts.sort((a, b) => a.what.localeCompare(b.what));
  return { ...manifest, parts };
}

/** What was left out on purpose, so the page can say so rather than imply it. */
export function recordSkipped(manifest, what, why) {
  const skipped = manifest.skipped.filter((held) => held.what !== what);
  skipped.push({ what, why });
  skipped.sort((a, b) => a.what.localeCompare(b.what));
  return { ...manifest, skipped };
}
