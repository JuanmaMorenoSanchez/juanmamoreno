import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtPieceComponent } from '@components/art-piece/art-piece.component';
import { ArtPiecesListComponent } from '@components/art-pieces-list/art-pieces-list.component';

const routes: Routes = [
  { path: 'artworks', component: ArtPiecesListComponent },
  { path: 'artwork/:id', component: ArtPieceComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
