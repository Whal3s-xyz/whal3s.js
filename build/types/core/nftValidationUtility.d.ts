import { NFTUtility, NFTUtilityRequest } from "../types/types-internal";
import { HttpClient } from "../utils/http-client";
declare class NftValidationUtility extends HttpClient {
    private apiKey;
    private static classInstance?;
    private constructor();
    private _initializeRequestInterceptor;
    private _handleRequest;
    static getInstance(apiKey: string): NftValidationUtility;
    getValidationUtilities: () => Promise<import("axios").AxiosResponse<NFTUtility[], any>>;
    createNftValidationUtility: (requestBody: NFTUtilityRequest) => Promise<import("axios").AxiosResponse<NFTUtility, any>>;
}
export default NftValidationUtility;
