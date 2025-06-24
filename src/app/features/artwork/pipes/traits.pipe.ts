import { Pipe, PipeTransform } from '@angular/core';
import { ArtworkDomain } from '@domain/artwork/artwork';
import { VALIDTRAITS } from '@domain/artwork/artwork.constants';
import { Nft } from '@domain/artwork/artwork.entity';

@Pipe({
  name: 'trait',
  standalone: true
})
export class TraitPipe implements PipeTransform {
  transform(nft: Nft | undefined, trait: VALIDTRAITS): string {
    if (!nft) return '';
    return ArtworkDomain.getTraitValue(nft, trait);
  }
}
