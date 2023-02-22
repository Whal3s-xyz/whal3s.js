import Wallet from './wallet';
import { EngagementRequest, EngagementResponse, NFTUtility, WalletNftValidationResponse } from '../types/types-internal';
import { AbstractUtility } from '../utils/abstractUtility';
declare class NftValidationUtility extends AbstractUtility {
    static readonly STEP_UNINITIALIZED: number;
    static readonly STEP_INITIALIZED: number;
    static readonly STEP_WALLET_CONNECTED: number;
    static readonly STEP_NFTS_FETCHED: number;
    static readonly STEP_TOKEN_SELECTED: number;
    static readonly STEP_RESERVED: number;
    static readonly STEP_CLAIMED: number;
    private id;
    details: NFTUtility;
    nfts: WalletNftValidationResponse;
    private _step;
    private _tokenId;
    private _message;
    private _signature;
    private _reservation;
    private _engagement;
    wallet: Wallet;
    constructor();
    get step(): number;
    set step(value: number);
    get tokenId(): string;
    set tokenId(value: string);
    get message(): string;
    set message(value: string);
    get signature(): string;
    set signature(value: string);
    get reservation(): EngagementResponse | null;
    set reservation(value: EngagementResponse | null);
    get engagement(): EngagementResponse | null;
    set engagement(value: EngagementResponse | null);
    private computeStep;
    static createValidationUtility(wallet: Wallet, id: string): Promise<NftValidationUtility>;
    private checkWalletIsConnected;
    private checkTokenIdIsSet;
    connectWallet(): Promise<void>;
    reserveEngagement(): Promise<EngagementResponse>;
    storeEngagement(metadata?: any): Promise<EngagementResponse>;
    fetchNfts(): Promise<WalletNftValidationResponse>;
    private sendGetValidationUtilityRequest;
    private sendGetAllNftWalletRequest;
    private sendGetMessageRequest;
    private sendReserveEngagementRequest;
    sendStoreEngagementRequest: (params: EngagementRequest) => Promise<import("axios").AxiosResponse<EngagementResponse, any>>;
    destroy(): void;
}
export default NftValidationUtility;
