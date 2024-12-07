import { Component, computed, input } from '@angular/core';
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
  public isSingleArtPage = computed(() => {
    return (this.nfts().length <= 1);
  });

  constructor(
    private pdfService: PdfService
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
      this.pdfService.createDossier(this.nfts(), true, true).then((doc) => {
        doc.save('dossier-juanmamoreno.pdf');
        this.isCreating = false;
      });
    }
  }

}
