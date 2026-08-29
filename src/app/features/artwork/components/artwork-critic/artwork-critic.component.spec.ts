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
      title: 'A room that will not settle',
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

async function setup(options: { signedIn: boolean; edited?: boolean; critic?: ArtCritic }) {
  const port = {
    getArtPieceCritic: vi.fn().mockReturnValue(of(options.critic ?? CRITIC)),
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
  // The public fetch is polled through a timer, so its first answer lands on
  // the next macrotask — and the poll never completes, so waiting for stability
  // would wait for ever. Without this the reader's tests would assert the
  // absence of an edit button on a page that had not rendered an essay at all,
  // passing while proving nothing.
  await new Promise((resolve) => setTimeout(resolve, 0));
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

    expect(text(fixture)).toContain('A room that will not settle');
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
