import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { environment } from '@environments/environment';
import { ApiResponse } from '@shared/types/api-response.type';
import { catchError, map, Observable, of, tap } from 'rxjs';

/** The three things the atelier can ask a model to do. */
export type AtelierOperation = 'segment' | 'inpaint' | 'edit';

export interface OperationPrice {
  operation: AtelierOperation;
  usd: number;
  what: string;
}

/** The price list, and what today has cost so far. */
export interface Prices {
  prices: Record<AtelierOperation, OperationPrice>;
  ceiling: number;
  spent: number;
  left: number;
  configured: boolean;
}

export interface Cut {
  label: string;
  /**
   * The outline, as `[x, y]` points each 0–1000 of the picture's size.
   *
   * Numbers rather than an image, because a model asked for a mask spells a png
   * out as text and gets the bytes wrong. Normalised over the whole picture, so
   * a shape found on a small copy cuts the full-size original with nothing
   * scaled and nothing blurred.
   */
  points: [number, number][];
  /** `[y0, x0, y1, x1]`, each 0–1000: where the model says the thing is. */
  box: [number, number, number, number];
}

export interface Layer {
  file: string;
  label: string;
  depth: number;
  order: number;
  /**
   * The outline it was cut from, `[x, y]` each 0–1000 of the painting.
   *
   * The png is the layer at one resolution; this is its shape at any of them,
   * so a layer can be cut again from a better photograph without asking the
   * model a second time. Absent on a layer painted in behind another, which was
   * never cut from an outline.
   */
  points?: [number, number][];
}

export interface Piece {
  id: string;
  source: string;
  title: string;
  layers: Layer[];
  frames?: { label: string; files: string[] }[];
  updatedAt: string;
}

/** One file made from a painting, as the catalogue page lists it. */
export interface DerivedAsset {
  kind: 'layer' | 'frame';
  file: string;
  label: string;
  url: string;
}

/** Everything made from one painting, under the piece it belongs to. */
export interface DerivedPiece {
  id: string;
  /** The painting it came from — a token id, or a name for an upload. */
  source: string;
  title: string;
  updatedAt: string;
  assets: DerivedAsset[];
}

/**
 * The atelier, as the page talks to it.
 *
 * Every call carries the artist's token, because every one of them spends his
 * money. The guard on the backend would refuse them anyway; sending the token
 * is what makes them work rather than what makes them safe.
 *
 * The prices are held here rather than written into the templates. A label
 * that quotes a number it keeps its own copy of is a label that goes stale
 * silently, and the whole point of putting the cost on the button is that it
 * is true at the moment it is read.
 */
@Injectable({ providedIn: 'root' })
export class AtelierService {
  private http = inject(HttpClient);

  /** Undefined until asked, so a page can tell "not yet" from "nothing". */
  readonly prices = signal<Prices | undefined>(undefined);

  private authorised(token: string) {
    return { headers: { Authorization: `Bearer ${token}` } };
  }

  /** Asks what things cost, and keeps the answer for every button to read. */
  loadPrices(token: string): Observable<Prices | undefined> {
    return this.http
      .get<ApiResponse<Prices>>(`${environment.backendUrl}atelier/prices`, this.authorised(token))
      .pipe(
        map((response) => response?.data),
        tap((prices) => this.prices.set(prices)),
        catchError(() => of(undefined))
      );
  }

  /**
   * One pass over the picture, finding everything named at once.
   *
   * The working copy is sent, not the original: the model is billed by what it
   * is given, and the mask that comes back is scaled up over the full-size
   * painting in the browser. So the cut is cheap and the layer is not small.
   */
  segment(working: Blob, labels: string[], token: string): Observable<Cut[] | undefined> {
    const form = new FormData();
    form.append('image', working, 'working.jpg');
    form.append('labels', labels.join(','));

    return this.send<Cut[]>('atelier/segment', form, token);
  }

  /** What was behind a layer, invented where it was never painted. */
  inpaint(
    working: Blob,
    mask: Blob,
    prompt: string,
    token: string
  ): Observable<{ image: string } | undefined> {
    const form = new FormData();
    form.append('image', working, 'working.png');
    form.append('mask', mask, 'mask.png');
    form.append('prompt', prompt);

    return this.send<{ image: string }>('atelier/inpaint', form, token);
  }

  /** One variant of the picture, asked for in words. */
  edit(
    working: Blob,
    instruction: string,
    token: string
  ): Observable<{ image: string } | undefined> {
    const form = new FormData();
    form.append('image', working, 'working.png');
    form.append('instruction', instruction);

    return this.send<{ image: string }>('atelier/edit', form, token);
  }

  /** Puts one finished layer on the shelf, at full size. */
  saveFile(
    id: string,
    file: string,
    data: Blob,
    token: string
  ): Observable<{ url: string } | undefined> {
    const form = new FormData();
    form.append('id', id);
    form.append('file', file);
    form.append('data', data, file);

    return this.send<{ url: string }>('atelier/pieces/file', form, token);
  }

  /** The manifest, which is what makes a folder of pngs a piece. */
  save(piece: Omit<Piece, 'updatedAt'>, token: string): Observable<Piece | undefined> {
    return this.http
      .post<ApiResponse<Piece>>(
        `${environment.backendUrl}atelier/pieces`,
        piece,
        this.authorised(token)
      )
      .pipe(
        map((response) => response?.data),
        catchError(() => of(undefined))
      );
  }

  /** Everything on the shelf, newest first. */
  pieces(token: string): Observable<Piece[] | undefined> {
    return this.http
      .get<ApiResponse<Piece[]>>(`${environment.backendUrl}atelier/pieces`, this.authorised(token))
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of(undefined))
      );
  }

  /**
   * Everything made from the paintings, grouped by piece.
   *
   * Undefined when the question could not be asked, which the catalogue tells
   * apart from "nothing has been made yet": one of them is a reason to try
   * again and the other is not.
   */
  derived(token: string): Observable<DerivedPiece[] | undefined> {
    return this.http
      .get<ApiResponse<DerivedPiece[]>>(
        `${environment.backendUrl}atelier/derived`,
        this.authorised(token)
      )
      .pipe(
        map((response) => response?.data ?? []),
        catchError(() => of(undefined))
      );
  }

  /** Throws away everything made from one painting. Answers false rather than throwing. */
  forget(pieceId: string, token: string): Observable<boolean> {
    return this.http
      .delete<ApiResponse<unknown>>(
        `${environment.backendUrl}atelier/pieces/${pieceId}`,
        this.authorised(token)
      )
      .pipe(
        map((response) => response?.success === true),
        catchError(() => of(false))
      );
  }

  /**
   * The spending that just happened, so the page can keep the running total
   * honest without asking the server again after every press.
   */
  spend(operation: AtelierOperation): void {
    const current = this.prices();
    if (!current) return;

    const cost = current.prices[operation].usd;
    this.prices.set({
      ...current,
      spent: round(current.spent + cost),
      left: round(current.left - cost),
    });
  }

  /**
   * A refusal is reported as a message rather than swallowed, because the one
   * that matters — the day's ceiling — is a thing he needs to read, and a
   * button that simply did nothing would be indistinguishable from a bug.
   */
  private send<T>(path: string, form: FormData, token: string): Observable<T | undefined> {
    return this.http
      .post<ApiResponse<T>>(`${environment.backendUrl}${path}`, form, this.authorised(token))
      .pipe(
        map((response) => response?.data),
        catchError(() => of(undefined))
      );
  }
}

function round(usd: number): number {
  return Math.round(usd * 1000) / 1000;
}
