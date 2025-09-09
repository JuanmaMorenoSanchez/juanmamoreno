import { Timeline } from './timeline.entity';

export enum COUNTRIES {
  ONLINE = 'cv.countries.online',
  SPAIN = 'cv.countries.spain',
  USA = 'cv.countries.usa',
  GERMANY = 'cv.countries.germany',
  MEXICO = 'cv.countries.mexico',
  ITALY = 'cv.countries.italy',
}

export enum DOWNLOADTYPES { // move from here
  CV = 'cv',
  STATEMENT = 'statement',
  IMAGE = 'image',
}

export const CV_OBJECT: Array<Timeline> = [
  {
    title: 'cv.shows.title',
    items: [
      {
        title: 'El valle inquietante',
        venue: 'cv.zunino',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2024,
      },
      {
        title: 'El sueño de los robots',
        venue: 'cv.zunino',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2021,
      },
      {
        title: '33. El desengaño',
        venue: 'La 13 dada trouch Gallery',
        city: 'Huelva',
        country: COUNTRIES.SPAIN,
        year: 2019,
      },
      {
        title: '#blessed',
        venue: 'Un gato en bicicleta',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2017,
      },
      {
        title: 'I was there',
        venue: 'La silla eléctrica',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2017,
      },
      {
        title: 'Never Gone Forever',
        venue: 'Gallo Rojo',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2016,
      },
      {
        title: 'Pintura Aumentada',
        venue: 'Red House',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2014,
      },
      {
        title: 'Historias aparentemente inconexas',
        venue: 'Aula Magna de Capuchinos',
        city: 'Alcalá la Real',
        country: COUNTRIES.SPAIN,
        year: 2013,
      },
      {
        title: 'Juanma Moreno',
        venue: 'No-Lugar',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2012,
      },
      {
        title: 'Transeúntes',
        venue: 'Harz Mensa',
        city: 'Halle Saale',
        country: COUNTRIES.GERMANY,
        year: 2008,
      },
    ],
  },
  {
    title: 'cv.collectiveShows.title',
    items: [
      {
        title: 'Outsiders. Vol. 1',
        venue: 'cv.zunino',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2024,
      },
      {
        title: 'Anna Jonsson & Juanma Moreno',
        venue: 'El Estudio de Ignacio del Río',
        city: 'Villanueva del Rosario',
        country: COUNTRIES.SPAIN,
        year: 2024,
      },
      {
        title: 'Pintores pensando la pintura',
        venue:
          "<a href='https://www.espacio75.com/' target='_blank'>Espacio 75 Art Gallery</a>",
        city: 'Madrid',
        country: COUNTRIES.SPAIN,
        year: 2023,
      },
      {
        title: 'Nocturnos',
        venue: 'Sala Pescadería Vieja / CAC Vélez-Málaga',
        city: 'Jerez de la Frontera / Vélez-Málaga',
        country: COUNTRIES.SPAIN,
        year: 2023,
      },
      {
        title: 'Los únicos que saben de arte son los artistas',
        venue: 'cv.zunino',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2023,
      },
      {
        title:
          "<a href='https://discoveryartfair.com/fairs/koeln/' target='_blank'> Discovery Art Fair Cologne</a>",
        city: 'Cologne',
        country: COUNTRIES.GERMANY,
        year: 2022,
      },
      {
        title:
          "<a href='https://www.luccaartfair.com/' target='_blank'> Lucca Art Fair</a>",
        country: COUNTRIES.ONLINE,
        year: 2021,
      },
      {
        title: 'Figuración Fantástica Sevillana',
        venue:
          "<a href='https://impulsogaleria.com/en/home/' target='_blank'>Galería Impulso</a>",
        city: 'Querétaro',
        country: COUNTRIES.MEXICO,
        year: 2021,
      },
      {
        title: 'Interpaisajes',
        venue:
          "<a href='https://www.eldevenirartgallery.com/'>Eldevenir</a> & <a href='https://www.galeriazunino.com'>Zunino Gallery</a>",
        country: COUNTRIES.ONLINE,
        year: 2020,
      },
      {
        title: '72 horas',
        venue: 'cv.zunino',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2019,
      },
      {
        title: 'Homenaje a Dolores Montijano',
        venue: 'Aula Magna de Capuchinos',
        city: 'Alcalá la Real',
        country: COUNTRIES.SPAIN,
        year: 2019,
      },
      {
        title: 'Redes de fe',
        venue:
          "<a href='https://renace.art/' target='_blank'>Galería Renace Art</a>",
        city: 'Jaen',
        country: COUNTRIES.SPAIN,
        year: 2019,
      },
      {
        title: 'Todo encaja',
        venue: 'cv.zunino',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2018,
      },
      {
        title: 'Lodo',
        venue: 'Un gato en bicicleta',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2017,
      },
      {
        title: 'Escozor',
        venue: 'Un gato en bicicleta',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2015,
      },
      {
        title: 'A paloma muerta',
        venue:
          "<a href='http://estudio22photo.es' target='blank'>Estudio22 </a>",
        city: 'Logroño',
        country: COUNTRIES.SPAIN,
        year: 2015,
      },
      {
        title: 'Nemoart festival, digital art',
        venue: 'Casa Museo Niceto Alcalá Zamora',
        city: 'Priego de Córdoba',
        country: COUNTRIES.SPAIN,
        year: 2015,
      },
      {
        title: 'Promoción equis',
        venue: 'Cienfuegos',
        city: 'Málaga',
        country: COUNTRIES.SPAIN,
        year: 2015,
      },
      {
        title: 'En azúcar de sandía',
        venue: 'Suricatta Gallery',
        city: 'Jerez de la Frontera',
        country: COUNTRIES.SPAIN,
        year: 2015,
      },
      {
        title: 'El tamaño no importa',
        venue: 'Un gato en bicicleta',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2014,
      },
      {
        title: 'MULTI/TUTTI/FEST',
        venue: 'Cienfuegos',
        city: 'Málaga',
        country: COUNTRIES.SPAIN,
        year: 2014,
      },
      {
        title: 'Plato del día',
        venue: 'Red House',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2013,
      },
      {
        title: 'Lo mejorcito de cada casa',
        venue: 'No-Lugar',
        city: 'Sevilla',
        country: COUNTRIES.SPAIN,
        year: 2013,
      },
      {
        title: 'Weisser TV',
        venue:
          "<a href='https://www.129gallery.com/' target='blank'>129 Gallery</a>",
        city: 'Berlin',
        country: COUNTRIES.GERMANY,
        year: 2011,
      },
      {
        title: 'Mehr Licht, tributo a Chema Alvargonzalez',
        venue:
          "<a href='https://glogauair.net/' target='blank'>GlogauAIR Project Space</a>",
        city: 'Berlin',
        country: COUNTRIES.GERMANY,
        year: 2011,
      },
      {
        title: "Modern Classic, influence of the past in today's art",
        venue: 'Your Mum',
        city: 'Berlin',
        country: COUNTRIES.GERMANY,
        year: 2011,
      },
      {
        title: 'The Mac Gyver Problem',
        venue: 'Galerie im Regierungsviertel/The Forgotten Bar',
        city: 'Berlin',
        country: COUNTRIES.GERMANY,
        year: 2010,
      },
      {
        title: 'XXL-Art, nuevas tendencias de la figuración en gran formato',
        venue: 'Damián Bayón Art Center',
        city: 'Santa Fe',
        country: COUNTRIES.SPAIN,
        year: 2009,
      },
      {
        title: 'La más elegante del invernadero III',
        venue: 'Galería Jesús Puerto',
        city: 'Granada',
        country: COUNTRIES.SPAIN,
        year: 2009,
      },
    ],
  },
  {
    title: 'cv.awards.title',
    items: [
      {
        title:
          "<a href='http://www.pkf.org/' target='blank'>The Pollock-Krasner Foundation award</a>",
        city: 'New York',
        country: COUNTRIES.USA,
        year: 2014,
      },
      {
        title: 'cv.awards.fag',
        city: 'Córdoba',
        country: COUNTRIES.SPAIN,
        year: 2012,
      },
      {
        title:
          "<a href='http://www.glogauair.net/' target='blank'>GlogauAIR Residence Program</a>",
        city: 'Berlín',
        country: COUNTRIES.GERMANY,
        year: 2010,
      },
      {
        title: 'cv.awards.lefranc',
        city: 'Granada',
        country: COUNTRIES.SPAIN,
        year: 2006,
      },
    ],
  },
  {
    title: 'cv.conferences.title',
    items: [
      {
        title: 'cv.conferences.invierno-ia',
        venue: 'cv.conferences.unia',
        city: 'Baeza',
        country: COUNTRIES.SPAIN,
        year: 2025,
      },
    ],
  },
  {
    title: 'cv.education.title',
    items: [
      {
        title: 'cv.education.degree',
        venue: 'cv.education.ugr',
        city: 'Granada',
        country: COUNTRIES.SPAIN,
        year: 2009,
      },
      {
        title: 'cv.education.erasmus',
        venue: 'cv.education.burg',
        city: 'Halle Saale',
        country: COUNTRIES.GERMANY,
        year: 2008,
      },
    ],
  },
];
