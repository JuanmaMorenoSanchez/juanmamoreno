import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { firstValueFrom } from 'rxjs';
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
  async refresh(): Promise<void> {
    this.asked = Promise.resolve();
    try {
      this.held.set(
        await firstValueFrom(this.http.get<KeptPiece[]>(this.where, this.authorised()))
      );
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
      this.held.update((all) => [kept, ...all]);
      return kept;
    } finally {
      this.busy.set(false);
    }
  }

  async forget(id: string): Promise<void> {
    await firstValueFrom(this.http.delete(`${this.where}/${id}`, this.authorised()));
    this.held.update((all) => all.filter((piece) => piece.id !== id));
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
}
