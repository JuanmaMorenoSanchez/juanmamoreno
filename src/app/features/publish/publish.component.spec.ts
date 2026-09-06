import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { PendingReel, PendingReelsService } from '@shared/services/pending-reels.service';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { PublishComponent } from './publish.component';

/**
 * The page the artist deals with finished reels on.
 *
 * Instagram has no draft an API can write to, so the nightly run stops at the
 * video and everything after it happens here.
 */
const REEL: PendingReel = {
  tokenId: '10',
  tokenIds: ['10', '11'],
  name: 'Siesta',
  video: 'https://storage.googleapis.com/bucket/reels/10.mp4',
  caption: 'Siesta\nJuanma Moreno Sánchez, 2019',
  renderedAt: '2026-09-06T10:00:00.000Z',
};

function setup(options: { waiting?: PendingReel[] | undefined; signedIn?: boolean } = {}) {
  const reels = {
    pending: vi.fn().mockReturnValue(of('waiting' in options ? options.waiting : [REEL])),
    publish: vi.fn().mockReturnValue(of(true)),
    discard: vi.fn().mockReturnValue(of(true)),
  };
  const auth = {
    isAdmin: () => options.signedIn !== false,
    bearerToken: () => (options.signedIn === false ? null : 'a-real-looking-token'),
    identity: () => ({ email: 'morenosanchezjuanma@gmail.com' }),
  };

  TestBed.configureTestingModule({
    imports: [PublishComponent],
    providers: [
      provideHttpClient(),
      provideHttpClientTesting(),
      { provide: PendingReelsService, useValue: reels },
      { provide: AdminAuthService, useValue: auth },
    ],
  });

  const fixture = TestBed.createComponent(PublishComponent);
  fixture.detectChanges();
  return { fixture, reels };
}

const text = (fixture: ComponentFixture<PublishComponent>) =>
  (fixture.nativeElement as HTMLElement).textContent ?? '';
const find = (fixture: ComponentFixture<PublishComponent>, selector: string) =>
  (fixture.nativeElement as HTMLElement).querySelector<HTMLElement>(selector);

describe('PublishComponent', () => {
  afterEach(() => TestBed.resetTestingModule());

  it('plays the video it is asking about', () => {
    const { fixture } = setup();

    expect(find(fixture, '.publish-video')?.getAttribute('src')).toBe(REEL.video);
    expect(text(fixture)).toContain('Siesta');
  });

  /**
   * The caption is the thing being checked. It is written when the video is
   * made and published unchanged, so this page is the only place it is read
   * before it goes out under his name.
   */
  it('shows the caption it would go out with, in full', () => {
    const { fixture } = setup();

    expect(find(fixture, '.publish-caption')?.textContent).toBe(REEL.caption);
  });

  it('publishes the one whose button was pressed', () => {
    const { fixture, reels } = setup();

    find(fixture, '.publish-go')?.click();

    expect(reels.publish).toHaveBeenCalledWith('10', 'a-real-looking-token');
  });

  /**
   * Discarding deletes a video that took minutes of ffmpeg to make, and its
   * button sits beside the one that publishes. One press arms it and says so;
   * the second does it.
   */
  it('asks before throwing one away', () => {
    const { fixture, reels } = setup();

    find(fixture, '.publish-discard')?.click();
    fixture.detectChanges();

    expect(reels.discard).not.toHaveBeenCalled();
    expect(find(fixture, '.publish-discard')?.textContent).toContain('Really discard?');
  });

  it('throws it away on the second press', () => {
    const { fixture, reels } = setup();

    find(fixture, '.publish-discard')?.click();
    fixture.detectChanges();
    find(fixture, '.publish-discard')?.click();

    expect(reels.discard).toHaveBeenCalledWith('10', 'a-real-looking-token');
  });

  // Reaching for publish is not a way of confirming the discard beside it.
  it('forgets an armed discard when the other button is used', () => {
    const { fixture, reels } = setup();

    find(fixture, '.publish-discard')?.click();
    fixture.detectChanges();
    find(fixture, '.publish-go')?.click();
    fixture.detectChanges();

    expect(reels.publish).toHaveBeenCalled();
    expect(reels.discard).not.toHaveBeenCalled();
    expect(find(fixture, '.publish-discard')?.textContent).toContain('Discard');
  });

  // Otherwise a published reel stays on the page and can be published twice.
  it('asks again once one has been dealt with', () => {
    const { fixture, reels } = setup();

    find(fixture, '.publish-go')?.click();
    fixture.detectChanges();

    expect(reels.pending).toHaveBeenCalledTimes(2);
  });

  /**
   * Both leave the page with nothing on it, and only one of them means
   * everything is working. Saying "nothing is waiting" when the server is down
   * is the reassuring answer and the wrong one.
   */
  it('tells an empty queue apart from a server that did not answer', () => {
    const empty = setup({ waiting: [] });
    expect(text(empty.fixture)).toContain('Nothing is waiting');
    TestBed.resetTestingModule();

    const broken = setup({ waiting: undefined });
    expect(text(broken.fixture)).toContain('Could not reach the server');
    expect(text(broken.fixture)).not.toContain('Nothing is waiting');
  });

  // The way to edit one: Instagram cannot be handed a draft, so editing means
  // taking the file and posting it from the app by hand.
  it('offers the file, since editing it can only happen in the app', () => {
    const { fixture } = setup();

    expect(find(fixture, '.publish-download')?.getAttribute('href')).toBe(REEL.video);
  });

  it('asks for nothing when nobody is signed in', () => {
    const { reels } = setup({ signedIn: false });

    expect(reels.pending).not.toHaveBeenCalled();
  });
});
