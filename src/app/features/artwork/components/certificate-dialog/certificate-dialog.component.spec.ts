import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import { CertificateDialogComponent } from './certificate-dialog.component';
import { PdfService } from '@shared/services/pdf/pdf.service';
import { CertificateService, MintRecord } from './certificate.service';

describe('CertificateDialogComponent', () => {
  let pdf: { createCertificate: ReturnType<typeof vi.fn> };

  const setup = async (record: MintRecord | null) => {
    pdf = { createCertificate: vi.fn().mockResolvedValue({ save: vi.fn() }) };
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [CertificateDialogComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        provideTranslateService(),
        { provide: CertificateService, useValue: { recordFor: () => of(record) } },
        { provide: PdfService, useValue: pdf },
        {
          provide: MAT_DIALOG_DATA,
          useValue: {
            artworkName: 'Secuestro en la rave',
            tokenId: '152',
            details: '2024, Oil on canvas, 130 x 130 cm.',
            nft: { tokenId: '152', name: 'Secuestro en la rave' },
          },
        },
      ],
    });

    TestBed.inject(TranslateService).setTranslation('en', {
      certificate: {
        title: 'Certificate of authenticity',
        recordedOn: 'The artist irreversibly recorded this painting on Ethereum on {{date}}.',
        recorded: 'The artist irreversibly recorded this painting on Ethereum.',
        token: 'Certificate',
        contract: 'Contract',
        transaction: 'Transaction',
        view: 'View on Etherscan',
        download: 'Download the certificate',
        onlyAuthorship:
          'This document certifies only the authorship of the physical work. It gives no ' +
          'information of any kind about the ownership of the work.',
      },
      close: 'Close',
    });
    TestBed.inject(TranslateService).use('en');

    const fixture: ComponentFixture<CertificateDialogComponent> = TestBed.createComponent(
      CertificateDialogComponent
    );
    await fixture.whenStable();
    return fixture;
  };

  const hrefs = (fixture: ComponentFixture<CertificateDialogComponent>) =>
    [...fixture.nativeElement.querySelectorAll('a')].map((a: HTMLAnchorElement) =>
      a.getAttribute('href')
    );

  const mint: MintRecord = {
    txHash: '0x3886cb20ed81646e7843cdd665609b9a0040a6efce2655dd428842ba006b52f0',
    mintedAt: '2026-09-10T22:10:23.000Z',
  };

  it('points at the token and at the contract it lives in', async () => {
    const fixture = await setup(mint);

    const links = hrefs(fixture);
    expect(links).toContain(
      'https://etherscan.io/nft/0x6E8b1D55B3fb934149b1125964a9c01a87995548/152'
    );
    expect(links).toContain(
      'https://etherscan.io/address/0x6E8b1D55B3fb934149b1125964a9c01a87995548'
    );
  });

  it('points at the transaction that carries the date it claims', async () => {
    const fixture = await setup(mint);

    expect(hrefs(fixture)).toContain(`https://etherscan.io/tx/${mint.txHash}`);
    expect(fixture.nativeElement.textContent).toContain('10 September 2026');
  });

  /**
   * The date is the only part that has to be fetched. Everything else — the
   * contract, the token, where to read them — is known without asking anybody,
   * so a certificate whose date never arrived still says the rest truthfully.
   */
  it('says it plainly without a date rather than saying nothing', async () => {
    const fixture = await setup(null);

    const text = fixture.nativeElement.textContent;
    expect(text).toContain('The artist irreversibly recorded this painting on Ethereum.');
    expect(text).not.toContain('{{date}}');
    // No transaction to point at, so no link offering one.
    expect(hrefs(fixture).some((href) => href?.includes('/tx/'))).toBe(false);
  });

  /**
   * What the certificate is not, on the screen that offers it as well as on the
   * paper it prints: a record of who made the painting is not a record of who
   * owns it, and nobody should have to infer that from what a sentence leaves
   * out.
   */
  it('says what the certificate does not certify', async () => {
    const fixture = await setup(null);

    const caveat = fixture.nativeElement.querySelector('.certificate-caveat')?.textContent ?? '';

    expect(caveat).toContain('authorship of the physical work');
    expect(caveat).toContain('ownership');
  });

  it('prints the certificate with what it knows when it knows it', async () => {
    const fixture = await setup(mint);

    fixture.nativeElement.querySelector('button')?.click();
    await fixture.whenStable();

    expect(pdf.createCertificate).toHaveBeenCalledWith(
      expect.objectContaining({ tokenId: '152' }),
      mint
    );
  });
});
