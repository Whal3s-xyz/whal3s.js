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
import { NETWORKS } from './networks';
import ExceptionHandler from './exceptionHandler';

class NftValidationUtility extends HttpClient {
  private id: string;
  private apiKey: string;
  public details: NFTUtility;
  public nfts: ValidNFT;
  public wallet: Wallet;

  constructor() {
    super(`${API_URL}`);
    this._initializeRequestInterceptor();
  }
  private _initializeRequestInterceptor = () => {
    this.instance.interceptors.request.use(this._handleRequest);
  };
  private _handleRequest = (config: AxiosRequestConfig) => {
    config.headers['Authorization'] = `Bearer ${this.apiKey}`;
    return config;
  };

  public static async createValidationUtility(
    wallet: Wallet,
    apiKey: string,
    id: string
  ) {
    // assumes user can create multiple validation utilities in one app
    const validationUtilityInstance = new NftValidationUtility();
    validationUtilityInstance.wallet = wallet;
    validationUtilityInstance.apiKey = apiKey;
    validationUtilityInstance.id = id;
    validationUtilityInstance.details =
      await validationUtilityInstance.getValidationUtility();
    return validationUtilityInstance;
  }

  public async connectWallet() {
    await this.wallet.connect(this.details.network);
    console.log('logged in adddress:', this.wallet.address);
    this.nfts = await this.getAllNftWallet();
    console.log(this.nfts);
  }

  public async claimNFT(reserve: boolean, nftId: string): Promise<boolean> {
    try {
      const isOnTheSameNetwork = await this.wallet.onSameNetwork(
        this.details.network
      );

      if (isOnTheSameNetwork) {
        //step1: fetch the message to sign
        const msg = await this.getMessage();
        console.log('msg:', msg);

        //step2: ask user to sign the message
        const signedMsgHash = await this.wallet.signMessage(msg);
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
      } else {
        await this.wallet.switchNetwork(NETWORKS.ETH_GOERLI);
      }
    } catch (error) {
      this.catchError(error);
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
  public getAllNftWallet = () =>
    this.instance.get<ValidNFT>(
      `nft-validation-utilities/${this.id}/wallet/${this.wallet.address}`
    );

  //get message to sign
  public getMessage = async () => {
    if (!this.wallet.address) {
      this.handleError(
        new Error(
          'You need to be connected to wallet to be able to getMessage'
        ),
        ExceptionHandler.Type.INTERACTION
      );
    }
    try {
      const res = await this.instance.post<{ message: string }>(
        `signature-messages`,
        {
          utility_id: this.id,
          wallet_address: this.wallet.address
        }
      );
      return res.message;
    } catch (e) {
      this.catchError(e);
    }
  };

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
