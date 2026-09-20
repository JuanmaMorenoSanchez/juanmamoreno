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

/**
 * Which paintings are sold is no longer written here.
 *
 * It was a list of token ids in this file, so a sale meant an edit, a commit
 * and a deploy — four hundred pages rebuilt to turn on one dot, and no way to
 * record a sale in the room it was sold in. It is now one document per
 * painting in the api, written by the artist from the painting's own page, and
 * read through `AvailabilityService`. The list as it stood on the day it moved
 * is the seed in the service's repository, so nothing was lost.
 */
