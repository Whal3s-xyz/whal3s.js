import { ETH_GOERLI, Wallet } from '../lib';
import { ETH_MAINNET } from '../lib';
import Alpine from 'alpinejs';

// window.Alpine = Alpine;
const wallet = new Wallet();
console.log('myWallet', wallet);
document.addEventListener('alpine:init', () => {
  Alpine.data('app', () => ({
    open: false,
    initialized: false,
    wallet: undefined,
    // walletAddress: "",
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
        console.log({ wallet: wallet.address });
      });
    },
    signMessage() {
      wallet
        .signMessage('hello world')
        .then((signature) => console.log(signature));
    },
    getWalletAddress() {
      console.log('getter');
      return this.wallet?.address;
    }
  }));
});

Alpine.start();
