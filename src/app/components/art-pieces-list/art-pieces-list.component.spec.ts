import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtPiecesListComponent } from './art-pieces-list.component';

describe('ArtPiecesListComponent', () => {
  let component: ArtPiecesListComponent;
  let fixture: ComponentFixture<ArtPiecesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ArtPiecesListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArtPiecesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
