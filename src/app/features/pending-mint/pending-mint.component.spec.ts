import { TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { MintApiService, type PendingMint } from '@shared/services/mint-api.service';
import { DownloadButtonComponent } from '@shared/components/download-button/download-button.component';
import { PendingMintComponent } from './pending-mint.component';

/**
 * A certificate that has been prepared and not yet written is the one place the
 * photograph exists in full and cannot be reached: the painting has no page,
 * because it is not on the chain, and this list only ever showed a thumbnail
 * the size of a postage stamp.
 */
const waiting: PendingMint = {
  tokenId: 198,
  name: 'Rockets win III',
  description: 'Oil on canvas, 140,5 × 116 cm, 2026.',
  external_url: 'https://juanmamoreno.com/artwork/198',
  attributes: [
    { trait_type: 'Medium', value: 'Oil on canvas' },
    { trait_type: 'Height', value: '140,5' },
    { trait_type: 'Width', value: '116' },
    { trait_type: 'Unit', value: 'cm' },
    { trait_type: 'Year', value: '2026' },
  ],
  thumbnailBase64: 'Lw==',
  webUrl: 'https://arweave.net/abc',
  originalUrl: 'https://storage.googleapis.com/juanmamoreno-originals/198.jpg',
  preparedAt: '2026-09-15T08:00:00.000Z',
};

function setup(list: PendingMint[] = [waiting]) {
  TestBed.configureTestingModule({
    imports: [PendingMintComponent],
    providers: [
      // The download button is shared with the artwork pages and speaks both
      // languages; this page only exists in one, but the pipe still wants a
      // service to ask.
      provideTranslateService(),
      {
        provide: MintApiService,
        useValue: { waiting: () => Promise.resolve(list) },
      },
    ],
  });
  const fixture = TestBed.createComponent(PendingMintComponent);
  fixture.detectChanges();
  return fixture;
}

describe('PendingMintComponent — taking the photograph back off the list', () => {
  it('offers the stored file on every certificate waiting', async () => {
    const fixture = setup();
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.debugElement
      .queryAllNodes((node) => node.injector?.get(DownloadButtonComponent, null) !== null)
      .map((node) => node.injector?.get(DownloadButtonComponent, null))
      .find((instance): instance is DownloadButtonComponent => !!instance);

    expect(button).toBeTruthy();
    // The original first, which is the whole file the studio produced and the
    // largest thing stored. The web copy is only there in case it is not.
    expect(button?.links()[0]).toBe(waiting.originalUrl);
    expect(button?.links()).toContain(waiting.webUrl);
  });

  it('names the file after the certificate it belongs to', async () => {
    const fixture = setup();
    await fixture.whenStable();
    fixture.detectChanges();

    const button = fixture.debugElement
      .queryAllNodes((node) => node.injector?.get(DownloadButtonComponent, null) !== null)
      .map((node) => node.injector?.get(DownloadButtonComponent, null))
      .find((instance): instance is DownloadButtonComponent => !!instance);

    // Two certificates can share a title — the studio warns about exactly that
    // — so the token id is what tells two downloads apart.
    expect(button?.name()).toBe('198 Rockets win III');
  });

  it('offers nothing when nothing is waiting', async () => {
    const fixture = setup([]);
    await fixture.whenStable();
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('app-download-button')).toBe(null);
  });
});
