import { inject, Injectable } from '@angular/core';
import {
  ARTWORK_PAGE_BASE,
  CERTIFICATES_CONTRACT,
  VALIDTRAITS,
} from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTIST } from '@domain/artwork/mint-vocabulary';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';
import { CV_OBJECT } from '@domain/cv/cv.constants';
import { STATEMENT_OBJECT } from '@domain/statement/statement.constants';
import { TranslateService } from '@ngx-translate/core';
import { AvailabilityService } from '@shared/services/availability.service';
import type { jsPDF } from 'jspdf';
import { compressImage, grayscaleZoomedSquare, loadFirstAvailableImage } from './pdf-image.utils';
import { PDF_COLORS, PDF_PAGE, PDF_TYPE } from './pdf-theme';
import { PdfWriter } from './pdf-writer';

// Height reserved under an artwork for its caption lines (mm)
const CAPTION_BLOCK = 16;
// Letter spacing of the caption details line (mm)
const CAPTION_CHAR_SPACE = 0.4;
// Narrow reading column used by text pages (mm)
const TEXT_COLUMN_WIDTH = 130;
// One painting on one page, kept: worth more than a catalogue page's eight tenths
const CERTIFICATE_IMAGE_QUALITY = 0.92;
// The reading column for the certificate's one long sentence (mm)
const CERTIFICATE_COLUMN = 140;
// The painting never shrinks past this, however much there is to say (mm)
const MIN_IMAGE_HEIGHT = 70;
// The one vertical rhythm the certificate is built on (mm)
const GAP = 7;
// Between one fact and the next (mm)
const FACT_GAP = 3;
// Slack in the arithmetic, so a rounded line height cannot cost a second page
const CERTIFICATE_SLACK = 12;

@Injectable({
  providedIn: 'root',
})
export class PdfService {
  private artworkService = inject(ARTWORK_PORT);
  private translateService = inject(TranslateService);
  private availability = inject(AvailabilityService);

  // The jsPDF module is loaded on demand so it stays out of the initial
  // bundle; cached after first use so repeat downloads don't re-import.
  private jspdf?: typeof import('jspdf');

  private async loadJspdf(): Promise<typeof import('jspdf')> {
    return (this.jspdf ??= await import('jspdf'));
  }

  private async newWriter(format?: [number, number]): Promise<PdfWriter> {
    const { jsPDF } = await this.loadJspdf();
    return new PdfWriter(jsPDF, format);
  }

  public async createTechnicalSheet(nft: Nft): Promise<jsPDF> {
    const writer = await this.newWriter(PDF_PAGE.a4);
    await this.addArtworkPage(writer, nft);
    return writer.doc;
  }

  /**
   * The certificate as a page: the painting, what it is, and where it is written.
   *
   * Everything here is printed in full — the token, the contract address, the
   * transaction — because a certificate that has been printed has left the
   * internet behind, and an address abbreviated to `0x6E8b…5548` is a nice
   * label on screen and useless on paper. Somebody holding this should be able
   * to type what is on it into a block explorer and arrive at the same record.
   *
   * The record may be null, which is the same everywhere else: the date is the
   * only part that has to be fetched, and the page reads correctly without it.
   */
  public async createCertificate(
    nft: Nft,
    record: { txHash: string; mintedAt: string } | null
  ): Promise<jsPDF> {
    const writer = await this.newWriter(PDF_PAGE.a4);
    const { doc, pageWidth, contentWidth } = writer;
    const t = (key: string, params?: Record<string, string>) =>
      this.translateService.instant(key, params) as string;

    const on = record ? this.certificateDate(record.mintedAt) : null;
    const said = on ? t('certificate.recordedOn', { date: on }) : t('certificate.recorded');
    const caveat = t('certificate.onlyAuthorship');
    const details = this.getTraitsAsText(nft);
    const facts: [string, string][] = [
      [t('certificate.token'), `#${nft.tokenId}`],
      [t('certificate.contract'), CERTIFICATES_CONTRACT],
      ...(record ? ([[t('certificate.transaction'), record.txHash]] as [string, string][]) : []),
    ];

    // Everything but the painting is measured first, and the painting is given
    // what is left. The other way round — a fixed share of the page for the
    // image — is what put this on two pages: the sentence is six or seven lines
    // and one line either way decided it.
    const written =
      this.heightOf(writer, nft.name ?? '', PDF_TYPE.size.title, contentWidth) +
      this.heightOf(writer, details, PDF_TYPE.size.caption, contentWidth) +
      GAP +
      this.heightOf(writer, said, PDF_TYPE.size.body, CERTIFICATE_COLUMN) +
      GAP +
      facts.length * (PDF_TYPE.lineHeight.caption * 2 + FACT_GAP) +
      GAP +
      this.heightOf(writer, caveat, PDF_TYPE.size.small, CERTIFICATE_COLUMN) +
      CERTIFICATE_SLACK;

    const room = writer.pageHeight - 2 * writer.margin - PDF_TYPE.lineHeight.heading - GAP - GAP;
    const forImage = Math.max(MIN_IMAGE_HEIGHT, room - written);

    writer.heading(t('certificate.pdfHeading'), { align: 'center' });
    writer.space(GAP);

    const img = await loadFirstAvailableImage(this.artworkService.getNftFetchableUrls(nft.image));
    const compressed = compressImage(img, contentWidth, forImage, CERTIFICATE_IMAGE_QUALITY);
    const { width, height } = doc.getImageProperties(compressed);
    const ratio = width / height;
    let renderedWidth = contentWidth;
    let renderedHeight = renderedWidth / ratio;
    if (renderedHeight > forImage) {
      renderedHeight = forImage;
      renderedWidth = renderedHeight * ratio;
    }
    doc.addImage(
      compressed,
      'JPEG',
      (pageWidth - renderedWidth) / 2,
      writer.y,
      renderedWidth,
      renderedHeight
    );
    writer.space(renderedHeight + GAP);

    writer.paragraph(nft.name ?? '', {
      size: PDF_TYPE.size.title,
      style: 'italic',
      align: 'center',
    });
    writer.paragraph(details, {
      size: PDF_TYPE.size.caption,
      color: PDF_COLORS.soft,
      align: 'center',
      charSpace: CAPTION_CHAR_SPACE,
    });
    writer.space(GAP);

    // A narrower column than the page, so a sixty-word sentence is read rather
    // than scanned across the full width of an A4.
    writer.paragraph(said, {
      size: PDF_TYPE.size.body,
      maxWidth: CERTIFICATE_COLUMN,
      x: (pageWidth - CERTIFICATE_COLUMN) / 2,
    });
    writer.space(GAP);

    for (const [label, value] of facts) {
      this.certificateFact(writer, label, value);
    }

    // What the certificate is not. Small and quiet, but on the paper: this is
    // the document somebody is left holding, and a record of authorship read
    // as a record of ownership is the one way it could mislead.
    writer.space(GAP);
    writer.paragraph(caveat, {
      size: PDF_TYPE.size.small,
      color: PDF_COLORS.soft,
      maxWidth: CERTIFICATE_COLUMN,
      x: (pageWidth - CERTIFICATE_COLUMN) / 2,
    });

    // Pinned to the foot rather than written in the flow: it is the last line
    // on the page and the one that would otherwise carry a rounding error over
    // onto a second sheet.
    writer.textAt(
      `${ARTWORK_PAGE_BASE}/${nft.tokenId}`,
      writer.centerX,
      writer.pageHeight - writer.margin,
      { size: PDF_TYPE.size.small, color: PDF_COLORS.faint, align: 'center' }
    );

    return writer.doc;
  }

  /** How tall a piece of text will be once wrapped, before anything is drawn. */
  private heightOf(writer: PdfWriter, text: string, size: number, width: number): number {
    writer.doc.setFontSize(size);
    const lines = writer.doc.splitTextToSize(text, width) as string[];
    const lineHeight =
      size >= PDF_TYPE.size.body ? PDF_TYPE.lineHeight.body : PDF_TYPE.lineHeight.caption;
    return lines.length * lineHeight;
  }

  /** A label above its value, the value never abbreviated. */
  private certificateFact(writer: PdfWriter, label: string, value: string): void {
    writer.paragraph(label.toUpperCase(), {
      size: PDF_TYPE.size.small,
      color: PDF_COLORS.faint,
      charSpace: PDF_TYPE.wideCharSpace,
      align: 'center',
    });
    writer.paragraph(value, {
      size: PDF_TYPE.size.caption,
      color: PDF_COLORS.ink,
      align: 'center',
    });
    writer.space(3);
  }

  /**
   * The day it was written, in the reader's language and in UTC.
   *
   * UTC because a block timestamp is UTC and a block explorer shows UTC, and a
   * certificate somebody is holding up against one must not name a different
   * day than it does.
   */
  private certificateDate(mintedAt: string): string {
    const spanish = this.translateService.currentLang()?.startsWith('es');
    return new Intl.DateTimeFormat(spanish ? 'es-ES' : 'en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      timeZone: 'UTC',
    }).format(new Date(mintedAt));
  }

  public async createDossier(
    nfts: Array<Nft>,
    includeContact?: boolean,
    includeCv?: boolean,
    includeStatement?: boolean,
    customTitle?: string,
    customText?: string,
    onProgress?: (fraction: number) => void,
    /**
     * The biography, when this dossier is to carry one instead of the list.
     *
     * Passed in rather than fetched here: the api holds it and the page that
     * opened this dialog has already asked. Null is the ordinary case and the
     * one every dossier had before.
     */
    cvProse?: string | null
  ): Promise<jsPDF> {
    const writer = await this.newWriter();
    // Report progress (0..1) after each section so the button can show a
    // percentage — the artwork pages (each loading and compressing an image)
    // dominate the multi-second runtime.
    const total =
      1 + // cover
      (customText ? 1 : 0) +
      (includeStatement ? 1 : 0) +
      nfts.length +
      (includeCv ? 1 : 0) +
      (includeContact ? 1 : 0);
    let done = 0;
    const step = (): void => onProgress?.(++done / total);

    await this.addCover(writer, nfts, customTitle);
    step();
    if (customText) {
      writer.newPage();
      this.addCustomText(writer, customText);
      step();
    }
    if (includeStatement) {
      writer.newPage();
      this.addStatement(writer);
      step();
    }
    for (const nft of nfts) {
      writer.newPage();
      await this.addArtworkPage(writer, nft);
      step();
    }
    if (includeCv) {
      writer.newPage();
      // A list is scanned and a biography is read. Which of the two a dossier
      // wants depends on who is opening it, and only he knows that.
      if (cvProse) this.addCvProse(writer, cvProse);
      else this.addCv(writer);
      step();
    }
    if (includeContact) {
      writer.newPage();
      this.addContact(writer);
      step();
    }
    writer.addPageNumbers();
    return writer.doc;
  }

  public async createStatement(): Promise<jsPDF> {
    const writer = await this.newWriter(PDF_PAGE.a4);
    this.addStatement(writer);
    return writer.doc;
  }

  /**
   * The cv on its own, which needs a heading the dossier's version does not.
   *
   * Inside a dossier the name is on the cover and the reader has been through
   * twenty pages of his paintings to get here. On its own it is a sheet of
   * years and places arriving in an inbox with nothing around it, so it opens
   * with who it belongs to and the one line that places him.
   */
  public async createCV(): Promise<jsPDF> {
    const writer = await this.newWriter(PDF_PAGE.a4);

    writer.paragraph(ARTIST, { size: PDF_TYPE.size.coverArtist, style: 'bold' });
    writer.space(2);
    writer.paragraph(this.translateService.instant('cv.placeLine') as string, {
      size: PDF_TYPE.size.body,
      color: PDF_COLORS.soft,
    });
    writer.space(8);

    this.addCv(writer);
    return writer.doc;
  }

  /**
   * The cv as a biography, for a dossier that would rather be read than
   * scanned. Written by the api and stored there; this only sets it.
   */
  public async createCvProse(prose: string): Promise<jsPDF> {
    const writer = await this.newWriter(PDF_PAGE.a4);

    writer.paragraph(ARTIST, { size: PDF_TYPE.size.coverArtist, style: 'bold' });
    writer.space(8);
    this.addCvProse(writer, prose);

    return writer.doc;
  }

  /** The biography, set as a reading column like the statement is. */
  private addCvProse(writer: PdfWriter, prose: string): void {
    this.beginTextColumn(writer);
    for (const paragraph of prose.split(/\n{2,}/).filter((part) => part.trim())) {
      writer.paragraph(paragraph.trim(), this.textColumnStyle(writer));
      writer.space(3);
    }
  }

  // --- Cover: black & white zoomed crop of a random artwork, full bleed ---

  private async addCover(writer: PdfWriter, nfts: Array<Nft>, customTitle?: string): Promise<void> {
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

    const img = await loadFirstAvailableImage(this.artworkService.getNftFetchableUrls(nft.image));
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

    if (this.availability.isSold(nft.tokenId)) {
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
        writer.paragraph(this.translateService.instant(paragraph), columnStyle);
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
    writer.paragraph('juanmamoreno.com', {
      ...centered,
      color: PDF_COLORS.soft,
    });

    writer.space(14);
    writer.paragraph(this.translateService.instant('contact.representedBy'), {
      ...centered,
      size: PDF_TYPE.size.caption,
      color: PDF_COLORS.faint,
    });
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
    const trait = (key: VALIDTRAITS) => this.artworkService.getTraitValue(nft, key);
    const medium = this.translateService.instant(trait(VALIDTRAITS.MEDIUM));
    const size = `${trait(VALIDTRAITS.HEIGHT)} × ${trait(
      VALIDTRAITS.WIDTH
    )} ${trait(VALIDTRAITS.UNIT)}`;
    return `${trait(VALIDTRAITS.YEAR)} · ${medium} · ${size}`;
  }
}
