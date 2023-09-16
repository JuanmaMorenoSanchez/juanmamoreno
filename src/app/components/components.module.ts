import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button/login-button.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ArtPiecesListComponent } from './art-pieces-list/art-pieces-list.component';
import { ArtPieceComponent } from './art-piece/art-piece.component';
import { Web3ModalModule, Web3ModalService } from '@mindsorg/web3modal-angular';
import { CvComponent } from './cv/cv.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    LoginButtonComponent,
    TopMenuComponent,
    ArtPiecesListComponent,
    ArtPieceComponent,
    CvComponent,
    ContactComponent,
    AboutComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatGridListModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule,
    Web3ModalModule,
    RouterModule
  ],
  providers: [
    {
      provide: Web3ModalService,
      useFactory: () => new Web3ModalService({
        disableInjectedProvider: false,
        cacheProvider: true,
        providerOptions: {},
        network: "polygon"
      }),
    },
  ],
  exports: [
    LoginButtonComponent,
    TopMenuComponent,
    ArtPiecesListComponent
  ]
})
export class ComponentsModule { }
