import { Component, computed, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DossierOptionsModalComponent } from '@components/dossier-options-modal/dossier-options-modal.component';
import { DOWNLOADTYPES } from '@models/cv.models';
import { TranslateService } from '@ngx-translate/core';
import { PdfService } from '@services/pdf.service';
import { Nft } from 'alchemy-sdk';

@Component({
  selector: 'app-pdf-button',
  templateUrl: './pdf-button.component.html',
  styleUrl: './pdf-button.component.scss'
})
export class PdfButtonComponent {

  nfts = input<Nft[]>([]);
  downloadFileType = input<DOWNLOADTYPES>(DOWNLOADTYPES.IMAGE);

  public isCreating = false;
  public isSingleArtPage = computed(() => (this.nfts().length <= 1));

  constructor(
    private pdfService: PdfService,
    private dialog: MatDialog,
    private translateService: TranslateService
  ) {
  }

  public getTooltip(): string {
    switch(this.downloadFileType())  {
      case DOWNLOADTYPES.CV:
        return this.translateService.instant('download.cv');
      case DOWNLOADTYPES.STATEMENT:
        return this.translateService.instant('download.statement');
      case DOWNLOADTYPES.IMAGE:
      default:
        if (this.isSingleArtPage()) {
          return this.translateService.instant('download.sheet');
        } else {
          return this.translateService.instant('download.portfolio');
        }
    }
  }

  public createPDF() {
    this.isCreating = true;
    switch(this.downloadFileType())  {
      case DOWNLOADTYPES.CV:
        this.pdfService.createCV().then((doc) => {
          doc.save('cv-juanmamoreno.pdf');
          this.isCreating = false;
        });
        break;
      case DOWNLOADTYPES.STATEMENT:
        this.pdfService.createStatement().then((doc) => {
          doc.save('statement-juanmamoreno.pdf');
          this.isCreating = false;
        });
        break;
      case DOWNLOADTYPES.IMAGE:
      default:
        if (this.isSingleArtPage()) {
          this.pdfService.createTechnicalSheet(this.nfts()[0]).then((doc) => {
            doc.save(`${this.nfts()[0].name! || 'juanmamoreno'}.pdf`);
            this.isCreating = false;
          });
        } else {
          const dialogRef = this.dialog.open(DossierOptionsModalComponent, {
            data: { includeContact: true, includeCv: true, includeStatement: true, customTitle: '', customText: '' }
          });
    
          dialogRef.afterClosed().subscribe(result => {
            if (result) {
              const { includeContact, includeCv, includeStatement, customTitle, customText } = result;
              this.pdfService.createDossier(this.nfts(), includeContact, includeCv, includeStatement, customTitle, customText).then(doc => {
                doc.save('dossier-juanmamoreno.pdf');
                this.isCreating = false;
              });
            } else {
              this.isCreating = false;
            }
          });
        }
        break;
    }
  }

}
