import { TestBed } from '@angular/core/testing';
import { ActivatedRouteSnapshot, provideRouter, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { adminOnly } from './admin.guard';

describe('adminOnly', () => {
  const runGuard = (isAdmin: boolean) => {
    TestBed.resetTestingModule();
    TestBed.configureTestingModule({
      providers: [
        provideRouter([]),
        { provide: AdminAuthService, useValue: { isAdmin: () => isAdmin } },
      ],
    });
    return TestBed.runInInjectionContext(() =>
      adminOnly({} as ActivatedRouteSnapshot, {} as RouterStateSnapshot)
    );
  };

  it('lets the admin through', () => {
    expect(runGuard(true)).toBe(true);
  });

  it('sends everyone else to the door', () => {
    const result = runGuard(false);

    expect(result).toBeInstanceOf(UrlTree);
    expect(String(result)).toBe('/door');
  });
});
