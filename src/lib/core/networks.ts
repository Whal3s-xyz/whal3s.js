import {
  ETH_MAINNET_RPC,
  ETH_GOERLI_RPC,
  MATIC_MUMBAI_RPC,
  MATIC_MAINNET_RPC
} from '../utils/env';

import { Network } from '../types/types-internal';

export const ETH_MAINNET: Network = {
  id: '0x1',
  token: 'ETH',
  label: 'Ethereum Mainnet',
  rpcUrl: ETH_MAINNET_RPC
};
export const ETH_GOERLI: Network = {
  id: '0x5',
  token: 'ETH',
  label: 'Ethereum Görli Testnet',
  rpcUrl: ETH_GOERLI_RPC
};
export const MATIC_MAINNET: Network = {
  id: '0x89',
  token: 'MATIC',
  label: 'Matic Mainnet',
  rpcUrl: MATIC_MAINNET_RPC
};
export const MATIC_MUMBAI: Network = {
  id: '0x13881',
  token: 'MATIC',
  label: 'Matic Mumbai',
  rpcUrl: MATIC_MUMBAI_RPC
};

export const NETWORKS = {
  MATIC_MAINNET,
  MATIC_MUMBAI,
  ETH_MAINNET,
  ETH_GOERLI
};
