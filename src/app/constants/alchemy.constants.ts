import { environment } from "@environments/environment";
import { AlchemySettings } from "alchemy-sdk";

export const ALCHEMYSETTINGS: AlchemySettings = {
    apiKey: environment.polygonPOSKey,
    network: environment.polygonNetwork
};
