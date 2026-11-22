/**
 * The recorded api, and the rule for answering from it.
 *
 * Shared by the recorder and the harness so the two cannot disagree about where
 * a fixture lives or what its name is.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const API = 'https://backend.juanmamoreno.com';

/** Both hosts the app will try: the name, and the Cloud Run url behind it. */
export const API_HOSTS = ['backend.juanmamoreno.com', 'juanmamoreno-backend-*.run.app'];

export const FIXTURES = join(dirname(fileURLToPath(import.meta.url)), 'fixtures', 'api');

/** One file per endpoint, named so a person can see what it holds. */
export function fixtureFile(path) {
  return join(FIXTURES, `${path.replace(/^\/+/, '').replace(/\//g, '__')}.json`);
}

/**
 * What the api would have said, from disk — or an empty envelope.
 *
 * An unrecorded endpoint gets `{ success: true, data: null }`, which is the
 * shape every consumer already handles and precisely what the page got before
 * any of this existed: the api was being called on every run and every answer
 * was discarded unread, so an empty one is not a new state for the app to be in.
 *
 * Deliberately not an error. Errors are a different thing to test, and making
 * every unrecorded call fail would turn the recording list into something that
 * has to be exhaustive — which is how the expensive endpoints end up being
 * recorded, and billed, by someone keeping the suite green.
 */
export function recordedAnswer(path) {
  try {
    return { body: readFileSync(fixtureFile(path)), recorded: true };
  } catch {
    return { body: Buffer.from('{"success":true,"message":null,"data":null}'), recorded: false };
  }
}
