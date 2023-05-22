import {
    EngagementRequest,
    EngagementResponse,
    NFTUtility,
    WalletNftValidationResponse
} from '../types';
import {API_URL} from '../utils/env';
import {AbstractUtility} from '../utils/abstractUtility';
import ExceptionHandler from './exceptionHandler';
import WalletProviderInterface from "./providers/WalletProviderInterface";
import {NETWORKS} from "./networks";


class NftValidationUtility extends AbstractUtility {

    public static readonly STEP_UNINITIALIZED: number = 0;
    public static readonly STEP_INITIALIZED: number = 1;
    public static readonly STEP_WALLET_CONNECTED: number = 2;
    public static readonly STEP_NFTS_FETCHED: number = 3;
    public static readonly STEP_TOKEN_SELECTED: number = 4;
    public static readonly STEP_RESERVED: number = 5;
    public static readonly STEP_CLAIMED: number = 6;


    private _id: string;
    public details: NFTUtility;
    public nfts: WalletNftValidationResponse = {nfts: [], errors: [], valid: undefined};

    private _step = NftValidationUtility.STEP_UNINITIALIZED
    private _tokenId: string
    private _message: string
    private _signature: string
    private _reservation: EngagementResponse | null = null
    private _engagement: EngagementResponse | null = null
    public walletProvider: WalletProviderInterface;


    constructor() {
        super(`${API_URL}`);
    }

    get id(): string {
        return this._id;
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

    private async computeStep() {
        if (!this.walletProvider)
            return this.step = NftValidationUtility.STEP_UNINITIALIZED
        if (!(await this.walletProvider.getAddress()))
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
        walletProvider: WalletProviderInterface,
        id: string
    ) {
        // assumes user can create multiple validation utilities in one app
        const validationUtilityInstance = new NftValidationUtility();
        validationUtilityInstance._id = id;
        validationUtilityInstance.walletProvider = walletProvider;
        validationUtilityInstance.details = await validationUtilityInstance.sendGetValidationUtilityRequest();
        if (await validationUtilityInstance.walletProvider.getAddress())
            validationUtilityInstance.fetchNfts()
        validationUtilityInstance.walletProvider.addEventListener('addressChanged', async () => {
            validationUtilityInstance.resetUserData()
            if (await validationUtilityInstance.walletProvider.getAddress())
                validationUtilityInstance.fetchNfts()

        }, {signal: validationUtilityInstance.abortController.signal})
        validationUtilityInstance.computeStep()
        return validationUtilityInstance;
    }

    private async checkWalletIsConnected() {
        if (!(await this.walletProvider.getAddress())) {
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
            await this.walletProvider.connect(NETWORKS[this.details.network])
        } catch (e) {
            // todo: correctly handle this case
            this.exceptionHandler.catchError(e)
        }

        const isOnTheSameNetwork = await this.walletProvider.onSameNetwork(
            NETWORKS[this.details.network]
        );

        if (!isOnTheSameNetwork) {
            try {
                await this.walletProvider.switchNetwork(NETWORKS[this.details.network]);

            } catch (e) {
                // todo: correctly handle this case
                this.exceptionHandler.catchError(e)
            }
        }

        this.computeStep()
        this.dispatchEvent(new CustomEvent('walletConnected', {detail: {address: await this.walletProvider.getAddress()}}))

    }


    public async reserveEngagement() {
        await this.checkWalletIsConnected()
        this.checkTokenIdIsSet()
        if (!this.message) {
            const messageResponse = await this.sendGetMessageRequest()
            this.message = messageResponse.message
        }
        this.signature = await this.walletProvider.signMessage(this.message)
        const response = await this.sendReserveEngagementRequest({
            token_id: this.tokenId,
            signature: this.signature,
            wallet_address: await this.walletProvider.getAddress()
        })
        this.reservation = response
        this.dispatchEvent(new CustomEvent('engagementReserved', {detail: {engagement: response}}))
        return response
    }

    public async storeEngagement(metadata: any = null) {
        await this.checkWalletIsConnected()
        this.checkTokenIdIsSet()
        if (!this.message) {
            const messageResponse = await this.sendGetMessageRequest()
            this.message = messageResponse.message
        }
        if (!this.signature)
            this.signature = await this.walletProvider.signMessage(this.message)

        if (typeof metadata === 'object')
            metadata = JSON.stringify(metadata)
        const response = await this.sendStoreEngagementRequest({
            token_id: this.tokenId,
            signature: this.signature,
            wallet_address: await this.walletProvider.getAddress(),
            metadata: metadata
        })
        this.engagement = response
        this.dispatchEvent(new CustomEvent('engagementStored', {detail: {engagement: response}}))
        return response
    }


    public async fetchNfts() {
        console.log('fetchNfts')
        try {
            await this.checkWalletIsConnected()
            this.nfts = await this.sendGetAllNftWalletRequest()
        } catch (e) {
            this.nfts = {
                nfts: [],
                valid: undefined,
                errors: []
            }
            this.exceptionHandler.catchError(e)
        }
        this.dispatchEvent(new CustomEvent('nftsFetched', {detail: {nfts: this.nfts}}))
        this.computeStep()
        return this.nfts

    }

    public async sign() {
        await this.checkWalletIsConnected()
        if (!this.message) {
            const messageResponse = await this.sendGetMessageRequest()
            this.message = messageResponse.message
        }
        this.signature = await this.walletProvider.signMessage(this.message)
        this.dispatchEvent(new CustomEvent('signed', {detail: {signature: this.signature}}))
        return this.signature
    }

    public resetUserData() {
        this._tokenId = undefined
        this.nfts = {nfts: [], errors: [], valid: undefined}
        this._reservation = null
        this._engagement = null
        this._message = ''
        this._signature = ''
        this.computeStep()
    }

    //API methods

    //get all the NFT Validation Utilities
    private sendGetValidationUtilityRequest = () =>
        this.instance.get<NFTUtility>(`nft-validation-utilities/${this._id}`);

    //get all NFTs for wallet
    private sendGetAllNftWalletRequest = async () =>
        this.instance.get<WalletNftValidationResponse>(
            `nft-validation-utilities/${this._id}/wallet/${await this.walletProvider.getAddress()}`
        );

    //get message to sign
    private sendGetMessageRequest = async () => this.instance.post<{ message: string }>(
        `signature-messages`,
        {
            utility_id: this._id,
            wallet_address: await this.walletProvider.getAddress()
        }
    );

    //reserve NFT engagement
    private sendReserveEngagementRequest = (params: EngagementRequest) =>
        this.instance.post<EngagementResponse>(
            `user/nft-validation-utilities/${this._id}/engagement-reservations`,
            params
        );

    //store NFT engagement
    public sendStoreEngagementRequest = (params: EngagementRequest) =>
        this.instance.post<EngagementResponse>(
            `user/nft-validation-utilities/${this._id}/engagements`,
            params
        );



    public destroy() {
        this.abortController.abort()
    }
}

export default NftValidationUtility;

