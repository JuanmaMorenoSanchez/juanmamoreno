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
    const years = (nfts ?? [])
      .map((artPiece) => Number(this.getTraitValue(artPiece, VALIDTRAITS.YEAR)))
      .filter((year) => !Number.isNaN(year))
      .sort((a, b) => b - a);

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
    const mediumRank = (nft: Nft): number => {
      const medium = this.getTraitValue(nft, VALIDTRAITS.MEDIUM).toLowerCase();
      const index = MEDIUM_ORDER.findIndex((m) => medium.includes(m));
      return index === -1 ? MEDIUM_ORDER.length : index;
    };
    return [...nfts].sort((a, b) => {
      const result = mediumRank(a) - mediumRank(b);
      return order === SORT.ASC ? result : -result;
    });
  }

  sortBySize(
    nfts: Array<Nft>,
    order: SORT.ASC | SORT.DESC = SORT.ASC
  ): Array<Nft> {
    return [...nfts].sort((a, b) => {
      const result = this.getSize(a) - this.getSize(b);
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
      const result = nameA.localeCompare(nameB);
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

  // Every displayable url for an artwork, best quality first. Consumers can
  // walk down the list when a source fails to load (e.g. IPFS blocked).
  getNftQualityUrls(image: NftImage): string[] {
    return this.collectUrls(image, ['originalUrl', 'cachedUrl', 'thumbnailUrl']);
  }

  // Same idea, but restricted to CORS-enabled sources (fetch(), canvas):
  // cachedUrl sends no Access-Control-Allow-Origin header, pngUrl does.
  getNftFetchableUrls(image: NftImage): string[] {
    return this.collectUrls(image, ['originalUrl', 'pngUrl', 'thumbnailUrl']);
  }

  getNftQualityUrl(image: NftImage): string {
    return this.getNftQualityUrls(image)[0] || '';
  }

  getNftOptimalUrl(image: NftImage): string {
    return (
      this.collectUrls(image, ['thumbnailUrl', 'cachedUrl', 'originalUrl'])[0] ||
      ''
    );
  }

  private collectUrls(
    image: NftImage,
    order: Array<keyof NftImage>
  ): string[] {
    const candidates = order.map((key) => image?.[key]);
    return [
      ...new Set(
        candidates.filter((url): url is string => typeof url === 'string' && !!url)
      ),
    ];
  }
}
