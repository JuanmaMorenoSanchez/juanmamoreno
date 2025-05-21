import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@features/artworks/art-pieces-list.component').then(m => m.ArtPiecesListComponent),
    data: { breadcrumb: 'Paintings' }
  },
  {
    path: 'artworks',
    loadComponent: () =>
      import('@features/artworks/art-pieces-list.component').then(m => m.ArtPiecesListComponent),
    data: { breadcrumb: 'Paintings' }
  },
  {
    path: 'artwork/:id',
    loadComponent: () =>
      import('@features/artwork/art-piece.component').then(m => m.ArtPieceComponent)
  },
  {
    path: 'generative/:id',
    loadComponent: () =>
      import('@features/generative/generative-piece.component').then(m => m.GenerativePieceComponent)
  },
  {
    path: 'cv',
    loadComponent: () =>
      import('@features/cv/cv.component').then(m => m.CvComponent)
  },
  {
    path: 'about',
    loadComponent: () =>
      import('@features/statement/about.component').then(m => m.AboutComponent)
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('@features/contact/contact.component').then(m => m.ContactComponent)
  },
  {
    path: 'terms',
    loadComponent: () =>
      import('@features/terms/terms.component').then(m => m.TermsComponent)
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('@features/privacy/privacy.component').then(m => m.PrivacyComponent)
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules // Its still lazyloading, but loads everything in the background. We do it for cypress and performance. No the same of eagerloading.
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {}
