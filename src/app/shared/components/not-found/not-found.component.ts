import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatList, MatListItem } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageUrlService } from '@shared/services/language-url.service';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
  imports: [MatList, MatListItem, MatButton, RouterLink, TranslatePipe],
})
export class NotFoundComponent {
  // Public: the template builds every way out through it, so a Spanish reader
  // who mistyped an address is offered Spanish pages to recover to.
  protected lang = inject(LanguageUrlService);
}
