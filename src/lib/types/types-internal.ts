export interface Network {
  id: string;
  token: string;
  label: string;
  rpcUrl: string;
}

export type NFTUtility = {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  contract_address: string;
  network: string;
  max_engagements: number;
  max_engagements_per_nft: string;
};

export type EngagementRequest = {
  token_id: string;
  wallet_address: string;
  signature: string;
  metadata?: any;
};

export type EngagementResponse = {
  id: string;
  created_at: string;
  updated_at: string;
  wallet_address: string;
  token_id: string;
  contract_address: string;
  network: string;
  metadata?: any;
  status: string;
};

export type ValidNFT = {
  nfts: any;
  error: string[];
  valid: boolean;
};

export type CallbackFunctionVariadic = (...args: any[]) => void;
export type Class = new (...args: any[]) => any;
