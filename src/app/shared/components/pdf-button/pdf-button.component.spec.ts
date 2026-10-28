import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Nft } from '@domain/artwork/artwork.entity';
import { DOWNLOADTYPES } from '@domain/cv/cv.constants';
import { provideTranslateService } from '@ngx-translate/core';
import { CvProseService } from '@shared/services/cv-prose.service';
import { PdfService } from '@shared/services/pdf/pdf.service';
import { of } from 'rxjs';
import { vi } from 'vitest';
import { PdfButtonComponent } from './pdf-button.component';

const PAINTING = { tokenId: '7', name: 'Un cuadro', image: 'ipfs://one' } as unknown as Nft;

function setup(type: DOWNLOADTYPES, nfts: Nft[]) {
  const open = vi.fn(() => ({ afterClosed: () => of(null) }));
  const createTechnicalSheet = vi.fn(() => Promise.resolve({ save: vi.fn() }));
  const createDossier = vi.fn(() => Promise.resolve({ save: vi.fn() }));

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [PdfButtonComponent],
    providers: [
      provideTranslateService(),
      { provide: MatDialog, useValue: { open } },
      { provide: MatSnackBar, useValue: { open: vi.fn() } },
      { provide: PdfService, useValue: { createTechnicalSheet, createDossier } },
      { provide: CvProseService, useValue: { read: () => Promise.resolve(null) } },
    ],
  });
  TestBed.overrideComponent(PdfButtonComponent, { set: { template: '' } });

  const fixture = TestBed.createComponent(PdfButtonComponent);
  fixture.componentRef.setInput('downloadFileType', type);
  fixture.componentRef.setInput('nfts', nfts);
  fixture.detectChanges();

  return { button: fixture.componentInstance, open, createTechnicalSheet };
}

/**
 * Which document the button makes, which until 2.49.0 was decided by counting
 * the paintings: one meant a technical sheet and two or more a dossier. A
 * dossier of one painting was therefore unaskable. The kind is now said rather
 * than counted, so one painting can be either.
 */
describe('PdfButtonComponent — which document', () => {
  it('makes a dossier from one painting when a dossier is what was asked for', async () => {
    const { button, open, createTechnicalSheet } = setup(DOWNLOADTYPES.DOSSIER, [PAINTING]);

    button.createPDF();
    // The biography is asked for before the dialog opens, so the dialog is one
    // microtask away rather than there already.
    await Promise.resolve();

    expect(open).toHaveBeenCalledTimes(1);
    expect(createTechnicalSheet).not.toHaveBeenCalled();
  });

  /** The painting's own page, which has one painting and wants the sheet. */
  it('still makes a technical sheet from one painting on its own page', () => {
    const { button, open, createTechnicalSheet } = setup(DOWNLOADTYPES.IMAGE, [PAINTING]);

    button.createPDF();

    expect(createTechnicalSheet).toHaveBeenCalledWith(PAINTING);
    expect(open).not.toHaveBeenCalled();
  });

  it('calls a dossier of one a dossier, not a technical sheet', () => {
    const { button } = setup(DOWNLOADTYPES.DOSSIER, [PAINTING]);

    expect(button.getTooltip()).toBe('download.portfolio');
  });
});
