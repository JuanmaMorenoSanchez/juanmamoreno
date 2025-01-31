import { Component, input, OnInit } from '@angular/core';
import { NftsService } from '@services/nfts.service';
import { MatDialog } from '@angular/material/dialog';
import { LinksModalComponent } from '@components/links-modal/links-modal.component';


@Component({
  selector: 'app-links-button',
  templateUrl: './links-button.component.html',
  styleUrl: './links-button.component.scss'
})
export class LinksButtonComponent implements OnInit {
  public tokenId = input<string>();
  public haveLinks = false;
  private urls: Array<string> | undefined;

  constructor(
    private nftsService: NftsService,
    private dialog: MatDialog
  ) {
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
