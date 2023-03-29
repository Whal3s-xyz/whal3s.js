import {InitOptions as WalletInitOptions} from '@web3-onboard/core';

import {NETWORKS} from './core/networks';
import NftValidationUtility from './core/nftValidationUtility';
import Wallet, {SUPPORTED_WALLETS} from './core/wallet';

class Whal3s {
    public wallet: Wallet;

    constructor(walletConfig: Partial<WalletInitOptions> = {}) {
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
export {NETWORKS, SUPPORTED_WALLETS, NftValidationUtility};
