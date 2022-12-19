import { Bytes, providers } from "ethers";
import { Network } from "../types/types-internal";
declare class Wallet {
    private static _instance;
    debug: boolean;
    address: string | undefined;
    private onboard;
    signer: providers.JsonRpcSigner | undefined;
    ethersProvider: providers.Web3Provider | undefined;
    constructor();
    init: () => Promise<void>;
    connect: (network: Network | string) => Promise<boolean>;
    switchNetwork: (network: Network | string) => Promise<boolean>;
    signMessage: (message: Bytes | string) => Promise<string>;
}
export default Wallet;
