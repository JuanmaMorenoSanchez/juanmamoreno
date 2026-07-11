import type { jsPDF } from 'jspdf';
import { PDF_COLORS, PDF_PAGE, PDF_TYPE } from './pdf-theme';

// jsPDF is dynamically imported so the heavy PDF stack stays out of the
// initial bundle; the constructor is handed in rather than imported here.
export type JsPdfConstructor = typeof jsPDF;

export interface PdfTextStyle {
  size?: number;
  style?: 'normal' | 'bold' | 'italic';
  color?: string;
  charSpace?: number;
  lineHeight?: number;
  align?: 'left' | 'center';
  x?: number;
  maxWidth?: number;
}

// Thin wrapper around jsPDF owning the write cursor: typography, text
// wrapping and page breaks live here so section builders only describe
// content, never bookkeeping.
export class PdfWriter {
  readonly doc: jsPDF;
  y: number;

  constructor(JsPdf: JsPdfConstructor) {
    this.doc = new JsPdf({ unit: 'mm', format: PDF_PAGE.format });
    this.y = PDF_PAGE.margin;
  }

  get margin(): number {
    return PDF_PAGE.margin;
  }
  get pageWidth(): number {
    return this.doc.internal.pageSize.getWidth();
  }
  get pageHeight(): number {
    return this.doc.internal.pageSize.getHeight();
  }
  get contentWidth(): number {
    return this.pageWidth - 2 * this.margin;
  }
  get centerX(): number {
    return this.pageWidth / 2;
  }

  newPage(): void {
    this.doc.addPage();
    this.y = this.margin;
  }

  // Starts a new page when the next block would overflow the bottom margin
  ensureRoom(requiredSpace: number): void {
    if (this.y + requiredSpace > this.pageHeight - this.margin) {
      this.newPage();
    }
  }

  space(mm: number): void {
    this.y += mm;
  }

  // Writes wrapped text at the cursor, breaking pages as needed
  paragraph(text: string, style: PdfTextStyle = {}): void {
    const {
      charSpace = 0,
      lineHeight = PDF_TYPE.lineHeight.body,
      align = 'left',
      maxWidth = this.contentWidth,
    } = style;
    this.applyStyle(style);
    const x = style.x ?? (align === 'center' ? this.centerX : this.margin);
    const lines: string[] = this.doc.splitTextToSize(PdfWriter.stripHtml(text), maxWidth);
    for (const line of lines) {
      this.ensureRoom(lineHeight);
      this.drawLine(line, x, this.y, align, charSpace);
      this.y += lineHeight;
    }
  }

  // Uppercase, letter-spaced, soft-toned section heading
  heading(text: string, style: PdfTextStyle = {}): void {
    this.paragraph(text.toUpperCase(), {
      size: PDF_TYPE.size.heading,
      color: PDF_COLORS.soft,
      charSpace: PDF_TYPE.wideCharSpace,
      lineHeight: PDF_TYPE.lineHeight.heading,
      ...style,
    });
  }

  // Single line at a fixed position; does not move the cursor
  textAt(text: string, x: number, y: number, style: PdfTextStyle = {}): void {
    this.applyStyle(style);
    this.drawLine(PdfWriter.stripHtml(text), x, y, style.align ?? 'left', style.charSpace ?? 0);
  }

  // Visual width including letter spacing (jsPDF ignores it for built-in fonts)
  textWidth(text: string, style: PdfTextStyle = {}): number {
    this.applyStyle(style);
    const clean = PdfWriter.stripHtml(text);
    return this.doc.getTextWidth(clean) + (style.charSpace ?? 0) * Math.max(clean.length - 1, 0);
  }

  // Small faint page numbers, optionally skipping the cover
  addPageNumbers(skipFirst = true): void {
    const total = this.doc.getNumberOfPages();
    for (let page = skipFirst ? 2 : 1; page <= total; page++) {
      this.doc.setPage(page);
      this.applyStyle({ size: PDF_TYPE.size.small, color: PDF_COLORS.faint });
      this.doc.text(String(page - (skipFirst ? 1 : 0)), this.centerX, this.pageHeight - 9, {
        align: 'center',
      });
    }
    this.doc.setPage(total);
  }

  private applyStyle({
    size = PDF_TYPE.size.body,
    style = 'normal',
    color = PDF_COLORS.ink,
  }: PdfTextStyle): void {
    this.doc.setFont(PDF_TYPE.font, style);
    this.doc.setFontSize(size);
    this.doc.setTextColor(color);
  }

  // jsPDF's align:center does not account for charSpace on built-in fonts
  // (the text drifts right), so letter-spaced lines are centered manually.
  private drawLine(
    text: string,
    x: number,
    y: number,
    align: 'left' | 'center',
    charSpace: number
  ): void {
    if (align === 'center' && charSpace > 0) {
      const width = this.doc.getTextWidth(text) + charSpace * Math.max(text.length - 1, 0);
      this.doc.text(text, x - width / 2, y, { charSpace });
    } else {
      this.doc.text(text, x, y, { align, charSpace });
    }
  }

  // No HTML may ever reach the page: translations can embed markup
  private static stripHtml(text: string): string {
    return text.replace(/<[^>]*(>|$)/g, '').trim();
  }
}
