import { environment } from "@environments/environment";
import { AlchemySettings } from "alchemy-sdk";

export const ALCHEMYSETTINGS: AlchemySettings = {
    apiKey: environment.polygonPOSKey,
    network: environment.polygonNetwork
};

export const JUANMAWALLETID = "juanmamoreno.cb.id"

export const JUANMAADRESS = "0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9" // same address for eth and matic
