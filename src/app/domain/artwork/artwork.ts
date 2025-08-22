import { SORT } from '@shared/constants/order.constants';
import { VALIDTRAITS, VIEW_TYPES } from './artwork.constants';
import { Nft, NftImage } from './artwork.entity';

export class Artwork {
  getTraitValue(nft: Nft, trait: VALIDTRAITS): string {
    try {
      return (
        nft.raw.metadata.attributes.find((t) => t.trait_type === trait)
          ?.value ?? ''
      );
    } catch {
      switch (trait) {
        case VALIDTRAITS.VERSION:
          return '';
        case VALIDTRAITS.MEDIUM:
          return 'Error getting medium';
        case VALIDTRAITS.HEIGHT:
          return 'XX';
        case VALIDTRAITS.WIDTH:
          return 'XX';
        case VALIDTRAITS.UNIT:
          return 'cm';
        case VALIDTRAITS.YEAR:
          return 'XXXX';
        case VALIDTRAITS.IMAGETYPE:
          return 'Frontal view';
        default:
          return 'Error getting data';
      }
    }
  }

  getYears(nfts: Nft[]): Set<number> {
    const years = nfts
      ?.map((artPiece) => {
        const attributes = artPiece.raw.metadata?.['attributes'];
        const yearTrait = attributes?.find(
          (trait) => trait['trait_type'] === VALIDTRAITS.YEAR
        );
        const value = yearTrait?.['value'];
        return value !== undefined ? Number(value) : null;
      })
      .filter(
        (year): year is number => typeof year === 'number' && !isNaN(year)
      )
      .sort()
      .reverse();

    return new Set(years);
  }

  sortByYear(nfts: Nft[], order: SORT.ASC | SORT.DESC = SORT.ASC): Nft[] {
    return [...nfts].sort((a, b) => {
      const yearA = Number(this.getTraitValue(a, VALIDTRAITS.YEAR));
      const yearB = Number(this.getTraitValue(b, VALIDTRAITS.YEAR));
      return order === SORT.ASC ? yearA - yearB : yearB - yearA;
    });
  }

  sortByMedium(
    nfts: Array<Nft>,
    order: SORT.ASC | SORT.DESC = SORT.ASC
  ): Array<Nft> {
    const MEDIUM_ORDER = ['oil', 'watercolor'];
    return [...nfts].sort((a, b) => {
      const mediumA =
        this.getTraitValue(a, VALIDTRAITS.MEDIUM).toLowerCase() || '';
      const mediumB =
        this.getTraitValue(b, VALIDTRAITS.MEDIUM).toLowerCase() || '';
      const indexA = MEDIUM_ORDER.findIndex((medium) =>
        mediumA.includes(medium)
      );
      const indexB = MEDIUM_ORDER.findIndex((medium) =>
        mediumB.includes(medium)
      );
      const result =
        indexA !== -1 && indexB !== -1
          ? indexA - indexB
          : indexA !== -1
          ? -1
          : indexB !== -1
          ? 1
          : 0;
      return order === SORT.ASC ? result : -result;
    });
  }

  sortBySize(
    nfts: Array<Nft>,
    order: SORT.ASC | SORT.DESC = SORT.ASC
  ): Array<Nft> {
    return [...nfts].sort((a, b) => {
      const sizeA = this.getSize(a);
      const sizeB = this.getSize(b);
      const result = sizeA === sizeB ? 0 : sizeA < sizeB ? -1 : 1;
      return order === SORT.ASC ? result : -result;
    });
  }

  sortByName(
    nfts: Array<Nft>,
    order: SORT.ASC | SORT.DESC = SORT.ASC
  ): Array<Nft> {
    return [...nfts].sort((a, b) => {
      const nameA = a.name?.toLowerCase() || '';
      const nameB = b.name?.toLowerCase() || '';

      const result = nameA === nameB ? 0 : nameA < nameB ? -1 : 1;
      return order === SORT.ASC ? result : -result;
    });
  }

  getSize(nft: Nft): number {
    const height = parseInt(this.getTraitValue(nft, VALIDTRAITS.HEIGHT));
    const width = parseInt(this.getTraitValue(nft, VALIDTRAITS.WIDTH));
    return height + width;
  }

  getNftById(id: string, nfts: Array<Nft>): Nft | null {
    return nfts.find(({ tokenId }) => id === tokenId) || null;
  }

  getArtByTitle(nameToSearch: string, nfts: Array<Nft>): Array<Nft> {
    return nfts.filter(({ name }) => name === nameToSearch);
  }

  getNftLenghtByYear(year: string, nfts: Array<Nft>): number {
    return nfts.filter(
      (nft) => this.getTraitValue(nft, VALIDTRAITS.YEAR) === year
    ).length;
  }

  isFrontalView(nft: Nft, sameNamedArt: Nft[]): boolean {
    const frontals = this.filterFrontalArtworks(sameNamedArt);
    if (!frontals.length) return false;
    if (frontals.length === 1) return frontals[0].tokenId === nft.tokenId;
    const latest = this.getLatestVersion(frontals);
    return latest?.tokenId === nft.tokenId;
  }

  filterFrontalArtworks(nfts: Nft[]) {
    return nfts.filter(
      (nft) =>
        this.getTraitValue(nft, VALIDTRAITS.IMAGETYPE) === VIEW_TYPES.FRONTAL
    );
  }

  isExcludedByYear(nft: Nft, years: string[] = []): boolean {
    if (!years?.length) {
      return false;
    } else {
      const nftYear = this.getTraitValue(nft, VALIDTRAITS.YEAR);
      return !years.includes(nftYear);
    }
  }

  getLatestVersion(nfts: Nft[]): Nft | null {
    if (!nfts.length) return null;
    return nfts.reduce((latest, current) => {
      const vA = parseInt(this.getTraitValue(latest, VALIDTRAITS.VERSION)) || 0;
      const vB =
        parseInt(this.getTraitValue(current, VALIDTRAITS.VERSION)) || 0;
      return vB > vA ? current : latest;
    });
  }

  getLatestVersionIndex(nfts: Array<Nft>): number {
    const latestNft = this.getLatestVersion(nfts);
    return nfts.findIndex(
      (nft) => latestNft && nft.tokenId === latestNft.tokenId
    );
  }

  getNftQualityUrl(image: NftImage): string {
    return image?.originalUrl || image?.cachedUrl || image?.thumbnailUrl!;
  }

  getNftOptimalUrl(image: NftImage): string {
    return image.thumbnailUrl || image?.cachedUrl || image.originalUrl!;
  }
}
