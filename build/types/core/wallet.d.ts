import { InitOptions, OnboardAPI } from '@web3-onboard/core';
import { Bytes, ethers, providers } from 'ethers';
import { NETWORKS } from './networks';
import { Network } from '../types/types-internal';
type NetworkArguments = Network | keyof typeof NETWORKS;
export declare const SUPPORTED_WALLETS: {
    INJECTED: import("@web3-onboard/common").WalletInit;
    WALLET_CONNECT: import("@web3-onboard/common").WalletInit;
};
export declare class Wallet extends EventTarget {
    private static _instance;
    private readonly exceptionHandler;
    private _address;
    onboard: OnboardAPI | undefined;
    signer: providers.JsonRpcSigner | undefined | ethers.Signer;
    ethersProvider: providers.Web3Provider | undefined;
    constructor(walletConfig: InitOptions);
    get address(): string | undefined;
    set address(value: string | undefined);
    private getNetwork;
    connect: (network: NetworkArguments) => Promise<boolean>;
    switchNetwork: (network: NetworkArguments) => Promise<boolean>;
    signMessage: (message: Bytes | string) => Promise<string>;
    onSameNetwork: (network: keyof typeof NETWORKS) => Promise<boolean>;
}
export default Wallet;
