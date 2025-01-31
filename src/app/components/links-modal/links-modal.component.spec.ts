import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksModalComponent } from './links-modal.component';

describe('LinksModalComponent', () => {
  let component: LinksModalComponent;
  let fixture: ComponentFixture<LinksModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [LinksModalComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinksModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
