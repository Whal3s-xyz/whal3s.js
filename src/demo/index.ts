import {ETH_GOERLI, Wallet} from "../lib";
import {ETH_MAINNET} from "../lib";
import Alpine from "alpinejs";

const wallet = new Wallet();

console.log("myWallet", wallet);
document.addEventListener('alpine:init', () => {
    Alpine.data('app', () => ({
        open: false,
        initialized: false,
        wallet: undefined,
        foo: 'bar',
        toggle() {
            this.open = !this.open
        },
        init() {
            wallet.init().then(() => {
                this.initialized = true
                this.wallet = wallet
            })
        },
        connectWallet(networkString) {
            wallet.connect(networkString).then((r) => {

                console.log({wallet: wallet.address})})
        },
        signMessage() {
            wallet.signMessage('hello world').then((signature) => (console.log(signature)))
        },
        get walletAddress () {
            console.log('getter')
            return this.wallet?.address
        }
    }))
})

Alpine.start()


