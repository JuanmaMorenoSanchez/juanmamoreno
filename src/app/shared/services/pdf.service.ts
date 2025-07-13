import { inject, Injectable } from '@angular/core';
import {
  SOLDCERTIFICATES,
  VALIDTRAITS,
} from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { CV_OBJECT } from '@domain/cv/cv.constants';
import { STATEMENT_OBJECT } from '@domain/statement/statement.constants';
import { TranslateService } from '@ngx-translate/core';
import { SessionQuery } from '@shared/store/session.query';
import { jsPDF } from 'jspdf';

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private artworkService = inject(ARTWORK_PORT);
  private sessionQuery = inject(SessionQuery);
  private translateService = inject(TranslateService);

  private margin = 20;

  public async createTechnicalSheet(nft: Nft): Promise<jsPDF> {
    const doc = new jsPDF();
    await this.addNftToPdf(doc, nft);
    return doc;
  }

  public async createDossier(
    nfts: Array<Nft>,
    includeContact?: boolean,
    includeCv?: boolean,
    includeStatement?: boolean,
    customTitle?: string,
    customText?: string
  ) {
    const doc = new jsPDF();
    await this.addCoverToPdf(doc, nfts[0], customTitle);
    if (customText) await this.addArbitraryText(doc, customText);
    if (includeStatement) await this.addStatementToPdf(doc);
    let index = 0;
    for (const nft of nfts) {
      await this.addNftToPdf(doc, nft);
      index++;
      if (index !== nfts.length || includeCv) doc.addPage();
    }
    if (includeCv) await this.addCVToPdf(doc);
    if (includeContact) await this.addContactInfo(doc);
    return doc;
  }

  private async addCoverToPdf(
    doc: jsPDF,
    nft: Nft,
    customTitle?: string
  ): Promise<void> {
    // TODO: add select in FE to decide if you want cover being figurative oil, ia oil, or watercolor
    // Depending of this, load one image or other.

    const pageHeight = doc.internal.pageSize.getHeight();
    const pageWidth = doc.internal.pageSize.getWidth();
    let yPosition = pageHeight / 5;

    const coverImgUrl = this.artworkService.getNftQualityUrl(
      this.artworkService.getNftById('68', this.sessionQuery.selectArtPieces)!
        .image
    );
    const originalImg = await this.loadImage(coverImgUrl);
    const { width: originalWidth, height: originalHeight } =
      doc.getImageProperties(originalImg);
    const aspectRatio = originalWidth / originalHeight;
    const imgCompressed = await this.loadCompressedImage(
      coverImgUrl,
      pageWidth * aspectRatio,
      pageHeight
    );
    doc.addImage(
      imgCompressed,
      'JPEG',
      0,
      0,
      pageWidth * aspectRatio,
      pageHeight
    );

    doc.setTextColor(255, 255, 255);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text('Juanma Moreno Sánchez', this.margin, yPosition);
    yPosition += 16;
    doc.setFontSize(24);
    doc.text(
      `${customTitle ? customTitle : 'Portfolio'}`,
      this.margin,
      yPosition
    );
    doc.setTextColor(0, 0, 0);
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
    const introLines = this.splitTextToFit(
      introContent,
      pageWidth + this.margin * 2
    );
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
    const introContent = this.extractWordsFromElement(
      this.translateService.instant(STATEMENT_OBJECT.introduction.content)
    );
    const introLines = this.splitTextToFit(
      introContent,
      pageWidth + this.margin * 2
    );
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
      doc.text(
        this.translateService.instant(section.title),
        this.margin,
        yPosition
      );
      yPosition += 10;

      if (section.content) {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(10);
        section.content.forEach((paragraph) => {
          const cleanParagraph = this.extractWordsFromElement(
            this.translateService.instant(paragraph)
          );
          const paragraphLines = this.splitTextToFit(
            cleanParagraph,
            pageWidth + this.margin * 2
          );
          paragraphLines.forEach((line) => {
            if (yPosition + 10 > pageHeight - this.margin) {
              doc.addPage();
              yPosition = this.margin;
            }
            doc.text(
              this.translateService.instant(line),
              this.margin,
              yPosition
            );
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

          const cleanSubtitle = this.extractWordsFromElement(
            this.translateService.instant(item.subtitle)
          );
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.text(
            this.translateService.instant(cleanSubtitle),
            this.margin,
            yPosition
          );
          yPosition += 6;

          const cleanContent = this.extractWordsFromElement(
            this.translateService.instant(item.content)
          );
          const itemContentLines = this.splitTextToFit(
            cleanContent,
            pageWidth + this.margin * 2
          );
          itemContentLines.forEach((line) => {
            if (yPosition + 6 > pageHeight - this.margin) {
              doc.addPage();
              yPosition = this.margin;
            }
            doc.setFont('helvetica', 'normal');
            doc.text(
              this.translateService.instant(line),
              this.margin,
              yPosition
            );
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

  private async addContactInfo(doc: jsPDF): Promise<void> {
    doc.addPage();
    let yPosition = this.margin;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(16);
    doc.text(
      this.translateService.instant('contact.title'),
      this.margin,
      yPosition
    );
    yPosition += 6;
    doc.setFontSize(10);
    doc.text('Juanma Moreno Sánchez', this.margin, yPosition);
    yPosition += 5;
    doc.text('(+34) 635820462', this.margin, yPosition);
    yPosition += 5;
    doc.text('morenosanchezjuanma@gmail.com', this.margin, yPosition);
    yPosition += 5;
    doc.text('www.juanmamoreno.com', this.margin, yPosition);
    yPosition += 15;
    doc.text(
      this.translateService.instant('contact.representedBy'),
      this.margin,
      yPosition
    );
    yPosition += 5;
    doc.text('(+34) 606780084', this.margin, yPosition);
    yPosition += 5;
    doc.text('galeriazunino@gmail.com', this.margin, yPosition);
    yPosition += 5;
    doc.text('www.galeriazunino.com', this.margin, yPosition);
    yPosition += 15;
  }

  private async addCVToPdf(doc: jsPDF): Promise<void> {
    const pageHeight = doc.internal.pageSize.getHeight();
    let yPosition = this.margin;

    CV_OBJECT.forEach((section) => {
      if (yPosition + 8 > pageHeight - this.margin) {
        doc.addPage();
        yPosition = this.margin;
      }
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(16);
      doc.text(
        this.translateService.instant(section.title),
        this.margin,
        yPosition
      );
      yPosition += 6;

      section.items.forEach((item) => {
        if (yPosition + 8 > pageHeight - this.margin) {
          doc.addPage();
          yPosition = this.margin;
        }

        const title = this.extractWordsFromElement(
          this.translateService.instant(item.title)
        );
        const venue = item.venue
          ? `${this.extractWordsFromElement(
              this.translateService.instant(item.venue)
            )}, `
          : '';
        const details = `${venue}${
          item.city || ''
        }, ${this.translateService.instant(item.country)}, ${item.year}`;

        let xPosition = this.margin;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(10);

        doc.text(title, xPosition, yPosition);
        xPosition += doc.getTextWidth(title) + 2;
        doc.setFont('helvetica', 'normal');
        doc.text(details, xPosition, yPosition);
        yPosition += 4.7;
      });
      yPosition += 6;
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

    const imgUrl = this.artworkService.getNftQualityUrl(nft.image);
    const imgCompressed = await this.loadCompressedImage(
      imgUrl,
      contentWidth,
      contentHeight
    );

    const { width: originalWidth, height: originalHeight } =
      doc.getImageProperties(imgCompressed);
    const aspectRatio = originalWidth / originalHeight;

    let resizedWidth = contentWidth;
    let resizedHeight = contentWidth / aspectRatio;

    if (resizedHeight > contentHeight) {
      resizedHeight = contentHeight;
      resizedWidth = contentHeight * aspectRatio;
    }

    const xPosition = (pageWidth - resizedWidth) / 2;
    const yPosition = this.margin;

    doc.addImage(
      imgCompressed,
      'JPEG',
      xPosition,
      yPosition,
      resizedWidth,
      resizedHeight
    );

    doc.setFont('helvetica', 'italic');
    doc.setFontSize(12);
    doc.text(nft.name! + ',', this.margin, yPosition + resizedHeight + 10);
    doc.setFont('helvetica', 'normal');
    const technicalData = this.getTraitsAsText(nft);
    doc.text(
      technicalData,
      this.margin + doc.getTextWidth(nft.name!) + 2,
      yPosition + resizedHeight + 10
    );
    if (SOLDCERTIFICATES.includes(nft.tokenId)) {
      const dotSize = 2;
      const dotX =
        this.margin +
        doc.getTextWidth(technicalData) +
        doc.getTextWidth(nft.name!) +
        7;
      doc.setFillColor('red');
      doc.circle(dotX, yPosition + resizedHeight + 9, dotSize, 'F');
    }
  }

  private getTraitsAsText(nft: Nft): string {
    const year =
      this.artworkService.getTraitValue(nft, VALIDTRAITS.YEAR) ||
      'Unknown year';
    const medium =
      this.translateService.instant(
        this.artworkService.getTraitValue(nft, VALIDTRAITS.MEDIUM)
      ) || 'Unknown medium';
    const height =
      this.artworkService.getTraitValue(nft, VALIDTRAITS.HEIGHT) ||
      'Unknown height';
    const width =
      this.artworkService.getTraitValue(nft, VALIDTRAITS.WIDTH) ||
      'Unknown width';
    const unit =
      this.artworkService.getTraitValue(nft, VALIDTRAITS.UNIT) ||
      'Unknown unit';
    return `${year}, ${medium}, ${height} x ${width} ${unit}.`;
  }

  private async loadCompressedImage(
    src: string,
    maxWidth: number,
    maxHeight: number
  ): Promise<string> {
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
