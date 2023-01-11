import Alpine from 'alpinejs';

import Whal3s from '../lib';
// import { Wallet, NftValidationUtility, ETH_GOERLI } from '@whal3s/whal3s.js'; Use this with `npm pack` to test the actual library; it replicates the original NPM package.

const id = '8d1015f9-af47-432d-aef2-a35c08a9df59';

document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        initialized: false,
        logs: [],
        whal3s: undefined,
        validationUtility: undefined,
        nfts: {},
        walletAddress: '',
        tokenId: undefined,
        email: '',
        step: 0,

        async init() {
            this.whal3s = new Whal3s();
            this.validationUtility = await this.whal3s.createValidationUtility(id)
            this.validationUtility.addEventListener('walletConnected', () => {
                console.log(this.validationUtility.wallet.address)
                this.walletAddress = this.validationUtility.wallet.address
            })
            this.validationUtility.addEventListener('nftsFetched', () => {
                this.nfts = this.validationUtility.nfts
            })
            this.initialized = true;
            this.validationUtility.addEventListener('stepChanged', () => {
                this.step = this.validationUtility.step
                console.log(this.validationUtility.step)
            })
        },
        connectWallet() {
            this.validationUtility
                .connectWallet()
                .catch((error:any) => console.log('Could not connect to wallet', error));
        },
        selectNft(tokenId:string){
            this.validationUtility.tokenId = tokenId
        },
        async reserve() {
           await this.validationUtility.reserveEngagement()

        },
        async claim() {
            await this.validationUtility.storeEngagement({email: this.email})
        }

    }));
});

Alpine.start();
