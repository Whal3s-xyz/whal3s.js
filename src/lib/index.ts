import { InitOptions as WalletInitOptions } from '@web3-onboard/core';

import { NETWORKS } from './core/networks';
import NftValidationUtility from './core/nftValidationUtility';
import Wallet, { SUPPORTED_WALLETS } from './core/wallet';

class Whal3s {
  public wallet: Wallet;
  private readonly apiKey: string;

  constructor(apiKey: string, walletConfig: WalletInitOptions) {
    this.wallet = new Wallet(walletConfig);
    this.apiKey = apiKey;
  }

  async createValidationUtility(id: string) {
    return NftValidationUtility.createValidationUtility(
      this.wallet,
      this.apiKey,
      id
    );
  }

  myMethod = (): boolean => {
    console.log('Library method fired');
    return true;
  };
}

export default Whal3s;
export { NETWORKS, SUPPORTED_WALLETS };
