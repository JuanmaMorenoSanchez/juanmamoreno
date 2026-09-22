import { Component, computed, inject, input } from '@angular/core';
import { MatAnchor } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { environment } from '@environments/environment';
import { TranslatePipe } from '@ngx-translate/core';
import { AvailabilityService } from '@shared/services/availability.service';
import { LanguageUrlService } from '@shared/services/language-url.service';

/**
 * Asks about this painting on WhatsApp, with the message already written.
 *
 * Beside the cart, and asking the same question by the other route. The form is
 * for somebody at a desk; this is for somebody standing in front of the
 * painting on a telephone, who will write a sentence and will not fill in a
 * form. Neither mentions money: the site's position is that people ask.
 *
 * **There is no telephone number in this component, and that is the point.**
 * It links to the service, which redirects. A number written here would be
 * written into every one of the four hundred pages the build produces, where
 * anything that crawls the web would find it without ever looking at a
 * painting. On the service it is a secret: absent from this repository, absent
 * from its history, and changeable without rebuilding the site if it is ever
 * abused.
 *
 * A plain anchor, so it works on a page with no JavaScript running like the
 * rest of the site, and so a long press offers to copy or share it the way a
 * link should. It opens in a new tab: on a telephone that hands over to the
 * WhatsApp app and leaves the painting where it was.
 */
@Component({
  selector: 'app-whatsapp-button',
  templateUrl: './whatsapp-button.component.html',
  styleUrl: './whatsapp-button.component.scss',
  imports: [MatAnchor, MatTooltip, TranslatePipe],
})
export class WhatsappButtonComponent {
  private readonly lang = inject(LanguageUrlService);
  private readonly availability = inject(AvailabilityService);

  readonly tokenId = input.required<string>();

  /**
   * Off until a number exists to redirect to.
   *
   * Two switches rather than one — this flag, and the secret on the service —
   * because the site is built hours before anybody looks at it and a button
   * that leads to a 404 is worse than no button. Turning it on is one line,
   * once the service has a number.
   */
  readonly shown = environment.whatsappEnquiries;

  /** Sold or not, so the tooltip asks the question the visitor would ask. */
  readonly sold = computed(() => this.availability.isSold(this.tokenId()));

  readonly label = computed(() => (this.sold() ? 'whatsapp.askInfo' : 'whatsapp.askPrice'));

  readonly href = computed(
    () =>
      `${environment.backendUrl}contact/whatsapp` +
      `?token=${encodeURIComponent(this.tokenId())}&lang=${this.lang.contentLanguage()}`
  );
}
