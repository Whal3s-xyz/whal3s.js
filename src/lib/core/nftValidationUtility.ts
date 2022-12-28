import { AxiosRequestConfig } from 'axios';
import {
  EngagementRequest,
  EngagementResponse,
  NFTUtility,
  ValidNFT
} from '../types/types-internal';
import { API_URL } from '../utils/env';
import { HttpClient } from '../utils/http-client';
class NftValidationUtility extends HttpClient {
  public id: string;
  private apiKey: string;
  private static classInstance?: NftValidationUtility;

  // TODO: Insert methods to communicate with API

  constructor() {
    super(`${API_URL}`);
    this._initializeRequestInterceptor();
  }

  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(
      this._handleRequest,
      this._handleError
    );
  };
  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${this.apiKey}`;
    return config;
  };

  // returns the reusable encapsulated class instance
  public static getInstance(id: string, apiKey: string) {
    if (!this.classInstance) {
      this.classInstance = new NftValidationUtility();
      this.classInstance.apiKey = apiKey;
      this.classInstance.id = id;
    }
    return this.classInstance;
  }

  //get all the NFT Validation Utilities
  public getValidationUtilities = () =>
    this.instance.get<NFTUtility[]>('nft-validation-utilities');

  //get all NFTs for wallet
  public getAllNftWallet = (wallet: string) =>
    this.instance.get<ValidNFT>(
      `nft-validation-utilities/${this.id}/wallet/${wallet}`
    );

  //get message to sign
  public getMessage = (wallet: string) =>
    this.instance.post<{ message: string }>(`signature-messages`, {
      utility_id: this.id,
      wallet_address: wallet
    });

  //reserve NFT engagement
  public reserveEngagement = (params: EngagementRequest) =>
    this.instance.post<EngagementResponse>(
      `user/nft-validation-utilities/${this.id}/engagement-reservations`,
      params
    );

  //store NFT engagement
  public storeEngagement = (params: EngagementRequest) =>
    this.instance.post<EngagementResponse>(
      `user/nft-validation-utilities/${this.id}/engagements`,
      params
    );
}
export default NftValidationUtility;
