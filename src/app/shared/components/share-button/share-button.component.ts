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

  public canShare = typeof navigator.share === 'function';

  public handleClick() {
    if (this.canShare) {
      const shareData: ShareData = {
        title: 'Juanma Moreno Sánchez',
        text: 'Contemporary Art',
        url: window.location.href,
      };
      navigator.share(shareData);
    }
  }
}
