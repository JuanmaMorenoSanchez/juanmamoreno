import { Component, inject, input, OnInit } from '@angular/core';
import { NftsService } from '@services/nfts.service';
import { MatDialog } from '@angular/material/dialog';
import { LinksModalComponent } from '@components/links-modal/links-modal.component';
import { MatIconButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatIcon } from '@angular/material/icon';
import { TranslatePipe } from '@ngx-translate/core';


@Component({
    selector: 'app-links-button',
    templateUrl: './links-button.component.html',
    styleUrl: './links-button.component.scss',
    imports: [MatIconButton, MatTooltip, MatIcon, TranslatePipe]
})
export class LinksButtonComponent implements OnInit {
  private nftsService = inject(NftsService);
  private dialog = inject(MatDialog);

  public tokenId = input<string>();
  public haveLinks = false;
  private urls: Array<string> | undefined;

  constructor( ) {
  }

  ngOnInit() {
    this.nftsService.getLinks(this.tokenId()!).subscribe((res: any) => {
      this.urls = res?.urls;
      this.haveLinks = !!this.urls?.length;
    })
  }

  public openLinksModal() {
    this.dialog.open(LinksModalComponent, {
      data: { links: this.urls }
    });
  }
}
