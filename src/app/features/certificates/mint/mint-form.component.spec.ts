import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { signal } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideRouter } from '@angular/router';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { provideTranslateService } from '@ngx-translate/core';
import { ImageMatchService } from '@shared/services/image-match.service';
import { MintApiService } from '@shared/services/mint-api.service';
import { of } from 'rxjs';
import { HandoffService } from '../handoff.service';
import { MintFormComponent } from './mint-form.component';

/**
 * The one question the studio asks before it writes anything.
 *
 * A painting can be photographed twice, and only one of those photographs can
 * be the frontal view the catalogue shows. Which one is written into the
 * certificate, and a certificate is written once — so the question has to be
 * asked here, and answered before anything is prepared.
 */
describe('MintFormComponent, replacing a frontal view', () => {
  let fixture: ComponentFixture<MintFormComponent>;
  let component: MintFormComponent & {
    prepare: (signNow?: boolean) => Promise<void>;
    name: ReturnType<typeof signal<string>>;
    height: ReturnType<typeof signal<string>>;
    width: ReturnType<typeof signal<string>>;
    imageType: ReturnType<typeof signal<string>>;
    clues: ReturnType<typeof signal<string>>;
  };
  let api: { frontalView: ReturnType<typeof vi.fn>; prepare: ReturnType<typeof vi.fn> };
  let dialog: { open: ReturnType<typeof vi.fn> };
  let answered: boolean | undefined;

  const setup = async (standing: Record<string, unknown>) => {
    answered = true;
    api = {
      frontalView: vi.fn().mockResolvedValue(standing),
      prepare: vi.fn().mockResolvedValue({ tokenId: 200, name: 'Secuestro en la rave' }),
      waiting: vi.fn().mockResolvedValue([]),
    } as never;
    dialog = { open: vi.fn(() => ({ afterClosed: () => of(answered) })) };

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [MintFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideTranslateService(),
        { provide: MintApiService, useValue: api },
        { provide: MatDialog, useValue: dialog },
        { provide: MatSnackBar, useValue: { open: vi.fn() } },
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtPiecesObservable: () => of([]),
            getTraitValue: () => '',
            filterFrontalArtworks: () => [],
          },
        },
        {
          provide: ImageMatchService,
          useValue: { ready: () => undefined, like: () => [], learn: async () => undefined },
        },
        {
          provide: HandoffService,
          useValue: {
            size: signal(null),
            sample: () => null,
            canProduce: () => true,
            startAgain: vi.fn(),
            take: () => ({ file: new File(['x'], 'a.jpg'), height: '130', width: '130' }),
            request: async () => null,
          },
        },
      ],
    });

    fixture = TestBed.createComponent(MintFormComponent);
    component = fixture.componentInstance as never;
    await fixture.whenStable();

    component.name.set('Secuestro en la rave');
    component.height.set('130');
    component.width.set('130');
    return fixture;
  };

  /** The ordinary case, and the one almost every certificate is. */
  it('asks nothing and writes no version when the painting has no frontal view yet', async () => {
    await setup({ taken: false });

    await component.prepare();

    expect(dialog.open).not.toHaveBeenCalled();
    expect(api.prepare).toHaveBeenCalled();
    const sent = api.prepare.mock.calls[0][0] as FormData;
    expect(sent.get('version')).toBeNull();
  });

  it('never asks about a photograph that is not a frontal view', async () => {
    await setup({ taken: true, tokenId: '10', version: 0, nextVersion: 1 });
    component.imageType.set('Detail');

    await component.prepare();

    expect(api.frontalView).not.toHaveBeenCalled();
    expect(dialog.open).not.toHaveBeenCalled();
    expect(api.prepare).toHaveBeenCalled();
  });

  it('writes the next version when the artist says it replaces the old one', async () => {
    await setup({ taken: true, tokenId: '10', version: 0, nextVersion: 1 });

    await component.prepare();

    expect(dialog.open).toHaveBeenCalled();
    const sent = api.prepare.mock.calls[0][0] as FormData;
    expect(sent.get('version')).toBe('1');
  });

  it('carries on counting from whatever version the painting is already at', async () => {
    await setup({ taken: true, tokenId: '30', version: 2, nextVersion: 3 });

    await component.prepare();

    const sent = api.prepare.mock.calls[0][0] as FormData;
    expect(sent.get('version')).toBe('3');
  });

  /**
   * Saying no cancels rather than writing a second unversioned frontal view:
   * two rivals for one slot would leave the catalogue choosing between them by
   * guessing, on chain, for good.
   */
  it('prepares nothing at all when the artist says no', async () => {
    await setup({ taken: true, tokenId: '10', version: 0, nextVersion: 1 });
    answered = false;

    await component.prepare();

    expect(api.prepare).not.toHaveBeenCalled();
  });

  it('treats a dialog dismissed with the escape key as a no', async () => {
    await setup({ taken: true, tokenId: '10', version: 0, nextVersion: 1 });
    answered = undefined;

    await component.prepare();

    expect(api.prepare).not.toHaveBeenCalled();
  });

  /**
   * A question that could not be asked is not an answer of "yes, replace" —
   * but neither is it a reason to stop the artist working. The catalogue still
   * shows him which certificate holds the slot.
   */
  it('goes ahead without a version when the api cannot answer', async () => {
    await setup({ taken: false });
    api.frontalView.mockRejectedValue(new Error('offline'));

    await component.prepare();

    expect(dialog.open).not.toHaveBeenCalled();
    expect(api.prepare).toHaveBeenCalled();
    expect((api.prepare.mock.calls[0][0] as FormData).get('version')).toBeNull();
  });

  /**
   * What the painting was made alongside, kept for the essay that is written
   * months later. It is typed on this form because this is the one moment the
   * painting is still fresh, and it is not part of the certificate because a
   * certificate is public and permanent and this is neither.
   */
  describe('the note for the essay', () => {
    const sentAs = (field: string) => (api.prepare.mock.calls[0][0] as FormData).get(field);

    it('sends what was typed', async () => {
      await setup({ taken: false });
      component.clues.set('Pintado escuchando Spiegel im Spiegel.');

      await component.prepare();

      expect(sentAs('clues')).toBe('Pintado escuchando Spiegel im Spiegel.');
    });

    /** Almost every certificate, and it must look exactly as it did before. */
    it('sends no field at all when nothing was typed', async () => {
      await setup({ taken: false });

      await component.prepare();

      expect(sentAs('clues')).toBeNull();
      expect(sentAs('name')).toBe('Secuestro en la rave');
    });

    it('sends nothing for a note of only spaces', async () => {
      await setup({ taken: false });
      component.clues.set('    ');

      await component.prepare();

      expect(sentAs('clues')).toBeNull();
    });

    it('trims it', async () => {
      await setup({ taken: false });
      component.clues.set('  Una canción.  ');

      await component.prepare();

      expect(sentAs('clues')).toBe('Una canción.');
    });
  });
});

/**
 * Taking a copy without filing anything.
 *
 * The corrector above is a perfectly good image editor — perspective off a
 * photograph, the light evened out, the edges found — and it was reachable only
 * by somebody on their way to a certificate. Two separate things made that so:
 * it would not render without the painting's real measurements, and the only
 * buttons that asked it to render were the two that store a certificate.
 */
describe('MintFormComponent, downloading without minting', () => {
  let clicked: { download: string }[];
  let prepared: unknown;
  let api: Record<string, unknown>;

  const setup = async () => {
    clicked = [];
    prepared = { file: new File(['x'], 'a-flat.jpg'), height: '130', width: '130' };
    api = {
      frontalView: vi.fn().mockResolvedValue({}),
      prepare: vi.fn(),
      waiting: vi.fn().mockResolvedValue([]),
    };

    vi.spyOn(URL, 'createObjectURL').mockReturnValue('blob:made');
    vi.spyOn(URL, 'revokeObjectURL').mockImplementation(() => undefined);
    const realCreate = document.createElement.bind(document);
    vi.spyOn(document, 'createElement').mockImplementation((tag: string) => {
      const made = realCreate(tag) as HTMLAnchorElement;
      if (tag === 'a') made.click = () => clicked.push({ download: made.download });
      return made;
    });

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [MintFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideRouter([]),
        provideTranslateService(),
        { provide: MintApiService, useValue: api },
        { provide: MatDialog, useValue: { open: vi.fn(() => ({ afterClosed: () => of(true) })) } },
        { provide: MatSnackBar, useValue: { open: vi.fn() } },
        {
          provide: ARTWORK_PORT,
          useValue: {
            getArtPiecesObservable: () => of([]),
            getTraitValue: () => '',
            filterFrontalArtworks: () => [],
          },
        },
        {
          provide: ImageMatchService,
          useValue: { ready: () => undefined, like: () => [], learn: async () => undefined },
        },
        {
          provide: HandoffService,
          useValue: {
            size: signal(null),
            sample: () => null,
            canProduce: () => true,
            startAgain: vi.fn(),
            take: () => prepared,
            request: async () => prepared,
          },
        },
      ],
    });

    const fixture = TestBed.createComponent(MintFormComponent);
    await fixture.whenStable();
    return fixture.componentInstance as never as {
      canDownload: () => boolean;
      ready: () => boolean;
      name: ReturnType<typeof signal<string>>;
      download: () => Promise<void>;
    };
  };

  afterEach(() => vi.restoreAllMocks());

  it('offers it without a title, which the other two require', async () => {
    const form = await setup();

    expect(form.canDownload()).toBe(true);
    expect(form.ready()).toBe(false);
  });

  it('hands over the file the corrector rendered', async () => {
    const form = await setup();
    await form.download();

    expect(clicked).toHaveLength(1);
    expect(clicked[0].download).toBe('a-flat.jpg');
  });

  it('names it after the title when there is one', async () => {
    const form = await setup();
    form.name.set('Secuestro en la rave');
    await form.download();

    expect(clicked[0].download).toBe('Secuestro en la rave.jpg');
  });

  it('keeps a name a file system will accept', async () => {
    const form = await setup();
    form.name.set('a/b:c*d?e');
    await form.download();

    expect(clicked[0].download).toBe('a-b-c-d-e.jpg');
  });

  it('files nothing and does not clear the studio', async () => {
    // The whole point. He may want to mint the same picture after taking a
    // copy of it, so nothing is stored and nothing is reset.
    const form = await setup();
    await form.download();

    expect(api['prepare']).not.toHaveBeenCalled();
    expect(TestBed.inject(HandoffService).startAgain).not.toHaveBeenCalled();
  });

  it('lets go of the url it made', async () => {
    const form = await setup();
    await form.download();

    expect(URL.revokeObjectURL).toHaveBeenCalledWith('blob:made');
  });

  it('downloads nothing when the corrector cannot render', async () => {
    const form = await setup();
    prepared = null;
    await form.download();

    expect(clicked).toHaveLength(0);
  });
});
