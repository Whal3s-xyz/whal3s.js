import { OnboardAPI } from '@web3-onboard/core';
import { Bytes, ethers, providers } from 'ethers';
import { Network } from '../types/types-internal';
export declare class Wallet {
    private static _instance;
    debug: boolean;
    address: string | undefined;
    onboard: OnboardAPI | undefined;
    signer: providers.JsonRpcSigner | undefined | ethers.Signer;
    ethersProvider: providers.Web3Provider | undefined;
    constructor();
    init: () => Promise<void>;
    connect: (network: Network | string) => Promise<boolean>;
    switchNetwork: (network: Network | string) => Promise<boolean>;
    signMessage: (message: Bytes | string) => Promise<string>;
}
export default Wallet;
