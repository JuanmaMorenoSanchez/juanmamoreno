import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';
import { DownloadButtonComponent } from '@shared/components/download-button/download-button.component';
import { PendingMintComponent } from './pending-mint.component';

/**
 * A certificate that has been prepared and not yet written is the one place the
 * photograph exists in full and cannot be reached: the painting has no page,
 * because it is not on the chain, and this list only ever showed a thumbnail
 * the size of a postage stamp.
 */
const waiting: PendingMint = {
  tokenId: 198,
  name: 'Rockets win III',
  description: 'Oil on canvas, 140,5 × 116 cm, 2026.',
  external_url: 'https://juanmamoreno.com/artwork/198',
  attributes: [
    { trait_type: 'Medium', value: 'Oil on canvas' },
    { trait_type: 'Height', value: '140,5' },
    { trait_type: 'Width', value: '116' },
    { trait_type: 'Unit', value: 'cm' },
    { trait_type: 'Year', value: '2026' },
  ],
  thumbnailBase64: 'Lw==',
  webUrl: 'https://arweave.net/abc',
  originalUrl: 'https://storage.googleapis.com/juanmamoreno-originals/198.jpg',
  preparedAt: '2026-09-15T08:00:00.000Z',
};

/** What the api was asked to store, so a test can read it back. */
let amended: Array<{ tokenId: number; facts: Record<string, unknown> }>;
let refuse: string | null;
/** What the api says is stored as the note for the essay, and whether it can say. */
let storedClues: string;
let refuseClues: boolean;

function setup(list: PendingMint[] = [waiting]) {
  amended = [];
  refuse = null;
  storedClues = '';
  refuseClues = false;
  TestBed.configureTestingModule({
    imports: [PendingMintComponent],
    providers: [
      // The download button is shared with the artwork pages and speaks both
      // languages; this page only exists in one, but the pipe still wants a
      // service to ask.
      provideTranslateService(),
      {
        provide: MintApiService,
        useValue: {
          waiting: () => Promise.resolve(list),
          clues: () =>
            refuseClues ? Promise.reject(new Error('no')) : Promise.resolve(storedClues),
          amend: (tokenId: number, facts: Record<string, unknown>) => {
            if (refuse) return Promise.reject({ error: { message: refuse } });
            amended.push({ tokenId, facts });
            return Promise.resolve({ ...waiting, ...facts, tokenId });
          },
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(PendingMintComponent);
  fixture.detectChanges();
  return fixture;
}

/** The component's own workings, which is where the corrections are made. */
type Editing = {
  editing: () => number | null;
  draft: () => Record<string, string>;
  edit(mint: PendingMint): void;
  stopEditing(): void;
  write(field: 'name' | 'description' | 'clues', event: Event): void;
  cluesKnown: () => boolean;
  pick(field: 'medium' | 'unit' | 'year' | 'imageType', event: Event): void;
  measure(field: 'height' | 'width', event: Event): void;
  save(): Promise<void>;
  canSave: () => boolean;
  reshaped: () => boolean;
  years: () => string[];
  outcome: () => string;
  problem: () => string;
};

const inside = (fixture: { componentInstance: unknown }) =>
  fixture.componentInstance as unknown as Editing;

const typed = (value: string) => ({ target: { value } }) as unknown as Event;

describe('PendingMintComponent — taking the photograph back off the list', () => {
  it('offers the stored file on every certificate waiting', async () => {
    const fixture = setup();
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.debugElement
      .queryAllNodes((node) => node.injector?.get(DownloadButtonComponent, null) !== null)
      .map((node) => node.injector?.get(DownloadButtonComponent, null))
      .find((instance): instance is DownloadButtonComponent => !!instance);

    expect(button).toBeTruthy();
    // The original first, which is the whole file the studio produced and the
    // largest thing stored. The web copy is only there in case it is not.
    expect(button?.links()[0]).toBe(waiting.originalUrl);
    expect(button?.links()).toContain(waiting.webUrl);
  });

  it('names the file after the certificate it belongs to', async () => {
    const fixture = setup();
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.debugElement
      .queryAllNodes((node) => node.injector?.get(DownloadButtonComponent, null) !== null)
      .map((node) => node.injector?.get(DownloadButtonComponent, null))
      .find((instance): instance is DownloadButtonComponent => !!instance);

    // Two certificates can share a title — the studio warns about exactly that
    // — so the token id is what tells two downloads apart.
    expect(button?.name()).toBe('198 Rockets win III');
  });

  it('offers nothing when nothing is waiting', async () => {
    const fixture = setup([]);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-download-button')).toBe(null);
  });
});

/**
 * A prepared certificate is a draft, and every fault the migration found in the
 * old collection was a typed one: two misspellings of the artist, a missing
 * unit, a title ending in a space, a "spash". Until now the only way to correct
 * a letter was to throw the draft away and prepare it again, which spent a
 * token id and a second upload doing it.
 */
describe('PendingMintComponent — correcting what a certificate says', () => {
  it('reads the certificate into the form, traits and all', async () => {
    const fixture = setup();
    await fixture.whenStable();
    const page = inside(fixture);

    page.edit(waiting);

    expect(page.editing()).toBe(198);
    expect(page.draft()['name']).toBe('Rockets win III');
    expect(page.draft()['medium']).toBe('Oil on canvas');
    expect(page.draft()['height']).toBe('140,5');
    expect(page.draft()['year']).toBe('2026');
    expect(page.draft()['description']).toBe(waiting.description);
  });

  it('sends the correction against the certificate it was opened on', async () => {
    const fixture = setup();
    await fixture.whenStable();
    const page = inside(fixture);
    page.edit(waiting);

    page.write('name', typed('Rockets win IV'));
    await page.save();

    expect(amended).toHaveLength(1);
    expect(amended[0].tokenId).toBe(198);
    expect(amended[0].facts['name']).toBe('Rockets win IV');
    // Closed again, and the list read afresh rather than patched in place.
    expect(page.editing()).toBe(null);
    expect(page.outcome()).toContain('198');
  });

  it('tidies a measurement on the way out, as the studio does', async () => {
    const fixture = setup();
    await fixture.whenStable();
    const page = inside(fixture);
    page.edit(waiting);

    // Half-written, which is what a box being typed into looks like.
    page.measure('height', typed('141,'));
    await page.save();

    expect(amended[0].facts['height']).toBe('141');
  });

  it('refuses to save a title that is only spaces', async () => {
    const fixture = setup();
    await fixture.whenStable();
    const page = inside(fixture);
    page.edit(waiting);

    page.write('name', typed('   '));

    expect(page.canSave()).toBe(false);
    await page.save();
    expect(amended).toHaveLength(0);
  });

  it('says when the measurements no longer describe the picture', async () => {
    const fixture = setup();
    await fixture.whenStable();
    const page = inside(fixture);
    page.edit(waiting);

    expect(page.reshaped()).toBe(false);

    // The picture was squared up to the old numbers and is stored flattened.
    // Correcting the number corrects what the certificate says and nothing else.
    page.measure('width', typed('161'));

    expect(page.reshaped()).toBe(true);
  });

  it('keeps a year the list does not offer, rather than swapping it silently', async () => {
    const old = { ...waiting, attributes: [{ trait_type: 'Year', value: '1998' }] };
    const fixture = setup([old]);
    await fixture.whenStable();
    const page = inside(fixture);

    page.edit(old);

    expect(page.draft()['year']).toBe('1998');
    expect(page.years()).toContain('1998');
  });

  it('says so and stays open when the api refuses', async () => {
    const fixture = setup();
    await fixture.whenStable();
    const page = inside(fixture);
    page.edit(waiting);
    refuse = 'The year should be four digits.';

    await page.save();

    expect(page.problem()).toBe('The year should be four digits.');
    // Still open, because the correction has not been made and closing the form
    // would throw away what was typed.
    expect(page.editing()).toBe(198);
  });

  it('forgets the draft when the correction is abandoned', async () => {
    const fixture = setup();
    await fixture.whenStable();
    const page = inside(fixture);
    page.edit(waiting);
    page.write('name', typed('Something else'));

    page.stopEditing();

    expect(page.editing()).toBe(null);
    expect(page.draft()['name']).toBe('');
  });
});

/**
 * What the page says when it does not know.
 *
 * It used to say exactly what it says when there is nothing waiting: an empty
 * page. So a certificate sitting there perfectly well looked like no
 * certificate at all, and the only way to tell was to reload and see whether
 * the page changed its mind.
 */
describe('PendingMintComponent — when the api does not answer', () => {
  /** The same harness, with an api that can be made to fail. */
  const asking = (answer: () => Promise<PendingMint[]>) => {
    TestBed.configureTestingModule({
      imports: [PendingMintComponent],
      providers: [
        provideTranslateService(),
        { provide: MintApiService, useValue: { waiting: answer, amend: () => Promise.resolve() } },
      ],
    });
    const fixture = TestBed.createComponent(PendingMintComponent);
    fixture.detectChanges();
    return fixture;
  };

  const settle = async (fixture: ComponentFixture<PendingMintComponent>, ms = 2000) => {
    await new Promise((wake) => setTimeout(wake, ms));
    await fixture.whenStable();
    fixture.detectChanges();
    return fixture.nativeElement.textContent as string;
  };

  it('says plainly that nothing is waiting when nothing is', async () => {
    const fixture = asking(() => Promise.resolve([]));

    expect(await settle(fixture, 0)).toContain('Nothing is waiting. Prepare a certificate');
  });

  /**
   * The bug this page had: every failure was caught and written down as an
   * empty list, so the page reported, with confidence, something it did not
   * know.
   */
  it('does not claim nothing is waiting when it could not ask', async () => {
    const fixture = asking(() => Promise.reject(new Error('no answer')));

    const said = await settle(fixture);

    expect(said).not.toContain('Nothing is waiting. Prepare a certificate');
    expect(said).toContain('did not answer');
  });

  /**
   * The service scales to nothing when nobody is using it, so the first request
   * after a quiet hour is a container starting up — which is exactly when this
   * page is opened, because it is opened to write something that has been
   * waiting.
   */
  it('asks a second time before giving up', async () => {
    let asked = 0;
    const fixture = asking(() => {
      asked += 1;
      return asked === 1 ? Promise.reject(new Error('waking up')) : Promise.resolve([waiting]);
    });

    const said = await settle(fixture);

    expect(asked).toBe(2);
    expect(said).toContain('Rockets win III');
    expect(said).not.toContain('did not answer');
  });

  it('can be asked again by hand once it has given up', async () => {
    let fail = true;
    const fixture = asking(() =>
      fail ? Promise.reject(new Error('no answer')) : Promise.resolve([waiting]),
    );
    await settle(fixture);

    fail = false;
    fixture.nativeElement.querySelector('.pending-retry').click();

    expect(await settle(fixture, 0)).toContain('Rockets win III');
  });
});

/**
 * The note for the essay, corrected along with everything else.
 *
 * A certificate can wait weeks for a cheap morning, and what the painting was
 * made alongside is exactly the sort of thing remembered the day after it was
 * prepared. It is the one field on this form that is never written to the chain.
 */
describe('PendingMintComponent — the note for the essay', () => {
  const settle = () => new Promise((resolve) => setTimeout(resolve, 0));

  it('reads the stored note into the form', async () => {
    const fixture = setup();
    const page = inside(fixture);
    storedClues = 'Pintado escuchando Spiegel im Spiegel.';

    page.edit(waiting);
    await settle();

    expect(page.draft()['clues']).toBe('Pintado escuchando Spiegel im Spiegel.');
  });

  it('sends what was typed', async () => {
    const fixture = setup();
    const page = inside(fixture);

    page.edit(waiting);
    await settle();
    page.write('clues', typed('Una canción.'));
    await page.save();

    expect(amended[0].facts['clues']).toBe('Una canción.');
  });

  /** Emptying the box is how a note is taken back, and it has to reach the api. */
  it('sends an empty note when the box is cleared, which is how it is taken back', async () => {
    const fixture = setup();
    const page = inside(fixture);
    storedClues = 'Something he no longer wants kept.';

    page.edit(waiting);
    await settle();
    page.write('clues', typed(''));
    await page.save();

    expect(amended[0].facts['clues']).toBe('');
  });

  /**
   * The one that would cost him something. An empty box means "take the note
   * back", so a correction whose box is empty only because the request for the
   * stored note failed must say nothing about the note at all — otherwise
   * fixing a typo in a title would quietly throw away what he wrote.
   */
  it('says nothing about the note when the stored one could not be read', async () => {
    const fixture = setup();
    const page = inside(fixture);
    refuseClues = true;

    page.edit(waiting);
    await settle();
    page.write('name', typed('A corrected title'));
    await page.save();

    expect(page.cluesKnown()).toBe(false);
    expect('clues' in amended[0].facts).toBe(false);
    expect(amended[0].facts['name']).toBe('A corrected title');
  });

  /**
   * Unless he typed one, which is an answer whether or not the old note ever
   * arrived.
   */
  it('still sends a note he typed while the stored one was unreachable', async () => {
    const fixture = setup();
    const page = inside(fixture);
    refuseClues = true;

    page.edit(waiting);
    await settle();
    page.write('clues', typed('Written anyway.'));
    await page.save();

    expect(amended[0].facts['clues']).toBe('Written anyway.');
  });

  /** A note arriving late must not land on top of what he has started writing. */
  it('does not overwrite a note he began typing before the stored one arrived', async () => {
    const fixture = setup();
    const page = inside(fixture);
    storedClues = 'The old note.';

    page.edit(waiting);
    page.write('clues', typed('His new note.'));
    await settle();

    expect(page.draft()['clues']).toBe('His new note.');
  });

  it('forgets the note when the correction is abandoned', async () => {
    const fixture = setup();
    const page = inside(fixture);
    storedClues = 'A note.';

    page.edit(waiting);
    await settle();
    page.stopEditing();

    expect(page.draft()['clues']).toBe('');
    expect(page.cluesKnown()).toBe(false);
  });
});
