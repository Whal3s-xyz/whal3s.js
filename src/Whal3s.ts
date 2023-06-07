import { WalletProviderInterface } from './types'
import NftValidationUtility from './core/nftValidationUtility'

class Whal3s {
  public walletProvider: WalletProviderInterface;

  constructor(walletProvider: WalletProviderInterface) {
    this.walletProvider = walletProvider;
  }

  async createValidationUtility(id: string) {
    return NftValidationUtility.createValidationUtility(
      this.walletProvider,
      id
    );
  }

}


export default Whal3s;
