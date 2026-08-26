import { Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { adminOnly } from '@shared/guards/admin.guard';
import { englishRoute, spanishRoute } from '@shared/guards/language.guard';

// `title` + `data.description` are translation keys (see the `seo.*` block in
// the translation files), resolved per-language by the SeoTitleStrategy so
// every page gets a distinct, localized <title>, meta description and canonical
// URL. The :id routes carry a generic fallback; their components refine the
// title once the artwork or sketch has loaded.
//
// Every one of these is served twice: unprefixed and under /es. See the
// language guards for why the prefix exists.
const contentRoutes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadComponent: () => import('@features/home/home.component').then((m) => m.HomeComponent),
    // No `title` → the SeoTitleStrategy falls back to "Juanma Moreno Sánchez —
    // artist", the right brand title for the landing. No breadcrumb: it's the
    // root entry, not a step in a trail.
    data: { description: 'seo.default.description', hideBreadcrumb: true },
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
    data: { description: 'seo.paintings.description', hideBreadcrumb: true },
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
    path: 'texts',
    loadComponent: () => import('@features/texts/texts.component').then((m) => m.TextsComponent),
    title: 'seo.texts.title',
    // No breadcrumb: the page is a single flat list with nowhere to descend to,
    // so a trail from Home to here says nothing the menu has not already said.
    data: { description: 'seo.texts.description', hideBreadcrumb: true },
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
];

export const routes: Routes = [
  // The studio has no Spanish twin — it is one person's workshop, written in
  // one language — but the language switcher builds /es/<wherever you are>
  // from the address alone, and /es/studio matched nothing and answered 404.
  // Sending it back to the page it is the translation of keeps the switcher
  // honest, and catches a bookmarked /es address too. Listed before the `es`
  // parent, which would otherwise claim the prefix and fail on the child.
  { path: 'es/studio', redirectTo: '/studio' },
  { path: 'es/door', redirectTo: '/door' },
  // Outside the language trees: these are not pages anyone reads, so they need
  // no Spanish twin, no hreflang pair and no place in the sitemap.
  {
    path: 'door',
    loadComponent: () => import('@features/door/door.component').then((m) => m.DoorComponent),
    data: { title: 'Door', hideBreadcrumb: true, noindex: true },
  },
  {
    path: 'studio',
    canActivate: [adminOnly],
    loadComponent: () => import('@features/studio/studio.component').then((m) => m.StudioComponent),
    data: { title: 'Studio', hideBreadcrumb: true, noindex: true },
  },
  { path: 'es', canActivate: [spanishRoute], children: contentRoutes },
  { path: '', canActivate: [englishRoute], children: contentRoutes },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'seo.notFound.title',
  },
];
