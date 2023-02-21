import Wallet from './wallet';
import {
    EngagementRequest,
    EngagementResponse,
    NFTUtility,
    WalletNftValidationResponse
} from '../types/types-internal';
import {API_URL} from '../utils/env';
import {AbstractUtility} from '../utils/abstractUtility';
import ExceptionHandler from './exceptionHandler';


class NftValidationUtility extends AbstractUtility {

    public static readonly STEP_UNINITIALIZED: number = 0;
    public static readonly STEP_INITIALIZED: number = 1;
    public static readonly STEP_WALLET_CONNECTED: number = 2;
    public static readonly STEP_NFTS_FETCHED: number = 3;
    public static readonly STEP_TOKEN_SELECTED: number = 4;
    public static readonly STEP_RESERVED: number = 5;
    public static readonly STEP_CLAIMED: number = 6;


    private id: string;
    public details: NFTUtility;
    public nfts: WalletNftValidationResponse = {nfts: [], error: [], valid: undefined};

    private _step = NftValidationUtility.STEP_UNINITIALIZED
    private _tokenId: string
    private _message: string
    private _signature: string
    private _reservation: EngagementResponse | null = null
    private _engagement: EngagementResponse | null = null
    public wallet: Wallet;


    constructor() {
        super(`${API_URL}`);
    }


    get step(): number {
        return this._step;
    }

    set step(value: number) {
        const oldStep = this._step
        this._step = value;
        if (oldStep !== value)
            this.dispatchEvent(new CustomEvent('stepChanged', {detail: {step: value}}))
    }

    get tokenId(): string {
        return this._tokenId;
    }

    set tokenId(value: string) {
        const oldTokenId = this._tokenId
        this._tokenId = value;
        if (oldTokenId !== value) {
            this._message = ''
            this._signature = ''
            this._reservation = null
            this._engagement = null
        }
        this.computeStep()

    }

    get message(): string {
        return this._message;
    }

    set message(value: string) {
        if (this._message !== value)
            this._signature = ''
        this._message = value;
    }

    get signature(): string {
        return this._signature;
    }

    set signature(value: string) {
        this._signature = value;
    }

    get reservation(): EngagementResponse | null {
        return this._reservation;
    }

    set reservation(value: EngagementResponse | null) {
        this._reservation = value;
        this.computeStep()
    }

    get engagement(): EngagementResponse | null {
        return this._engagement;
    }

    set engagement(value: EngagementResponse | null) {
        this._engagement = value;
        this.computeStep()
    }

    private computeStep() {
        if (!this.wallet)
            return this.step = NftValidationUtility.STEP_UNINITIALIZED
        if (!this.wallet.address)
            return this.step = NftValidationUtility.STEP_INITIALIZED
        if (this.nfts === undefined || this.nfts.valid === undefined)
            return this.step = NftValidationUtility.STEP_WALLET_CONNECTED
        if (this.nfts && !this.tokenId)
            return this.step = NftValidationUtility.STEP_NFTS_FETCHED
        if (!this.reservation && !this.engagement)
            return this.step = NftValidationUtility.STEP_TOKEN_SELECTED
        if (this.reservation && !this.engagement)
            return this.step = NftValidationUtility.STEP_RESERVED
        return this.step = NftValidationUtility.STEP_CLAIMED
    }

    public static async createValidationUtility(
        wallet: Wallet,
        id: string
    ) {
        // assumes user can create multiple validation utilities in one app
        const validationUtilityInstance = new NftValidationUtility();
        validationUtilityInstance.id = id;
        validationUtilityInstance.wallet = wallet;
        validationUtilityInstance.details = await validationUtilityInstance.sendGetValidationUtilityRequest();
        if (validationUtilityInstance.wallet.address)
            validationUtilityInstance.fetchNfts()
        validationUtilityInstance.wallet.addEventListener('addressChanged', () => {
            validationUtilityInstance.tokenId = undefined
            if (validationUtilityInstance.wallet.address)
                validationUtilityInstance.fetchNfts()
            validationUtilityInstance.computeStep()

        }, {signal: validationUtilityInstance.abortController.signal})
        validationUtilityInstance.computeStep()
        return validationUtilityInstance;
    }

    private checkWalletIsConnected() {
        if (!this.wallet.address) {
            this.exceptionHandler.handleError(
                new Error(
                    'Wallet not connected'
                ),
                ExceptionHandler.Type.INTERNAL
            )
        }
    }

    private checkTokenIdIsSet() {
        if (!this.tokenId) {
            this.exceptionHandler.handleError(
                new Error(
                    'No token id selected'
                ),
                ExceptionHandler.Type.INTERNAL
            )
        }
    }

    public async connectWallet() {

        try {
            await this.wallet.connect(this.details.network);
        } catch (e) {
            // todo: correctly handle this case
            this.exceptionHandler.catchError(e)
        }

        const isOnTheSameNetwork = await this.wallet.onSameNetwork(
            this.details.network
        );

        if (!isOnTheSameNetwork) {
            try {
                await this.wallet.switchNetwork(this.details.network);

            } catch (e) {
                // todo: correctly handle this case
                this.exceptionHandler.catchError(e)
            }
        }

        this.computeStep()
        this.dispatchEvent(new CustomEvent('walletConnected', {detail: {address: this.wallet.address}}))

    }


    public async reserveEngagement() {
        this.checkWalletIsConnected()
        this.checkTokenIdIsSet()
        if (!this.message) {
            const messageResponse = await this.sendGetMessageRequest()
            this.message = messageResponse.message
        }
        this.signature = await this.wallet.signMessage(this.message)
        const response = await this.sendReserveEngagementRequest({
            token_id: this.tokenId,
            signature: this.signature,
            wallet_address: this.wallet.address
        })
        this.reservation = response
        this.dispatchEvent(new CustomEvent('engagementReserved', {detail: {engagement: response}}))
        return response
    }

    public async storeEngagement(metadata: any = null) {
        this.checkWalletIsConnected()
        this.checkTokenIdIsSet()
        if (!this.message) {
            const messageResponse = await this.sendGetMessageRequest()
            this.message = messageResponse.message
        }
        if (!this.signature)
            this.signature = await this.wallet.signMessage(this.message)

        if (typeof metadata === 'object')
            metadata = JSON.stringify(metadata)
        const response = await this.sendStoreEngagementRequest({
            token_id: this.tokenId,
            signature: this.signature,
            wallet_address: this.wallet.address,
            metadata: metadata
        })
        this.engagement = response
        this.dispatchEvent(new CustomEvent('engagementStored', {detail: {engagement: response}}))
        return response
    }


    public async fetchNfts() {
        try {
            this.checkWalletIsConnected()
            this.nfts = await this.sendGetAllNftWalletRequest()
        } catch (e) {
            this.nfts = {
                nfts: [],
                valid: undefined,
                error: []
            }
            this.exceptionHandler.catchError(e)
        }
        this.dispatchEvent(new CustomEvent('nftsFetched', {detail: {nfts: this.nfts}}))
        this.computeStep()
        return this.nfts

    }

    //API methods

    //get all the NFT Validation Utilities
    private sendGetValidationUtilityRequest = () =>
        this.instance.get<NFTUtility>(`nft-validation-utilities/${this.id}`);

    //get all NFTs for wallet
    private sendGetAllNftWalletRequest = () =>
        this.instance.get<WalletNftValidationResponse>(
            `nft-validation-utilities/${this.id}/wallet/${this.wallet.address}`
        );

    //get message to sign
    private sendGetMessageRequest = () => this.instance.post<{ message: string }>(
        `signature-messages`,
        {
            utility_id: this.id,
            wallet_address: this.wallet.address
        }
    );

    //reserve NFT engagement
    private sendReserveEngagementRequest = (params: EngagementRequest) =>
        this.instance.post<EngagementResponse>(
            `user/nft-validation-utilities/${this.id}/engagement-reservations`,
            params
        );

    //store NFT engagement
    public sendStoreEngagementRequest = (params: EngagementRequest) =>
        this.instance.post<EngagementResponse>(
            `user/nft-validation-utilities/${this.id}/engagements`,
            params
        );

    public destroy() {
        this.abortController.abort()
    }
}

export default NftValidationUtility;

