import {
  Component,
  effect,
  inject,
  input,
  signal,
  WritableSignal,
} from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatTooltip } from '@angular/material/tooltip';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { LinksModalComponent } from '@features/artwork/components/links-modal/links-modal.component';
import { TranslatePipe } from '@ngx-translate/core';
import { catchError, distinctUntilChanged, map, of } from 'rxjs';

@Component({
  selector: 'app-links-button',
  templateUrl: './links-button.component.html',
  styleUrl: './links-button.component.scss',
  imports: [MatIconButton, MatTooltip, MatIcon, TranslatePipe],
})
export class LinksButtonComponent {
  private artworkService = inject(ARTWORK_PORT);
  private dialog = inject(MatDialog);

  public tokenId = input<string>();
  public haveLinks: WritableSignal<boolean> = signal(false);

  // still an experimental feature in angular v19
  // not sure if i need this here. It fixes problem with subscriptions not finishing and behaving weird, but it also wrapes data in a weird format that i dont care about
  private rxUrls = rxResource({
    request: () => this.tokenId(),
    loader: ({ request }) =>
      this.artworkService.getLinks(request as string).pipe(
        distinctUntilChanged(),
        map((urls) => urls || []),
        catchError(() => of([]))
      ),
  });

  constructor() {
    effect(() => {
      const urlsValue: any = this.rxUrls.value();
      const urls = urlsValue?.urls;
      this.haveLinks.set(Array.isArray(urls) && urls.length > 0);
    });
  }

  public openLinksModal() {
    const urlsValue: any = this.rxUrls.value()!;
    this.dialog.open(LinksModalComponent, {
      data: { links: urlsValue?.urls },
    });
  }
}
