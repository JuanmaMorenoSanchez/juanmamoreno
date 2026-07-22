import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { ApiResponse } from '@shared/types/api-response.type';
import { ContactComponent } from './contact.component';

// Mock MatSnackBar
const mockSnackBar = {
  open: vi.fn(),
};

describe('ContactComponent', () => {
  let component: ContactComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [
        provideTranslateService(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        { provide: MatSnackBar, useValue: mockSnackBar },
      ],
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a disabled form when submitted with valid data and honeypot empty', async () => {
    component.contactForm.name().value.set('John');
    component.contactForm.email().value.set('john@example.com');
    component.contactForm.message().value.set('Hello!');
    component.contactForm.honeypot().value.set('');

    const pendingResponse = new Subject<ApiResponse<string>>();
    vi.spyOn(component['contactService'], 'sendContactMessage').mockReturnValue(
      pendingResponse.asObservable()
    );

    component.onSubmit();

    expect(component.contactForm().disabled()).toBe(true);
    expect(component.isLoading()).toBe(true);
  });

  it('should not submit the form when honeypot is filled (spam)', () => {
    component.contactForm.name().value.set('Bot');
    component.contactForm.email().value.set('bot@example.com');
    component.contactForm.message().value.set('Spam spam spam');
    component.contactForm.honeypot().value.set('I am a bot');

    const sendSpy = vi.spyOn(component['contactService'], 'sendContactMessage');

    component.onSubmit();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(component.contactForm().disabled()).toBe(false);
  });

  it('should show error message for invalid name', () => {
    component.contactForm.name().value.set('');
    expect(component.getNameError()).toEqual('error.noValue');
  });

  it('should show error for invalid email format', () => {
    component.contactForm.email().value.set('invalid-email');
    expect(component.getEmailError()).toEqual('error.invalidEmail');
  });

  it('should show required error for missing email', () => {
    component.contactForm.email().value.set('');
    expect(component.getEmailError()).toEqual('error.noValue');
  });

  it('should show error message for empty message', () => {
    component.contactForm.message().value.set('');
    expect(component.getMessageError()).toEqual('error.noValue');
  });
});
