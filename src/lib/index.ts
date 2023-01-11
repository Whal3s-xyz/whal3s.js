import { InitOptions as WalletInitOptions } from '@web3-onboard/core';

import { NETWORKS } from './core/networks';
import NftValidationUtility from './core/nftValidationUtility';
import Wallet, { SUPPORTED_WALLETS } from './core/wallet';

class Whal3s {
  public wallet: Wallet;

  constructor(walletConfig: WalletInitOptions = {
    wallets: [SUPPORTED_WALLETS.INJECTED, SUPPORTED_WALLETS.WALLET_CONNECT],
    chains: [
      NETWORKS.ETH_MAINNET,
      NETWORKS.ETH_GOERLI,
      NETWORKS.MATIC_MAINNET,
      NETWORKS.MATIC_MUMBAI
    ]
  }) {
    this.wallet = new Wallet(walletConfig);
  }

  async createValidationUtility(id: string) {
    return NftValidationUtility.createValidationUtility(
      this.wallet,
      id
    );
  }

}

export default Whal3s;
export { NETWORKS, SUPPORTED_WALLETS, NftValidationUtility};
