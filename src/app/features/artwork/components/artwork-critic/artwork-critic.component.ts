import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  PLATFORM_ID,
  computed,
  effect,
  inject,
  input,
  signal,
  untracked,
} from '@angular/core';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { artworkTokenIdFrom } from '@domain/artwork/artwork-link';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { ArtCritic } from '@domain/artwork/critic.entity';
import { TranslatePipe } from '@ngx-translate/core';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { LanguageUrlService } from '@shared/services/language-url.service';
import { SeoTitleStrategy } from '@shared/services/seo-title.strategy';
import { combineLatest, filter, of, startWith, switchMap, take, timer } from 'rxjs';

// The essay is not written on demand: the backend writes it when the artwork is
// published to social, so a piece can be on the page before its text exists.
// Rather than give up on the first 404, keep asking until there is something to
// print — the spinner stands in for the text meanwhile.
const POLL_INTERVAL_MS = 30_000;

/** The public address the essay is published at, which is what it is cited by. */
const SITE_URL = 'https://juanmamoreno.com';

/** How far from the pointer the preview sits, so it never hides what is under it. */
const PEEK_OFFSET = 18;
/** Its size on the page. It flips to the other side of the pointer near an edge. */
const PEEK_WIDTH = 180;
const PEEK_HEIGHT = 180;

@Component({
  selector: 'app-artwork-critic',
  templateUrl: './artwork-critic.component.html',
  styleUrl: './artwork-critic.component.scss',
  imports: [MatProgressSpinner, TranslatePipe],
})
export class ArtworkCriticComponent {
  private artworkService = inject(ARTWORK_PORT);
  private language = inject(LanguageUrlService);
  private auth = inject(AdminAuthService);
  private seo = inject(SeoTitleStrategy);
  protected isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  readonly tokenId = input.required<string>();

  /**
   * The catalogue, already in hand.
   *
   * The essays cite other paintings, and a reader following one has no idea
   * which painting is behind the words until it opens. Showing it costs nothing
   * here: every artwork is already in the session, so the only thing fetched is
   * the thumbnail, and only once the pointer has actually settled on the link.
   */
  private readonly artworks = toSignal(this.artworkService.getArtPiecesObservable(), {
    initialValue: [],
  });

  protected readonly peek = signal<{
    src: string;
    name: string;
    left: number;
    top: number;
  } | null>(null);

  /** The link the preview belongs to, so a move within the same link does not refetch. */
  private peekingAt: string | null = null;

  protected showPeek(event: PointerEvent): void {
    const anchor = (event.target as Element | null)?.closest?.('a');
    const href = anchor?.getAttribute('href') ?? '';
    const tokenId = artworkTokenIdFrom(href);

    if (!tokenId) {
      this.hidePeek();
      return;
    }
    if (this.peekingAt === href) {
      this.movePeek(event);
      return;
    }

    const nft = this.artworks().find((candidate) => candidate.tokenId === tokenId);
    // Only the thumbnail. A preview that arrives after the reader has moved on
    // is not a preview, and the full painting is what the link itself is for.
    const src = nft ? this.artworkService.getNftOptimalUrl(nft.image) : '';
    if (!src) {
      this.hidePeek();
      return;
    }

    this.peekingAt = href;
    this.peek.set({ src, name: nft?.name ?? '', ...this.placeNear(event) });
  }

  protected movePeek(event: PointerEvent): void {
    const showing = this.peek();
    if (!showing) return;
    this.peek.set({ ...showing, ...this.placeNear(event) });
  }

  protected hidePeek(): void {
    this.peekingAt = null;
    this.peek.set(null);
  }

  /** Keeps the preview beside the pointer and wholly on the screen. */
  private placeNear(event: PointerEvent): { left: number; top: number } {
    const room = { width: window.innerWidth, height: window.innerHeight };
    const overflowsRight = event.clientX + PEEK_OFFSET + PEEK_WIDTH > room.width;
    const overflowsBottom = event.clientY + PEEK_OFFSET + PEEK_HEIGHT > room.height;

    return {
      left: overflowsRight
        ? Math.max(PEEK_OFFSET, event.clientX - PEEK_OFFSET - PEEK_WIDTH)
        : event.clientX + PEEK_OFFSET,
      top: overflowsBottom
        ? Math.max(PEEK_OFFSET, event.clientY - PEEK_OFFSET - PEEK_HEIGHT)
        : event.clientY + PEEK_OFFSET,
    };
  }

  /** Only ever true for the artist, and only in a browser he has signed in on. */
  protected readonly isArtist = computed(() => this.auth.isAdmin());

  private readonly critic = toSignal(
    toObservable(this.tokenId).pipe(
      switchMap((tokenId) => {
        const fetch$ = this.artworkService.getArtPieceCritic(tokenId);
        // A build cannot sit in a polling loop waiting for an essay to be
        // written: it asks once, and the page it emits carries the essay only
        // if there already is one. In the browser it keeps asking as before.
        const source$ = this.isBrowser
          ? timer(0, POLL_INTERVAL_MS).pipe(switchMap(() => fetch$))
          : fetch$;

        return source$.pipe(
          filter((critic): critic is ArtCritic => !!critic),
          // Once the essay is there it never changes under the reader's feet.
          take(1),
          // Clears the previous artwork's essay while the new one is fetched.
          startWith(null)
        );
      })
    ),
    { initialValue: null }
  );

  /**
   * The same essay fetched again as the artist, which is the only way to learn
   * whether it has been rewritten by hand.
   *
   * A second request rather than a flag on the first: the backend strips that
   * flag from the public route, so there is nowhere else it could come from,
   * and a reader watching the network sees exactly what a reader should.
   */
  private readonly asArtist = toSignal(
    combineLatest([
      toObservable(this.tokenId),
      toObservable(computed(() => this.auth.bearerToken())),
    ]).pipe(
      switchMap(([tokenId, token]) =>
        token && this.isBrowser
          ? this.artworkService.getArtPieceCriticWithEdits(tokenId, token)
          : of(null)
      )
    ),
    { initialValue: null }
  );

  /**
   * Set once an edit has been saved, so the page shows it without refetching.
   *
   * Carries the artwork it belongs to. This component is not rebuilt when the
   * reader moves to the next painting — the route is the same, only the input
   * changes — so a saved essay left lying here was still being shown, and still
   * being handed to the editor, several paintings later. Naming the artwork
   * makes that impossible to read wrongly rather than merely unlikely: there is
   * no moment, however brief, when one painting's essay can appear under
   * another's title.
   */
  private readonly justSaved = signal<{ tokenId: string; critic: ArtCritic } | null>(null);

  private readonly shown = computed(() => {
    const saved = this.justSaved();
    const mine = saved?.tokenId === this.tokenId() ? saved.critic : null;
    return mine ?? this.asArtist() ?? this.critic();
  });

  // Falls back to whichever translation exists rather than showing nothing.
  readonly translated = computed(() => {
    const translations = this.shown()?.translated ?? [];
    const language = this.language.contentLanguage();
    return translations.find((entry) => entry.lang === language) ?? translations[0] ?? null;
  });

  constructor() {
    // Nothing written about one painting survives into the next.
    //
    // The editor is the part that matters: left open across a move it showed
    // the previous painting's words, and saving would have written them onto
    // the painting now on screen.
    effect(() => {
      this.tokenId();
      untracked(() => {
        this.justSaved.set(null);
        this.editing.set(false);
        this.draft.set('');
        this.problem.set('');
      });
    });

    // Described from here because this is the only place that holds the essay.
    // The page around it can say what the painting is; only this knows that
    // several hundred words were written about that painting, and when they
    // last changed.
    effect(() => {
      const essay = this.translated();
      const critic = this.shown();
      if (!essay || !critic) return;

      this.seo.setEssayStructuredData({
        headline: essay.title,
        artworkName: critic.artworkName,
        url: `${SITE_URL}${this.language.link(`artwork/${this.tokenId()}`)}/`,
        language: essay.lang,
        published: critic.createdAt,
        modified: critic.updatedAt,
      });
    });
  }

  /**
   * Whether a hand has been over this one — for the artist alone, and only when
   * the answer actually came from the authenticated route. Null means the
   * question was never asked, which is not the same as "no".
   */
  protected readonly hasBeenEdited = computed(() => {
    if (!this.isArtist()) return null;
    const critic = this.shown();
    return critic && critic.edited !== undefined ? critic.edited : null;
  });

  protected readonly editing = signal(false);
  protected readonly draft = signal('');
  protected readonly saving = signal(false);
  protected readonly problem = signal('');

  protected readonly canSave = computed(() => this.draft().trim().length > 0 && !this.saving());

  protected startEditing(): void {
    const current = this.translated();
    if (!current) return;
    // The markdown, not the html: the markdown is the original and the html is
    // made from it, so editing the html would be editing the copy.
    this.draft.set(current.body ?? '');
    this.problem.set('');
    this.editing.set(true);
  }

  protected cancelEditing(): void {
    this.editing.set(false);
    this.problem.set('');
  }

  protected setDraft(event: Event): void {
    this.draft.set((event.target as HTMLTextAreaElement).value);
  }

  protected save(): void {
    const current = this.translated();
    const token = this.auth.bearerToken();
    if (!current || !token || !this.canSave()) return;

    // Held for the length of the request. The reader can move to the next
    // painting while it is in flight, and the answer must be filed under the
    // painting it was written for rather than under whichever one is on screen
    // when it arrives.
    const savedFor = this.tokenId();

    this.saving.set(true);
    this.problem.set('');
    this.artworkService
      .editArtPieceCritic(savedFor, current.lang, this.draft().trim(), token)
      .subscribe({
        next: (updated) => {
          this.saving.set(false);
          if (!updated) {
            this.problem.set('critic.saveFailed');
            return;
          }
          this.justSaved.set({ tokenId: savedFor, critic: updated });
          this.editing.set(false);
        },
        error: () => {
          this.saving.set(false);
          this.problem.set('critic.saveFailed');
        },
      });
  }
}
