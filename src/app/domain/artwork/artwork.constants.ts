export enum VALIDTRAITS {
  MEDIUM = 'Medium',
  HEIGHT = 'Height',
  WIDTH = 'Width',
  UNIT = 'Unit',
  YEAR = 'Year',
  IMAGETYPE = 'Image Type',
  ARTIST = 'Artist',
  PROJECT = 'Project',
  DESC_AUTHOR = 'Description Author',
  DESC_LANG = 'Description language',
  VERSION = 'Version',
}

export enum VIEW_TYPES {
  FRONTAL = 'Frontal view',
  PROGRESS = 'Work in progress',
  DETAIL = 'Detail',
}

export enum SortMethod {
  YEAR = 'year',
  SIZE = 'size',
  MEDIUM = 'medium',
}

// HIDDENCERTIFICATES is now in backend

/**
 * Where the certificates live: an ERC-721 on Ethereum mainnet holding one token
 * per catalogue record, each carrying the work's own metadata and a thumbnail
 * written into the chain rather than linked from it.
 */
export const CERTIFICATES_CONTRACT = '0x6E8b1D55B3fb934149b1125964a9c01a87995548';

/** Where a painting's own page lives, printed on the certificate. */
export const ARTWORK_PAGE_BASE = 'https://juanmamoreno.com/artwork';

/** Where a token or a contract is read by anybody who wants to check. */
export const ETHERSCAN = 'https://etherscan.io';

/** The address of one certificate, for a reader and for a crawler alike. */
export function certificateUrl(tokenId: string): string {
  return `${ETHERSCAN}/nft/${CERTIFICATES_CONTRACT}/${tokenId}`;
}

export const SOLDCERTIFICATES = [
  '23',
  '24',
  '25',
  '26',
  '30',
  '34',
  '37',
  '58',
  '59',
  '61',
  '64',
  '66',
  '70',
  '71',
  '72',
  '74',
  '75',
  '77',
  '94', // ?
  '97',
  '112',
  '114',
  '115',
  '118',
  '117',
  '126',
  '136',
  '159',
  '161',
  '163',
  '165',
];
