import {
  MATIC_MAINNET,
  MATIC_MUMBAI,
  ETH_MAINNET,
  ETH_GOERLI
} from './core/networks';
import NftValidationUtility from './core/nftValidationUtility';
import Wallet from './core/wallet';

class Whal3s {
  constructor() {
    console.log('Library constructor loaded');
  }

  myMethod = (): boolean => {
    console.log('Library method fired');
    return true;
  };
}

export {
  Whal3s,
  Wallet,
  NftValidationUtility,
  MATIC_MAINNET,
  MATIC_MUMBAI,
  ETH_MAINNET,
  ETH_GOERLI
};
