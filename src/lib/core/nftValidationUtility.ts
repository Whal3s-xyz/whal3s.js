import { AxiosRequestConfig } from 'axios';
import {
  Engagement,
  EngagementResponse,
  NFTUtility,
  NFTUtilityRequest
} from '../types/types-internal';
import { API_URL } from '../utils/env';
import { HttpClient } from '../utils/http-client';
class NftValidationUtility extends HttpClient {
  private apiKey: string;
  private static classInstance?: NftValidationUtility;

  private constructor() {
    super(`${API_URL}nft-validation-utilities`);
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

  public static getInstance(apiKey: string) {
    if (!this.classInstance) {
      this.classInstance = new NftValidationUtility();
      this.classInstance.apiKey = apiKey;
    }
    return this.classInstance;
  }

  public getValidationUtilities = () => this.instance.get<NFTUtility[]>('');

  public createNftValidationUtility = (requestBody: NFTUtilityRequest) =>
    this.instance.post<NFTUtility>('', requestBody);

  public updateNftUtility = (
    requestBody: NFTUtilityRequest,
    utilityID: string
  ) => this.instance.put<NFTUtility>(`/${utilityID}`, requestBody);

  public deleteNftUtility = (utilityID: string) =>
    this.instance.delete<string>(`/${utilityID}`);

  public getNftUtility = (utilityID: string) =>
    this.instance.get<NFTUtility>(`/${utilityID}`);

  public storeEngagement = (body: Engagement, utilityID: string) =>
    this.instance.post<EngagementResponse>(`/${utilityID}/engagements`, body);

  public getAllEngagements = (utilityID: string) =>
    this.instance.get<EngagementResponse[]>(`/${utilityID}/engagements`);

  public updateEngagement = (
    requestBody: Engagement,
    utilityID: string,
    engagementID: string
  ) =>
    this.instance.put<EngagementResponse>(
      `/${utilityID}/engagements/${engagementID}`,
      requestBody
    );

  public removeEngagement = (utilityID: string, engagementID: string) =>
    this.instance.delete<string>(`/${utilityID}/engagements/${engagementID}`);

  public getEngagement = (utilityID: string, engagementID: string) =>
    this.instance.get<EngagementResponse>(
      `/${utilityID}/engagements/${engagementID}`
    );

  public getAllUtlitiyWallet = (utilityID: string, wallet: string) =>
    this.instance<any>(`${utilityID}/wallet/${wallet}`);
}
export default NftValidationUtility;
