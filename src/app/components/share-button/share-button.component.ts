import { Component } from '@angular/core';

@Component({
  selector: 'app-share-button',
  templateUrl: './share-button.component.html',
  styleUrls: ['./share-button.component.scss']
})
export class ShareButtonComponent {

  public canShare = navigator.canShare();

  constructor() {}

  public handleClick() {
    if (this.canShare) {
      const url = window.location.href;
      const shareData: ShareData = {
        title: 'Juanma Moreno Sánchez',
        text: 'Contemporary Art',
        url,
      };
      navigator.share(shareData)
    }
  }
}
