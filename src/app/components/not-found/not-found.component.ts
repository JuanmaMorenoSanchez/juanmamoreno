import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
    standalone: false
})
export class NotFoundComponent {
  private router = inject(Router);

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
