import { Injectable } from '@angular/core';
import { Nft } from 'alchemy-sdk';
import jsPDF from 'jspdf';
import { NftsService } from './nfts.service';
import { VALIDTRAITS } from '@constants/nft.constants';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private margin = 20;

  constructor(private nftsService: NftsService) {}

  public async createTechnicalSheet(nft: Nft): Promise<jsPDF> {
    const doc = new jsPDF();
    await this.addNftToPdf(doc, nft);
    return doc;
  }

  public async createDossier(
    nfts: Array<Nft>,
    customTitle?: string,
    customText?: string,
    includeCv?: boolean,
    includeStatement?: boolean
  ) {
    const doc = new jsPDF();

    for (const [index, nft] of nfts.entries()) {
      await this.addNftToPdf(doc, nft);
      if (index < nfts.length - 1) {
        doc.addPage();
      }
    }

    return doc;
  }

  private async addNftToPdf(doc: jsPDF, nft: Nft): Promise<void> {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - 2 * this.margin;
    const contentHeight = pageHeight - 2 * this.margin;

    const imgUrl = this.nftsService.getQualityUrl(nft.image);
    const img = await this.loadImage(imgUrl);

    const { width: originalWidth, height: originalHeight } = doc.getImageProperties(img);
    const aspectRatio = originalWidth / originalHeight;

    let resizedWidth = contentWidth;
    let resizedHeight = contentWidth / aspectRatio;

    if (resizedHeight > contentHeight) {
      resizedHeight = contentHeight;
      resizedWidth = contentHeight * aspectRatio;
    }

    const xPosition = (pageWidth - resizedWidth) / 2;
    const yPosition = this.margin;

    doc.addImage(imgUrl, 'JPEG', xPosition, yPosition, resizedWidth, resizedHeight);

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.text(nft.name!, this.margin, yPosition + resizedHeight + 10);
    doc.setFont('helvetica', 'normal');
    doc.text(this.getTraitsAsText(nft), this.margin, yPosition + resizedHeight + 20);
  }

  private getTraitsAsText(nft: Nft): string {
    const year = this.nftsService.getTraitValue(nft, VALIDTRAITS.YEAR) || 'Unknown year';
    const medium = this.nftsService.getTraitValue(nft, VALIDTRAITS.MEDIUM) || 'Unknown medium';
    const height = this.nftsService.getTraitValue(nft, VALIDTRAITS.HEIGHT) || 'Unknown height';
    const width = this.nftsService.getTraitValue(nft, VALIDTRAITS.WIDTH) || 'Unknown width';
    const unit = this.nftsService.getTraitValue(nft, VALIDTRAITS.UNIT) || 'Unknown unit';
    return `${year}, ${medium}, ${height} x ${width} ${unit}.`;
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  }
}
