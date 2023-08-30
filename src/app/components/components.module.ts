import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginButtonComponent } from './login-button/login-button.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ArtPiecesListComponent } from './art-pieces-list/art-pieces-list.component';
import { ArtPieceComponent } from './art-piece/art-piece.component';


@NgModule({
  declarations: [
    LoginButtonComponent,
    TopMenuComponent,
    ArtPiecesListComponent,
    ArtPieceComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatListModule,
    MatMenuModule,
    MatToolbarModule,
    MatCardModule
  ],
  exports: [
    LoginButtonComponent,
    TopMenuComponent,
    ArtPiecesListComponent
  ]
})
export class ComponentsModule { }
