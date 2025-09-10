import { Location } from '@angular/common';
import { Component, inject } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { Router } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-back-button',
  imports: [MatIconButton, MatIcon, MatTooltip, TranslatePipe],
  templateUrl: './back-button.component.html',
  styleUrl: './back-button.component.scss',
})
export class BackButtonComponent {
  private router = inject(Router);
  private location = inject(Location);

  navigateBack(): void {
    if (window.history.length > 1) {
      this.location.back();
    } else {
      this.router.navigate(['/']);
    }
    // window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
