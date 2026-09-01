import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageUrlService } from '@shared/services/language-url.service';

/**
 * The foot of every page: where the work continues, and where the small print
 * lives.
 *
 * The site had no footer at all — pages simply stopped — and the only link to
 * Instagram anywhere on it was one sentence on the contact page, which is the
 * least-visited page there is. Somebody who has just read about a painting had
 * nowhere to go but back.
 *
 * Privacy and Terms are here for the same reason. Both are written, both are
 * prerendered in both languages, and neither was linked from anywhere: four
 * pages nobody could reach except by typing the address.
 *
 * Plain links, and no Instagram widget. The privacy page promises no
 * third-party anything — "no analytics, no ad networks, nothing following you
 * around the web" — and an embedded follow button would quietly make that
 * untrue, on all 388 pages at once.
 */
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
  imports: [RouterLink, TranslatePipe],
})
export class FooterComponent {
  protected lang = inject(LanguageUrlService);

  protected readonly instagram = 'https://www.instagram.com/juanmamorenosanchez/';
}
