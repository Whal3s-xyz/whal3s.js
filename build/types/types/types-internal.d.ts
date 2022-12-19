export interface Network {
    id: string;
    token: string;
    label: string;
    rpcUrl: string;
}
export interface NFTUtility {
    id: string;
    type: string;
    created_at: string;
    updated_at: string;
    contract_address: string;
    network: string;
    max_engagements: number;
    max_engagements_per_nft: string;
}
export interface NFTUtilityRequest {
    network: string;
    contract_address: string;
    max_engagements?: number;
    max_engagements_per_nft?: number;
}
export declare type CallbackFunctionVariadic = (...args: any[]) => void;
export declare type Class = new (...args: any[]) => any;
