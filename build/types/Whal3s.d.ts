import { WalletProviderInterface } from './types';
import NftValidationUtility from './core/nftValidationUtility';
declare class Whal3s {
    walletProvider: WalletProviderInterface;
    constructor(walletProvider: WalletProviderInterface);
    createValidationUtility(id: string): Promise<NftValidationUtility>;
}
export default Whal3s;
