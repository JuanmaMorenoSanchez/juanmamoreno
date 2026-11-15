import { Component, signal } from '@angular/core';
import { MintFormComponent } from './mint/mint-form.component';
import { PendingCertificatesComponent } from './pending/pending-certificates.component';
import { PhotoPrepComponent } from './photo/photo-prep.component';

/**
 * Everything to do with a certificate, in the order it is done.
 *
 * The photograph, then the form. `/mint`, `/pendingmint` and `/studio` all
 * still answer here: they are in his bookmarks, and a renamed page should not
 * become a 404 for the one person who uses it.
 *
 * **The queue is back, without the button that could not work.** It was
 * removed entirely once, along with a "Write them now" that had no way to
 * write anything: the contract has no mint function — a certificate is minted
 * through OpenSea, by hand — and the backend's own path wants a `MINTER_KEY`
 * and a `COLLECTION_OWNER` that are set nowhere. Removing the control was
 * right; removing the list was not, and what was left was a count linking to
 * `/pendingmint`, which redirects here, so the only mention of the queue
 * navigated to the page it was already on. The list offers the two things
 * this page can honestly do with a waiting certificate: look at it, and throw
 * it away.
 *
 * **The way out is in the menu and nowhere else.** This page carried the
 * signed-in address and a Sign out beneath the form, from when it was a page
 * somebody arrived at directly. The menu that reaches every private page has
 * both, so a second copy at the foot of one of them was noise on the page that
 * is worked on most.
 */
@Component({
  selector: 'app-certificates',
  imports: [PhotoPrepComponent, MintFormComponent, PendingCertificatesComponent],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent {
  /**
   * Bumped when the form has prepared one, so the queue above it is right.
   *
   * A counter rather than the two components reaching for each other: the
   * list asks the api again whenever this changes, and neither needs a
   * reference to the other.
   */
  protected readonly prepared = signal(0);
}
