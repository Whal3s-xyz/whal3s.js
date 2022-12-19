export interface Network {
  id: string;
  token: string;
  label: string;
  rpcUrl: string;
}

export interface NFTUtility {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  contract_address: string;
  network: string;
  max_engagements: number;
  max_engagements_per_nft: string;
}

export interface NFTUtilityRequest {
  network: string;
  contract_address: string;
  max_engagements?: number;
  max_engagements_per_nft?: number;
}

export interface Engagement {
  token_id: string;
  metadata?: any;
  staus?: 'PENDING' | 'VALID' | 'INVALID';
}

export type EngagementResponse = {
  id: string;
  type: string;
  created_at: string;
  updated_at: string;
  wallet_address: string;
  token_id: string;
  contract_address: string;
  network: string;
  metadata: any;
  status: 'PENDING' | 'VALID' | 'INVALID';
};

export type CallbackFunctionVariadic = (...args: any[]) => void;
export type Class = new (...args: any[]) => any;
