import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ArtCritic } from '@domain/artwork/critic.entity';
import { provideTranslateService } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { ArtworkCriticComponent } from './artwork-critic.component';

const CRITIC: ArtCritic = {
  tokenId: '5',
  artworkName: 'Iris',
  translated: [
    {
      lang: 'en',
      html: '<p>The blue arrives first.</p>',
      body: 'The blue arrives first.',
    },
  ],
};

/** The same essay as the backend returns it to an authenticated artist. */
const asArtist = (edited: boolean): ArtCritic => ({ ...CRITIC, edited });

/** One painting in the catalogue, as the session already holds it. */
const CATALOGUE = [
  {
    tokenId: '134',
    name: 'Another painting',
    image: { thumbnailUrl: 'https://cdn.test/thumb/134', originalUrl: 'https://cdn.test/full/134' },
  },
];

async function setup(options: {
  signedIn: boolean;
  edited?: boolean;
  critic?: ArtCritic;
  /** What the public route answers with. Null is "there is none to read". */
  published?: ArtCritic | null;
}) {
  const published = 'published' in options ? options.published : (options.critic ?? CRITIC);
  const port = {
    getArtPieceCritic: vi.fn().mockReturnValue(of(published)),
    getArtPieceCriticWithEdits: vi
      .fn()
      .mockReturnValue(of({ ...(options.critic ?? CRITIC), edited: options.edited ?? false })),
    editArtPieceCritic: vi.fn().mockReturnValue(of(asArtist(true))),
    getArtPiecesObservable: vi.fn().mockReturnValue(of(CATALOGUE)),
    // Thumbnail first: the preview must never reach for the full painting.
    getNftOptimalUrl: (image: { thumbnailUrl?: string; originalUrl?: string }) =>
      image?.thumbnailUrl ?? image?.originalUrl ?? '',
  };

  const auth = {
    isAdmin: () => options.signedIn,
    bearerToken: () => (options.signedIn ? 'a-real-looking-token' : null),
    identity: () => (options.signedIn ? { email: 'morenosanchezjuanma@gmail.com' } : null),
  };

  TestBed.configureTestingModule({
    imports: [ArtworkCriticComponent],
    providers: [
      provideTranslateService(),
      provideHttpClient(),
      provideHttpClientTesting(),
      provideAnimations(),
      provideRouter([]),
      { provide: ARTWORK_PORT, useValue: port },
      { provide: AdminAuthService, useValue: auth },
    ],
  });

  const fixture = TestBed.createComponent(ArtworkCriticComponent);
  fixture.componentRef.setInput('tokenId', '5');
  fixture.detectChanges();
  // One request, answered synchronously, so the essay is on screen by the time
  // the first change detection is over. It used to be polled through a timer
  // and the first answer landed a macrotask later; nothing is waited for now.
  fixture.detectChanges();
  return { fixture, port };
}

const text = (fixture: ComponentFixture<ArtworkCriticComponent>) =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';
const find = (fixture: ComponentFixture<ArtworkCriticComponent>, selector: string) =>
  (fixture.nativeElement as HTMLElement).querySelector(selector);

describe('ArtworkCriticComponent — for a reader', () => {
  afterEach(() => TestBed.resetTestingModule());

  // The whole of what a visitor is allowed: the essay, and nothing about how it
  // came to be that way.
  it('shows the essay with no way to change it', async () => {
    const { fixture } = await setup({ signedIn: false });

    expect(text(fixture)).toContain('The blue arrives first.');
    expect(find(fixture, '.artwork-critic-edit')).toBeNull();
    expect(find(fixture, '.artwork-critic-draft')).toBeNull();
  });

  it('never says whether an essay has been edited', async () => {
    const { fixture } = await setup({ signedIn: false, edited: true });

    expect(find(fixture, '.artwork-critic-state')).toBeNull();
  });

  // Nothing should even ask: the answer is only available to a request the
  // backend has authenticated, and asking without a token is a pointless 401.
  it('does not ask the authenticated route for anything', async () => {
    const { port } = await setup({ signedIn: false });

    expect(port.getArtPieceCriticWithEdits).not.toHaveBeenCalled();
  });
});

/**
 * What a reader gets when the essay is not theirs to read yet.
 *
 * The backend answers the same 404 for an essay still in draft as for one never
 * written, so the page cannot tell the two apart and must not try: either way
 * there is no essay, and the painting is the page.
 */
describe('ArtworkCriticComponent — when there is no essay to read', () => {
  afterEach(() => {
    vi.useRealTimers();
    TestBed.resetTestingModule();
  });

  it('shows nothing rather than an empty frame', async () => {
    const { fixture } = await setup({ signedIn: false, published: null });

    expect(find(fixture, '.artwork-critic')).toBeNull();
    expect(find(fixture, '.artwork-critic-body')).toBeNull();
  });

  /**
   * There used to be a spinner saying the essay was being written, and it was
   * true — opening the page is what commissioned it. Nothing is written on a
   * reader's request now, so the same spinner would promise something that is
   * never coming; on an artwork whose draft exists but has not been reviewed it
   * would also be announcing the draft, which is the thing being kept private.
   */
  it('does not claim an essay is on its way', async () => {
    const { fixture } = await setup({ signedIn: false, published: null });

    expect(find(fixture, 'mat-progress-spinner')).toBeNull();
    expect(text(fixture).trim()).toBe('');
  });

  /**
   * The reason the poll had to go with the generating. Asked every thirty
   * seconds, a question already answered would be re-asked by every reader on
   * a hundred and thirty-odd pages for as long as the tab stayed open.
   */
  it('asks once and does not keep asking', async () => {
    // Installed before the component exists, so a timer it starts is one of
    // these. Advancing after the fact would leave a real poll ticking off in
    // the background and the test would pass with the poll still in place.
    vi.useFakeTimers();

    const { port } = await setup({ signedIn: false, published: null });
    await vi.advanceTimersByTimeAsync(5 * 60_000);

    expect(port.getArtPieceCritic).toHaveBeenCalledTimes(1);
  });

  // The artist reads his own drafts: a second request, with his token, on the
  // route that answers it. That is the whole of the difference between them.
  it('still shows the artist the draft a reader cannot have', async () => {
    const { fixture, port } = await setup({ signedIn: true, published: null });

    expect(port.getArtPieceCriticWithEdits).toHaveBeenCalled();
    expect(text(fixture)).toContain('The blue arrives first.');
    expect(find(fixture, '.artwork-critic-edit')).not.toBeNull();
  });
});

describe('ArtworkCriticComponent — for the artist', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('offers to edit the text', async () => {
    const { fixture } = await setup({ signedIn: true });

    expect(find(fixture, '.artwork-critic-edit')).not.toBeNull();
  });

  it('says an essay has been edited when it has', async () => {
    const { fixture } = await setup({ signedIn: true, edited: true });

    expect(find(fixture, '.artwork-critic-state')).not.toBeNull();
    expect(find(fixture, '.artwork-critic-state--untouched')).toBeNull();
  });

  it('says it has not when it has not', async () => {
    const { fixture } = await setup({ signedIn: true, edited: false });

    expect(find(fixture, '.artwork-critic-state--untouched')).not.toBeNull();
  });

  it('opens with the markdown, not the rendered html', async () => {
    const { fixture } = await setup({ signedIn: true });

    (find(fixture, '.artwork-critic-edit') as HTMLButtonElement).click();
    fixture.detectChanges();

    const draft = find(fixture, '.artwork-critic-draft') as HTMLTextAreaElement;
    expect(draft.value).toBe('The blue arrives first.');
    expect(draft.value).not.toContain('<p>');
  });

  it('saves the new text against the language on screen, with the token', async () => {
    const { fixture, port } = await setup({ signedIn: true });

    (find(fixture, '.artwork-critic-edit') as HTMLButtonElement).click();
    fixture.detectChanges();

    const draft = find(fixture, '.artwork-critic-draft') as HTMLTextAreaElement;
    draft.value = 'Written again, by hand.';
    draft.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    (find(fixture, '.artwork-critic-save') as HTMLButtonElement).click();
    fixture.detectChanges();

    expect(port.editArtPieceCritic).toHaveBeenCalledWith(
      '5',
      'en',
      'Written again, by hand.',
      'a-real-looking-token'
    );
    // Back to reading, showing what came back rather than what was typed.
    expect(find(fixture, '.artwork-critic-draft')).toBeNull();
  });

  it('refuses to save an empty essay', async () => {
    const { fixture, port } = await setup({ signedIn: true });

    (find(fixture, '.artwork-critic-edit') as HTMLButtonElement).click();
    fixture.detectChanges();

    const draft = find(fixture, '.artwork-critic-draft') as HTMLTextAreaElement;
    draft.value = '   ';
    draft.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect((find(fixture, '.artwork-critic-save') as HTMLButtonElement).disabled).toBe(true);
    (find(fixture, '.artwork-critic-save') as HTMLButtonElement).click();
    expect(port.editArtPieceCritic).not.toHaveBeenCalled();
  });

  it('puts the text back rather than losing it when saving fails', async () => {
    const { fixture, port } = await setup({ signedIn: true });
    port.editArtPieceCritic.mockReturnValue(
      new (class {
        subscribe(handlers: { error: (e: unknown) => void }) {
          handlers.error(new Error('offline'));
          return { unsubscribe: () => undefined };
        }
      })()
    );

    (find(fixture, '.artwork-critic-edit') as HTMLButtonElement).click();
    fixture.detectChanges();
    const draft = find(fixture, '.artwork-critic-draft') as HTMLTextAreaElement;
    draft.value = 'Something worth keeping.';
    draft.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    (find(fixture, '.artwork-critic-save') as HTMLButtonElement).click();
    fixture.detectChanges();

    // Still open, still holding what was written.
    const after = find(fixture, '.artwork-critic-draft') as HTMLTextAreaElement;
    expect(after).not.toBeNull();
    expect(after.value).toBe('Something worth keeping.');
    expect(find(fixture, '.artwork-critic-problem')).not.toBeNull();
  });
});

describe('ArtworkCriticComponent — previewing a painting the essay cites', () => {
  /** An essay citing one of the artist's own paintings, as the generated ones do. */
  const withOwnLink: ArtCritic = {
    ...CRITIC,
    translated: [
      {
        ...CRITIC.translated[0],
        html:
          '<p>Compare <a href="https://www.juanmamoreno.com/artwork/134">the other one</a> ' +
          'and <a href="https://en.wikipedia.org/wiki/Blue">blue</a>.</p>',
      },
    ],
  };

  const pointerOn = (fixture: ComponentFixture<ArtworkCriticComponent>, selector: string) => {
    const anchor = fixture.nativeElement.querySelector(selector) as HTMLElement;
    anchor.dispatchEvent(
      new PointerEvent('pointerover', { bubbles: true, clientX: 40, clientY: 40 })
    );
    fixture.detectChanges();
  };

  it('shows the painting when the pointer reaches a link to one', async () => {
    const { fixture } = await setup({ signedIn: false, critic: withOwnLink });

    pointerOn(fixture, 'a[href*="artwork/134"]');

    const peek = fixture.nativeElement.querySelector('.artwork-peek');
    expect(peek).toBeTruthy();
    expect(peek.querySelector('img').getAttribute('src')).toBe('https://cdn.test/thumb/134');
    expect(peek.textContent).toContain('Another painting');
  });

  it('shows nothing for a link to somebody else', async () => {
    const { fixture } = await setup({ signedIn: false, critic: withOwnLink });

    pointerOn(fixture, 'a[href*="wikipedia"]');

    expect(fixture.nativeElement.querySelector('.artwork-peek')).toBeNull();
  });

  it('takes it away again when the pointer leaves', async () => {
    const { fixture } = await setup({ signedIn: false, critic: withOwnLink });
    pointerOn(fixture, 'a[href*="artwork/134"]');
    expect(fixture.nativeElement.querySelector('.artwork-peek')).toBeTruthy();

    fixture.nativeElement
      .querySelector('.artwork-critic-body')
      .dispatchEvent(new PointerEvent('pointerout', { bubbles: true }));
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.artwork-peek')).toBeNull();
  });
});

/**
 * Moving from one painting to the next.
 *
 * This component is not rebuilt when the reader does that: the route is the
 * same `/artwork/:id`, so Angular keeps the instance and only the input
 * changes. Anything held in a plain signal therefore survives the move, and
 * every one of these tests failed before that was dealt with.
 *
 * The reported fault: edit a painting's essay, save it, press next, press edit
 * — and the previous painting's words were in the box, ready to be saved over
 * the new one. It only shows itself once something has been saved, which is
 * why every test here goes through the editor rather than just reading.
 */
describe('ArtworkCriticComponent — moving to the next painting', () => {
  afterEach(() => TestBed.resetTestingModule());

  const OTHER: ArtCritic = {
    tokenId: '9',
    artworkName: 'A different painting',
    translated: [
      {
        lang: 'en',
        html: '<p>Nothing here is blue.</p>',
        body: 'Nothing here is blue.',
      },
    ],
  };

  /** What the reader does: the next button changes the input, nothing else. */
  async function goTo(
    fixture: ComponentFixture<ArtworkCriticComponent>,
    tokenId: string
  ): Promise<void> {
    fixture.componentRef.setInput('tokenId', tokenId);
    fixture.detectChanges();
    await new Promise((resolve) => setTimeout(resolve, 0));
    fixture.detectChanges();
  }

  /** Opens the editor, replaces the text and saves it. */
  function rewrite(fixture: ComponentFixture<ArtworkCriticComponent>, text: string): void {
    (find(fixture, '.artwork-critic-edit') as HTMLButtonElement).click();
    fixture.detectChanges();
    const draft = find(fixture, '.artwork-critic-draft') as HTMLTextAreaElement;
    draft.value = text;
    draft.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    (find(fixture, '.artwork-critic-save') as HTMLButtonElement).click();
    fixture.detectChanges();
  }

  // The bug as it was reported, start to finish.
  it('offers the new painting its own words to edit, not the last one it saved', async () => {
    const { fixture, port } = await setup({ signedIn: true });

    rewrite(fixture, 'Written again, by hand.');

    port.getArtPieceCritic.mockReturnValue(of(OTHER));
    port.getArtPieceCriticWithEdits.mockReturnValue(of({ ...OTHER, edited: false }));
    await goTo(fixture, '9');

    (find(fixture, '.artwork-critic-edit') as HTMLButtonElement).click();
    fixture.detectChanges();

    const draft = find(fixture, '.artwork-critic-draft') as HTMLTextAreaElement;
    expect(draft.value).toBe('Nothing here is blue.');
  });

  // The same staleness, seen by a reader who never touches the editor: the
  // essay on the page was the one that had just been saved elsewhere.
  it('shows the new painting its own essay after one has been saved', async () => {
    const { fixture, port } = await setup({ signedIn: true });

    rewrite(fixture, 'Written again, by hand.');

    port.getArtPieceCritic.mockReturnValue(of(OTHER));
    port.getArtPieceCriticWithEdits.mockReturnValue(of({ ...OTHER, edited: false }));
    await goTo(fixture, '9');

    expect(text(fixture)).toContain('Nothing here is blue.');
    expect(text(fixture)).not.toContain('The blue arrives first.');
  });

  // Leaving the editor open and moving on: the box must not travel with the
  // reader, because saving it would write one painting's essay onto another.
  it('closes an editor left open rather than carrying it to the next painting', async () => {
    const { fixture, port } = await setup({ signedIn: true });

    (find(fixture, '.artwork-critic-edit') as HTMLButtonElement).click();
    fixture.detectChanges();
    expect(find(fixture, '.artwork-critic-draft')).not.toBeNull();

    port.getArtPieceCritic.mockReturnValue(of(OTHER));
    port.getArtPieceCriticWithEdits.mockReturnValue(of({ ...OTHER, edited: false }));
    await goTo(fixture, '9');

    expect(find(fixture, '.artwork-critic-draft')).toBeNull();
  });

  // Whether the essay has been gone over is the artist's note to himself about
  // this painting, and was being answered about the last one.
  it('reports edited-ness for the painting on screen', async () => {
    const { fixture, port } = await setup({ signedIn: true, edited: true });
    expect(find(fixture, '.artwork-critic-state--untouched')).toBeNull();

    rewrite(fixture, 'Written again, by hand.');

    port.getArtPieceCritic.mockReturnValue(of(OTHER));
    port.getArtPieceCriticWithEdits.mockReturnValue(of({ ...OTHER, edited: false }));
    await goTo(fixture, '9');

    expect(find(fixture, '.artwork-critic-state--untouched')).not.toBeNull();
  });

  /**
   * The save is a request, and the reader can move on while it is in flight.
   * Its answer has to be filed under the painting it was written for, not
   * under whichever one happens to be on screen when it lands.
   */
  it('does not let a save that lands late overwrite the painting now on screen', async () => {
    const { fixture, port } = await setup({ signedIn: true });

    let deliver: ((critic: ArtCritic) => void) | null = null;
    port.editArtPieceCritic.mockReturnValue({
      subscribe: (handlers: { next: (critic: ArtCritic) => void }) => {
        deliver = handlers.next;
        return { unsubscribe: () => undefined };
      },
    });

    (find(fixture, '.artwork-critic-edit') as HTMLButtonElement).click();
    fixture.detectChanges();
    const draft = find(fixture, '.artwork-critic-draft') as HTMLTextAreaElement;
    draft.value = 'Written again, by hand.';
    draft.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    (find(fixture, '.artwork-critic-save') as HTMLButtonElement).click();
    fixture.detectChanges();

    // Away to the next painting before the answer arrives.
    port.getArtPieceCritic.mockReturnValue(of(OTHER));
    port.getArtPieceCriticWithEdits.mockReturnValue(of({ ...OTHER, edited: false }));
    await goTo(fixture, '9');

    deliver!({
      ...CRITIC,
      translated: [{ ...CRITIC.translated[0], html: '<p>The saved one.</p>' }],
    });
    fixture.detectChanges();

    expect(text(fixture)).toContain('Nothing here is blue');
    expect(text(fixture)).not.toContain('The saved one');
  });

  // It is still the same painting's essay when the artist stays put.
  it('keeps showing what was saved while the reader stays on the painting', async () => {
    const { fixture } = await setup({ signedIn: true });

    rewrite(fixture, 'Written again, by hand.');

    // editArtPieceCritic answers with asArtist(true) — the same essay, marked.
    expect(text(fixture)).toContain('The blue arrives first.');
    expect(find(fixture, '.artwork-critic-state--untouched')).toBeNull();
  });
});
