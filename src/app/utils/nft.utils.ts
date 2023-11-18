import { VALIDTRAITS } from "@constants/nft.constants";
import { Nft } from "alchemy-sdk";

export default class NftUtils {

    static checkValidty(nft: Nft): boolean {
        return (!!!nft.spamInfo?.isSpam && 
          !!nft.rawMetadata?.attributes &&
          this.hasRequiredTraits(nft.rawMetadata.attributes))
    }

    static hasRequiredTraits(attributes: Record<string, any>[]): boolean {
        return (!!attributes.length &&
            !!attributes.some(attribute => attribute['trait_type'] in Object.values(VALIDTRAITS)))
    }

    static getAttrValue(key: string, nft: Nft): string | null {
        const traits: Record<string, any>[] | undefined = nft.rawMetadata!['traits'];
        if (traits && traits.length) {
            const value: string | undefined = traits.find((attr: Record<string, any>) => attr['trait_type'] === key)!['value'];
            return value || null
        } else {
            return null
        }
    }
}