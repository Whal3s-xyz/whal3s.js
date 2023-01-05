import Wallet from './wallet';
import { EngagementRequest, EngagementResponse, NFTUtility, ValidNFT } from '../types/types-internal';
import { HttpClient } from '../utils/http-client';
declare class NftValidationUtility extends HttpClient {
    private id;
    private apiKey;
    details: NFTUtility;
    nfts: ValidNFT;
    wallet: Wallet;
    constructor();
    private _initializeRequestInterceptor;
    private _handleRequest;
    static createValidationUtility(wallet: Wallet, apiKey: string, id: string): Promise<NftValidationUtility>;
    connectWallet(): Promise<void>;
    claimNFT(reserve: boolean, nftId: string): Promise<boolean>;
    getValidationUtilities: () => Promise<import("axios").AxiosResponse<NFTUtility[], any>>;
    getValidationUtility: () => Promise<import("axios").AxiosResponse<NFTUtility, any>>;
    getAllNftWallet: (wallet: string) => Promise<import("axios").AxiosResponse<ValidNFT, any>>;
    getMessage: (wallet: string) => Promise<import("axios").AxiosResponse<{
        message: string;
    }, any>>;
    reserveEngagement: (params: EngagementRequest) => Promise<import("axios").AxiosResponse<EngagementResponse, any>>;
    storeEngagement: (params: EngagementRequest) => Promise<import("axios").AxiosResponse<EngagementResponse, any>>;
}
export default NftValidationUtility;
