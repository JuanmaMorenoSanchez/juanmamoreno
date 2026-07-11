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
import type { jsPDF } from 'jspdf';
import {
  compressImage,
  grayscaleZoomedSquare,
  loadFirstAvailableImage,
} from './pdf-image.utils';
import { PDF_COLORS, PDF_TYPE } from './pdf-theme';
import { PdfWriter } from './pdf-writer';

// Height reserved under an artwork for its caption lines (mm)
const CAPTION_BLOCK = 16;
// Letter spacing of the caption details line (mm)
const CAPTION_CHAR_SPACE = 0.4;
// Narrow reading column used by text pages (mm)
const TEXT_COLUMN_WIDTH = 130;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private artworkService = inject(ARTWORK_PORT);
  private translateService = inject(TranslateService);

  // The jsPDF module is loaded on demand so it stays out of the initial
  // bundle; cached after first use so repeat downloads don't re-import.
  private jspdf?: typeof import('jspdf');

  private async loadJspdf(): Promise<typeof import('jspdf')> {
    return (this.jspdf ??= await import('jspdf'));
  }

  private async newWriter(): Promise<PdfWriter> {
    const { jsPDF } = await this.loadJspdf();
    return new PdfWriter(jsPDF);
  }

  public async createTechnicalSheet(nft: Nft): Promise<jsPDF> {
    const writer = await this.newWriter();
    await this.addArtworkPage(writer, nft);
    return writer.doc;
  }

  public async createDossier(
    nfts: Array<Nft>,
    includeContact?: boolean,
    includeCv?: boolean,
    includeStatement?: boolean,
    customTitle?: string,
    customText?: string
  ): Promise<jsPDF> {
    const writer = await this.newWriter();
    await this.addCover(writer, nfts, customTitle);
    if (customText) {
      writer.newPage();
      this.addCustomText(writer, customText);
    }
    if (includeStatement) {
      writer.newPage();
      this.addStatement(writer);
    }
    for (const nft of nfts) {
      writer.newPage();
      await this.addArtworkPage(writer, nft);
    }
    if (includeCv) {
      writer.newPage();
      this.addCv(writer);
    }
    if (includeContact) {
      writer.newPage();
      this.addContact(writer);
    }
    writer.addPageNumbers();
    return writer.doc;
  }

  public async createStatement(): Promise<jsPDF> {
    const writer = await this.newWriter();
    this.addStatement(writer);
    return writer.doc;
  }

  public async createCV(): Promise<jsPDF> {
    const writer = await this.newWriter();
    this.addCv(writer);
    return writer.doc;
  }

  // --- Cover: black & white zoomed crop of a random artwork, full bleed ---

  private async addCover(
    writer: PdfWriter,
    nfts: Array<Nft>,
    customTitle?: string
  ): Promise<void> {
    const { GState } = await this.loadJspdf();
    const randomNft = nfts[Math.floor(Math.random() * nfts.length)];
    const img = await loadFirstAvailableImage(
      this.artworkService.getNftFetchableUrls(randomNft.image)
    );
    const cover = grayscaleZoomedSquare(img);
    const { doc, pageWidth, pageHeight, margin } = writer;

    doc.addImage(cover, 'JPEG', 0, 0, pageWidth, pageHeight);

    // Soft dark veil at the bottom so the white title stays legible
    doc.saveGraphicsState();
    doc.setGState(new GState({ opacity: 0.35 }));
    doc.setFillColor('#000000');
    doc.rect(0, pageHeight - 72, pageWidth, 72, 'F');
    doc.restoreGraphicsState();

    writer.textAt('JUANMA MORENO SÁNCHEZ', margin, margin, {
      size: PDF_TYPE.size.coverArtist,
      color: PDF_COLORS.white,
      charSpace: PDF_TYPE.wideCharSpace,
    });
    writer.textAt(customTitle || 'Portfolio', margin, pageHeight - margin - 10, {
      size: PDF_TYPE.size.coverTitle,
      color: PDF_COLORS.white,
    });
    writer.textAt(String(new Date().getFullYear()), margin, pageHeight - margin, {
      size: PDF_TYPE.size.caption,
      color: PDF_COLORS.white,
      charSpace: PDF_TYPE.wideCharSpace,
    });
  }

  // --- Artwork plate: centered image, museum-label caption underneath ---

  private async addArtworkPage(writer: PdfWriter, nft: Nft): Promise<void> {
    const { doc, pageWidth, pageHeight, margin, contentWidth } = writer;
    const maxImageHeight = pageHeight - 2 * margin - CAPTION_BLOCK;

    const img = await loadFirstAvailableImage(
      this.artworkService.getNftFetchableUrls(nft.image)
    );
    const compressed = compressImage(img, contentWidth, maxImageHeight);

    const { width, height } = doc.getImageProperties(compressed);
    const ratio = width / height;
    let renderedWidth = contentWidth;
    let renderedHeight = renderedWidth / ratio;
    if (renderedHeight > maxImageHeight) {
      renderedHeight = maxImageHeight;
      renderedWidth = renderedHeight * ratio;
    }

    // Centered inside the block the caption does not use
    const x = (pageWidth - renderedWidth) / 2;
    const y = margin + (maxImageHeight - renderedHeight) / 2;
    doc.addImage(compressed, 'JPEG', x, y, renderedWidth, renderedHeight);

    const titleY = pageHeight - margin - 6;
    const detailsY = titleY + 5;
    writer.textAt(nft.name ?? '', writer.centerX, titleY, {
      size: PDF_TYPE.size.title,
      style: 'italic',
      align: 'center',
    });
    const details = this.getTraitsAsText(nft);
    writer.textAt(details, writer.centerX, detailsY, {
      size: PDF_TYPE.size.caption,
      color: PDF_COLORS.soft,
      align: 'center',
      charSpace: CAPTION_CHAR_SPACE,
    });

    if (SOLDCERTIFICATES.includes(nft.tokenId)) {
      const detailsWidth = writer.textWidth(details, {
        size: PDF_TYPE.size.caption,
        charSpace: CAPTION_CHAR_SPACE,
      });
      doc.setFillColor(PDF_COLORS.accent);
      doc.circle(writer.centerX + detailsWidth / 2 + 4, detailsY - 1, 1.2, 'F');
    }
  }

  // --- Text pages: narrow reading column, airy line height ---

  private addCustomText(writer: PdfWriter, text: string): void {
    this.beginTextColumn(writer);
    writer.paragraph(text, this.textColumnStyle(writer));
  }

  private addStatement(writer: PdfWriter): void {
    const columnStyle = this.textColumnStyle(writer);
    this.beginTextColumn(writer);

    writer.paragraph(
      this.translateService.instant(STATEMENT_OBJECT.introduction.content),
      columnStyle
    );
    writer.space(8);

    STATEMENT_OBJECT.sections.forEach((section) => {
      writer.ensureRoom(24);
      writer.heading(this.translateService.instant(section.title), {
        x: columnStyle.x,
      });
      writer.space(2);

      section.content?.forEach((paragraph) => {
        writer.paragraph(
          this.translateService.instant(paragraph),
          columnStyle
        );
        writer.space(3);
      });

      section.items?.forEach((item) => {
        writer.ensureRoom(14);
        writer.paragraph(this.translateService.instant(item.subtitle), {
          ...columnStyle,
          style: 'italic',
        });
        writer.paragraph(this.translateService.instant(item.content), {
          ...columnStyle,
          color: PDF_COLORS.soft,
        });
        writer.space(4);
      });
      writer.space(6);
    });
  }

  // --- CV: quiet year column, one airy entry per line ---

  private addCv(writer: PdfWriter): void {
    const yearColumn = 18;
    const entryX = writer.margin + yearColumn;
    const entryWidth = writer.contentWidth - yearColumn;

    CV_OBJECT.forEach((section) => {
      writer.ensureRoom(26);
      writer.heading(this.translateService.instant(section.title));
      writer.space(3);

      section.items.forEach((item) => {
        writer.ensureRoom(12);
        writer.textAt(String(item.year), writer.margin, writer.y, {
          size: PDF_TYPE.size.caption,
          color: PDF_COLORS.faint,
        });

        writer.paragraph(this.translateService.instant(item.title), {
          x: entryX,
          maxWidth: entryWidth,
          style: 'italic',
          lineHeight: 4.8,
        });

        const details = [
          item.venue && this.translateService.instant(item.venue),
          item.city,
          this.translateService.instant(item.country),
        ]
          .filter(Boolean)
          .join(', ');
        writer.paragraph(details, {
          x: entryX,
          maxWidth: entryWidth,
          size: PDF_TYPE.size.caption,
          color: PDF_COLORS.soft,
          lineHeight: 4.4,
        });
        writer.space(3);
      });
      writer.space(9);
    });
  }

  // --- Contact: single centered block ---

  private addContact(writer: PdfWriter): void {
    writer.y = 70;
    const centered = { align: 'center' as const, lineHeight: 6 };

    writer.heading(this.translateService.instant('contact.title'), {
      align: 'center',
    });
    writer.space(6);
    writer.paragraph('Juanma Moreno Sánchez', centered);
    writer.paragraph('(+34) 635820462', {
      ...centered,
      color: PDF_COLORS.soft,
    });
    writer.paragraph('morenosanchezjuanma@gmail.com', {
      ...centered,
      color: PDF_COLORS.soft,
    });
    writer.paragraph('www.juanmamoreno.com', {
      ...centered,
      color: PDF_COLORS.soft,
    });

    writer.space(14);
    writer.paragraph(
      this.translateService.instant('contact.representedBy'),
      { ...centered, size: PDF_TYPE.size.caption, color: PDF_COLORS.faint }
    );
    writer.space(2);
    writer.paragraph('(+34) 606780084', {
      ...centered,
      color: PDF_COLORS.soft,
    });
    writer.paragraph('galeriazunino@gmail.com', {
      ...centered,
      color: PDF_COLORS.soft,
    });
    writer.paragraph('www.galeriazunino.com', {
      ...centered,
      color: PDF_COLORS.soft,
    });
  }

  // --- Shared helpers ---

  private beginTextColumn(writer: PdfWriter): void {
    writer.space(6);
  }

  private textColumnStyle(writer: PdfWriter) {
    return {
      x: (writer.pageWidth - TEXT_COLUMN_WIDTH) / 2,
      maxWidth: TEXT_COLUMN_WIDTH,
      lineHeight: PDF_TYPE.lineHeight.body,
    };
  }

  private getTraitsAsText(nft: Nft): string {
    const trait = (key: VALIDTRAITS) =>
      this.artworkService.getTraitValue(nft, key);
    const medium = this.translateService.instant(trait(VALIDTRAITS.MEDIUM));
    const size = `${trait(VALIDTRAITS.HEIGHT)} × ${trait(
      VALIDTRAITS.WIDTH
    )} ${trait(VALIDTRAITS.UNIT)}`;
    return `${trait(VALIDTRAITS.YEAR)} · ${medium} · ${size}`;
  }

}
