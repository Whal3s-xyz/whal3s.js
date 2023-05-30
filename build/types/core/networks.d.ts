import { Network } from '../types';
export declare const ETH_MAINNET: Network;
export declare const ETH_GOERLI: Network;
export declare const ETH_SEPOLIA: Network;
export declare const MATIC_MAINNET: Network;
export declare const MATIC_MUMBAI: Network;
export declare const NETWORKS: {
    MATIC_MAINNET: Network;
    MATIC_MUMBAI: Network;
    ETH_MAINNET: Network;
    ETH_GOERLI: Network;
};
export declare function networkIdToNetwork(networkId: number): Network;
