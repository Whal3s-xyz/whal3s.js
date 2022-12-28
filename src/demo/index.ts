import { ETH_GOERLI, Wallet, NftValidationUtility } from '../lib';
import { ETH_MAINNET } from '../lib';
import Alpine from 'alpinejs';
import { EngagementRequest } from '../lib/types/types-internal';
// import { Wallet, NftValidationUtility, ETH_GOERLI } from '@whal3s/whal3s.js'; Use this with `npm pack` to test the actual library; it replicates the original NPM package.

const wallet = new Wallet();
const apiModule = NftValidationUtility.getInstance(
  'your utility id', // utility id
  'your api key' // API key
);

console.log('myWallet', wallet);
document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    open: false,
    initialized: false,
    wallet: undefined,
    address: '',
    apiModule: undefined,
    result: undefined,
    foo: 'bar',
    toggle() {
      this.open = !this.open;
    },
    init() {
      wallet.init().then(() => {
        this.initialized = true;
        this.wallet = wallet;
      });
    },
    connectWallet(networkString) {
      wallet.connect(networkString).then((r) => {
        this.address = wallet.address;
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
