import { EngagementRequest, EngagementResponse, NFTUtility, ValidNFT } from '../types/types-internal';
import { HttpClient } from '../utils/http-client';
declare class NftValidationUtility extends HttpClient {
    id: any;
    private apiKey;
    private static classInstance?;
    constructor();
    private _initializeRequestInterceptor;
    private _handleRequest;
    static getInstance(id: string, apiKey: string): NftValidationUtility;
    getValidationUtilities: () => Promise<import("axios").AxiosResponse<NFTUtility[], any>>;
    getAllNftWallet: (wallet: string) => Promise<import("axios").AxiosResponse<ValidNFT, any>>;
    getMessage: (wallet: string) => Promise<import("axios").AxiosResponse<{
        message: string;
    }, any>>;
    reserveEngagement: (params: EngagementRequest) => Promise<import("axios").AxiosResponse<EngagementResponse, any>>;
    storeEngagement: (params: EngagementRequest) => Promise<import("axios").AxiosResponse<EngagementResponse, any>>;
}
export default NftValidationUtility;
