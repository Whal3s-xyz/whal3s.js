import { InitOptions as WalletInitOptions } from '@web3-onboard/core';
import { NETWORKS } from './core/networks';
import NftValidationUtility from './core/nftValidationUtility';
import Wallet, { SUPPORTED_WALLETS } from './core/wallet';
declare class Whal3s {
    wallet: Wallet;
    private readonly apiKey;
    constructor(apiKey: string, walletConfig: WalletInitOptions);
    createValidationUtility(id: string): Promise<NftValidationUtility>;
    myMethod: () => boolean;
}
export default Whal3s;
export { NETWORKS, SUPPORTED_WALLETS };
