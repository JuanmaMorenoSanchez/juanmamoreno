/**
 * Checks that REQUIREMENTS.md still describes this repository.
 *
 * A changelog is a record of the past and cannot become false. A requirements
 * document is a claim about the present, and is false the moment the code
 * moves under it — which it does, quietly, one feature at a time. This is the
 * same idea as verify-render.mjs and for the same reason: the only documents
 * that stay true are the ones that fail the build when they stop being true.
 *
 * It was written after finding four requirements in this file marked "met ·
 * proven by" three Cypress specs that had been deleted fifteen releases
 * earlier, and five requirement numbers used twice for unrelated things.
 * Nobody had been careless; there was simply nothing checking.
 *
 * What fails the build:
 *   - a requirement number used twice
 *   - a requirement with no "Proven by:" at all
 *   - a proof naming a file that does not exist
 *   - a proof quoting a test that is not in the files it names
 *
 * What is only reported, because it is a judgement rather than a fault:
 *   - requirements whose only proof is prose, meaning nothing automated
 *     would notice if the behaviour disappeared
 *
 * Point it at another file to try it:  node scripts/verify-requirements.mjs some/fixture.md
 */
import { readFile } from 'node:fs/promises';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { glob } from 'node:fs/promises';

const HERE = dirname(fileURLToPath(import.meta.url));
const REPO = resolve(HERE, '..');
const DOC = resolve(process.argv[2] ?? join(REPO, 'REQUIREMENTS.md'));

/** Files that can stand as proof. Anything else in backticks is prose. */
const PROOF_FILE = /`([\w./-]+\.(?:ts|mjs|cjs|js|html|scss|json))`/g;

/**
 * A proof may point at the other half of the site — the backend is its own
 * repository and is not checked out here. Those are counted, not checked: the
 * alternative is failing this build for a file that was never meant to be in
 * it.
 */
const ELSEWHERE = /\bbackend\b/i;

/**
 * How far from a citation to look for the words saying it lives elsewhere.
 *
 * Judged per citation rather than per requirement, because a proof can name
 * one file here and one there — "`artwork-critic.component.spec.ts` ... and
 * `critics.controller.spec.ts` in the backend" is a real line in this
 * document, and only the second half belongs to another repository.
 */
const NEARBY = 48;

function citedElsewhere(proof, file) {
  const at = proof.indexOf(`\`${file}\``);
  if (at === -1) return false;
  return ELSEWHERE.test(proof.slice(Math.max(0, at - NEARBY), at + file.length + NEARBY));
}

const failures = [];
const fail = (id, message) => failures.push({ id, message });

const collapse = (text) => text.replace(/\s+/g, ' ').trim();

/**
 * Whether a cited file could actually fail if the behaviour went away.
 *
 * A test can. So can the checks the build runs over its own output. The file
 * that implements the behaviour cannot: citing it proves only that somebody
 * once wrote it, which is what "met" was already claiming.
 */
const isAutomatic = (path) =>
  // A hyphen as well as a dot: end-to-end specs are named app.e2e-spec.ts.
  /[.-](spec|test)\.[a-z]+$/.test(path) || path.split(/[\\/]/)[0] === 'scripts';

/** Every file in the repository, by name, so a citation need not give a path. */
async function filesByName() {
  const found = new Map();
  for await (const path of glob('**/*.{ts,mjs,cjs,js,html,scss,json}', {
    cwd: REPO,
    exclude: (name) => ['node_modules', 'dist', '.git', '.angular', 'coverage'].includes(name),
  })) {
    const name = path.split(/[\\/]/).pop();
    if (!found.has(name)) found.set(name, []);
    found.get(name).push(path);
  }
  return found;
}

/** The document, split into one entry per requirement. */
function requirements(markdown) {
  const heading = /^### ((?:R|B)\d+[a-z]?) — (.+?) · (.+)$/gm;
  const found = [];
  let match;
  while ((match = heading.exec(markdown))) {
    found.push({ id: match[1], title: match[2], status: match[3].trim(), start: match.index });
  }
  return found.map((entry, index) => ({
    ...entry,
    body: markdown.slice(entry.start, found[index + 1]?.start ?? markdown.length),
  }));
}

/**
 * What a requirement offers as proof: everything after "Proven by:".
 *
 * "Checked by:" is accepted as well, and means the opposite — it is how this
 * document says that nothing automatic covers a requirement, as B7 does about
 * essays repeating each other. Refusing to read it would punish the one entry
 * that is being honest about its own weakness.
 */
function proofOf(body) {
  const at = ['*Proven by:*', '*Checked by:*']
    .map((marker) => body.indexOf(marker))
    .filter((index) => index !== -1)
    .sort((a, b) => a - b)[0];
  return at === undefined ? null : body.slice(at);
}

const markdown = await readFile(DOC, 'utf8');
const entries = requirements(markdown);
if (!entries.length) {
  console.error(`verify-requirements: no requirements found in ${DOC}`);
  process.exit(1);
}

const present = await filesByName();

// 1. A number used twice. Two requirements called R27 are two things nobody
//    can refer to unambiguously, and it happens whenever a document is
//    appended to without reading it.
const seen = new Map();
for (const entry of entries) {
  if (seen.has(entry.id)) {
    fail(entry.id, `used twice: "${seen.get(entry.id)}" and "${entry.title}"`);
  } else {
    seen.set(entry.id, entry.title);
  }
}

let external = 0;
const unproven = [];

for (const entry of entries) {
  const proof = proofOf(entry.body);

  // 2. A requirement claiming a status while offering nothing for it.
  if (!proof) {
    fail(entry.id, `"${entry.title}" says nothing about what proves it`);
    continue;
  }

  const cited = [...proof.matchAll(PROOF_FILE)].map((match) => match[1]);

  // 3. A proof naming a file that is not here any more.
  const readable = [];
  const located = [];
  for (const file of cited) {
    const paths = present.get(file.split(/[\\/]/).pop());
    if (paths) {
      readable.push(join(REPO, paths[0]));
      located.push(paths[0]);
      continue;
    }
    if (citedElsewhere(proof, file)) {
      external += 1;
      continue;
    }
    fail(entry.id, `proof names \`${file}\`, which is not in the repository`);
  }

  // Pointing at the code that does the thing is not proof that it still does
  // it. Only a test, or one of the checks the build runs, would notice.
  if (!located.some(isAutomatic)) unproven.push(`${entry.id} — ${entry.title}`);

  // 4. A proof quoting a test that no longer exists. The file surviving is not
  //    the same as the test surviving, and a renamed test is the quieter half
  //    of this problem.
  const quoted = [...proof.matchAll(/"([^"]{4,})"/g)].map((match) => collapse(match[1]));
  if (!quoted.length || !readable.length) continue;

  const sources = collapse(
    (await Promise.all(readable.map((path) => readFile(path, 'utf8')))).join('\n')
  );
  for (const name of quoted) {
    if (!sources.includes(name)) {
      fail(entry.id, `proof quotes "${name}", which is in none of the files it names`);
    }
  }
}

console.log(
  `verify-requirements: ${entries.length} requirements, ${present.size} files, ` +
    `${external} proved in another repository`
);
if (unproven.length) {
  console.log(
    `verify-requirements: ${unproven.length} with no automated proof — nothing would ` +
      `notice if these stopped working:`
  );
  for (const line of unproven) console.log(`  ${line}`);
}

if (failures.length) {
  console.error(`\n${failures.length} problem(s):`);
  for (const { id, message } of failures) console.error(`  ${id} — ${message}`);
  process.exit(1);
}
console.log('verify-requirements: every requirement is proved by something that exists.');
