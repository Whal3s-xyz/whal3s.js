import Onboard, { OnboardAPI } from '@web3-onboard/core';
import injectedModule from '@web3-onboard/injected-wallets';
import walletConnectModule from '@web3-onboard/walletconnect';
import { Bytes, ethers, providers } from 'ethers';
import {
  ETH_GOERLI,
  ETH_MAINNET,
  MATIC_MAINNET,
  MATIC_MUMBAI,
  resolveNetwork
} from './networks';
import { Network } from '../types/types-internal';

const walletConnect = walletConnectModule();

const injected = injectedModule();

export class Wallet {
  private static _instance: any;
  debug = false;
  address: string | undefined;
  public onboard: OnboardAPI | undefined;
  signer: providers.JsonRpcSigner | undefined;
  ethersProvider: providers.Web3Provider | undefined;

  constructor() {
    if (Wallet._instance) {
      return Wallet._instance;
    }
    Wallet._instance = this;
  }

  init = async () => {
    //Planned feature: Onboard config should fit Utility and it's creator (Chains, Logo, color,...)
    this.onboard = Onboard({
      wallets: [injected, walletConnect],
      chains: [ETH_MAINNET, ETH_GOERLI, MATIC_MAINNET, MATIC_MUMBAI],
      appMetadata: {
        name: 'Utility app',
        icon: 'https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/280x280.png',
        logo: 'https://whal3s-assets.s3.eu-central-1.amazonaws.com/logos/280x280.png',
        description: 'Whal3s powered application',
        recommendedInjectedWallets: [
          { name: 'MetaMask', url: 'https://metamask.io' }
        ]
      },
      accountCenter: {
        desktop: {
          enabled: false
        },
        mobile: {
          enabled: false
        }
      }
    });
  };

  connect = async (network: Network | string): Promise<boolean> => {
    if (typeof network === 'string') network = resolveNetwork(network);

    try {
      const wallets = await this.onboard.connectWallet();
      console.log('wallets...', wallets);
      await this.onboard.setChain({ chainId: network.id });
      if (wallets[0]) {
        // create an ethers provider with the last connected wallet provider
        this.ethersProvider = new ethers.providers.Web3Provider(
          wallets[0].provider,
          'any'
        );
        this.signer = this.ethersProvider.getSigner();
        this.address = await this.signer.getAddress();
        return true;
      } else {
        console.log('noWalletSelected');
        throw 'No wallet selected';
        // this.dispatch('noWalletSelected')
      }
    } catch (e) {
      return false;
    }
  };
  switchNetwork = async (network: Network | string): Promise<boolean> => {
    if (typeof network === 'string') network = resolveNetwork(network);
    return this.onboard.setChain({ chainId: network.id });
  };
  signMessage = async (message: Bytes | string): Promise<string> => {
    return this.signer.signMessage(message);
  };
}
export default Wallet;
