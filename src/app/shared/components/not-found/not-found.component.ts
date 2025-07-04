import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  imports: [MatList, MatListItem, MatButton, TranslatePipe],
})
export class NotFoundComponent {
  private router = inject(Router);

  navigateTo(route: string): void {
    this.router.navigate([route]);
  }
}
