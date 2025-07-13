import { inject, Pipe, PipeTransform } from '@angular/core';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';
import { ARTWORK_PORT } from '@domain/artwork/artwork.token';

@Pipe({
  name: 'trait',
  standalone: true,
})
export class TraitPipe implements PipeTransform {
  private artworkService = inject(ARTWORK_PORT);

  transform(nft: Nft | undefined, trait: VALIDTRAITS): string {
    if (!nft) return '';
    return this.artworkService.getTraitValue(nft, trait);
  }
}
