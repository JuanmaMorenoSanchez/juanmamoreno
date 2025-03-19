import { Component, effect, inject, input, OnInit, resource, ResourceRef, signal, WritableSignal } from '@angular/core';
import { NftsService } from '@services/nfts.service';
import { MatDialog } from '@angular/material/dialog';
import { LinksModalComponent } from '@components/links-modal/links-modal.component';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, map, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';


@Component({
    selector: 'app-links-button',
    templateUrl: './links-button.component.html',
    styleUrl: './links-button.component.scss',
    imports: [MatIconButton, MatTooltip, MatIcon, TranslatePipe]
})
export class LinksButtonComponent {
  private nftsService = inject(NftsService);
  private dialog = inject(MatDialog);

  public tokenId = input<string>();
  public haveLinks: WritableSignal<boolean> = signal(false);

  // still an experimental feature in angular v19
  // not sure if i need this here. It fixes problem with subscriptions not finishing and behaving weird, but it also wrapes data in a weird format that i dont care about
  private rxUrls = rxResource({
    request: () => this.tokenId(),
    loader: ({ request }) =>
      this.nftsService.getLinks(request as string).pipe(
        distinctUntilChanged(),
        map((urls) => urls || []),
        catchError(() => of([])
      )
    )
  });

  constructor( ) {
    effect(() => {
      const urlsValue: any = this.rxUrls.value()!; // not elegant, but works. rxResource wrapps the data in a object with extra metadata (ex: loading status)
      this.haveLinks.set(!!urlsValue?.urls.length);
    });
  }

  public openLinksModal() {
    const urlsValue: any = this.rxUrls.value()!;
    this.dialog.open(LinksModalComponent, {
      data: { links: urlsValue?.urls}
    });
  }
}
