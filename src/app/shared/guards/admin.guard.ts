import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AdminAuthService } from '@shared/services/admin-auth.service';

/** Sends anyone who is not the one allowed account to the door. */
export const adminOnly: CanActivateFn = () =>
  inject(AdminAuthService).isAdmin() || inject(Router).parseUrl('/door');
