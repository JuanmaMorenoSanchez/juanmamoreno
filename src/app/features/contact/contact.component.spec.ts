import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideTranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';
import { vi } from 'vitest';
import { mockResponsiveService } from '../../test/mocks/shared/services/responsive.service.mock';
import { ApiResponse } from '@shared/types/api-response.type';
import { ContactComponent } from './contact.component';

// Mock MatSnackBar
const mockSnackBar = {
  open: vi.fn()
};

describe('ContactComponent', () => {
  let component: ContactComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ContactComponent,
        FormsModule,
        ReactiveFormsModule,
      ],
      providers: [
        provideTranslateService(),
        provideHttpClient(),
        provideHttpClientTesting(),
        provideAnimations(),
        provideRouter([]),
        { provide: MatSnackBar, useValue: mockSnackBar },
        // { provide: TranslateService, useValue: { instant: (key: string) => key } },
        { provide: 'ResponsiveService', useValue: mockResponsiveService }, // Injectable token if using inject(ResponsiveService)
      ]
    }).compileComponents();

    const fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should have a disabled form when submitted with valid data and honeypot empty', async () => {
    component.name.setValue('John');
    component.email.setValue('john@example.com');
    component.message.setValue('Hello!');
    component.honeypot.setValue('');

    const pendingResponse = new Subject<ApiResponse<string>>();
    vi.spyOn(component['contactService'], 'sendContactMessage').mockReturnValue(pendingResponse.asObservable());

    component.onSubmit();

    expect(component.form.disabled).toBe(true);
    expect(component.isLoading).toBe(true);

    // await Promise.resolve();

    // // After observable emits
    // expect(component.form.enabled).toBeTrue();
    // expect(component.isLoading).toBeFalse();
  });

  it('should not submit the form when honeypot is filled (spam)', () => {
    component.name.setValue('Bot');
    component.email.setValue('bot@example.com');
    component.message.setValue('Spam spam spam');
    component.honeypot.setValue('I am a bot');

    const sendSpy = vi.spyOn(component['contactService'], 'sendContactMessage');

    component.onSubmit();

    expect(sendSpy).not.toHaveBeenCalled();
    expect(component.form.enabled).toBe(true);
  });

  it('should show error message for invalid name', () => {
    component.name.setValue('');
    expect(component.getNameError()).toEqual('error.noValue');
  });

  it('should show error for invalid email format', () => {
    component.email.setValue('invalid-email');
    expect(component.getEmailError()).toEqual('error.invalidEmail');
  });

  it('should show required error for missing email', () => {
    component.email.setValue('');
    expect(component.getEmailError()).toEqual('error.noValue');
  });

  it('should show error message for empty message', () => {
    component.message.setValue('');
    expect(component.getMessageError()).toEqual('error.noValue');
  });
});
