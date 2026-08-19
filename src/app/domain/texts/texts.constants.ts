import { PublishedText } from './texts.entity';

/**
 * Writing about the work, published elsewhere.
 *
 * Only the reference is kept here — publication, author, date, a line saying
 * what the piece is — and the reader is sent to the original. None of these
 * texts are reproduced: they belong to the outlets that ran them, and a copy
 * on this domain would compete with the page it was copied from rather than
 * add anything. The one text written for the work rather than about it,
 * Salanova's, is already published by Plataforma de Arte Contemporáneo, so it
 * is linked on the same terms.
 *
 * One entry per piece of writing. El Valle Inquietante was also covered by the
 * Fundación Antonio Gala and listed in the Junta de Andalucía's cultural
 * agenda, but a listing and an announcement are not writing about the work:
 * three links to one exhibition read as padding, and Salanova's text is the
 * one worth opening.
 *
 * Every url here was checked. A dead link on a page whose whole purpose is
 * linking is worse than the page not existing.
 */
export const PUBLISHED_TEXTS: PublishedText[] = [
  {
    title: 'El Valle Inquietante, de Juanma Moreno Sánchez, en la Galería Zunino',
    author: 'Marisol Salanova',
    publication: 'Plataforma de Arte Contemporáneo',
    year: 2024,
    kind: 'textsPage.kind.essay',
    note: 'textsPage.salanova.note',
    url: 'https://www.plataformadeartecontemporaneo.com/pac/el-valle-inquietante-de-juanma-moreno-sanchez-en-la-galeria-zunino/',
  },
  {
    title: 'El trienio aberrante del arte que pocos vieron venir',
    author: 'Javier Villuendas',
    publication: 'ABC Cultural',
    year: 2023,
    kind: 'textsPage.kind.press',
    note: 'textsPage.abc.note',
    url: 'https://www.abc.es/cultura/cultural/javier-villuendas-trienio-aberrante-arte-pocos-vieron-venir-20230915102255-nt.html',
  },
  {
    title:
      'De lo místico y lo absurdo: exposición de Juan Manuel Moreno Sánchez en Galería Zunino',
    author: 'Guillermo Amaya Brenes',
    publication: 'Achtung! Magazine',
    year: 2020,
    kind: 'textsPage.kind.review',
    note: 'textsPage.achtung.note',
    url: 'https://achtungmag.com/de-lo-mistico-y-lo-absurdo-exposicion-virtual-de-juan-manuel-moreno-sanchez-en-galeria-zunino/',
  },
  {
    title: 'Lo peor y lo mejor de la selfie generation',
    publication: 'Plataforma de Arte Contemporáneo',
    year: 2018,
    kind: 'textsPage.kind.interview',
    note: 'textsPage.selfie.note',
    url: 'https://www.plataformadeartecontemporaneo.com/pac/juanma-moreno-lo-peor-y-lo-mejor-de-la-selfie-generation/',
  },
];
