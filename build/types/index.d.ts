import { InitOptions as WalletInitOptions } from '@web3-onboard/core';
import { NETWORKS } from './core/networks';
import NftValidationUtility from './core/nftValidationUtility';
import Wallet, { SUPPORTED_WALLETS } from './core/wallet';
declare class Whal3s {
    wallet: Wallet;
    constructor(walletConfig?: Partial<WalletInitOptions>);
    createValidationUtility(id: string): Promise<NftValidationUtility>;
}
export default Whal3s;
export { NETWORKS, SUPPORTED_WALLETS, NftValidationUtility };
