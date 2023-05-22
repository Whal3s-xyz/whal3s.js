// import Onboard, {
//     InitOptions,
//     OnboardAPI,
//     WalletState
// } from '@web3-onboard/core';
// import injectedModule from '@web3-onboard/injected-wallets';
// import walletConnectModule from '@web3-onboard/walletconnect';
// import {Bytes, ethers, providers} from 'ethers';
// import {
//     ETH_GOERLI,
//     ETH_MAINNET,
//     MATIC_MAINNET,
//     MATIC_MUMBAI,
//     NETWORKS
// } from './networks';
// import {IWalletProvider, Network} from '../types/types-internal';
// import {asyncSome} from '../helpers';
// import ExceptionHandler from './exceptionHandler';
//
// const walletConnect = walletConnectModule();
// const injected = injectedModule();
//
// type NetworkArguments = Network | keyof typeof NETWORKS;
//
// export const SUPPORTED_WALLETS = {
//     INJECTED: injected,
//     WALLET_CONNECT: walletConnect
// };
//
// export class Wallet extends EventTarget {
//     private static _instance: InstanceType<typeof Wallet>;
//     private readonly exceptionHandler: ExceptionHandler
//     private walletProvider: IWalletProvider;
//
//     constructor(walletprovider: IWalletProvider){
//         super();
//
//         this.walletProvider = walletprovider;
//         if (Wallet._instance) {
//             return Wallet._instance;
//         }
//
//         this.exceptionHandler = new ExceptionHandler()
//         Wallet._instance = this;
//
//     }
//
//
//     async getAddress(): Promise<string | undefined> {
//         return await this.walletProvider.address;
//     }
//
//     get signer(): providers.JsonRpcSigner | undefined | ethers.Signer {
//       return this.walletProvider.signer;
//     }
//
//
//     private getNetwork(network: NetworkArguments): Network {
//         return typeof network === 'string' ? NETWORKS[network] : network;
//     }
//
//     connect = async (network: NetworkArguments): Promise<boolean> => {
//         network = this.getNetwork(network);
//
//         try {
//
//             const currentState = this.onboard.state.get()
//
//             let wallets = currentState.wallets
//             if (currentState.wallets.length === 0)
//                 wallets = await this.onboard.connectWallet();
//
//
//             if (wallets.length === 0) {
//                 this.exceptionHandler.handleError(
//                     new Error('No wallet selected'),
//                     ExceptionHandler.Type.INTERACTION
//                 );
//             }
//             await this.onboard.setChain({chainId: network.id});
//             return true
//
//         } catch (error) {
//             this.exceptionHandler.catchError(error);
//         }
//     };
//
//     public switchNetwork = async (
//         network: NetworkArguments
//     ): Promise<boolean> => {
//         network = this.getNetwork(network);
//
//         try {
//             const success = await this.onboard.setChain({chainId: network.id});
//             if (success) {
//                 return true;
//             } else {
//                 this.exceptionHandler.handleError(
//                     new Error('User rejected request'),
//                     ExceptionHandler.Type.INTERACTION
//                 );
//             }
//         } catch (e) {
//             this.exceptionHandler.catchError(e);
//         }
//     };
//
//     public signMessage = async (message: Bytes | string): Promise<string> => {
//         try {
//             return await this.signer.signMessage(message);
//         } catch (e) {
//             this.exceptionHandler.catchError(e);
//         }
//     };
//
//     public onSameNetwork = async (network: keyof typeof NETWORKS) => {
//         const wallets = this.onboard.state.get().wallets;
//
//         return asyncSome<WalletState>(wallets, async (wallet) => {
//             const chainId = await wallet.provider.request({method: 'eth_chainId'});
//             return chainId === NETWORKS[network].id;
//         });
//     };
// }
//
// export default Wallet;
