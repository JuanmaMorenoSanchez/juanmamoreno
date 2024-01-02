import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerativePieceComponent } from './generative-piece.component';

describe('GenerativePieceComponent', () => {
  let component: GenerativePieceComponent;
  let fixture: ComponentFixture<GenerativePieceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GenerativePieceComponent]
    });
    fixture = TestBed.createComponent(GenerativePieceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
