import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, inject, input, signal } from '@angular/core';
import { Nft } from '@domain/artwork/artwork.entity';
import { environment } from '@environments/environment';
import { AtelierEngineService } from '@features/atelier/engine.service';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { firstValueFrom } from 'rxjs';

/** What the backend hands over for a painting: the brief and its photographs. */
interface Brief {
  prompt: string;
  images: string[];
}

/** What the backend says about a draft, and what to send back. */
interface Checked {
  violations: { rule: string; offenders: string[] }[];
  body: string;
  dropped: string[];
  rewrite: string | null;
}

/** What it says after storing one: the next language, or nothing. */
interface Stored {
  next: { lang: string; prompt: string } | null;
}

/**
 * Writing the essay for one painting, on this machine.
 *
 * **Why the page is the one doing this.** The model runs on his computer and
 * the brief is assembled by the backend from the catalogue, the clues he
 * wrote at certification and every essay so far. Neither can reach the other:
 * Cloud Run cannot see 127.0.0.1, and a program on his desk cannot read
 * Firestore. The browser is the only place both are reachable, so it carries
 * the text between them.
 *
 * The whole loop, which is the same one the nightly Gemini run has always
 * had:
 *
 *     the brief and the painting, from the backend
 *       -> the model on this machine writes
 *       -> the backend counts the countable rules and fetches every link
 *       -> the model rewrites the sentences it named
 *       -> counted again, and the cleaner draft wins
 *       -> stored as a draft, and the backend says what to write next
 *       -> the model translates it, and that is stored too
 *
 * **It stops at a draft.** Nothing here publishes: the public route serves an
 * essay only once he has read it, and arriving from a model on his own
 * machine rather than one in a data centre changes nothing about that.
 *
 * **It never calls Gemini.** That is the point of the whole arrangement: the
 * writing, the rewriting and the translating all happen on the card next to
 * him, and what the backend contributes is the brief and the checking.
 */
@Component({
  selector: 'app-essay-panel',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './essay-panel.component.html',
  styleUrl: './essay-panel.component.scss',
})
export class EssayPanelComponent {
  readonly painting = input.required<Nft>();

  private readonly http = inject(HttpClient);
  private readonly admin = inject(AdminAuthService);
  protected readonly engine = inject(AtelierEngineService);

  /** What it is doing, in words, because the whole thing is minutes long. */
  protected readonly stage = signal<string | null>(null);
  protected readonly trouble = signal<string | null>(null);
  /** The countable faults left in the draft, which he may want to know. */
  protected readonly remaining = signal<string[]>([]);
  protected readonly done = signal(false);

  private get where(): string {
    return `${environment.backendUrl}critics/${this.painting().tokenId}`;
  }

  private authorised() {
    return { headers: { Authorization: `Bearer ${this.admin.bearerToken() ?? ''}` } };
  }

  /**
   * Writes the essay, start to finish.
   *
   * Sequential on purpose: every step needs what the one before it produced,
   * and the card can only hold one model at a time anyway.
   */
  protected async write(): Promise<void> {
    if (this.stage()) return;
    this.trouble.set(null);
    this.remaining.set([]);
    this.done.set(false);

    try {
      this.stage.set('asking the backend for the brief');
      const brief = await firstValueFrom(
        this.http.get<Brief>(`${this.where}/brief`, this.authorised())
      );

      this.stage.set('writing — a minute or two on this card');
      const first = await this.engine.write(brief.prompt, brief.images);

      this.stage.set('checking it against the brief');
      let checked = await this.check(first);

      if (checked.rewrite) {
        this.stage.set(`fixing ${checked.violations.length} thing(s) it was told not to do`);
        const again = await this.engine.write(checked.rewrite, brief.images);
        const after = await this.check(again);
        // The same rule the Gemini path uses: a rewrite that fixed nothing is
        // not an improvement, and this model has handed back its own text
        // unchanged before now.
        if (after.violations.length < checked.violations.length) checked = after;
      }
      this.remaining.set(checked.violations.map((violation) => violation.rule));

      this.stage.set('storing the English');
      let stored = await this.store('en', checked.body);

      while (stored.next) {
        const { lang, prompt } = stored.next;
        this.stage.set(`translating into ${lang}`);
        const translated = await this.engine.write(prompt, brief.images);
        this.stage.set(`storing the ${lang}`);
        stored = await this.store(lang, translated);
      }

      this.done.set(true);
    } catch (error) {
      // The console as well, because a failure here is three services deep
      // and the sentence on screen is only ever the last of them.
      console.error('writing the essay failed', error);
      this.trouble.set(this.said(error));
    } finally {
      this.stage.set(null);
    }
  }

  private check(body: string): Promise<Checked> {
    return firstValueFrom(
      this.http.post<Checked>(
        `${environment.backendUrl}critics/check`,
        { body, tokenId: this.painting().tokenId },
        this.authorised()
      )
    );
  }

  private store(lang: string, text: string): Promise<Stored> {
    return firstValueFrom(
      this.http.post<Stored>(
        `${this.where}/written`,
        { translated: [{ lang, text }] },
        this.authorised()
      )
    );
  }

  /** The most useful sentence available, whichever layer failed. */
  private said(error: unknown): string {
    if (typeof error === 'object' && error && 'error' in error) {
      const inner = (error as { error?: { message?: string } }).error;
      if (inner?.message) return inner.message;
    }
    return error instanceof Error ? error.message : 'the essay could not be written';
  }
}
