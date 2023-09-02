import { TokenBalancesResponseErc20, TransferredNft } from "alchemy-sdk";

export interface SessionState {
    balances?: TokenBalancesResponseErc20;
    artPieces: TransferredNft[]; // this class is extended by alchemy to add pagination if needed
}