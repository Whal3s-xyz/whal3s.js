import { AxiosRequestConfig } from 'axios';
import Wallet from './wallet';
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
  public utility: NFTUtility;
  public nfts: ValidNFT;
  public wallet: Wallet;

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
  public static async getInstance(id: string, apiKey: string) {
    if (!this.classInstance) {
      this.classInstance = new NftValidationUtility();
      this.classInstance.wallet = new Wallet();
      this.classInstance.apiKey = apiKey;
      this.classInstance.id = id;
      this.classInstance.utility =
        await this.classInstance.getValidationUtility();
    }
    return this.classInstance;
  }

  public async connectWallet() {
    try {
      await this.wallet.connect(this.utility.network);
      console.log('logged in adddress:', this.wallet.address);
      console.log(await this.wallet.onboard.state.get());
      this.nfts = await this.getAllNftWallet(this.wallet.address);
      console.log(this.nfts);
    } catch (error) {
      console.log(error);
    }
  }

  public async claimNFT(reserve: boolean, nftId: string): Promise<boolean> {
    try {
      //step1: fetch the message to sign
      const msg = await this.getMessage(this.wallet.address);
      console.log('msg:', msg);

      //step2: ask user to sign the message
      const signedMsgHash = await this.wallet.signMessage(msg.message);
      console.log('signedMsg:', signedMsgHash);
      //params to reserve and store engagement
      const metadata = this.nfts.nfts[nftId].attributes.metadata;
      const params: EngagementRequest = {
        token_id: nftId,
        wallet_address: this.wallet.address,
        signature: signedMsgHash,
        metadata: JSON.stringify(metadata)
      };

      //step3: check if user wants to reserve the NFT
      if (reserve) {
        await this.reserveEngagement(params);
        console.log('reseved');
      }

      await this.storeEngagement(params);
      console.log('stored');
      return true;
    } catch (error) {
      console.log('error:', error);
      return false;
    }
  }

  //API methods
  //get all the NFT Validation Utilities
  public getValidationUtilities = () =>
    this.instance.get<NFTUtility[]>('nft-validation-utilities');

  //get all the NFT Validation Utilities
  public getValidationUtility = () =>
    this.instance.get<NFTUtility>(`nft-validation-utilities/${this.id}`);

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
