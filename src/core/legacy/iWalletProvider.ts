// import {Bytes, ethers, providers} from "ethers";
// import {Network} from "../types/types-internal";
// import {NETWORKS} from "./networks";
// type NetworkArguments = Network | keyof typeof NETWORKS;
//
// interface IWalletProvider {
//     get address(): string | undefined,
//     get signer(): providers.JsonRpcSigner | undefined | ethers.Signer,
//     _getNetwork(network: NetworkArguments): Network,
//     switchNetwork(network: NetworkArguments): Promise<boolean>,
//     signMessage(message: Bytes | string): Promise<string>,
//     onSameNetwork(network: NetworkArguments): Promise<boolean>,
//     connect(network: NetworkArguments): Promise<boolean>
// }
//
// export default IWalletProvider
