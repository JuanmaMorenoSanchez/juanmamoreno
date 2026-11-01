export enum DOWNLOADTYPES {
  // move from here
  CV = 'cv',
  STATEMENT = 'statement',
  IMAGE = 'image',
  // A dossier is asked for, not inferred from how many paintings were chosen:
  // one painting is a dossier of one if that is what he picked, and the single
  // painting on its own page is still a technical sheet.
  DOSSIER = 'dossier',
}
