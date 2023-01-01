import Alpine from 'alpinejs';
import { NftValidationUtility, Wallet } from '../lib';
// import { EngagementRequest } from '../lib/types/types-internal';
// import { Wallet, NftValidationUtility, ETH_GOERLI } from '@whal3s/whal3s.js'; Use this with `npm pack` to test the actual library; it replicates the original NPM package.

const wallet = new Wallet();
const API_KEY = 'q0YZdgPQpLXTtrbb5H5dCaT6bQo1rZ60BJdnHEjk';
const id = 'd7477d55-64c8-4cbf-87cb-56fc13efcd1b';
let apiModule: NftValidationUtility;

console.log('myWallet', wallet);
document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    open: false,
    initialized: false,
    wallet: undefined,
    address: '',
    utility: {},
    apiModule: undefined,
    result: '',
    nfts: [],
    foo: 'bar',
    toggle() {
      this.open = !this.open;
    },
    init() {
      wallet.init().then(() => {
        this.initialized = true;
        this.wallet = wallet;
      });
      NftValidationUtility.getInstance(id, API_KEY).then((res) => {
        apiModule = res;
        this.utility = apiModule.utility;
      });
    },
    connectWallet() {
      apiModule.connectWallet().then((r) => {
        this.address = wallet.address;
        this.nfts = apiModule.nfts;
        console.log(this.nfts);
        console.log({ wallet: wallet.address });
      });
    },
    signMessage() {
      wallet
        .signMessage('hello world')
        .then((signature) => console.log(signature));
    },
    swithNetwork(network: string) {
      wallet.switchNetwork(network).then((r) => {
        console.log(r);
      });
    },
    async getNFTValidations() {
      try {
        const res = await apiModule.getValidationUtilities();
        this.result = JSON.stringify(res); // just for the display purpose on the fontend
        console.log(res);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async getWalletNfts() {
      try {
        console.log('wallet addess:', this.wallet.address);
        const nfts = await apiModule.getAllNftWallet(this.wallet.address);
        this.result = JSON.stringify(nfts); // just for the display purpose on the fontend
        console.log(nfts);
      } catch (error) {
        console.log(error);
        alert(error.message);
      }
    },
    async reserveEngagement() {
      try {
        const msg = await this.getMessage();
        const signedMsgHash = await wallet.signMessage(msg);
        const wallet_address: string = wallet.address || '';
        const body: EngagementRequest = {
          token_id: '1', //replace with your NFT id
          wallet_address,
          signature: signedMsgHash
        };
        const res = await apiModule.reserveEngagement(body);
        console.log(res);
        alert('NFT reserved');
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    },
    async storeEngagement() {
      try {
        const msg = await this.getMessage();
        const signedMsgHash = await wallet.signMessage(msg);
        const wallet_address: string = wallet.address || '';
        const body: EngagementRequest = {
          token_id: '1', //replace with your NFT id
          wallet_address,
          signature: signedMsgHash
        };
        const res = await apiModule.storeEngagement(body);
        console.log(res);
        alert('NFT stored');
      } catch (error) {
        alert(error.message);
        console.log(error);
      }
    },

    async claimNFT(id: string) {
      try {
        alert(`Claiming NFT ID:${id}`);
        const claim = await apiModule.claimNFT(true, id);
        alert(claim ? 'success' : 'fail');
      } catch (error) {
        console.log(error);
      }
    },
    async getMessage() {
      try {
        const res = await apiModule.getMessage(this.wallet.address);
        const msg: string = res.message;
        return msg;
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
