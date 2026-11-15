import { DatePipe } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  computed,
  inject,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { Enquiry, EnquiriesService } from './enquiries.service';

/**
 * Every message the form has taken, where they can be read and thrown away.
 *
 * **They were always stored.** `saveContact` has written each one to Firestore
 * since the form existed, before either mail goes out — so a message the
 * mailer dropped is here even though it never reached an inbox. Nothing new is
 * kept; what is new is a way to look.
 *
 * It exists because the inbox is not a record. Six months on, "did I ever
 * answer the gallery in Bilbao" is a question nobody can answer by scrolling,
 * and a spam message that got past the traps had nowhere to be deleted from.
 *
 * Behind the same door as the rest of his pages: guarded, noindex, and
 * disallowed in robots. Nobody else ever sees it, and the api refuses anybody
 * else who asks.
 */
@Component({
  selector: 'app-enquiries',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './enquiries.component.html',
  styleUrl: './enquiries.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EnquiriesComponent {
  private api = inject(EnquiriesService);
  private auth = inject(AdminAuthService);
  private destroyRef = inject(DestroyRef);

  /** Undefined until asked, and if it never answers. */
  readonly messages = signal<Enquiry[] | undefined>(undefined);
  readonly asking = signal(true);
  readonly problem = signal('');

  /** Which one is being thrown away, so the row can say so and refuse twice. */
  readonly removing = signal<string | null>(null);

  /**
   * The one being asked about before it goes.
   *
   * A confirmation rather than a straight delete, because there is no undo
   * and no bin: Firestore deletes, and the copy in his inbox is the only
   * other one there has ever been.
   */
  readonly confirming = signal<string | null>(null);

  readonly count = computed(() => this.messages()?.length ?? 0);

  constructor() {
    this.load();
  }

  load(): void {
    const token = this.auth.bearerToken();
    if (!token) {
      this.asking.set(false);
      return;
    }

    this.asking.set(true);
    this.problem.set('');
    this.api
      .all(token)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe((messages) => {
        this.asking.set(false);
        if (!messages) {
          // An empty list and a refused request are different answers, and
          // this page must not show the second as the first.
          this.problem.set('The api did not answer, so what is here is unknown.');
          return;
        }
        this.messages.set(messages);
      });
  }

  /** Asks first. The second press is the one that deletes. */
  ask(id: string): void {
    this.confirming.set(this.confirming() === id ? null : id);
  }

  async remove(id: string): Promise<void> {
    const token = this.auth.bearerToken();
    if (!token || this.removing()) return;

    this.removing.set(id);
    this.problem.set('');
    try {
      await this.api.remove(token, id);
      // Taken out here rather than by asking again: the answer is known, and
      // a second round trip to learn it would be a slower way to be told the
      // same thing.
      this.messages.update((all) => (all ?? []).filter((one) => one.id !== id));
      this.confirming.set(null);
    } catch {
      this.problem.set('That message could not be deleted.');
    } finally {
      this.removing.set(null);
    }
  }

  /** How long ago, in words, because a date needs counting and this does not. */
  ago(at?: string): string {
    if (!at) return 'at some point';

    const minutes = Math.floor((Date.now() - new Date(at).getTime()) / 60_000);
    if (minutes < 1) return 'just now';
    if (minutes < 60) return `${minutes} minute${minutes === 1 ? '' : 's'} ago`;

    const hours = Math.floor(minutes / 60);
    if (hours < 48) return `${hours} hour${hours === 1 ? '' : 's'} ago`;

    const days = Math.floor(hours / 24);
    return `${days} day${days === 1 ? '' : 's'} ago`;
  }

  /**
   * Who to call them, which is not always the `name` field.
   *
   * An enquiry about a painting puts the question in `name` — "Price request:
   * Las Meninas (#5)" — because that is what belongs in a subject line, and
   * carries the person's own name in `greeting` where the form asked for one.
   */
  who(message: Enquiry): string {
    return message.greeting?.trim() || message.name;
  }

  /** The address, ready to answer from whatever mail client he uses. */
  replyTo(message: Enquiry): string {
    return `mailto:${message.email}?subject=${encodeURIComponent(`Re: ${message.name}`)}`;
  }
}
