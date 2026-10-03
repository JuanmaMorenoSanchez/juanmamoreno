import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { DoorComponent } from './door.component';

describe('DoorComponent', () => {
  let fixture: ComponentFixture<DoorComponent>;
  let wentTo: string[];

  function build(): void {
    wentTo = [];
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      imports: [DoorComponent],
      providers: [
        {
          provide: Router,
          useValue: {
            navigateByUrl: (url: string) => {
              wentTo.push(url);
              return Promise.resolve(true);
            },
          },
        },
        { provide: AdminAuthService, useValue: { isAdmin: () => true } },
      ],
    });
    fixture = TestBed.createComponent(DoorComponent);
  }

  /**
   * The first thing worth knowing on signing in is whether the machine has been
   * doing its job, and every task is one link from there. It used to open onto
   * /mint, which is one task out of six.
   */
  it('opens onto the latest activity', async () => {
    build();

    await fixture.componentInstance.ngAfterViewInit();

    expect(wentTo).toEqual(['/activity']);
  });
});
