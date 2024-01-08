import { environment } from "@environments/environment";
import { AlchemySettings, NftMetadataBatchOptions } from "alchemy-sdk";

export const ALCHEMYSETTINGS: AlchemySettings = {
    apiKey: environment.polygonPOSKey,
    network: environment.polygonNetwork
};

export const GETNFTSDEFAULTOPTIONS: NftMetadataBatchOptions = {
    tokenUriTimeoutInMs: 0,
    refreshCache: true
}

// export const JUANMAADRESS = "0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9";