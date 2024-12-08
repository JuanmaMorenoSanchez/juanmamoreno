import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DossierOptionsModalComponent } from './dossier-options-modal.component';

describe('DossierOptionsModalComponent', () => {
  let component: DossierOptionsModalComponent;
  let fixture: ComponentFixture<DossierOptionsModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DossierOptionsModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DossierOptionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
