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

  /**
   * The envelope, which is why the shelf was empty on the catalogue page.
   *
   * Every route on the backend answers `{ success, message, data }` — an
   * interceptor wraps whatever the controller returned, and the controllers
   * never see it. This service read the envelope as though it were the list,
   * so the shelf was an object from the day it was written: nothing rendered,
   * and the next save spread the object and threw.
   */
  describe('the envelope the backend sends everything in', () => {
    it('reads the list out of it', async () => {
      const { kept } = build({ get: { success: true, message: 'ok', data: [piece()] } });
      await kept.refresh();

      expect(kept.pieces().map((p) => p.id)).toEqual(['k1']);
      expect(kept.listTrouble()).toBeNull();
    });

    it('reads a newly kept piece out of it', async () => {
      const { kept } = build({
        get: { success: true, data: [] },
        post: { success: true, data: piece({ id: 'new' }) },
      });
      await kept.refresh();

      const saved = await kept.keep(new Blob(['x']), {
        name: 'A layer',
        kind: 'layer',
        width: 10,
        height: 10,
      });

      expect(saved.id).toBe('new');
      expect(kept.pieces().map((p) => p.id)).toEqual(['new']);
    });

    it('says what a refusal inside a success said', async () => {
      const { kept } = build({ get: { success: false, message: 'Forbidden resource' } });
      await kept.refresh();

      expect(kept.pieces()).toEqual([]);
      expect(kept.listTrouble()).toBe('Forbidden resource');
    });

    it('still reads a bare list, for when the envelope goes away', async () => {
      const { kept } = build({ get: [piece()] });
      await kept.refresh();

      expect(kept.pieces()).toHaveLength(1);
    });
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

    it('says what did arrive, which is what anybody debugging it needs', async () => {
      const { kept } = build({ get: { pieces: [], total: 0 } });
      await kept.refresh();

      expect(kept.listTrouble()).toBe(
        'the backend answered an object with pieces, total rather than a list'
      );
    });

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

  /**
   * A refusal is not an answer, and must not be remembered as one.
   *
   * `ensure` keeps the promise so ten panels opening are one request, and it
   * kept a refusal just as happily: the catalogue asked once, before the
   * sign-in had been restored, got a 403, and every painting on the page said
   * it had no assets for the rest of the visit.
   */
  describe('a list that could not be fetched', () => {
    const refusing = (answers: unknown[]) => {
      const asked: string[] = [];
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: HttpClient,
            useValue: {
              get: (url: string) => {
                asked.push(url);
                const answer = answers.shift();
                return answer === null ? of([piece()]) : throwError(() => answer);
              },
            },
          },
          { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
        ],
      });
      return { kept: TestBed.inject(KeptService), asked };
    };

    it('says why, rather than looking like an empty shelf', async () => {
      const { kept } = refusing([{ status: 403 }]);

      await kept.ensure();

      expect(kept.pieces()).toEqual([]);
      expect(kept.listTrouble()).toContain('sign in again');
    });

    it('is asked again by the next panel that opens', async () => {
      const { kept, asked } = refusing([{ status: 403 }, null]);

      await kept.ensure();
      await kept.ensure();

      expect(asked).toHaveLength(2);
      expect(kept.pieces()).toHaveLength(1);
      expect(kept.listTrouble()).toBeNull();
    });

    it('is not asked again once it has answered', async () => {
      const { kept, asked } = refusing([null, null]);

      await kept.ensure();
      await kept.ensure();

      expect(asked).toHaveLength(1);
    });
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

  /**
   * The shelf showing what it has, and saying when it cannot.
   *
   * It used to swallow a failed fetch, so a shelf of pieces with no pictures
   * and no labels looked exactly like a shelf of things that never saved. The
   * usual cause is an hour-old sign-in, which is worth saying.
   */
  describe('fetching the bytes of a kept piece', () => {
    const building = (answer: unknown) => {
      const asked: string[] = [];
      TestBed.resetTestingModule();
      TestBed.configureTestingModule({
        providers: [
          provideZonelessChangeDetection(),
          {
            provide: HttpClient,
            useValue: {
              get: (url: string) => {
                asked.push(url);
                // `null` is the one that works; anything else is what the
                // backend answered with.
                return answer === null ? of(new Blob(['bytes'])) : throwError(() => answer);
              },
            },
          },
          { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
        ],
      });
      return { kept: TestBed.inject(KeptService), asked };
    };

    it('says the sign-in has lapsed, which is what a 403 means here', async () => {
      const { kept } = building({ status: 403 });

      await kept.show('k1');

      expect(kept.trouble()['k1']).toContain('sign in again');
    });

    it('says when the piece is no longer in the bucket', async () => {
      const { kept } = building({ status: 404 });

      await kept.show('k1');

      expect(kept.trouble()['k1']).toContain('no longer in the bucket');
    });

    it('gives the status for anything else, rather than nothing at all', async () => {
      const { kept } = building({ status: 500 });

      await kept.show('k1');

      expect(kept.trouble()['k1']).toContain('500');
    });

    it('asks once however many times the shelf redraws', async () => {
      const { kept, asked } = building(null);

      await Promise.all([kept.show('k1'), kept.show('k1')]);
      await kept.show('k1');

      expect(asked).toHaveLength(1);
      expect(kept.urls()['k1']).toBeDefined();
    });

    it('forgets the trouble once the bytes arrive', async () => {
      const { kept } = building({ status: 403 });
      await kept.show('k1');
      expect(kept.trouble()['k1']).toBeDefined();

      // A second sign-in, and the same piece asked for again.
      const after = building(null);
      await after.kept.show('k1');

      expect(after.kept.trouble()['k1']).toBeUndefined();
    });
  });

  it('says which copy of the painting a piece was made from', () => {
    const { kept } = build();

    expect(kept.qualityOf(piece({ width: 1024, height: 1086 }))).toBe('web');
    expect(kept.qualityOf(piece({ width: 3652, height: 4533 }))).toBe('high');
  });
});
