import { NETWORKS } from './core/networks';
import NftValidationUtility from './core/nftValidationUtility';
import WalletProviderInterface from "./core/providers/WalletProviderInterface";
declare class Whal3s {
    walletProvider: WalletProviderInterface;
    constructor(walletProvider: WalletProviderInterface);
    createValidationUtility(id: string): Promise<NftValidationUtility>;
}
export { NETWORKS, NftValidationUtility, WalletProviderInterface };
export default Whal3s;
