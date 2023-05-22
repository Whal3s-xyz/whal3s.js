// import {Bytes, ethers, providers} from "ethers";
// import {IWalletProvider, Network} from "../types/types-internal";
// import {networkIdToNetwork} from "./networks";
// class ConnectKitWalletProvider implements IWalletProvider {
//
//     signer: providers.JsonRpcSigner | undefined | ethers.Signer; // Assuming you've imported the ConnectKit SDK
//
//     constructor(signer: any) {
//         this.signer = signer; // initialize ConnectKit
//     }
//     async _getNetwork(): Promise<Network> {
//         const chainId = await this.signer.getChainId()
//         networkIdToNetwork(chainId)
//         return networkIdToNetwork(chainId);
//     }
//
//     get address(): Promise<string> | undefined {
//         return this.signer?.getAddress();
//     }
//
//     connect(network: Network): Promise<boolean> {
//         console.log(network)
//         return Promise.resolve(false);
//     }
//
//     async onSameNetwork(network: Network): Promise<boolean> {
//         const currentChainId = await this.signer.getChainId()
//         return Promise.resolve(currentChainId === network.id);
//     }
//
//     signMessage(message: Bytes | string): Promise<string> {
//         return this.signer.signMessage(message);
//     }
//
//
//     switchNetwork(network: Network): Promise<boolean> {
//         console.log(network)
//         return Promise.resolve(false);
//     }
//
// }
//
// export default ConnectKitWalletProvider
