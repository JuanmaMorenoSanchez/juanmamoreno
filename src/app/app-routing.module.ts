import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@components/about/about.component';
import { ArtPieceComponent } from '@components/art-piece/art-piece.component';
import { ArtPiecesListComponent } from '@components/art-pieces-list/art-pieces-list.component';
// import { ContactComponent } from '@components/contact/contact.component';
import { CvComponent } from '@components/cv/cv.component';
import { LISTOFTOKENIDS } from '@constants/nft.constants';

const routes: Routes = [
  { path: '', redirectTo: `artwork/${LISTOFTOKENIDS[0]}`, pathMatch: "full"},
  { path: 'artworks/:year', component: ArtPiecesListComponent},
  { path: 'artworks', component: ArtPiecesListComponent},
  { path: 'artwork/:id', component: ArtPieceComponent },
  { path: 'cv', component: CvComponent },
  { path: 'about', component: AboutComponent },
  // { path: 'contact', component: ContactComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
