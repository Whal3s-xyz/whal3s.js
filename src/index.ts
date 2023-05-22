
import {NETWORKS} from './core/networks';
import NftValidationUtility from './core/nftValidationUtility';
import WalletProviderInterface from "./core/providers/WalletProviderInterface";

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

export {NETWORKS, NftValidationUtility, WalletProviderInterface};
export default Whal3s;
