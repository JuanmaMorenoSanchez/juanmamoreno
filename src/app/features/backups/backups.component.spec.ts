import { TestBed } from '@angular/core/testing';
import { provideZonelessChangeDetection, type WritableSignal } from '@angular/core';
import { BackupsComponent, type Checked, type Manifest } from './backups.component';

/**
 * Whether the copy on his disk is still a copy of anything.
 *
 * The tests that matter here are the ones about lying. A board like this is
 * only worth having if it is believed, and the two ways it could quietly stop
 * being true are both covered: a part that has not been refreshed must not be
 * carried along by a newer one (the eight gigabytes of atelier layers claiming
 * to be from this morning), and a file that could not be read must not pass as
 * a file that hashed true. The third is that nothing on this page restores
 * anything — there is no button, only a command to copy — and the last test
 * asserts it stays that way.
 */
describe('BackupsComponent', () => {
  /** The signals the tests drive, which are the component's own private state. */
  interface Inside {
    manifest: WritableSignal<Manifest | undefined>;
    hashes: WritableSignal<Record<string, boolean>>;
    parts: () => Checked[];
    wrong: () => Checked[];
    count: (part: Checked) => string;
    restoreCommand: (part: Checked) => string;
  }

  const build = () => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [BackupsComponent],
      providers: [provideZonelessChangeDetection()],
    });
    const fixture = TestBed.createComponent(BackupsComponent);
    fixture.detectChanges();
    return { fixture, inside: fixture.componentInstance as unknown as Inside };
  };

  /** A manifest as `backup.mjs` writes one, with the dates under our control. */
  const manifest = (parts: Manifest['parts'], skipped: Manifest['skipped'] = []): Manifest => ({
    version: 1,
    parts,
    skipped,
  });

  const hoursAgo = (hours: number) => new Date(Date.now() - hours * 3_600_000).toISOString();
  const daysAgo = (days: number) => hoursAgo(days * 24);

  it('says so, rather than offering a button, in a browser that cannot look', () => {
    // jsdom has no showDirectoryPicker, and neither have Safari and Firefox.
    // A dead button would be worse than the sentence that explains itself.
    const { fixture } = build();
    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('cannot read a local folder');
    expect((fixture.nativeElement as HTMLElement).querySelector('.backups-pick')).toBeNull();
    // The way to make one is offered either way: the page is useful before it
    // has ever been pointed at anything.
    expect(text).toContain('node scripts/backup/backup.mjs');
  });

  it('asks for the folder before it claims anything, where it can', () => {
    const had = Object.getOwnPropertyDescriptor(window, 'showDirectoryPicker');
    Object.defineProperty(window, 'showDirectoryPicker', {
      value: () => Promise.reject(new Error('not used')),
      configurable: true,
    });
    try {
      const { fixture } = build();
      const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
      expect(text).toContain('Choose the folder');
      // Nothing is claimed about an archive nobody has pointed at yet.
      expect(text).not.toContain('Worth looking at');
      expect(text).not.toContain('hashes true');
    } finally {
      if (had) Object.defineProperty(window, 'showDirectoryPicker', had);
      else delete (window as unknown as Record<string, unknown>)['showDirectoryPicker'];
    }
  });

  it('calls a collection late past eight days and a bucket not past eighty', () => {
    const { fixture, inside } = build();
    inside.manifest.set(
      manifest([
        { what: 'firestore/posts.json', kind: 'firestore', name: 'posts', takenAt: daysAgo(9) },
        { what: 'firestore/critics.json', kind: 'firestore', name: 'critics', takenAt: daysAgo(2) },
        {
          what: 'buckets/juanmamoreno-atelier',
          kind: 'bucket',
          name: 'atelier',
          takenAt: daysAgo(80),
        },
      ])
    );
    fixture.detectChanges();

    const byName = Object.fromEntries(inside.parts().map((part) => [part.name, part.state]));
    // Eight days is the figure the backend's activity page already uses for a
    // Firestore backup, so the two pages never disagree about "late".
    expect(byName['posts']).toBe('late');
    expect(byName['critics']).toBe('quiet');
    // The paintings in a bucket do not change once they are in. Nagging weekly
    // about them is how a board teaches somebody to stop reading it.
    expect(byName['atelier']).toBe('quiet');
  });

  it('does not let a fresh part backdate one it never touched', () => {
    const { fixture, inside } = build();
    // Exactly what `--only firestore` leaves behind: the collections copied a
    // minute ago, the buckets last copied in the summer.
    inside.manifest.set(
      manifest([
        { what: 'firestore/posts.json', kind: 'firestore', name: 'posts', takenAt: hoursAgo(1) },
        { what: 'buckets/juanmamoreno-web', kind: 'bucket', name: 'web', takenAt: daysAgo(200) },
      ])
    );
    fixture.detectChanges();

    expect(inside.wrong().map((part) => part.name)).toEqual(['web']);
  });

  it('tells a file it could not check from a file that failed', () => {
    const { fixture, inside } = build();
    inside.manifest.set(
      manifest([
        {
          what: 'firestore/a.json',
          kind: 'firestore',
          name: 'a',
          takenAt: hoursAgo(1),
          sha256: 'aa',
        },
        {
          what: 'firestore/b.json',
          kind: 'firestore',
          name: 'b',
          takenAt: hoursAgo(1),
          sha256: 'bb',
        },
      ])
    );
    // `a` hashed wrong; `b` could not be opened at all and so is absent here.
    inside.hashes.set({ 'firestore/a.json': false });
    fixture.detectChanges();

    // Only the one known to be wrong. "I could not tell" is not a fault, and
    // reporting it as one would make the column worthless.
    expect(inside.wrong().map((part) => part.name)).toEqual(['a']);
  });

  it('says a short chain sweep is short, with the count the contract gave', () => {
    const { fixture, inside } = build();
    inside.manifest.set(
      manifest([
        {
          what: 'chain/certificates.json',
          kind: 'chain',
          name: '0x6E8b',
          tokens: 150,
          expected: 193,
          complete: false,
          takenAt: hoursAgo(1),
        },
      ])
    );
    fixture.detectChanges();

    // A short answer and a complete one look identical without both numbers.
    expect(inside.count(inside.parts()[0])).toBe('150 of 193 tokens');
  });

  it('names what was left out and why, so a gap is never a mystery', () => {
    const { fixture, inside } = build();
    inside.manifest.set(manifest([], [{ what: 'instagram-token', why: 'a live credential' }]));
    fixture.detectChanges();

    const text = (fixture.nativeElement as HTMLElement).textContent ?? '';
    expect(text).toContain('instagram-token');
    expect(text).toContain('a live credential');
  });

  it('restores nothing: the commands are text, and the chain has none at all', () => {
    const { fixture, inside } = build();
    const row = (over: Partial<Checked>): Checked =>
      ({
        what: 'x',
        kind: 'firestore',
        name: 'x',
        takenAt: hoursAgo(1),
        state: 'quiet',
        ...over,
      }) as Checked;

    inside.manifest.set(
      manifest([
        { what: 'firestore/posts.json', kind: 'firestore', name: 'posts', takenAt: hoursAgo(1) },
        {
          what: 'buckets/juanmamoreno-web',
          kind: 'bucket',
          name: 'juanmamoreno-web',
          takenAt: hoursAgo(1),
        },
        { what: 'chain/certificates.json', kind: 'chain', name: '0x6E8b', takenAt: hoursAgo(1) },
      ])
    );
    fixture.detectChanges();

    expect(inside.restoreCommand(row({ kind: 'firestore', name: 'posts' }))).toBe(
      'node scripts/backup/restore.mjs firestore posts'
    );
    expect(inside.restoreCommand(row({ kind: 'bucket', name: 'juanmamoreno-web' }))).toBe(
      'node scripts/backup/restore.mjs bucket juanmamoreno-web'
    );
    // The chain is the record. There is nothing to write back to it.
    expect(inside.restoreCommand(row({ kind: 'chain', name: '0x6E8b' }))).toBe('');

    // And no command on the page carries --yes ready to run: the word is his to
    // add, which is the whole safety of the arrangement.
    const element = fixture.nativeElement as HTMLElement;
    const buttons = [...element.querySelectorAll('button')].map((button) =>
      button.textContent?.trim()
    );
    expect(buttons.some((label) => /restore/i.test(label ?? ''))).toBe(false);
    for (const code of element.querySelectorAll('code.backups-restore')) {
      expect(code.textContent).not.toContain('--yes');
    }
  });
});
