import { VALIDTRAITS } from "@constants/nft.constants";
import { OwnedNft } from "alchemy-sdk";

export default class NftUtils {

    static checkValidty(nft: OwnedNft): boolean {
        return (!!!nft.spamInfo?.isSpam && 
          !!nft.rawMetadata?.attributes &&
          this.hasRequiredTraits(nft.rawMetadata.attributes))
    }

    static hasRequiredTraits(attributes: Record<string, any>[]): boolean {
        return !!attributes.some(attribute => attribute['trait_type'] in Object.values(VALIDTRAITS))
    }

}