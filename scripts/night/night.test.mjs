/**
 * The decisions the night makes without anybody there.
 *
 * Three things are worth a test and the rest is plumbing: that a refused
 * subject is never offered again, so the catalogue can actually empty; that a
 * mask which has escaped is caught by arithmetic, since nothing looks at it;
 * and that whatever shape the vision model answers in, what reaches the
 * segmenter is a short list of phrases.
 */

import { strict as assert } from 'node:assert';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { describe, it } from 'node:test';

import { BACKGROUND, TOO_LITTLE, TOO_MUCH, TOO_UNSURE, copyOf, decide, verdict } from './judge.mjs';
import * as ledger from './ledger.mjs';
import { MOST_SUBJECTS, subjectsIn } from './subjects.mjs';

/** A layer as the engine reports one, good unless something is said otherwise. */
const layer = (said = {}) => ({ label: 'the girl', coverage: 0.2, iou: 0.92, ...said });

describe('what the night keeps', () => {
  it('keeps a plausible cut', () => {
    assert.equal(verdict(layer()).keep, true);
  });

  it('refuses a mask that has swallowed the painting', () => {
    const said = verdict(layer({ coverage: TOO_MUCH + 0.05 }));

    assert.equal(said.keep, false);
    // The reason is written to the ledger and read in the morning, so it says
    // what happened rather than naming a constant.
    assert.match(said.why, /of the canvas/);
  });

  it('refuses a speck', () => {
    assert.equal(verdict(layer({ coverage: TOO_LITTLE / 2 })).keep, false);
  });

  it('refuses a mask that was unsure of itself', () => {
    assert.equal(verdict(layer({ iou: TOO_UNSURE - 0.1 })).keep, false);
  });

  it('refuses a layer the engine reported nothing about', () => {
    // Rather than treating a missing number as a zero and keeping it.
    assert.equal(verdict({ label: 'the girl' }).keep, false);
  });

  it('keeps a figure that fills most of the frame', () => {
    // The bar is set to catch an escaped mask, not a close composition: these
    // are paintings of people and plenty of them are mostly the person.
    assert.equal(verdict(layer({ coverage: 0.7 })).keep, true);
  });
});

describe('one cut with two names', () => {
  /**
   * The real numbers off "Cuando éramos felices", which holds an embrace.
   *
   * Asked for the woman, the man and the kiss, the detector returned the same
   * box three times and the segmenter the same mask. Every one of them passed
   * every other bar, and all three were the same picture.
   */
  const woman = { label: 'a woman in green', box: [310, 90, 2420, 3000], coverage: 0.485 };
  const man = { label: 'a man in red', box: [300, 95, 2400, 3000], coverage: 0.484 };
  const kiss = { label: 'a kiss', box: [312, 92, 2415, 3000], coverage: 0.482 };
  const cup = { label: 'a blue cup', box: [100, 1900, 420, 2400], coverage: 0.013 };

  it('lets the first one through', () => {
    assert.equal(copyOf(woman, []), null);
  });

  it('calls the second one what the first one was', () => {
    assert.equal(copyOf(man, [woman]), 'a woman in green');
    assert.equal(copyOf(kiss, [woman]), 'a woman in green');
  });

  it('leaves a real second thing alone', () => {
    assert.equal(copyOf(cup, [woman]), null);
  });

  it('is not fooled by two things that happen to be the same size', () => {
    // Same coverage, nowhere near each other.
    const elsewhere = { label: 'a shadow', box: [2600, 0, 3000, 3000], coverage: 0.485 };

    assert.equal(copyOf(elsewhere, [woman]), null);
  });

  it('says nothing about a layer from an engine that reports no box', () => {
    // An older engine. Nothing is refused on the strength of a missing number.
    assert.equal(copyOf({ label: 'a kiss', coverage: 0.48 }, [woman]), null);
  });
});

describe('everything one painting decided', () => {
  /** "Cuando éramos felices" as the engine actually reported it. */
  const made = {
    layers: [
      {
        label: 'a woman in green',
        file: 'b-a-woman-in-green.png',
        box: [310, 90, 2420, 2500],
        coverage: 0.485,
        iou: 0.93,
      },
      {
        label: 'a man in red',
        file: 'b-a-man-in-red.png',
        box: [300, 95, 2400, 2500],
        coverage: 0.484,
        iou: 0.92,
      },
      {
        label: 'a blue cup',
        file: 'b-a-blue-cup.png',
        box: [100, 1900, 420, 2300],
        coverage: 0.013,
        iou: 0.95,
      },
      {
        label: 'a white railing',
        file: 'b-a-white-railing.png',
        box: [0, 1200, 2500, 2500],
        coverage: 0.131,
        iou: 0.48,
      },
      {
        label: 'a tree shadow',
        file: 'b-a-tree-shadow.png',
        box: [0, 0, 2500, 2500],
        coverage: 0.856,
        iou: 0.88,
      },
      {
        label: 'a kiss',
        file: 'b-a-kiss.png',
        box: [312, 92, 2415, 2500],
        coverage: 0.482,
        iou: 0.91,
      },
    ],
    background: { file: 'b-background.png', coverage: 0.036 },
    not_found: [],
  };
  const wanted = [...made.layers.map((one) => one.label), BACKGROUND];

  it('keeps the woman, the cup and the background, and nothing else', () => {
    const { keeping } = decide(made, wanted);

    assert.deepEqual(
      keeping.map((one) => one.subject),
      ['a woman in green', 'a blue cup', BACKGROUND]
    );
  });

  it('gives every subject a verdict, which is what lets a painting finish', () => {
    const { keeping, refused } = decide(made, wanted);
    const decided = [...keeping.map((one) => one.subject), ...refused.map((one) => one.subject)];

    assert.deepEqual(decided.sort(), [...wanted].sort());
  });

  it('leaves the background alone when it is not wanted any more', () => {
    // A painting finished across two nights: the background was kept the
    // first time, so only the cup was asked for and only the cup comes back.
    const second = { layers: [made.layers[2]], background: { file: 'c-background.png' } };

    const { keeping } = decide(second, ['a blue cup']);

    assert.deepEqual(
      keeping.map((one) => one.subject),
      ['a blue cup']
    );
  });

  it('refuses the background when nothing was cut out of the painting', () => {
    // Every subject failed, so there is no remainder — and if this were left
    // pending the painting would be offered again every night for ever.
    const { keeping, refused } = decide({ layers: [] }, [BACKGROUND]);

    assert.deepEqual(keeping, []);
    assert.equal(refused[0].subject, BACKGROUND);
    assert.match(refused[0].why, /no remainder/);
  });

  it('writes down a label the detector would not even guess at', () => {
    const { refused } = decide({ layers: [], not_found: ['a unicorn'] }, ['a unicorn']);

    assert.deepEqual(refused, [{ subject: 'a unicorn', why: 'the detector found nothing' }]);
  });
});

describe('what the night does next', () => {
  it('offers nothing for a painting it has never looked at', () => {
    assert.deepEqual(ledger.leftToCut(ledger.empty(), '202'), []);
    assert.equal(ledger.finished(ledger.empty(), '202'), false);
  });

  it('offers every subject once it has looked', () => {
    const held = ledger.recordSubjects(ledger.empty(), '202', 'Painting 202', [
      'the girl',
      'the chair',
    ]);

    assert.deepEqual(ledger.leftToCut(held, '202'), ['the girl', 'the chair']);
  });

  it('stops offering one it kept', () => {
    const held = ledger.recordSubjects(ledger.empty(), '202', 'Painting 202', [
      'the girl',
      'the chair',
    ]);
    ledger.recordKept(held, '202', 'the girl', 'layer-the-girl');

    assert.deepEqual(ledger.leftToCut(held, '202'), ['the chair']);
  });

  it('stops offering one it refused, which is why the catalogue can empty', () => {
    // The case a ledger of successes gets wrong: a painting with one bad
    // subject is otherwise first in the queue again every night for ever.
    const held = ledger.recordSubjects(ledger.empty(), '202', 'Painting 202', ['the girl']);
    ledger.recordRefused(held, '202', 'the girl', 'it covers 91.0% of the canvas');

    assert.deepEqual(ledger.leftToCut(held, '202'), []);
    assert.equal(ledger.finished(held, '202'), true);
  });

  it('counts a painting whose every subject was refused as done', () => {
    const held = ledger.recordSubjects(ledger.empty(), '202', 'Painting 202', ['a unicorn']);
    ledger.recordRefused(held, '202', 'a unicorn', 'it covers 0.1% of the canvas');

    assert.deepEqual(ledger.tally(held), { paintings: 1, done: 1, kept: 0, refused: 1 });
  });

  it('describes a painting again only if nothing was named in it', () => {
    const held = ledger.recordSubjects(ledger.empty(), '202', 'Painting 202', ['the girl']);

    assert.equal(ledger.described(held, '202'), true);
    assert.equal(ledger.described(held, '203'), false);
  });
});

describe('the ledger on disk', () => {
  it('comes back as it went in', async () => {
    const where = join(await mkdtemp(join(tmpdir(), 'night-')), 'night.json');
    const held = ledger.recordSubjects(ledger.empty(), '202', 'Painting 202', ['the girl']);
    ledger.recordKept(held, '202', 'the girl', 'layer-the-girl');

    await ledger.write(where, held);

    assert.deepEqual(await ledger.read(where), held);
  });

  it('treats a half-written file as a machine that has never run', async () => {
    // A laptop that sleeps mid-write. Starting over costs card time; refusing
    // to start costs the whole night.
    const where = join(await mkdtemp(join(tmpdir(), 'night-')), 'night.json');
    await writeFile(where, '{"version": 1, "paint', 'utf8');

    assert.deepEqual(await ledger.read(where), ledger.empty());
  });

  it('leaves no half-written file behind', async () => {
    const where = join(await mkdtemp(join(tmpdir(), 'night-')), 'night.json');

    await ledger.write(where, ledger.empty());

    // Written beside and renamed, so what is at this path is always whole.
    assert.equal(JSON.parse(await readFile(where, 'utf8')).version, 1);
  });
});

describe('what the painting said is in it', () => {
  it('reads one thing per line', () => {
    assert.deepEqual(subjectsIn('the girl\nthe wooden chair\n'), ['the girl', 'the wooden chair']);
  });

  it('strips the numbering a model adds however it was asked not to', () => {
    assert.deepEqual(subjectsIn('1. the girl\n2) the chair\n- a red curtain'), [
      'the girl',
      'the chair',
      'a red curtain',
    ]);
  });

  it('drops a sentence', () => {
    // The model explaining itself rather than listing. Dropped, not repaired.
    const said = subjectsIn('the girl\nThis painting shows a young woman seated by a window.');

    assert.deepEqual(said, ['the girl']);
  });

  it('drops a single word', () => {
    // Almost always the model answering about the painting — "figures",
    // "oil", "composition" — rather than naming a thing in it.
    assert.deepEqual(subjectsIn('figures\nthe girl'), ['the girl']);
  });

  it('drops the background, which is cut anyway', () => {
    // It comes back from every cut as the remainder of everything else, so
    // asking for it as a thing would cut it twice and name one of them wrong.
    assert.deepEqual(subjectsIn('the girl\nthe dark background'), ['the girl']);
  });

  it('says each thing once', () => {
    assert.deepEqual(subjectsIn('the girl\nThe Girl\n'), ['the girl']);
  });

  it('stops at six, however long the list', () => {
    const said = subjectsIn(Array.from({ length: 20 }, (_, at) => `the thing ${at}`).join('\n'));

    assert.equal(said.length, MOST_SUBJECTS);
  });

  it('drops a remark that happens to be the right length', () => {
    // A thing is named with an article; a sentence about the painting is not,
    // and "oil on linen" would otherwise be cut out of every canvas.
    assert.deepEqual(subjectsIn('oil on linen\nthe girl'), ['the girl']);
  });

  it('answers nothing for an answer that named nothing', () => {
    assert.deepEqual(subjectsIn(''), []);
    assert.deepEqual(subjectsIn('I cannot tell.'), []);
  });
});
