import { Injectable } from '@angular/core';
import { Nft } from 'alchemy-sdk';
import jsPDF from 'jspdf';
import { NftsService } from './nfts.service';
import { VALIDTRAITS } from '@constants/nft.constants';
import { CV_OBJECT } from '@constants/cv.constants';
import { STATEMENT_OBJECT } from '@constants/statement.constants';

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
    includeCv?: boolean,
    includeStatement?: boolean,
    customTitle?: string,
    customText?: string
  ) {
    const doc = new jsPDF();
    await this.addCoverToPdf(doc, nfts[0], customTitle);
    if (customText) await this.addArbitraryText(doc, customText);
    if (includeStatement) await this.addStatementToPdf(doc);
    let index = 0
    for (const nft of nfts) {
      await this.addNftToPdf(doc, nft);
      index++;
      if (index !== nfts.length || includeCv) doc.addPage();
    }
    if (includeCv) await this.addCVToPdf(doc);
    return doc;
  }

  private async addCoverToPdf(doc: jsPDF, nft: Nft, customTitle?: string): Promise<void> {
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = (pageHeight / 3) * 2;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(32);
    doc.text('Juanma Moreno Sánchez', this.margin, yPosition);
    yPosition += 24;
    doc.text(`${customTitle ? customTitle : 'Dossier'}`, this.margin, yPosition);
    doc.addPage();
  }

  public async createStatement(): Promise<jsPDF> {
    const doc = new jsPDF();
    this.addStatementToPdf(doc);
    return doc;
  }

  private addArbitraryText(doc: jsPDF, text: string): void {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = this.margin;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const introContent = this.extractWordsFromElement(text);
    const introLines = this.splitTextToFit(introContent, pageWidth + this.margin * 2);
    introLines.forEach((line) => {
      if (yPosition + 12 > pageHeight - this.margin) {
        doc.addPage();
        yPosition = this.margin;
      }
      doc.text(line, this.margin, yPosition);
      yPosition += 6;
    });
    doc.addPage();
  }

  private async addStatementToPdf(doc: jsPDF): Promise<void> {
    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = this.margin;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    const introContent = this.extractWordsFromElement(STATEMENT_OBJECT.introduction.content);
    const introLines = this.splitTextToFit(introContent, pageWidth + this.margin * 2);
    introLines.forEach((line) => {
      doc.text(line, this.margin, yPosition);
      yPosition += 6;
    });
    yPosition += 10;

    STATEMENT_OBJECT.sections.forEach((section) => {
      if (yPosition + 12 > pageHeight - this.margin) {
        doc.addPage();
        yPosition = this.margin;
      }

      doc.setFont('helvetica', 'bold');
      doc.setFontSize(12);
      doc.text(section.title, this.margin, yPosition);
      yPosition += 10;

      if (section.content) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        section.content.forEach((paragraph) => {
          const cleanParagraph = this.extractWordsFromElement(paragraph);
          const paragraphLines = this.splitTextToFit(cleanParagraph, pageWidth + this.margin * 2);
          paragraphLines.forEach((line) => {
            if (yPosition + 10 > pageHeight - this.margin) {
              doc.addPage();
              yPosition = this.margin;
            }
            doc.text(line, this.margin, yPosition);
            yPosition += 6;
          });
          yPosition += 6;
        });
      }

      if (section.items) {
        section.items.forEach((item) => {
          if (yPosition + 10 > pageHeight - this.margin) {
            doc.addPage();
            yPosition = this.margin;
          }

          const cleanSubtitle = this.extractWordsFromElement(item.subtitle);
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.text(cleanSubtitle, this.margin, yPosition);
          yPosition += 6;

          const cleanContent = this.extractWordsFromElement(item.content);
          const itemContentLines = this.splitTextToFit(cleanContent, pageWidth + this.margin * 2);
          itemContentLines.forEach((line) => {
            if (yPosition + 6 > pageHeight - this.margin) {
              doc.addPage();
              yPosition = this.margin;
            }
            doc.setFont('helvetica', 'normal');
            doc.text(line, this.margin, yPosition);
            yPosition += 6;
          });
          yPosition += 6;
        });
      }
    });
    doc.addPage();
  }

  private splitTextToFit(text: string, maxWidth: number): string[] {
    const doc = new jsPDF();
    return doc.splitTextToSize(text, maxWidth);
  }

  public async createCV(): Promise<jsPDF> {
    const doc = new jsPDF();
    this.addCVToPdf(doc);
    return doc;
  }

  private async addCVToPdf(doc: jsPDF): Promise<void> {
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = this.margin;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(10);
    doc.text('Juanma Moreno Sánchez', this.margin, yPosition);
    yPosition += 5;
    doc.text('Alcalá la Real (Jaén, Spain), 1986. Based in Madrid (Spain)', this.margin, yPosition);
    yPosition += 5;
    doc.text('Currently represented by Zunino Gallery (Seville, Spain)', this.margin, yPosition);
    yPosition += 15;

    CV_OBJECT.forEach((section) => {
      if (yPosition + 10 > pageHeight - this.margin) {
        doc.addPage();
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(24);
      doc.text(section.title, this.margin, yPosition);
      yPosition += 10;

      section.items.forEach((item) => {
        if (yPosition + 13 > pageHeight - this.margin) {
          doc.addPage();
          yPosition = this.margin;
        }

        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);
        doc.text(this.extractWordsFromElement(item.title), this.margin, yPosition);
        yPosition += 5;

        doc.setFont('helvetica', 'normal');
        const venue = item.venue ? `${this.extractWordsFromElement(item.venue!)}, ` : '';
        doc.text(`${venue}${item.city}, ${item.country}, ${item.year}`, this.margin, yPosition);
        yPosition += 8;
      });
      yPosition += 10;
    });
  }

  private extractWordsFromElement(stringifiedHTML: string): string {
    return stringifiedHTML.replace(/<\/?[^>]+(>|$)/g, '').trim();
  }

  private async addNftToPdf(doc: jsPDF, nft: Nft): Promise<void> {
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();
    const contentWidth = pageWidth - 2 * this.margin;
    const contentHeight = pageHeight - 2 * this.margin;

    const imgUrl = this.nftsService.getQualityUrl(nft.image);
    const imgCompressed = await this.loadCompressedImage(imgUrl, contentWidth, contentHeight);

    const { width: originalWidth, height: originalHeight } = doc.getImageProperties(imgCompressed);
    const aspectRatio = originalWidth / originalHeight;

    let resizedWidth = contentWidth;
    let resizedHeight = contentWidth / aspectRatio;

    if (resizedHeight > contentHeight) {
      resizedHeight = contentHeight;
      resizedWidth = contentHeight * aspectRatio;
    }

    const xPosition = (pageWidth - resizedWidth) / 2;
    const yPosition = this.margin;

    doc.addImage(imgCompressed, 'JPEG', xPosition, yPosition, resizedWidth, resizedHeight);

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

  private async loadCompressedImage(src: string, maxWidth: number, maxHeight: number): Promise<string> {
    const img = await this.loadImage(src);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d')!;
    const aspectRatio = img.width / img.height;
    let resizedWidth = Math.min(img.width, maxWidth * 4);
    let resizedHeight = resizedWidth / aspectRatio;

    if (resizedHeight > maxHeight * 4) {
      resizedHeight = maxHeight * 4;
      resizedWidth = resizedHeight * aspectRatio;
    }
    canvas.width = resizedWidth;
    canvas.height = resizedHeight;
    ctx.drawImage(img, 0, 0, resizedWidth, resizedHeight);
    return canvas.toDataURL('image/jpeg', 0.8);
  }

  private loadImage(src: string): Promise<HTMLImageElement> {
    return new Promise<HTMLImageElement>((resolve, reject) => {
      const img = new Image();
      img.crossOrigin = 'anonymous';
      img.src = src;
      img.onload = () => resolve(img);
      img.onerror = (err) => reject(err);
    });
  }
}
