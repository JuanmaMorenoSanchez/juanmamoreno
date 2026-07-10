// Visual identity of every generated PDF: square catalog format, light
// typography, ink/soft/faint text tones. Sections and the writer read from
// here so a style change happens in one place.

export const PDF_PAGE = {
  // Square, contemporary-catalog format (mm)
  format: [210, 210] as [number, number],
  margin: 24,
};

export const PDF_COLORS = {
  ink: '#1f1f1f',
  soft: '#6e6e6e',
  faint: '#a3a3a3',
  white: '#ffffff',
  accent: '#cf2525',
};

export const PDF_TYPE = {
  font: 'helvetica',
  size: {
    coverTitle: 27,
    coverArtist: 10,
    heading: 11,
    title: 11,
    body: 9.5,
    caption: 8.5,
    small: 7.5,
  },
  lineHeight: {
    body: 5.4,
    caption: 4.4,
    heading: 7,
  },
  // Wide letter spacing used by uppercase headings (catalog look)
  wideCharSpace: 1.6,
};
