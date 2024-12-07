import { Component } from '@angular/core';
import { STATEMENT_OBJECT } from '@constants/statement.constants';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  readonly statement = STATEMENT_OBJECT;
}
