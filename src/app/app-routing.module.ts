import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ArtPieceComponent } from '@features/artwork/art-piece.component';
import { ArtPiecesListComponent } from '@features/artworks/art-pieces-list.component';
import { ContactComponent } from '@features/contact/contact.component';
import { CvComponent } from '@features/cv/cv.component';
import { GenerativePieceComponent } from '@features/generative/generative-piece.component';
import { AboutComponent } from '@features/statement/about.component';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: "full", 
    component: ArtPiecesListComponent,
    data: {
      breadcrumb: 'Paintings'
    }
  },
  { 
    path: 'artworks', 
    component: ArtPiecesListComponent,
    data: {
      breadcrumb: 'Paintings'
    },
    children: [
      { 
        path: '', 
        component: ArtPiecesListComponent,
        data: {
          breadcrumb: ''
        },
      },
    ] 
  },
  { 
    path: 'artwork/:id',
    component: ArtPieceComponent
  },
  { 
    path: 'generative/:id',
    component: GenerativePieceComponent
  },
  { 
    path: 'cv', 
    component: CvComponent
  },
  { 
    path: 'about', 
    component: AboutComponent
  },
  { 
    path: 'contact', 
    component: ContactComponent
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
