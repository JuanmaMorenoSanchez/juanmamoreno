import { TestBed } from '@angular/core/testing';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { ArtworkInfraService } from '@features/artwork/artwork.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { mockArtworkInfraService } from './test/mocks/infrastructure/artwork/artwork.service.mock';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [
          AppComponent,
          TranslateModule.forRoot(),
        ],
        providers: [
          provideAnimations(),
          provideRouter([]),
          {provide: ArtworkInfraService, useValue: mockArtworkInfraService}
        ],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    await fixture.whenStable(); // Ensures all async tasks are complete before assertions
  });

  beforeEach(() => {
    const translate = TestBed.inject(TranslateService);
    translate.setDefaultLang('en');
    TestBed.inject(TranslateService);
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  // Additional tests can be added here
});
