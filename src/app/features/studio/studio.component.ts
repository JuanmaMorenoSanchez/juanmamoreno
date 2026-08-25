import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AdminAuthService } from '@shared/services/admin-auth.service';

@Component({
  selector: 'app-studio',
  templateUrl: './studio.component.html',
  styleUrl: './studio.component.scss',
})
export class StudioComponent {
  private auth = inject(AdminAuthService);
  private router = inject(Router);

  protected readonly identity = this.auth.identity;

  signOut(): void {
    this.auth.signOut();
    this.router.navigateByUrl('/door');
  }
}
