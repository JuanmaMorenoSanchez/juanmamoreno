import { Routes } from '@angular/router';
import { NotFoundComponent } from '@shared/components/not-found/not-found.component';
import { adminOnly } from '@shared/guards/admin.guard';
import { englishRoute, readerLanguage, spanishRoute } from '@shared/guards/language.guard';

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
    /**
     * How the product is run, for somebody deciding whether to hire the person
     * running it. Written out in both languages like everything else, and left
     * out of the menu on purpose: a gallery arriving at the catalogue has no
     * use for it, and this is a page to be sent rather than come across.
     */
    path: 'about-certificates-project',
    loadComponent: () =>
      import('@features/project/project.component').then((m) => m.ProjectComponent),
    title: 'seo.project.title',
    // No breadcrumb: this is not a step in the catalogue's trail, and the label
    // would be looked up as a translation key, and `project` is the block of
    // copy for this very page: an object, which renders as [object Object].
    // The build caught it, which is the job the render check exists for.
    data: { description: 'seo.project.description', hideBreadcrumb: true },
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
  // The mint page has no Spanish twin — it is one person's workshop, written
  // in one language — but the language switcher builds /es/<wherever you are>
  // from the address alone, and /es/mint matched nothing and answered 404.
  // Sending it back to the page it is the translation of keeps the switcher
  // honest, and catches a bookmarked /es address too. Listed before the `es`
  // parent, which would otherwise claim the prefix and fail on the child.
  { path: 'es/mint', redirectTo: '/mint' },
  // It was /studio until the atelier arrived and the two names read as the same
  // room. The old address still answers, because it is in his bookmarks and a
  // renamed page should not become a 404 for the one person who uses it.
  { path: 'studio', redirectTo: '/mint' },
  { path: 'es/studio', redirectTo: '/mint' },
  { path: 'es/door', redirectTo: '/door' },
  { path: 'es/publish', redirectTo: '/publish' },
  // Outside the language trees: these are not pages anyone reads, so they need
  // no Spanish twin, no hreflang pair and no place in the sitemap.
  {
    path: 'door',
    canActivate: [readerLanguage],
    loadComponent: () => import('@features/door/door.component').then((m) => m.DoorComponent),
    data: { title: 'Door', hideBreadcrumb: true, noindex: true },
  },
  {
    path: 'mint',
    canActivate: [readerLanguage, adminOnly],
    loadComponent: () => import('@features/studio/studio.component').then((m) => m.StudioComponent),
    data: { title: 'Mint', hideBreadcrumb: true, noindex: true },
  },
  // Reels made overnight and waiting to be looked at. Alongside the mint page and
  // for the same reasons: his, unreadable to anyone else, and not a page.
  {
    path: 'publish',
    canActivate: [readerLanguage, adminOnly],
    loadComponent: () =>
      import('@features/publish/publish.component').then((m) => m.PublishComponent),
    data: { title: 'Publish', hideBreadcrumb: true, noindex: true },
  },
  // The certificates that are ready and not yet written. His, like the studio
  // and the reels: not a page, and never offered to a reader.
  {
    path: 'pendingmint',
    canActivate: [readerLanguage, adminOnly],
    loadComponent: () =>
      import('@features/pending-mint/pending-mint.component').then((m) => m.PendingMintComponent),
    data: { title: 'Pending mints', hideBreadcrumb: true, noindex: true },
  },
  { path: 'es/pendingmint', redirectTo: '/pendingmint' },
  // The catalogue as the artist sees it: one page where there were three —
  // what had lately gone to Instagram, the certificates that could be
  // corrected, and the paintings a dossier was built from. All three were the
  // same list wearing different clothes.
  {
    path: 'catalogue',
    canActivate: [readerLanguage, adminOnly],
    loadComponent: () =>
      import('@features/catalogue-admin/catalogue-admin.component').then(
        (m) => m.CatalogueAdminComponent
      ),
    data: { title: 'Catalogue', hideBreadcrumb: true, noindex: true },
  },
  { path: 'es/catalogue', redirectTo: '/catalogue' },
  // The workshop where a painting is cut into parallax layers. His, like the
  // studio and the reels, and with one reason the others have not got: every
  // button on it spends money, so it is never reachable without the guard.
  {
    path: 'atelier',
    canActivate: [readerLanguage, adminOnly],
    loadComponent: () =>
      import('@features/atelier/atelier.component').then((m) => m.AtelierComponent),
    data: { title: 'Atelier', hideBreadcrumb: true, noindex: true },
  },
  { path: 'es/atelier', redirectTo: '/atelier' },
  { path: 'es', canActivate: [spanishRoute], children: contentRoutes },
  { path: '', canActivate: [englishRoute], children: contentRoutes },
  {
    path: '**',
    component: NotFoundComponent,
    title: 'seo.notFound.title',
  },
];
