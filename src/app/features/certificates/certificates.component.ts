import { Component } from '@angular/core';
import { MintFormComponent } from './mint/mint-form.component';
import { PhotoPrepComponent } from './photo/photo-prep.component';

/**
 * Everything to do with a certificate, in the order it is done.
 *
 * The photograph, then the form. `/mint`, `/pendingmint` and `/studio` all
 * still answer here: they are in his bookmarks, and a renamed page should not
 * become a 404 for the one person who uses it.
 *
 * **There is no queue of certificates waiting on it.** There was, briefly: the
 * list this service calls "pending" with a button that said Write them now.
 * It could not write anything. The contract has no mint function — a
 * certificate is minted through OpenSea, by hand — and the backend's own path
 * wants a `MINTER_KEY` and a `COLLECTION_OWNER` that are set nowhere, so the
 * button's only possible answer was "no minting key is configured". A control
 * that cannot do what it offers is worse than no control: it is read as a
 * step in the work, and it is not one.
 *
 * **The way out is in the menu and nowhere else.** This page carried the
 * signed-in address and a Sign out beneath the form, from when it was a page
 * somebody arrived at directly. The menu that reaches every private page has
 * both, so a second copy at the foot of one of them was noise on the page that
 * is worked on most.
 */
@Component({
  selector: 'app-certificates',
  imports: [PhotoPrepComponent, MintFormComponent],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent {}
