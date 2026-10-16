import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { of, throwError } from 'rxjs';
import { Nft } from '@domain/artwork/artwork.entity';
import { AtelierEngineService } from '@features/atelier/engine.service';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { EssayPanelComponent } from './essay-panel.component';

/**
 * Writing an essay with the model on this machine.
 *
 * The browser is the only place both halves are reachable: Cloud Run cannot
 * see 127.0.0.1 and a program on his desk cannot read Firestore. So the page
 * carries the text between them, and what is worth testing is the order it
 * does that in and what it does when a step says no.
 *
 * No model and no backend here. Both are stubbed, and what they are asked is
 * the assertion.
 */
describe('EssayPanelComponent', () => {
  const build = (
    options: {
      written?: string[];
      checks?: Array<{
        violations: { rule: string; offenders: string[] }[];
        rewrite: string | null;
      }>;
      next?: Array<{ lang: string; prompt: string } | null>;
      briefFails?: boolean;
      writeFails?: boolean;
      unreachable?: boolean;
    } = {}
  ) => {
    const asked: string[] = [];
    const prompts: string[] = [];
    const posted: Array<{ url: string; body: unknown }> = [];
    // In order: the first draft, then whatever the next call needs — a
    // rewrite when the check asked for one, otherwise the translation.
    const written = [...(options.written ?? ['An essay.', 'Un ensayo.'])];
    const checks = [...(options.checks ?? [{ violations: [], rewrite: null }])];
    const next = [...(options.next ?? [{ lang: 'es', prompt: 'translate it' }, null])];

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [EssayPanelComponent],
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: HttpClient,
          useValue: {
            get: (url: string) => {
              asked.push(url);
              return options.briefFails
                ? throwError(() => ({ error: { message: 'no snapshot stored yet' } }))
                : of({ prompt: 'the brief', images: ['a-jpeg'] });
            },
            post: (url: string, body: unknown) => {
              posted.push({ url, body });
              if (url.endsWith('/check')) {
                const answer = checks.shift() ?? { violations: [], rewrite: null };
                return of({ ...answer, body: 'the checked essay', dropped: [] });
              }
              return of({ critic: {}, next: next.shift() ?? null });
            },
          },
        },
        {
          provide: AtelierEngineService,
          useValue: {
            unreachable: signal(options.unreachable ?? false),
            write: (prompt: string) => {
              prompts.push(prompt);
              return options.writeFails
                ? Promise.reject(new Error('the engine answered 500'))
                : Promise.resolve(written.shift() ?? 'something');
            },
          },
        },
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
      ],
    });

    const fixture = TestBed.createComponent(EssayPanelComponent);
    fixture.componentRef.setInput('painting', {
      tokenId: '32',
      name: 'Crimen en el olivar',
    } as Nft);
    fixture.detectChanges();
    return {
      fixture,
      host: fixture.nativeElement as HTMLElement,
      asked,
      prompts,
      posted,
      write: () => (fixture.componentInstance as unknown as { write(): Promise<void> }).write(),
    };
  };

  const at = (host: HTMLElement, id: string) =>
    host.querySelector(`[data-testid="${id}"]`) as HTMLElement | null;

  /**
   * What the panel is holding, which is what the five async cases are about.
   *
   * Asserted here rather than in the DOM: this is zoneless and OnPush, and a
   * signal written in a promise continuation five awaits deep does not
   * schedule a render the test harness will honour — the state is right and
   * the template prints it directly. The one case that renders without any of
   * that, an engine that is not answering, is still checked in the DOM.
   */
  const guts = (fixture: { componentInstance: unknown }) =>
    fixture.componentInstance as {
      write(): Promise<void>;
      done(): boolean;
      stage(): string | null;
      trouble(): string | null;
      remaining(): string[];
    };

  it('runs the whole loop in order: brief, write, check, store, translate', async () => {
    const { asked, prompts, posted, write } = build({
      checks: [{ violations: [], rewrite: null }],
    });

    await write();

    expect(asked[0]).toContain('critics/32/brief');
    // Written once, then translated once: no rewrite was needed.
    expect(prompts).toEqual(['the brief', 'translate it']);
    expect(posted.map((call) => call.url.replace(/^.*critics/, 'critics'))).toEqual([
      'critics/check',
      'critics/32/written',
      'critics/32/written',
    ]);
  });

  it('sends the English first and the Spanish second, as raw text', async () => {
    const { posted, write } = build();

    await write();

    const stored = posted.filter((call) => call.url.endsWith('/written'));
    expect(stored[0].body).toEqual({ translated: [{ lang: 'en', text: 'the checked essay' }] });
    expect(stored[1].body).toEqual({ translated: [{ lang: 'es', text: 'Un ensayo.' }] });
  });

  it('asks the model to fix what the check named, and keeps the better draft', async () => {
    const { prompts, write } = build({
      written: ['An essay.', 'A rewrite.', 'Un ensayo.'],
      checks: [
        { violations: [{ rule: 'em dashes', offenders: ['a—b'] }], rewrite: 'fix these' },
        { violations: [], rewrite: null },
      ],
    });

    await write();

    expect(prompts).toEqual(['the brief', 'fix these', 'translate it']);
  });

  it('keeps the first draft when the rewrite fixes nothing', async () => {
    // This model has handed back its own text unchanged before now.
    const { fixture, write } = build({
      written: ['An essay.', 'An essay.', 'Un ensayo.'],
      checks: [
        { violations: [{ rule: 'em dashes', offenders: [] }], rewrite: 'fix these' },
        { violations: [{ rule: 'em dashes', offenders: [] }], rewrite: 'fix these' },
      ],
    });

    await write();

    expect(guts(fixture).remaining()).toEqual(['em dashes']);
    expect(guts(fixture).done()).toBe(true);
  });

  it('says what is still wrong without calling it a failure', async () => {
    const { fixture, write } = build({
      checks: [{ violations: [{ rule: 'the viewer is banned', offenders: [] }], rewrite: null }],
    });

    await write();

    expect(guts(fixture).remaining()).toEqual(['the viewer is banned']);
    expect(guts(fixture).trouble()).toBeNull();
  });

  it('ends in the state the page prints as a kept draft', async () => {
    const { write, fixture } = build();

    await write();

    expect(guts(fixture).done()).toBe(true);
    expect(guts(fixture).trouble()).toBeNull();
  });

  it("holds the backend's own words when the brief cannot be built", async () => {
    const { fixture, write } = build({ briefFails: true });

    await write();

    expect(guts(fixture).trouble()).toContain('no snapshot stored yet');
  });

  it('stores nothing when the model fails', async () => {
    const { posted, fixture, write } = build({ writeFails: true });

    await write();

    expect(posted).toEqual([]);
    expect(guts(fixture).trouble()).toContain('the engine answered 500');
  });

  it('offers nothing at all when the engine is not answering', () => {
    const { host } = build({ unreachable: true });

    expect(at(host, 'write-essay')).toBeNull();
    expect(at(host, 'essay-no-engine')?.textContent).toContain('not answering');
  });
});
