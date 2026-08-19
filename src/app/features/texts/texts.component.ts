import { Component } from '@angular/core';
import { PUBLISHED_TEXTS } from '@domain/texts/texts.constants';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-texts',
  templateUrl: './texts.component.html',
  styleUrls: ['./texts.component.scss'],
  imports: [TranslatePipe],
})
export class TextsComponent {
  readonly texts = PUBLISHED_TEXTS;
}
