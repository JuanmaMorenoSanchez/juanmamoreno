import { HttpClient } from '@angular/common/http';
import { provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { of } from 'rxjs';
import { EnquiriesComponent } from './enquiries.component';
import { EnquiriesService, type Enquiry } from './enquiries.service';

/**
 * The page is a list and a delete, so what is worth testing is the delete —
 * which cannot be undone — and the difference between an empty list and an
 * api that did not answer.
 */
const message = (said: Partial<Enquiry> = {}): Enquiry => ({
  id: 'm1',
  name: 'Ada Lovelace',
  email: 'ada@example.com',
  message: 'Is the blue one still available?',
  createdAt: new Date().toISOString(),
  ...said,
});

function setup(options: { messages?: Enquiry[] | undefined; signedIn?: boolean } = {}) {
  const removed: string[] = [];
  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [EnquiriesComponent],
    providers: [
      provideZonelessChangeDetection(),
      {
        provide: AdminAuthService,
        useValue: { bearerToken: () => (options.signedIn === false ? null : 'a-token') },
      },
      {
        provide: EnquiriesService,
        useValue: {
          all: () => of(options.messages),
          remove: (_token: string, id: string) => {
            removed.push(id);
            return Promise.resolve();
          },
        },
      },
    ],
  });
  const fixture = TestBed.createComponent(EnquiriesComponent);
  fixture.detectChanges();
  return { fixture, removed, host: fixture.nativeElement as HTMLElement };
}

describe('the messages the form has taken', () => {
  it('shows each one as it was written', () => {
    const { host } = setup({ messages: [message()] });

    expect(host.querySelectorAll('.enquiries-one')).toHaveLength(1);
    expect(host.textContent).toContain('Is the blue one still available?');
    expect(host.textContent).toContain('ada@example.com');
  });

  /**
   * An enquiry about a painting puts the question in `name` — "Price request:
   * Las Meninas (#5)" — because that belongs in a subject line and is nobody's
   * name. The person's own name is in `greeting` when the form asked for one.
   */
  it('calls somebody by their name and not by their subject line', () => {
    const { host } = setup({
      messages: [message({ name: 'Price request: Las Meninas (#5)', greeting: 'Ada' })],
    });

    expect(host.querySelector('.enquiries-who strong')?.textContent?.trim()).toBe('Ada');
    expect(host.querySelector('.enquiries-subject')?.textContent).toContain('Las Meninas');
  });

  it('says so when nothing has come through', () => {
    const { host } = setup({ messages: [] });

    expect(host.textContent).toContain('Nothing has come through');
  });

  // The one answer that must not look like "nothing has arrived".
  it('tells an api that did not answer apart from an empty list', () => {
    const { host } = setup({ messages: undefined });

    expect(host.textContent).toContain('did not answer');
    expect(host.textContent).not.toContain('Nothing has come through');
  });
});

describe('throwing one away', () => {
  it('asks before it goes, because there is no undo', () => {
    const { host, removed } = setup({ messages: [message()] });

    (host.querySelector('.enquiries-plain + .enquiries-plain') as HTMLButtonElement).click();

    expect(removed).toEqual([]);
  });

  it('deletes it on the second press and takes it off the page', async () => {
    const { fixture, host, removed } = setup({ messages: [message()] });
    const parts = fixture.componentInstance;

    parts.ask('m1');
    fixture.detectChanges();
    await parts.remove('m1');
    fixture.detectChanges();

    expect(removed).toEqual(['m1']);
    expect(host.querySelectorAll('.enquiries-one')).toHaveLength(0);
  });

  it('says so when it could not be deleted, and keeps it on the page', async () => {
    const { fixture, host } = setup({ messages: [message()] });
    TestBed.inject(EnquiriesService).remove = () => Promise.reject(new Error('no'));

    await fixture.componentInstance.remove('m1');
    fixture.detectChanges();

    expect(host.textContent).toContain('could not be deleted');
    expect(host.querySelectorAll('.enquiries-one')).toHaveLength(1);
  });

  // Nothing is asked for at all without one, rather than a request that the
  // api would refuse.
  it('asks nothing of the api when nobody is signed in', () => {
    const { host } = setup({ signedIn: false, messages: [message()] });

    expect(host.querySelectorAll('.enquiries-one')).toHaveLength(0);
  });
});

describe('how long ago it arrived', () => {
  it('counts in the unit a person would', () => {
    const { fixture } = setup({ messages: [] });
    const parts = fixture.componentInstance;
    const ago = (minutes: number) =>
      parts.ago(new Date(Date.now() - minutes * 60_000).toISOString());

    expect(ago(0)).toBe('just now');
    expect(ago(5)).toBe('5 minutes ago');
    expect(ago(90)).toBe('1 hour ago');
    expect(ago(60 * 72)).toBe('3 days ago');
    expect(parts.ago(undefined)).toBe('at some point');
  });
});

describe('what the service sends', () => {
  it('escapes an id on its way into the address', async () => {
    // Firestore ids are tame, but a path built by pasting one in is a path
    // built by pasting something in.
    const sent: string[] = [];
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideZonelessChangeDetection(),
        {
          provide: HttpClient,
          useValue: {
            delete: (url: string) => {
              sent.push(url);
              return of({ success: true });
            },
          },
        },
      ],
    });

    await TestBed.inject(EnquiriesService).remove('a-token', 'a b/c');

    expect(sent[0]).toContain('contact/a%20b%2Fc');
  });
});
