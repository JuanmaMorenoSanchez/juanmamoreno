import { TestBed } from '@angular/core/testing';
import { AboutComponent } from './about.component';
import { TranslateModule, TranslateService, TranslateStore } from '@ngx-translate/core';
import { MockTranslateService } from '@mocks/mock-translate.service';

describe('ArtPieceComponent', () => {
    let component: AboutComponent;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        imports: [TranslateModule],
        providers: [
            { provide: TranslateService, useValue: MockTranslateService },
            TranslateStore
        ]
      }).compileComponents();
      const fixture = TestBed.createComponent(AboutComponent);
      component = fixture.componentInstance;
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

});
