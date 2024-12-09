import { Component } from '@angular/core';
import { STATEMENT_OBJECT } from '@constants/statement.constants';
import { DOWNLOADTYPES } from '@models/cv.models';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent {
  readonly statement = STATEMENT_OBJECT;
  readonly downloadType = DOWNLOADTYPES.STATEMENT;
}
