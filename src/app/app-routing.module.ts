import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from '@components/about/about.component';
import { ArtPieceComponent } from '@components/art-piece/art-piece.component';
import { ArtPiecesListComponent } from '@components/art-pieces-list/art-pieces-list.component';
import { ContactComponent } from '@components/contact/contact.component';
import { CvComponent } from '@components/cv/cv.component';
import { GenerativePieceComponent } from '@components/generative-piece/generative-piece.component';
import { HomeComponent } from '@components/home/home.component';

const routes: Routes = [
  { 
    path: '', 
    pathMatch: "full", 
    component: HomeComponent
  },
  { 
    path: 'artworks', 
    component: ArtPiecesListComponent,
    data: {
      breadcrumb: 'Paintings',
    },
    children: [
      { 
        path: ':year', 
        component: ArtPiecesListComponent,
        data: {
          breadcrumb: '',
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
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
