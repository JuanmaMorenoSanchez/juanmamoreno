import { Component } from '@angular/core';
import { STATEMENT_OBJECT } from '@constants/statement.constants';
import { DOWNLOADTYPES } from '@models/cv.models';
import { PdfButtonComponent } from '../pdf-button/pdf-button.component';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
    selector: 'app-about',
    templateUrl: './about.component.html',
    styleUrls: ['./about.component.scss'],
    imports: [PdfButtonComponent, TranslatePipe]
})
export class AboutComponent {
  readonly statement = STATEMENT_OBJECT;
  readonly downloadType = DOWNLOADTYPES.STATEMENT;
}
