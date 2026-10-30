/**
 * Where a cut goes once it has been judged worth keeping.
 *
 * **This used to be a button press in a browser.** The credential lived in the
 * page's own storage, so the night drove Chrome and clicked the atelier's save
 * button — and that could never work, for a reason that has nothing to do with
 * this repository: Google does not show its sign-in screens to a browser that
 * something is driving. The one step that had to happen in a real browser was
 * the only step a driven browser could not do.
 *
 * So the night carries its own credential. `gcloud` on this machine is already
 * signed in as him and will hand out a Google-signed identity token for his
 * address on demand, for ever, with nothing to click; the backend's guard
 * accepts it because it checks the signature, the issuer, and above all whose
 * address it is. Keeping is then the same http request the page was making all
 * along — with no window open at three in the morning, and no hourly renewal
 * to go wrong.
 *
 * The token is held in memory, never printed, never written down, and never
 * put in an error message.
 */

import { execFile } from 'node:child_process';
import { promisify } from 'node:util';

const run = promisify(execFile);

/**
 * `gcloud` is a batch file on Windows, which cannot be started directly: it
 * needs a shell. Safe here because every argument below is a literal — nothing
 * from the catalogue, the ledger or the command line reaches this call.
 */
const GCLOUD = process.env.GCLOUD ?? (process.platform === 'win32' ? 'gcloud.cmd' : 'gcloud');
const THROUGH_A_SHELL = process.platform === 'win32';

/** Treated as spent a minute early, so one is never used as it turns. */
const SOON = 60_000;

/** How long to wait for the bucket. A layer is a few megabytes over wifi. */
const KEEP_PATIENCE = 120_000;

let held = null;

/**
 * A current identity token for his own account.
 *
 * Held until it is nearly spent rather than fetched per asset: `gcloud` is a
 * subprocess and nine hundred of them is twenty minutes of nothing.
 */
export async function credential() {
  if (held && held.until - SOON > Date.now()) return held.token;

  let said;
  try {
    said = await run(GCLOUD, ['auth', 'print-identity-token'], { shell: THROUGH_A_SHELL });
  } catch (error) {
    throw new Error(`gcloud would not hand over an identity: ${firstLine(error.message)}`);
  }

  const token = said.stdout.trim();
  // Deliberately says nothing about what did come back. Whatever this is, it
  // is the place a credential would be, and it is not going in a log.
  if (!token.startsWith('ey')) {
    throw new Error('gcloud answered with something that is not an identity token');
  }

  held = { token, until: expiryOf(token) ?? Date.now() + 30 * 60_000 };
  return token;
}

/** Lets a run start over, when the shelf has said the credential is no good. */
export function forgetCredential() {
  held = null;
}

/** When a token stops being good, read from its own claim. */
function expiryOf(token) {
  try {
    const claims = JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString('utf8'));
    return typeof claims.exp === 'number' ? claims.exp * 1000 : null;
  } catch {
    return null;
  }
}

const firstLine = (said) => String(said).split('\n')[0];

/**
 * One file the engine has on disk, by name.
 *
 * By name rather than off the listing, which is the other thing the browser
 * was costing: `/out` offers the twenty-four newest files, so keeping had to
 * happen painting by painting before the next cut buried it. Nothing here
 * depends on that any more.
 */
export async function fileBytes(engine, file) {
  const response = await fetch(`${engine}/layer/${encodeURIComponent(file)}`, {
    signal: AbortSignal.timeout(KEEP_PATIENCE),
  });
  if (!response.ok) throw new Error(`the engine answered ${response.status} for ${file}`);
  return Buffer.from(await response.arrayBuffer());
}

/**
 * What a png says it measures, from its header.
 *
 * Eight bytes of signature, then the first chunk, which the format requires to
 * be the one holding the dimensions. The page had to load the image into the
 * browser to learn this; twenty-four bytes say it exactly.
 */
export function sizeOf(png) {
  if (png.length < 24 || png.readUInt32BE(12) !== 0x49484452) return { width: 0, height: 0 };
  return { width: png.readUInt32BE(16), height: png.readUInt32BE(20) };
}

/**
 * What this cut is, as the shelf files it.
 *
 * The same rule as the page's own `kindOf` (`src/app/features/atelier/kind-of.ts`),
 * which reads it off a file name because a file name is all the page has. Here
 * the subject is known, and the two agree because the engine names each file
 * after the subject it cut.
 */
export function kindFor(subject, also = []) {
  if (subject.includes('background')) return 'background';

  // Every name this one cut answered to, not only the first. Three at most:
  // the backend keeps eighty characters and a name nobody can read is no
  // better than a wrong one.
  const named = [subject, ...also];
  const slug = named
    .slice(0, 3)
    .map((one) =>
      one
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/^-+|-+$/g, '')
    )
    .filter(Boolean)
    .join('-and-');

  if (!slug) return 'layer';
  return named.length > 3 ? `layer-${slug}-and-more` : `layer-${slug}`;
}

/**
 * Keeps one cut, as the painting it came out of.
 *
 * Refused once is not refused, exactly as on the page: the usual reason for a
 * 403 is an hour-old credential rather than anything about the bytes, so it is
 * forgotten and asked for again. Once, not in a loop — a second refusal is
 * about something else, and sending the same megabytes a third time helps
 * nobody.
 */
export async function keep(backend, bytes, about) {
  const sent = async () => {
    const form = new FormData();
    form.append('piece', new Blob([bytes], { type: 'image/png' }), `${about.kind}.png`);
    form.append('name', about.name);
    form.append('kind', about.kind);
    form.append('media', 'image/png');
    form.append('width', String(about.width));
    form.append('height', String(about.height));
    form.append('tokenId', about.tokenId);

    return fetch(`${backend}atelier-pieces`, {
      method: 'POST',
      headers: { Authorization: `Bearer ${await credential()}` },
      body: form,
      signal: AbortSignal.timeout(KEEP_PATIENCE),
    });
  };

  let response = await sent();
  if (response.status === 401 || response.status === 403) {
    forgetCredential();
    response = await sent();
  }
  if (!response.ok) {
    throw new Error(`the shelf answered ${response.status} — nothing was kept`);
  }
  return response.json();
}
