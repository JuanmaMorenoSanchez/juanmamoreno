import { Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';

// `title` + `data.description` are translation keys (see the `seo.*` block in
// the translation files), resolved per-language by the SeoTitleStrategy so
// every page gets a distinct, localized <title>, meta description and canonical
// URL. The :id routes carry a generic fallback; their components refine the
// title once the artwork or sketch has loaded.
export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () =>
      import('@features/artworks/art-pieces-list.component').then((m) => m.ArtPiecesListComponent),
    title: 'seo.paintings.title',
    data: { breadcrumb: 'Paintings', description: 'seo.paintings.description' },
  },
  {
    path: 'artworks',
    loadComponent: () =>
      import('@features/artworks/art-pieces-list.component').then((m) => m.ArtPiecesListComponent),
    title: 'seo.paintings.title',
    data: { breadcrumb: 'Paintings', description: 'seo.paintings.description' },
  },
  {
    path: 'artwork/:id',
    loadComponent: () =>
      import('@features/artwork/art-piece.component').then((m) => m.ArtPieceComponent),
    title: 'seo.artwork.title',
    data: { description: 'seo.paintings.description' },
  },
  {
    path: 'generative/:id',
    loadComponent: () =>
      import('@features/generative/generative-piece.component').then(
        (m) => m.GenerativePieceComponent
      ),
    title: 'seo.generative.title',
    data: { description: 'seo.generative.description', hideBreadcrumb: true },
  },
  {
    path: 'cv',
    loadComponent: () => import('@features/cv/cv.component').then((m) => m.CvComponent),
    title: 'seo.cv.title',
    data: { description: 'seo.cv.description' },
  },
  {
    path: 'about',
    loadComponent: () =>
      import('@features/statement/about.component').then((m) => m.AboutComponent),
    title: 'seo.about.title',
    data: { description: 'seo.about.description' },
  },
  {
    path: 'contact',
    loadComponent: () =>
      import('@features/contact/contact.component').then((m) => m.ContactComponent),
    title: 'seo.contact.title',
    data: { description: 'seo.contact.description' },
  },
  {
    path: 'terms',
    loadComponent: () => import('@features/terms/terms.component').then((m) => m.TermsComponent),
    title: 'seo.terms.title',
    data: { description: 'seo.terms.description' },
  },
  {
    path: 'privacy',
    loadComponent: () =>
      import('@features/privacy/privacy.component').then((m) => m.PrivacyComponent),
    title: 'seo.privacy.title',
    data: { description: 'seo.privacy.description' },
  },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'seo.notFound.title',
  },
];
