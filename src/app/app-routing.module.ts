import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtPieceComponent } from '@components/art-piece/art-piece.component';
import { ArtPiecesListComponent } from '@components/art-pieces-list/art-pieces-list.component';
import { environment } from '@environments/environment';

const routes: Routes = [
  { path: '', redirectTo: `artwork/${environment.homeTokenId}`, pathMatch: "full"},
  { path: 'artworks', component: ArtPiecesListComponent },
  { path: 'artwork/:id', component: ArtPieceComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
