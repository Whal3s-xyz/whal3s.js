import Onboard, {
    InitOptions,
    OnboardAPI,
    WalletState
} from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import {Bytes, ethers, providers} from 'ethers';
import {
    ETH_GOERLI,
    ETH_MAINNET,
    MATIC_MAINNET,
    MATIC_MUMBAI,
    NETWORKS
} from './networks';
import {Network} from '../types/types-internal';
import {asyncSome} from '../helpers';
import ExceptionHandler from './exceptionHandler';

const walletConnect = walletConnectModule();
const injected = injectedModule();

type NetworkArguments = Network | keyof typeof NETWORKS;

export const SUPPORTED_WALLETS = {
    INJECTED: injected,
    WALLET_CONNECT: walletConnect
};

export class Wallet extends EventTarget {
    private static _instance: InstanceType<typeof Wallet>;

    private readonly exceptionHandler: ExceptionHandler
    public onboard: OnboardAPI | undefined;
    ethersProvider: providers.Web3Provider | undefined;

    private _lastWalletState: WalletState | undefined;

    constructor(walletConfig: InitOptions) {
        super();

        if (Wallet._instance) {
            return Wallet._instance;
        }

        this.exceptionHandler = new ExceptionHandler()
        Wallet._instance = this;

        // assumes default that can and should be overridden
        this.onboard = Onboard({
            wallets: [injected, walletConnect],
            chains: [ETH_MAINNET, ETH_GOERLI, MATIC_MAINNET, MATIC_MUMBAI],
            appMetadata: {
                name: 'Utility app',
                icon: 'https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/280x280.png',
                logo: 'https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/Whal3s_black.png',
                description: 'Whal3s powered application',
                recommendedInjectedWallets: [
                    {name: 'MetaMask', url: 'https://metamask.io'}
                ]
            },
            accountCenter: {
                desktop: {
                    enabled: true
                },
                mobile: {
                    enabled: true
                }
            },
            connect: {
                autoConnectLastWallet: true
            },
            ...walletConfig
        });
        this.onboard.state.select('wallets').subscribe((update) => {
            if (update?.[0]?.accounts?.[0]?.address !== this._lastWalletState?.accounts?.[0]?.address) {
                this._lastWalletState = {...update[0]}
                this.dispatchEvent(new CustomEvent('addressChanged', {detail: {address: update[0]?.accounts[0]?.address}}))
            }
        })


    }


    get address(): string | undefined {
        const state = this.onboard.state.get()
        return state.wallets[0]?.accounts[0]?.address
    }

    get signer(): providers.JsonRpcSigner | undefined | ethers.Signer {
        const state = this.onboard.state.get()
        const ethersProvider = new ethers.providers.Web3Provider(state.wallets[0]?.provider, 'any')
        return ethersProvider.getSigner()
    }


    private getNetwork(network: NetworkArguments): Network {
        return typeof network === 'string' ? NETWORKS[network] : network;
    }

    connect = async (network: NetworkArguments): Promise<boolean> => {
        network = this.getNetwork(network);

        try {

            const currentState = this.onboard.state.get()

            let wallets = currentState.wallets
            if (currentState.wallets.length === 0)
                wallets = await this.onboard.connectWallet();


            if (wallets.length === 0) {
                this.exceptionHandler.handleError(
                    new Error('No wallet selected'),
                    ExceptionHandler.Type.INTERACTION
                );
            }
            await this.onboard.setChain({chainId: network.id});
            return true

        } catch (error) {
            this.exceptionHandler.catchError(error);
        }
    };

    public switchNetwork = async (
        network: NetworkArguments
    ): Promise<boolean> => {
        network = this.getNetwork(network);

        try {
            const success = await this.onboard.setChain({chainId: network.id});
            if (success) {
                return true;
            } else {
                this.exceptionHandler.handleError(
                    new Error('User rejected request'),
                    ExceptionHandler.Type.INTERACTION
                );
            }
        } catch (e) {
            this.exceptionHandler.catchError(e);
        }
    };

    public signMessage = async (message: Bytes | string): Promise<string> => {
        try {
            return await this.signer.signMessage(message);
        } catch (e) {
            this.exceptionHandler.catchError(e);
        }
    };

    public onSameNetwork = async (network: keyof typeof NETWORKS) => {
        const wallets = this.onboard.state.get().wallets;

        return asyncSome<WalletState>(wallets, async (wallet) => {
            const chainId = await wallet.provider.request({method: 'eth_chainId'});
            return chainId === NETWORKS[network].id;
        });
    };
}

export default Wallet;
