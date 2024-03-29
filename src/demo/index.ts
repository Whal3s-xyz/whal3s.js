import Alpine from 'alpinejs';
import Whal3s from '../lib';

const id = 'd8ede9df-9e48-42c4-abba-57688082a3a7';

document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        initialized: false,
        logs: [],
        whal3s: undefined,
        validationUtility: undefined,
        walletAddress: '',
        tokenId: undefined,
        email: '',
        step: 0,
        nfts: [],
        utilityData: {
            id: '',
            network: '',
            address: '',
            tokenId: '',
            message: '',
            signature: '',
            nfts: {},
        },

        async init() {
            this.whal3s = new Whal3s({
                accountCenter: {
                    mobile: {
                        enabled: true,
                        position: 'bottomRight',
                    },
                    desktop: {
                        enabled: true,
                        position: 'bottomRight',
                    }
                }
            });
            this.validationUtility = await this.whal3s.createValidationUtility(id)
            this.step = this.validationUtility.step
            this.validationUtility.addEventListener('stepChanged', () => {
                this.step = this.validationUtility.step
                this.walletAddress = this.validationUtility.wallet.address
                this.updateUtilityData()
            })
            this.validationUtility.addEventListener('nftsFetched', () => {
                this.nfts = {...this.validationUtility.nfts}
            })
            this.initialized = true;

        },
        connectWallet() {
            this.validationUtility
                .connectWallet()
                .catch((error: any) => console.log('Could not connect to wallet', error));
        },
        selectNft(tokenId: string) {
            this.validationUtility.tokenId = tokenId
        },
        async reserve() {
            await this.validationUtility.reserveEngagement()

        },
        async claim() {
            await this.validationUtility.storeEngagement({email: this.email})
        },
        async sign() {
            await this.validationUtility.sign()
            this.updateUtilityData()
        },
        updateUtilityData() {
            this.utilityData = {
                id: this.validationUtility.details.id,
                network: this.validationUtility.details.network,
                address: this.validationUtility.wallet.address,
                tokenId: this.validationUtility.tokenId,
                message: this.validationUtility.message,
                signature: this.validationUtility.signature,
                nfts: this.validationUtility.nfts,
            }
        }
    }));
});

Alpine.start();
