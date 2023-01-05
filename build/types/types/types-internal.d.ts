import { NETWORKS } from '../core/networks';
export interface Network {
    id: string;
    token: string;
    label: string;
    rpcUrl: string;
}
export declare type NFTUtility = {
    id: string;
    type: string;
    created_at: string;
    updated_at: string;
    contract_address: string;
    network: keyof typeof NETWORKS;
    max_engagements: number;
    max_engagements_per_nft: string;
};
export declare type EngagementRequest = {
    token_id: string;
    wallet_address: string;
    signature: string;
    metadata?: any;
};
export declare type EngagementResponse = {
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
declare type NFTResponse = {
    attributes: Attribute;
    engagements: EngagementResponse[];
    error: string[];
    valid: boolean;
};
declare type Attribute = {
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
export declare type ValidNFT = {
    nfts: {
        [key: number]: NFTResponse;
    };
    error: string[];
    valid: boolean;
};
export declare type CallbackFunctionVariadic = (...args: any[]) => void;
export declare type Class = new (...args: any[]) => any;
export {};
