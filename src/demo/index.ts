import Alpine from 'alpinejs';

import Whal3s, { SUPPORTED_WALLETS, NETWORKS } from '../lib';
import { EngagementRequest } from '../lib/types/types-internal';
import NftValidationUtility from '../lib/core/nftValidationUtility';
// import { Wallet, NftValidationUtility, ETH_GOERLI } from '@whal3s/whal3s.js'; Use this with `npm pack` to test the actual library; it replicates the original NPM package.

const API_KEY = 'q0YZdgPQpLXTtrbb5H5dCaT6bQo1rZ60BJdnHEjk';
const id = '0ce0e23d-3cbf-40be-bb44-43d12239fbe6';

document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    open: false,
    initialized: false,
    wallet: undefined,
    whale3s: undefined,
    address: '',
    validationUtility: undefined,
    validationUtilityDetails: {},
    result: '',
    nfts: [],
    foo: 'bar',
    toggle() {
      this.open = !this.open;
    },

    init() {
      this.whale3s = new Whal3s(API_KEY, {
        wallets: [SUPPORTED_WALLETS.INJECTED, SUPPORTED_WALLETS.WALLET_CONNECT],
        chains: [
          NETWORKS.ETH_MAINNET,
          NETWORKS.ETH_GOERLI,
          NETWORKS.MATIC_MAINNET,
          NETWORKS.MATIC_MUMBAI
        ]
      });

      this.whale3s
        .createValidationUtility(id)
        .then((utility: NftValidationUtility) => {
          this.validationUtility = utility;
          this.validationUtilityDetails = utility.details;
        });
      this.initialized = true;
    },
    connectWallet() {
      this.validationUtility
        .connectWallet()
        .then(() => {
          this.address = this.whale3s.wallet.address;
          this.nfts = this.validationUtility.nfts;
          console.log(this.nfts);
          console.log({ wallet: this.whale3s.wallet.address });
        })
        .catch((error) => console.log('Could not connect to wallet', error));
    },
    signMessage() {
      this.whale3s.wallet
        .signMessage('hello world')
        .then((signature: string) => console.log(signature));
    },
    switchNetwork(network: string) {
      this.whale3s.wallet.switchNetwork(network).then((success: boolean) => {
        console.log(success);
      });
    },
    async getNFTValidations() {
      // todo: parts logic can be moved into utility
      try {
        const res = await this.validationUtility.getValidationUtilities();
        this.result = JSON.stringify(res); // just for the display purpose on the fontend
        console.log(res);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async getWalletNfts() {
      // todo: logic can be moved into utility
      try {
        console.log('wallet addess:', this.wallet.address);
        const nfts = await this.validationUtility.getAllNftWallet(
          this.wallet.address
        );
        this.result = JSON.stringify(nfts); // just for the display purpose on the fontend
        console.log(nfts);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async reserveEngagement() {
      // todo: logic can be moved into utility
      try {
        const msg = await this.validationUtility.getMessage();
        const signedMsgHash = await this.whale3s.wallet.signMessage(msg);
        const wallet_address: string = this.whale3s.wallet.address || '';
        const body: EngagementRequest = {
          token_id: '1', //replace with your NFT id
          wallet_address,
          signature: signedMsgHash
        };
        const res = await this.validationUtility.reserveEngagement(body);
        console.log(res);
        alert('NFT reserved');
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    },
    async storeEngagement() {
      // todo: logic can be moved into utility
      try {
        const msg = await this.validationUtility.getMessage();
        const signedMsgHash = await this.whale3s.wallet.signMessage(msg);
        const wallet_address: string = this.whale3s.wallet.address || '';
        const body: EngagementRequest = {
          token_id: '1', //replace with your NFT id
          wallet_address,
          signature: signedMsgHash
        };
        const res = await this.validationUtility.storeEngagement(body);
        console.log(res);
        alert('NFT stored');
      } catch (error) {
        console.log(error);
      }
    },

    async claimNFT(id: string) {
      try {
        alert(`Claiming NFT ID:${id}`);
        const claim = await this.validationUtility.claimNFT(true, id);
        alert(claim ? 'success' : 'fail');
      } catch (error) {
        console.log(error);
      }
    },
    get walletAddress() {
      console.log('getter');
      return this.wallet?.address;
    }
  }));
});

Alpine.start();
