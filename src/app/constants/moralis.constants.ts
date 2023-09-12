import { environment } from "@environments/environment";
import { MoralisConfigValues } from "moralis/.";

export const MORALIS_CONFIG: Partial<MoralisConfigValues> = {
    apiKey: environment.moralisKey,
    // ...and any other configuration
  }