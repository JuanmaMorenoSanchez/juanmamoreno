import { Component, computed, inject, input } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatTooltip } from '@angular/material/tooltip';
import { Nft } from '@domain/artwork/artwork.entity';
import { DOWNLOADTYPES } from '@domain/cv/cv.constants';
import { TranslateService } from '@ngx-translate/core';
import { DossierOptionsModalComponent } from '@shared/components/dossier-options-modal/dossier-options-modal.component';
import { PdfService } from '@shared/services/pdf.service';

@Component({
    selector: 'app-pdf-button',
    templateUrl: './pdf-button.component.html',
    styleUrl: './pdf-button.component.scss',
    imports: [MatIconButton, MatTooltip, MatIcon, MatProgressSpinner]
})
export class PdfButtonComponent {
  private translateService = inject(TranslateService);
  private pdfService = inject(PdfService);
  private dialog = inject(MatDialog);

  nfts = input<Nft[]>([]);
  downloadFileType = input<DOWNLOADTYPES>(DOWNLOADTYPES.IMAGE);

  public isCreating = false;
  public isSingleArtPage = computed(() => (this.nfts().length <= 1));

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
