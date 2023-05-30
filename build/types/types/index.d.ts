import { NETWORKS } from '../core/networks';
import { Bytes, ethers, providers } from "ethers";
export type NetworkArguments = Network | keyof typeof NETWORKS;
export type NFTUtility = {
    id: string;
    name: string;
    description: string;
    type: string;
    created_at: string;
    updated_at: string;
    contract_address: string;
    network: keyof typeof NETWORKS;
    max_engagements: number;
    max_engagements_per_nft: string;
    message_to_sign: string;
    requirements: string;
};
export type EngagementRequest = {
    token_id: string;
    wallet_address: string;
    signature: string;
    metadata?: any;
};
export type EngagementResponse = {
    id: string;
    created_at: string;
    updated_at: string;
    wallet_address: string;
    token_id: string;
    contract_address: string;
    network: string;
    metadata?: any;
    status: string;
};
type NFTResponse = {
    attributes: Attribute;
    engagements: EngagementResponse[];
    errors: string[];
    valid: boolean;
};
type Attribute = {
    contract: any;
    contractMetadata: {
        name: string;
        symbol: string;
        totalSupply: string;
        tokenType: string;
    };
    description: string;
    id: {
        tokenId: string;
        tokenMetadata: {
            tokenType: string;
        };
    };
    media: {
        raw: string;
        gateway: string;
    };
    metadata: any;
    timeLastUpdated: string;
    title: string;
    tokenUri: {
        gateway: string;
        raw: string;
    };
};
export type WalletNftValidationResponse = {
    nfts: Array<NFTResponse>;
    errors: string[];
    valid: boolean | undefined;
};
export type CallbackFunctionVariadic = (...args: any[]) => void;
export type Class = new (...args: any[]) => any;
export type AbstractClass = abstract new (...args: any[]) => any;
export interface Network {
    id: number;
    token: string;
    label: string;
    rpcUrl: string;
}
export interface IWalletProvider {
    signer: providers.JsonRpcSigner | undefined | ethers.Signer;
    get address(): Promise<string> | undefined;
    _getNetwork(network: Network): Promise<Network>;
    switchNetwork(network: Network): Promise<boolean>;
    signMessage(message: Bytes | string): Promise<string>;
    onSameNetwork(network: Network): Promise<boolean>;
    connect(network: Network): Promise<boolean>;
}
export {};
