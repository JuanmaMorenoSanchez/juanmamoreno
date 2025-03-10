import { TestBed } from '@angular/core/testing';
import { ArtPieceComponent } from './art-piece.component';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';
import { MockNftsService } from '@mocks/mock-nfts.service';
import { NftsService } from '@services/nfts.service';
import { ResponsiveService } from '@services/responsive.service';
import { MockResponsiveService } from '@mocks/mock-responsive.service';
import { provideAnimations } from '@angular/platform-browser/animations';

describe('ArtPieceComponent', () => {
    let component: ArtPieceComponent;
  
    beforeEach(async () => {
      await TestBed.configureTestingModule({
        providers: [
            provideAnimations(),
            { provide: Router, useValue: {} },
            { provide: ActivatedRoute, useValue: { paramMap: of(new Map([['id', '123']])) } },
            { provide: NftsService, useClass: MockNftsService },
            { provide: ResponsiveService, useClass: MockResponsiveService },
        ],
      }).compileComponents();
  
      const fixture = TestBed.createComponent(ArtPieceComponent);
      component = fixture.componentInstance;
    });
  
    it('should create the component', () => {
      expect(component).toBeTruthy();
    });

  });
