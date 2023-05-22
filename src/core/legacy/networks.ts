// import {
//   ETH_MAINNET_RPC,
//   ETH_GOERLI_RPC,
//   MATIC_MUMBAI_RPC,
//   MATIC_MAINNET_RPC,
//   ETH_SEPOLIA_RPC
// } from '../utils/env';
//
// import { Network } from '../types/types-internal';
//
// export const ETH_MAINNET: Network = {
//   id: 1,
//   token: 'ETH',
//   label: 'Ethereum Mainnet',
//   rpcUrl: ETH_MAINNET_RPC
// };
// export const ETH_GOERLI: Network = {
//   id: 5,
//   token: 'ETH',
//   label: 'Ethereum Görli Testnet',
//   rpcUrl: ETH_GOERLI_RPC
// };
// export const ETH_SEPOLIA: Network = {
//   id: 11155111,
//   token: 'ETH',
//   label: 'Ethereum Sepolia Testnet',
//   rpcUrl: ETH_SEPOLIA_RPC
// };
// export const MATIC_MAINNET: Network = {
//   id: 137,
//   token: 'MATIC',
//   label: 'Matic Mainnet',
//   rpcUrl: MATIC_MAINNET_RPC
// };
// export const MATIC_MUMBAI: Network = {
//   id: 80001,
//   token: 'MATIC',
//   label: 'Matic Mumbai',
//   rpcUrl: MATIC_MUMBAI_RPC
// };
//
// export const NETWORKS = {
//   MATIC_MAINNET,
//   MATIC_MUMBAI,
//   ETH_MAINNET,
//   ETH_GOERLI
// };
//
//
// export function networkIdToNetwork (networkId: number): Network {
//     switch (networkId) {
//         case 1:
//         return ETH_MAINNET;
//         case 5:
//         return ETH_GOERLI;
//         case 11155111:
//         return ETH_SEPOLIA;
//         case 137:
//         return MATIC_MAINNET;
//         case 80001:
//         return MATIC_MUMBAI;
//         default:
//         throw new Error(`Network ${networkId} not supported`);
//     }
// }
