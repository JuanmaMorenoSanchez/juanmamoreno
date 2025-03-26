import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { MatList, MatListItem } from '@angular/material/list';
import { MatButton } from '@angular/material/button';

@Component({
    selector: 'app-not-found',
    templateUrl: './not-found.component.html',
    styleUrl: './not-found.component.scss',
    imports: [MatList, MatListItem, MatButton]
})
export class NotFoundComponent {
  private router = inject(Router);

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
