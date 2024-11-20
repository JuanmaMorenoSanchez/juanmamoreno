import { Network } from "alchemy-sdk"

export const environment = {
  production: false,
  polygonPOSKey: "hIycsV1nNzriwJk9zqo1j-w5BpxfEe3m",
  polygonNetwork: Network.MATIC_MAINNET,
  homeTokenId: "2",
  adminAdress: "0xD7D089B7eBecCaf4FF8f183F22376913ce6193B9",
  backendUrl: "https://juanmamoreno-backend-oidvzp4jza-no.a.run.app/", // Current maintained backend
  backendUrlFallback: "https://juanmamoreno-backend-oidvzp4jza-no.a.run.app/" // No db. 1th version of back.
};
