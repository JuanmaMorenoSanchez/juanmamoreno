import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { KeptService, type KeptPiece } from './kept.service';

/**
 * The only route by which anything leaves his machine.
 *
 * It had no test, which is how a save came to answer "f is not iterable". The
 * list it holds comes off the network and is spread into a new array when
 * something is kept, so an answer that is not a list turns the next save into
 * a minified TypeError — after the bytes have already reached the bucket.
 */
describe('KeptService', () => {
  const piece = (over: Partial<KeptPiece> = {}): KeptPiece => ({
    id: 'k1',
    name: 'Rockets win I',
    tokenId: '195',
    kind: 'layer',
    media: 'image/png',
    width: 1024,
    height: 1086,
    bytes: 240_000,
    created: '2026-10-16T09:00:00.000Z',
    ...over,
  });

  const build = (answers: { get?: unknown; post?: unknown } = {}) => {
    const calls: { method: string; url: string }[] = [];
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: HttpClient,
          useValue: {
            get: (url: string) => {
              calls.push({ method: 'get', url });
              return 'get' in answers ? of(answers.get) : of([]);
            },
            post: (url: string) => {
              calls.push({ method: 'post', url });
              return of(answers.post ?? piece({ id: 'new' }));
            },
            delete: (url: string) => {
              calls.push({ method: 'delete', url });
              return of({ forgotten: 'k1' });
            },
          },
        },
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
      ],
    });
    return { kept: TestBed.inject(KeptService), calls };
  };

  it('holds what the backend sent', async () => {
    const { kept } = build({ get: [piece()] });
    await kept.refresh();

    expect(kept.pieces()).toHaveLength(1);
    expect(kept.pieces()[0].name).toBe('Rockets win I');
  });

  it('puts a newly kept piece at the front, where he will look for it', async () => {
    const { kept } = build({ get: [piece()], post: piece({ id: 'new', name: 'A layer' }) });
    await kept.refresh();

    await kept.keep(new Blob(['x']), { name: 'A layer', kind: 'layer', width: 10, height: 10 });

    expect(kept.pieces().map((p) => p.id)).toEqual(['new', 'k1']);
  });

  /**
   * The failure this file was written for.
   *
   * Anything but a list — an error page that answered 200, a shape changed at
   * the other end, an empty body — used to be stored as the list itself. The
   * shelf then rendered nothing, silently, and the next save threw "f is not
   * iterable" out of a spread, with the bytes already in the bucket and
   * nothing on screen to say the piece was kept.
   */
  describe('an answer that is not a list', () => {
    const notLists = [{}, { pieces: [] }, null, undefined, 'nothing', 7];

    it('is not held', async () => {
      for (const answer of notLists) {
        const { kept } = build({ get: answer });
        await kept.refresh();

        expect(kept.pieces()).toEqual([]);
      }
    });

    it('does not break the next save', async () => {
      for (const answer of notLists) {
        const { kept } = build({ get: answer, post: piece({ id: 'new' }) });
        await kept.refresh();

        const saved = await kept.keep(new Blob(['x']), {
          name: 'A layer',
          kind: 'layer',
          width: 10,
          height: 10,
        });

        expect(saved.id).toBe('new');
        expect(kept.pieces().map((p) => p.id)).toEqual(['new']);
      }
    });
  });

  it('keeps an empty shelf when the backend refuses', async () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: HttpClient,
          useValue: { get: () => throwError(() => new Error('403')) },
        },
        { provide: AdminAuthService, useValue: { bearerToken: () => null } },
      ],
    });
    const kept = TestBed.inject(KeptService);

    await kept.refresh();

    expect(kept.pieces()).toEqual([]);
  });

  it('asks once however many panels ask it', async () => {
    const { kept, calls } = build({ get: [piece()] });

    await Promise.all([kept.ensure(), kept.ensure(), kept.ensure()]);

    expect(calls.filter((call) => call.method === 'get')).toHaveLength(1);
  });

  it('forgets one by taking it off the shelf as well', async () => {
    const { kept } = build({ get: [piece(), piece({ id: 'k2' })] });
    await kept.refresh();

    await kept.forget('k1');

    expect(kept.pieces().map((p) => p.id)).toEqual(['k2']);
  });

  it('tells a clip from a picture by what it is, not by its name', () => {
    const { kept } = build();

    expect(kept.isClip(piece({ media: 'video/mp4' }))).toBe(true);
    expect(kept.isClip(piece({ kind: 'clip', media: 'image/png' }))).toBe(false);
  });

  it('says which copy of the painting a piece was made from', () => {
    const { kept } = build();

    expect(kept.qualityOf(piece({ width: 1024, height: 1086 }))).toBe('web');
    expect(kept.qualityOf(piece({ width: 3652, height: 4533 }))).toBe('high');
  });
});
