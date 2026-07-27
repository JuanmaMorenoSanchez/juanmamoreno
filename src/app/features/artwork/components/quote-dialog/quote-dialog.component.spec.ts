import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideTranslateService } from '@ngx-translate/core';
import { ApiResponse } from '@shared/types/api-response.type';
import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { QuoteDialogComponent, QuoteDialogData } from './quote-dialog.component';

const mockSnackBar = { open: vi.fn() };
const mockDialogRef = { close: vi.fn() };
const data: QuoteDialogData = { artworkName: 'Test piece', tokenId: '42', mode: 'price' };

describe('QuoteDialogComponent', () => {
  let component: QuoteDialogComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuoteDialogComponent],
      providers: [
        provideTranslateService(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        { provide: MatSnackBar, useValue: mockSnackBar },
        { provide: MatDialogRef, useValue: mockDialogRef },
        { provide: MAT_DIALOG_DATA, useValue: data },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(QuoteDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('creates the component', () => {
    expect(component).toBeTruthy();
  });

  it('sends the quote when the email is valid and the honeypot is empty', () => {
    component.quoteForm.email().value.set('buyer@example.com');
    component.quoteForm.message().value.set('How much?');
    component.quoteForm.honeypot().value.set('');

    const pending = new Subject<ApiResponse<string>>();
    const sendSpy = vi
      .spyOn(component['mailService'], 'sendQuoteRequest')
      .mockReturnValue(pending.asObservable());

    component.onSubmit();

    expect(sendSpy).toHaveBeenCalledWith(
      expect.objectContaining({ email: 'buyer@example.com', tokenId: '42', mode: 'price' })
    );
    expect(component.isLoading()).toBe(true);
  });

  it('does not send when the honeypot is filled (spam)', () => {
    component.quoteForm.email().value.set('bot@example.com');
    component.quoteForm.honeypot().value.set('i am a bot');

    const sendSpy = vi.spyOn(component['mailService'], 'sendQuoteRequest');
    component.onSubmit();

    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('does not send with an invalid email', () => {
    component.quoteForm.email().value.set('not-an-email');

    const sendSpy = vi.spyOn(component['mailService'], 'sendQuoteRequest');
    component.onSubmit();

    expect(sendSpy).not.toHaveBeenCalled();
  });

  it('reports the required-email error', () => {
    component.quoteForm.email().value.set('');
    expect(component.getEmailError()).toEqual('error.noValue');
  });
});
