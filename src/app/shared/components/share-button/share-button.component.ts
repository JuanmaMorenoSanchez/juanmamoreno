import { Component } from '@angular/core';
import { MatMiniFabButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';

@Component({
    selector: 'app-share-button',
    templateUrl: './share-button.component.html',
    styleUrls: ['./share-button.component.scss'],
    imports: [MatMiniFabButton, MatIcon]
})
export class ShareButtonComponent {

  private regex_mobile = new RegExp('/Android|BlackBerry|iPhone|iPad|iPod|Opera Mini|IEMobile/', 'i');

  public canShare;

  constructor() {
    this.canShare = this.regex_mobile.test(window.navigator.userAgent) || true;
  }

  public handleClick() {
    if (this.canShare) {
      const url = window.location.href;
      const shareData: ShareData = {
        title: 'Juanma Moreno Sánchez',
        text: 'Contemporary Art',
        url,
      };
      navigator?.share(shareData)
    }
  }
}
