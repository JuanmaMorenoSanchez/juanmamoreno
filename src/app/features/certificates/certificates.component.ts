import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { PendingMintComponent } from '@features/pending-mint/pending-mint.component';
import { AdminAuthService } from '@shared/services/admin-auth.service';
import { MintFormComponent } from './mint/mint-form.component';
import { PhotoPrepComponent } from './photo/photo-prep.component';

/**
 * Everything to do with a certificate, in the order it is done.
 *
 * **It was two pages, and choosing between them meant knowing in advance what
 * you wanted to do.** One listed the certificates that were ready and not yet
 * written; the other was where one gets written. They are the queue and the
 * act of the same job, on the same object, and they sat apart in the menu with
 * the reels between them. This is the same move the catalogue page already
 * made when three lists of paintings became one.
 *
 * So: what is waiting first, then the photograph, then the form. The old
 * addresses both still answer — they are in his bookmarks, and a renamed page
 * should not become a 404 for the one person who uses it.
 */
@Component({
  selector: 'app-certificates',
  imports: [PendingMintComponent, PhotoPrepComponent, MintFormComponent],
  templateUrl: './certificates.component.html',
  styleUrl: './certificates.component.scss',
})
export class CertificatesComponent {
  private auth = inject(AdminAuthService);
  private router = inject(Router);

  protected readonly identity = this.auth.identity;

  signOut(): void {
    this.auth.signOut();
    this.router.navigateByUrl('/door');
  }
}
