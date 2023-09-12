import { EvmNft } from "@moralisweb3/common-evm-utils";

export interface SessionState {
    balances?: any;
    artPieces: EvmNft[]; // this class is extended by alchemy to add pagination if needed
}