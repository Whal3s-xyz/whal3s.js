import * as dotenv from 'dotenv';
import NftValidationUtility from '../core/nftValidationUtility';
import { Engagement, NFTUtilityRequest } from '../types/types-internal';
dotenv.config();

const API_KEY = process.env.API_KEY;

const api = NftValidationUtility.getInstance(API_KEY);

async function createUtility() {
  try {
    const body: NFTUtilityRequest = {
      network: 'MATIC_MUMBAI',
      contract_address: '0x343DeEe1648e5B50C08Ab9b0cF5baC424a97B2FF'
    };
    const res = await api.createNftValidationUtility(body);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
    // console.log(
    //   `err status:${err.response.status}, err msg:${err.response.data.message}`
    // );
  }
}
async function updateUtility() {
  try {
    const ID = '81b2dfbf-2ca5-4496-a664-f95f8ec96e9a';
    const body: NFTUtilityRequest = {
      network: 'MATIC_MUMBAI',
      contract_address: '0x343DeEe1648e5B50C08Ab9b0cF5baC424a97B2FF',
      max_engagements: 1
    };
    const res = await api.updateNftUtility(body, ID);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
    // console.log(
    //   `err status:${err.response.status}, err msg:${err.response.data.message}`
    // );
  }
}

async function deleteUtility() {
  try {
    const ID = '2888e20f-e563-417e-a0aa-c2b36fbaa757';
    const res = await api.deleteNftUtility(ID);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
  }
}

async function getUtility() {
  try {
    const ID = 'd7477d55-64c8-4cbf-87cb-56fc13efcd1b';
    const res = await api.getNftUtility(ID);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
  }
}

async function storeEngagement() {
  try {
    const ID = 'd7477d55-64c8-4cbf-87cb-56fc13efcd1b';
    const metadata = JSON.stringify({
      img: 'cartoon'
    });
    const body: Engagement = {
      token_id: '1',
      metadata,
      staus: 'PENDING'
    };
    const res = await api.storeEngagement(body, ID);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
  }
}

async function getAllEngagements() {
  try {
    const ID = 'd7477d55-64c8-4cbf-87cb-56fc13efcd1b';
    const res = await api.getAllEngagements(ID);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
  }
}

async function updateEngagement() {
  try {
    const ID = 'd7477d55-64c8-4cbf-87cb-56fc13efcd1b';
    const engID = 'd5f12b78-3578-4270-8087-12e9f7dc2165';
    const metadata = JSON.stringify({
      img: 'cartoon network'
    });
    const body: Engagement = {
      token_id: '1',
      metadata,
      staus: 'PENDING'
    };
    const res = await api.updateEngagement(body, ID, engID);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
  }
}

async function removeEngagement() {
  try {
    const ID = 'd7477d55-64c8-4cbf-87cb-56fc13efcd1b';
    const engID = 'd5f12b78-3578-4270-8087-12e9f7dc2165';
    const res = await api.removeEngagement(ID, engID);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
  }
}

async function getEngagement() {
  try {
    const ID = 'd7477d55-64c8-4cbf-87cb-56fc13efcd1b';
    const engID = 'cee4d714-56e4-4723-a6f7-59172597fbbd';
    const res = await api.getEngagement(ID, engID);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
  }
}

async function getAllUtilityWallet() {
  try {
    const ID = 'd7477d55-64c8-4cbf-87cb-56fc13efcd1b';
    const wallet = '0xd3275a5595f02c87c133abf7fb581078d2bc6dc2';
    const res = await api.getAllUtlitiyWallet(ID, wallet);
    console.log('res:', res);
  } catch (err) {
    console.log(err);
  }
}

async function getValidationUtilities() {
  try {
    const res = await api.getValidationUtilities();
    console.log('res:', res);
  } catch (err) {
    console.log(
      `err status:${err.response.status}, err msg:${err.response.data.message}`
    );
  }
}

// getEngagement();
// removeEngagement();
// updateEngagement();
// storeEngagement();
// getAllEngagements();
// deleteUtility();
// getAllUtilityWallet();
//updateUtility();

// createUtility();
// getUtility();
// getValidationUtilities();
