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
  caption: 'Siesta\nJuanma Moreno Sánchez, 2019\n\nThe blue arrives first.',
  sheet: 'Siesta\nJuanma Moreno Sánchez, 2019',
  essay: 'The **blue** arrives first.',
  lang: 'es',
  renderedAt: '2026-09-06T10:00:00.000Z',
};

function setup(options: { waiting?: PendingReel[] | undefined; signedIn?: boolean } = {}) {
  const reels = {
    pending: vi.fn().mockReturnValue(of('waiting' in options ? options.waiting : [REEL])),
    publish: vi.fn().mockReturnValue(of(true)),
    discard: vi.fn().mockReturnValue(of(true)),
    updateCritic: vi.fn().mockReturnValue(of(true)),
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
   * Two boxes rather than one, so the essay half can be the critic's own
   * markdown — which is what makes it something that can be saved back over the
   * essay instead of a flattened, trimmed copy that would truncate it.
   */
  it('offers the sheet and the critic separately, to edit', () => {
    const { fixture } = setup();
    const sheet = find(fixture, '.publish-sheet') as HTMLTextAreaElement | null;
    const essay = find(fixture, '.publish-essay') as HTMLTextAreaElement | null;

    expect(sheet?.tagName).toBe('TEXTAREA');
    expect(sheet?.value).toBe(REEL.sheet);
    expect(essay?.value).toBe(REEL.essay);
  });

  // Only one of the two languages is his own writing, so the page says which.
  it('says which language the critic is in', () => {
    const { fixture } = setup();

    expect(find(fixture, '.publish-lang')?.textContent?.trim()).toBe('es');
  });

  it('publishes both halves of the one whose button was pressed', () => {
    const { fixture, reels } = setup();

    find(fixture, '.publish-go')?.click();

    expect(reels.publish).toHaveBeenCalledWith(
      '10',
      { sheet: REEL.sheet, essay: REEL.essay },
      'a-real-looking-token',
    );
  });

  // The whole point of making them editable.
  it('publishes what he rewrote, not what was drafted', () => {
    const { fixture, reels } = setup();
    const essay = find(fixture, '.publish-essay') as HTMLTextAreaElement;

    essay.value = 'His own words about the painting';
    essay.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    find(fixture, '.publish-go')?.click();

    expect(reels.publish).toHaveBeenCalledWith(
      '10',
      { sheet: REEL.sheet, essay: 'His own words about the painting' },
      'a-real-looking-token',
    );
  });

  /**
   * The second of the two acts, and the one that lasts: this changes the essay
   * wherever it is read rather than only the words on one video.
   */
  describe('updating the critic', () => {
    it('saves the essay against the language it is in', () => {
      const { fixture, reels } = setup();
      const essay = find(fixture, '.publish-essay') as HTMLTextAreaElement;

      essay.value = 'A better sentence.';
      essay.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      find(fixture, '.publish-save')?.click();

      expect(reels.updateCritic).toHaveBeenCalledWith(
        '10',
        'es',
        'A better sentence.',
        'a-real-looking-token',
      );
    });

    // Two separate acts: saving must not put anything on Instagram.
    it('publishes nothing', () => {
      const { fixture, reels } = setup();

      find(fixture, '.publish-save')?.click();

      expect(reels.publish).not.toHaveBeenCalled();
    });

    it('says so once it is saved', () => {
      const { fixture } = setup();

      find(fixture, '.publish-save')?.click();
      fixture.detectChanges();

      expect(text(fixture)).toContain('Critic updated');
    });

    it('will not save an empty essay over a real one', () => {
      const { fixture, reels } = setup();
      const essay = find(fixture, '.publish-essay') as HTMLTextAreaElement;

      essay.value = '   ';
      essay.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      find(fixture, '.publish-save')?.click();

      expect(reels.updateCritic).not.toHaveBeenCalled();
    });

    it('says so when the save fails rather than looking as though it worked', () => {
      const { fixture, reels } = setup();
      reels.updateCritic.mockReturnValue(of(false));

      find(fixture, '.publish-save')?.click();
      fixture.detectChanges();

      expect(text(fixture)).toContain('Could not update the critic');
      expect(text(fixture)).not.toContain('Critic updated');
    });
  });

  /**
   * Past the limit the backend trims the essay at a sentence, which is what it
   * has always done — so this warns rather than blocks. Publishing loses
   * nothing but the tail.
   */
  it('warns that a long caption will be trimmed, and still publishes', () => {
    const { fixture, reels } = setup();
    const essay = find(fixture, '.publish-essay') as HTMLTextAreaElement;

    essay.value = 'x'.repeat(2300);
    essay.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    find(fixture, '.publish-go')?.click();

    expect(text(fixture)).toContain('trimmed at a sentence');
    expect(reels.publish).toHaveBeenCalled();
  });

  it('counts what the caption will come to', () => {
    const { fixture } = setup();

    const expected = `${REEL.sheet}\n\n${REEL.essay}`.trim().length;
    expect(find(fixture, '.publish-count')?.textContent).toContain(String(expected));
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

  // An edit to one reel is not an edit to the next one down the page.
  it('keeps each caption to its own reel', () => {
    const second: PendingReel = { ...REEL, tokenId: '20', name: 'Stalker', essay: 'Stalker' };
    const { fixture } = setup({ waiting: [REEL, second] });
    const essays = (fixture.nativeElement as HTMLElement).querySelectorAll('.publish-essay');

    (essays[0] as HTMLTextAreaElement).value = 'Only the first';
    essays[0].dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect((essays[1] as HTMLTextAreaElement).value).toBe('Stalker');
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
