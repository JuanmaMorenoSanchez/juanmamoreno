import { Component, computed, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DossierOptionsModalComponent } from '@components/dossier-options-modal/dossier-options-modal.component';
import { PdfService } from '@services/pdf.service';
import { Nft } from 'alchemy-sdk';

@Component({
  selector: 'app-pdf-button',
  templateUrl: './pdf-button.component.html',
  styleUrl: './pdf-button.component.scss'
})
export class PdfButtonComponent {

  nfts = input<Nft[]>([]);

  readonly singleTooltip = "Generate and download technical sheet";
  readonly multipleTooltip = "Generate and download portfolio";
  public isCreating = false;
  public isSingleArtPage = computed(() => (this.nfts().length <= 1));

  constructor(
    private pdfService: PdfService,
    private dialog: MatDialog
  ) {
  }

  public createPDF() {
    this.isCreating = true;
    if (this.isSingleArtPage()) {
      this.pdfService.createTechnicalSheet(this.nfts()[0]).then((doc) => {
        doc.save(`${this.nfts()[0].name! || 'juanmamoreno'}.pdf`);
        this.isCreating = false;
      });
    } else {
      const dialogRef = this.dialog.open(DossierOptionsModalComponent, {
        data: { includeCv: true, includeStatement: true, customTitle: '', customText: '' }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          const { includeCv, includeStatement, customTitle, customText } = result;
          this.pdfService.createDossier(this.nfts(), includeCv, includeStatement, customTitle, customText).then(doc => {
            doc.save('dossier-juanmamoreno.pdf');
            this.isCreating = false;
          });
        } else {
          this.isCreating = false;
        }
      });
    }
  }

}
