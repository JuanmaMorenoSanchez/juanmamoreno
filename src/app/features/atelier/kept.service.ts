import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { atelierQuality } from '@domain/artwork/image-sizes';
import { environment } from '@environments/environment';
import { AdminAuthService } from '@shared/services/admin-auth.service';

/** One thing he decided was worth keeping. */
export interface KeptPiece {
  id: string;
  name: string;
  tokenId: string | null;
  kind: string;
  /** `image/png` or `video/mp4`. Absent on anything kept before clips. */
  media?: string;
  width: number;
  height: number;
  bytes: number;
  created: string;
}

/**
 * The few things from the atelier that were kept.
 *
 * Everything the atelier makes lives on his own machine and is thrown away
 * when the engine stops. This is the other side of the save button: the only
 * route by which anything leaves that machine, and it is never taken without
 * being pressed.
 *
 * **The bytes come back through the backend, not from a url.** The service
 * stores no url for a piece, so there is none to hand out — which is the point:
 * a signed url is a credential with an expiry and a public one outlives any
 * decision to stop sharing it.
 */
@Injectable({ providedIn: 'root' })
export class KeptService {
  private readonly http = inject(HttpClient);
  private readonly admin = inject(AdminAuthService);

  private readonly held = signal<KeptPiece[]>([]);
  private readonly busy = signal(false);

  readonly pieces = this.held.asReadonly();
  readonly saving = this.busy.asReadonly();

  private get where(): string {
    return `${environment.backendUrl}atelier-pieces`;
  }

  /**
   * `bearerToken` rather than the raw one: it is null unless the token still
   * passes the checks here, so an expired credential is never sent anywhere.
   */
  private authorised() {
    return { headers: { Authorization: `Bearer ${this.admin.bearerToken() ?? ''}` } };
  }

  /** In flight or done, so several panels asking do not become several fetches. */
  private asked: Promise<void> | null = null;

  /**
   * Fetches the list once, however many times it is asked.
   *
   * The atelier refreshes on purpose, because it has just changed the list.
   * The catalogue only wants to read it, and a panel opening per painting
   * would otherwise be one request per row opened.
   */
  ensure(): Promise<void> {
    this.asked ??= this.refresh();
    return this.asked;
  }

  /** Everything kept, newest first. Quiet on failure: an empty shelf is honest. */
  /**
   * Fetches the list, and holds it only if it is one.
   *
   * **Anything but a list used to be stored as the list.** An empty body, an
   * error page that answered 200, a shape changed at the other end: all of
   * them became the shelf, which then rendered nothing — silently, because
   * `.length` on an object is undefined and the template simply hid itself.
   * The next save spread that object and threw `f is not iterable` from a
   * minified bundle, with the bytes already in the bucket and nothing on
   * screen to say the piece had been kept.
   *
   * So the answer is checked, and a bad one leaves the shelf empty and says
   * what arrived in the console — an empty shelf is wrong in a way he can
   * see, and the next person debugging it gets the shape rather than a
   * TypeError three clicks later.
   */
  async refresh(): Promise<void> {
    this.asked = Promise.resolve();
    try {
      const answer = await firstValueFrom(
        this.http.get<KeptPiece[]>(this.where, this.authorised())
      );
      if (!Array.isArray(answer)) {
        console.error('atelier-pieces answered something that is not a list:', answer);
        this.held.set([]);
        return;
      }
      this.held.set(answer);
    } catch {
      this.held.set([]);
    }
  }

  /** Keeps one. Throws, so the page can say why rather than going quiet. */
  async keep(
    piece: Blob,
    about: {
      name: string;
      kind: string;
      tokenId?: string;
      width: number;
      height: number;
      /** What it is. The backend checks this against its own allowlist. */
      media?: string;
    }
  ): Promise<KeptPiece> {
    this.busy.set(true);
    try {
      // The blob's own type when it has one, which it does when it came from
      // the engine over http. A clip sent as a png is written to the bucket as
      // a png and never plays.
      const media = about.media ?? (piece.type || 'image/png');

      const form = new FormData();
      form.append('piece', piece, `${about.kind}.${media === 'video/mp4' ? 'mp4' : 'png'}`);
      form.append('name', about.name);
      form.append('kind', about.kind);
      form.append('media', media);
      form.append('width', String(about.width));
      form.append('height', String(about.height));
      if (about.tokenId) form.append('tokenId', about.tokenId);

      const kept = await firstValueFrom(
        this.http.post<KeptPiece>(this.where, form, this.authorised())
      );
      // Guarded here as well as where the list is fetched, because this is
      // the line that threw: a save that reached the bucket must not then
      // fail on the shelf it is being added to.
      this.held.update((all) => (Array.isArray(all) ? [kept, ...all] : [kept]));
      return kept;
    } finally {
      this.busy.set(false);
    }
  }

  async forget(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.where}/${id}`, this.authorised()));
    this.held.update((all) => all.filter((piece) => piece.id !== id));
    this.release(id);
  }

  /**
   * Object urls for pieces already fetched, by id.
   *
   * Because `imageUrl` cannot be put in an `img` or a `video`. The route is
   * behind the admin guard, the guard reads the `Authorization` header and
   * nothing else, and neither tag can send one — so the src was answered 403
   * and the shelf showed broken images from the day it was written. Nobody
   * noticed because nothing had been kept yet.
   *
   * The bytes are fetched with the credential and handed to the tag as a blob
   * instead. The alternative is a token in a url, which is a credential in
   * something that gets logged and shared.
   */
  private readonly shown = signal<Record<string, string>>({});
  readonly urls = this.shown.asReadonly();

  /**
   * Fetches one so it can be displayed. Safe to call again; it fetches once.
   */
  async show(id: string): Promise<void> {
    if (this.shown()[id]) return;
    try {
      const bytes = await firstValueFrom(
        this.http.get(this.imageUrl(id), { ...this.authorised(), responseType: 'blob' })
      );
      this.shown.update((all) => ({ ...all, [id]: URL.createObjectURL(bytes) }));
    } catch {
      // Left out of the map, so the template shows nothing rather than a
      // broken tag. An asset that cannot be fetched is not worth a dialog.
    }
  }

  /** Lets go of one object url. Called when a piece is forgotten. */
  private release(id: string): void {
    const url = this.shown()[id];
    if (!url) return;
    URL.revokeObjectURL(url);
    this.shown.update((all) => {
      const left = { ...all };
      delete left[id];
      return left;
    });
  }

  /**
   * Where to look at one. An address on the backend, not in a bucket.
   *
   * Still `/image` for a clip as well as a picture: that is the route's name
   * and what it serves is whatever the object says it is. The bucket is closed
   * to everyone but the backend, so this is the only address an asset has.
   */
  imageUrl(id: string): string {
    return `${this.where}/${id}/image`;
  }

  /** Whether this one needs a player rather than an `img`. */
  isClip(piece: KeptPiece): boolean {
    return piece.media === 'video/mp4';
  }

  /**
   * Whether it was made from the big copy of the painting or the small one.
   *
   * Read off its own pixels. A model gives back the size it was given, so a
   * run on the web copy is a web-sized picture and a run on the medium
   * download is a big one — and in a thumbnail the two are indistinguishable,
   * which is the whole reason to say.
   */
  qualityOf(piece: KeptPiece): 'web' | 'high' {
    return atelierQuality(piece);
  }
}
