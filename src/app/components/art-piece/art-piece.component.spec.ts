import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtPieceComponent } from './art-piece.component';

describe('ArtPieceComponent', () => {
  let component: ArtPieceComponent;
  let fixture: ComponentFixture<ArtPieceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ArtPieceComponent]
})
    .compileComponents();

    fixture = TestBed.createComponent(ArtPieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
