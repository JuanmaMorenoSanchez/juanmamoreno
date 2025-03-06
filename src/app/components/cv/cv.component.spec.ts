import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvComponent } from './cv.component';

describe('CvComponent', () => {
  let component: CvComponent;
  let fixture: ComponentFixture<CvComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [CvComponent]
});
    fixture = TestBed.createComponent(CvComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
