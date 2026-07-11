import { Component, computed, inject, input, signal } from '@angular/core';
import { MatIconButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinner } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTooltip } from '@angular/material/tooltip';
import { Nft } from '@domain/artwork/artwork.entity';
import { DOWNLOADTYPES } from '@domain/cv/cv.constants';
import { TranslateService } from '@ngx-translate/core';
import { DossierOptionsModalComponent } from '@shared/components/dossier-options-modal/dossier-options-modal.component';
import { SNACKBAR_DURATION_MS } from '@shared/constants/common.constants';
import { PdfService } from '@shared/services/pdf/pdf.service';
import type { jsPDF } from 'jspdf';

@Component({
  selector: 'app-pdf-button',
  templateUrl: './pdf-button.component.html',
  styleUrl: './pdf-button.component.scss',
  imports: [MatIconButton, MatTooltip, MatIcon, MatProgressSpinner],
})
export class PdfButtonComponent {
  private translateService = inject(TranslateService);
  private pdfService = inject(PdfService);
  private dialog = inject(MatDialog);
  private snackBar = inject(MatSnackBar);

  nfts = input<Nft[]>([]);
  downloadFileType = input<DOWNLOADTYPES>(DOWNLOADTYPES.IMAGE);
  public isCreating = signal(false);
  public isSingleArtPage = computed(() => this.nfts().length <= 1);

  public getTooltip(): string {
    switch (this.downloadFileType()) {
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
    this.isCreating.set(true);
    switch (this.downloadFileType()) {
      case DOWNLOADTYPES.CV:
        this.saveDocument(this.pdfService.createCV(), 'cv-juanmamoreno.pdf');
        break;
      case DOWNLOADTYPES.STATEMENT:
        this.saveDocument(
          this.pdfService.createStatement(),
          'statement-juanmamoreno.pdf',
        );
        break;
      case DOWNLOADTYPES.IMAGE:
      default:
        if (this.isSingleArtPage()) {
          const nft = this.nfts()[0];
          this.saveDocument(
            this.pdfService.createTechnicalSheet(nft),
            `${nft.name || 'juanmamoreno'}.pdf`,
          );
        } else {
          this.openDossierDialog();
        }
        break;
    }
  }

  private openDossierDialog(): void {
    const dialogRef = this.dialog.open(DossierOptionsModalComponent, {
      data: {
        includeContact: true,
        includeCv: true,
        includeStatement: true,
        customTitle: '',
        customText: '',
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const {
          includeContact,
          includeCv,
          includeStatement,
          customTitle,
          customText,
        } = result;
        this.saveDocument(
          this.pdfService.createDossier(
            this.nfts(),
            includeContact,
            includeCv,
            includeStatement,
            customTitle,
            customText,
          ),
          'dossier-juanmamoreno.pdf',
        );
      } else {
        this.isCreating.set(false);
      }
    });
  }

  private saveDocument(docPromise: Promise<jsPDF>, fileName: string): void {
    docPromise
      .then((doc) => {
        doc.save(fileName);
        this.showToast('download.success');
      })
      .catch(() => this.showToast('download.error'))
      .finally(() => this.isCreating.set(false));
  }

  private showToast(messageKey: string): void {
    this.snackBar.open(this.translateService.instant(messageKey), 'Ok!', {
      duration: SNACKBAR_DURATION_MS,
      verticalPosition: 'top',
    });
  }
}
