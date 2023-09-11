import { Injectable } from '@angular/core';

import { EthereumClient, w3mConnectors, w3mProvider } from '@web3modal/ethereum'

import { Web3Modal } from '@web3modal/html'
import { configureChains, createConfig } from '@wagmi/core'
import { arbitrum, mainnet, polygon } from '@wagmi/core/chains'
import { environment } from '@environments/environment';


@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  // https://docs.walletconnect.com/2.0/web3modal/html/wagmi/installation

  private chains = [polygon]
  private publicClient: any;
  private wagmiConfig: unknown;
  private ethereumClient: EthereumClient;
  private web3modal: Web3Modal;

  get connectModal(): Web3Modal {
    return this.web3modal;
  }

  constructor() {
    const projectIdObject = { projectId: environment.walletConnectProjectId };
    this.publicClient = configureChains(this.chains, [w3mProvider(projectIdObject)]);

    this.wagmiConfig = createConfig({
      autoConnect: true,
      connectors: w3mConnectors({ ...projectIdObject, chains: this.chains}),
      publicClient: this.publicClient
    })

    this.ethereumClient = new EthereumClient(this.wagmiConfig, this.chains)
    this.web3modal = new Web3Modal(projectIdObject, this.ethereumClient)
  }


}
