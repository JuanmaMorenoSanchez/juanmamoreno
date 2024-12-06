import { Component, input } from '@angular/core';
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
  public isSingleArtPage = false;

  constructor(
    private pdfService: PdfService
  ) {
    this.isSingleArtPage = !(this.nfts.length > 1)
  }

  public createPDF() {
    this.isCreating = true;
    if (this.isSingleArtPage) {
      this.pdfService.createTechnicalSheet(this.nfts()[0]).then((doc) => {
        doc.save(`${this.nfts()[0].name! || 'juanmamoreno'}.pdf`);
        this.isCreating = false;
      });
    } else {

    }
  }

}
