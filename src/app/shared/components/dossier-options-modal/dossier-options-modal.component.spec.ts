import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { provideTranslateService } from '@ngx-translate/core';
import { vi } from 'vitest';
import { DossierOptionsModalComponent } from './dossier-options-modal.component';

type Options = {
  prices: { painting: number; paper: number } | null;
  includeCv: boolean;
};

function setup() {
  const close = vi.fn();

  TestBed.resetTestingModule();
  TestBed.configureTestingModule({
    imports: [DossierOptionsModalComponent],
    providers: [
      provideTranslateService(),
      { provide: MatDialogRef, useValue: { close } },
      { provide: MAT_DIALOG_DATA, useValue: { proseAvailable: false } },
    ],
  });
  TestBed.overrideComponent(DossierOptionsModalComponent, { set: { template: '' } });

  const dialog = TestBed.createComponent(DossierOptionsModalComponent)
    .componentInstance as unknown as {
    includePrices: boolean;
    paintingMultiplier: number | null;
    paperMultiplier: number | null;
    multipliersUsable: boolean;
    canSubmit: boolean;
    submit(): void;
  };

  return { dialog, sent: () => close.mock.calls[0]?.[0] as Options };
}

/**
 * The options a dossier is built from, and the prices among them.
 *
 * No price is written to a certificate, kept in the catalogue or saved by the
 * api. The two numbers that make them are typed afresh every time, which is why
 * the switch starts off and nothing here is remembered between dossiers.
 */
describe('DossierOptionsModalComponent — prices', () => {
  it('starts with prices off', () => {
    const { dialog } = setup();

    expect(dialog.includePrices).toBe(false);
  });

  /** So a dossier made without thinking about it is the dossier it always was. */
  it('says a dossier has no prices when the switch was never touched', () => {
    const { dialog, sent } = setup();

    dialog.submit();

    expect(sent().prices).toBeNull();
  });

  it('starts both multipliers at eleven', () => {
    const { dialog } = setup();

    expect(dialog.paintingMultiplier).toBe(11);
    expect(dialog.paperMultiplier).toBe(11);
  });

  it('hands on the two numbers when the switch is on', () => {
    const { dialog, sent } = setup();
    dialog.includePrices = true;
    dialog.paintingMultiplier = 14;
    dialog.paperMultiplier = 6.5;

    dialog.submit();

    expect(sent().prices).toEqual({ painting: 14, paper: 6.5 });
  });

  describe('what it will not build', () => {
    it('refuses a multiplier of zero', () => {
      const { dialog } = setup();
      dialog.includePrices = true;
      dialog.paintingMultiplier = 0;

      expect(dialog.multipliersUsable).toBe(false);
      expect(dialog.canSubmit).toBe(false);
    });

    it('refuses a negative multiplier', () => {
      const { dialog } = setup();
      dialog.includePrices = true;
      dialog.paperMultiplier = -2;

      expect(dialog.canSubmit).toBe(false);
    });

    it('refuses an empty box', () => {
      const { dialog } = setup();
      dialog.includePrices = true;
      dialog.paintingMultiplier = null;

      expect(dialog.canSubmit).toBe(false);
    });

    it('takes a decimal', () => {
      const { dialog } = setup();
      dialog.includePrices = true;
      dialog.paintingMultiplier = 12.5;
      dialog.paperMultiplier = 0.5;

      expect(dialog.canSubmit).toBe(true);
    });

    /**
     * And a bad multiplier only blocks a dossier that was going to use it. With
     * prices off the numbers are not read at all.
     */
    it('builds a dossier with no prices even when the numbers are nonsense', () => {
      const { dialog } = setup();
      dialog.includePrices = false;
      dialog.paintingMultiplier = -1;

      expect(dialog.canSubmit).toBe(true);
    });
  });
});
