import { TestBed } from '@angular/core/testing';
import { MatDialog } from '@angular/material/dialog';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService } from '@ngx-translate/core';
import { vi } from 'vitest';
import { QuoteButtonComponent } from './quote-button.component';

const mockDialog = { open: vi.fn() };

function createWithToken(tokenId: string): QuoteButtonComponent {
  TestBed.configureTestingModule({
    imports: [QuoteButtonComponent],
    providers: [
      provideTranslateService(),
      provideAnimations(),
      { provide: MatDialog, useValue: mockDialog },
    ],
  });
  const fixture = TestBed.createComponent(QuoteButtonComponent);
  fixture.componentRef.setInput('tokenId', tokenId);
  fixture.componentRef.setInput('artworkName', 'Test piece');
  fixture.detectChanges();
  return fixture.componentInstance;
}

describe('QuoteButtonComponent', () => {
  afterEach(() => {
    vi.clearAllMocks();
    TestBed.resetTestingModule();
  });

  it('opens the dialog in price mode for an available piece', () => {
    const component = createWithToken('999999'); // not in the sold list
    expect(component.sold()).toBe(false);

    component.open();

    expect(mockDialog.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ data: expect.objectContaining({ mode: 'price' }) })
    );
  });

  it('opens the dialog in info mode for a sold piece', () => {
    const component = createWithToken('23'); // present in SOLDCERTIFICATES
    expect(component.sold()).toBe(true);

    component.open();

    expect(mockDialog.open).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({ data: expect.objectContaining({ mode: 'info' }) })
    );
  });
});
