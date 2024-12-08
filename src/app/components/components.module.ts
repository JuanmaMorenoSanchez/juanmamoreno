import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ScrollingModule, CdkScrollableModule} from '@angular/cdk/scrolling';
import { LoginButtonComponent } from './login-button/login-button.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { ArtPiecesListComponent } from './art-pieces-list/art-pieces-list.component';
import { ArtPieceComponent } from './art-piece/art-piece.component';
import { CvComponent } from './cv/cv.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { BreadcrumbComponent } from './breadcrumb/breadcrumb.component';
import { CanvasContainerComponent } from './canvas-container/canvas-container.component';
import { GenerativePieceComponent } from './generative-piece/generative-piece.component';
import { ImageViewerComponent } from './image-viewer/image-viewer.component';
import { DownloadButtonComponent } from './download-button/download-button.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MaterialModule } from '../material.module';
import { PdfButtonComponent } from './pdf-button/pdf-button.component';
import { DossierOptionsModalComponent } from './dossier-options-modal/dossier-options-modal.component';

@NgModule({ 
    declarations: [
        LoginButtonComponent,
        TopMenuComponent,
        ArtPiecesListComponent,
        ArtPieceComponent,
        CvComponent,
        ContactComponent,
        DossierOptionsModalComponent,
        AboutComponent,
        HomeComponent,
        NotFoundComponent,
        BreadcrumbComponent,
        CanvasContainerComponent,
        GenerativePieceComponent,
        DownloadButtonComponent,
        PdfButtonComponent,
        ImageViewerComponent
    ],
    exports: [
        TopMenuComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        MaterialModule,
        ReactiveFormsModule,
        RouterModule,
        ScrollingModule,
        CdkScrollableModule
    ], 
    providers: [
        provideHttpClient(withInterceptorsFromDi())
    ]
 })
export class ComponentsModule { }
