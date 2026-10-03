import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { of } from 'rxjs';
import { ActivityComponent } from './activity.component';
import { Activity, ActivityApiService } from './activity.service';

describe('ActivityComponent', () => {
  let fixture: ComponentFixture<ActivityComponent>;

  const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3600_000).toISOString();

  const page = (over: Partial<Activity> = {}): Activity => ({
    runs: [{ id: 'a', startedAt: hoursAgo(9), finishedAt: hoursAgo(8), failures: 0, jobs: [] }],
    beats: [
      { what: 'Last nightly run', at: hoursAgo(8), state: 'quiet' },
      { what: 'Last posted to a network', at: hoursAgo(20), goTo: '/catalogue', state: 'quiet' },
    ],
    spend: { spent: 0.12, ceiling: 5, left: 4.88 },
    ...over,
  });

  function build(answer: Activity | undefined): void {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [ActivityComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        { provide: AdminAuthService, useValue: { bearerToken: () => 'a-token' } },
        { provide: ActivityApiService, useValue: { latest: () => of(answer) } },
      ],
    });
    fixture = TestBed.createComponent(ActivityComponent);
    fixture.detectChanges();
  }

  function text(): string {
    return (fixture.nativeElement as HTMLElement).textContent ?? '';
  }

  it('says everything is fine when it is', () => {
    build(page());

    expect(text()).toContain('Everything is where it should be');
  });

  /**
   * The page answers before it is read. Anything not quiet goes to the top,
   * because the whole reason this exists is that four things broke here without
   * announcing themselves.
   */
  it('puts what is wrong at the top, before anything else', () => {
    build(
      page({
        beats: [
          { what: 'Last nightly run', at: hoursAgo(50), state: 'late' },
          { what: 'Last posted to a network', at: hoursAgo(2), goTo: '/catalogue', state: 'quiet' },
        ],
      })
    );

    const wrong = fixture.nativeElement.querySelector('.activity-wrong');
    expect(wrong).not.toBeNull();
    expect(wrong.textContent).toContain('Last nightly run');
    expect(wrong.textContent).not.toContain('Last posted');
    expect(text()).not.toContain('Everything is where it should be');
  });

  /**
   * The one answer that must not look like "everything is quiet": a page about
   * whether things are running, saying nothing, is the failure it exists for.
   */
  it('does not look calm when it could not ask', () => {
    build(undefined);

    expect(text()).toContain('not the same as nothing being wrong');
    expect(text()).not.toContain('Everything is where it should be');
  });

  it('offers a way through to whatever each row is about', () => {
    build(page());

    const links = [...fixture.nativeElement.querySelectorAll('a')].map((a: HTMLAnchorElement) =>
      a.getAttribute('href')
    );
    expect(links).toContain('/catalogue');
    expect(links).toContain('/publish');
    expect(links).toContain('/atelier');
  });

  /** A run that started and never came back is the thing nothing else sees. */
  it('names a run that did not come back', () => {
    build(page({ runs: [{ id: 'a', startedAt: hoursAgo(3) }] }));

    expect(text()).toContain('never came back');
  });

  it('names which jobs failed, not just that some did', () => {
    build(
      page({
        runs: [
          {
            id: 'a',
            startedAt: hoursAgo(9),
            finishedAt: hoursAgo(8),
            failures: 1,
            jobs: [
              { name: 'instagram reel', ok: false },
              { name: 'essays', ok: true },
            ],
          },
        ],
      })
    );

    expect(text()).toContain('instagram reel');
  });

  it('counts in words, because a date needs counting and this does not', () => {
    build(page());
    const component = fixture.componentInstance;

    expect(component.ago(null)).toBe('never');
    expect(component.ago(hoursAgo(0.001))).toBe('just now');
    expect(component.ago(hoursAgo(3))).toBe('3 hours ago');
    expect(component.ago(hoursAgo(72))).toBe('3 days ago');
  });

  it('shows what the day has cost, since it is the only thing that spends', () => {
    build(page());

    expect(text()).toContain('$0.12');
    expect(text()).toContain('$5.00');
  });
});
