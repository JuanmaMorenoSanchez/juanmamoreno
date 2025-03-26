import { Component } from '@angular/core';
import { DOWNLOADTYPES } from '@domain/cv/cv.constants';
import { STATEMENT_OBJECT } from '@domain/statement/statement.constants';
import { TranslatePipe } from '@ngx-translate/core';
import { PdfButtonComponent } from '@shared/components/pdf-button/pdf-button.component';

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
