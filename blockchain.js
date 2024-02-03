import { getRPC, methods } from "@primeairebels/primeaicoin-rpc";
import Reader from "@primeairebels/primeaicoin-reader";

import axios from "axios";
/*

All blockchain operations to into this file

 */

import getConfig from "./getConfig.js";
const CONFIG = getConfig();
const rpc = getRPC(
  CONFIG.primeai_username,
  CONFIG.primeai_password,
  CONFIG.primeai_url
);

Reader.setURL(CONFIG.primeai_url);
Reader.setUsername(CONFIG.primeai_username);
Reader.setPassword(CONFIG.primeai_password);

const options = {
  auth: {
    username: CONFIG.primeai_username,
    password: CONFIG.primeai_password,
  },
};
export function getAddressUTXOs(address) {
  //Fetch UTXOs for PrimeAI and for Assets

  const myPromise = new Promise((resolve, reject) => {
    //GET PrimeAI
    const p1 = rpc("getaddressutxos", [address]);
    //GET ASSETS
    const p2 = rpc("getaddressutxos", [
      {
        addresses: [address],
        assetName: "*",
      },
    ]);
    Promise.all([p1, p2])
      .then((values) => {
        const result = [];

        values[0].map((item) => result.push(item));
        values[1].map((item) => result.push(item));

        resolve(result);
      })
      .catch((e) => {
        reject("Could not get UTXOs");
      });
  });

  return myPromise;
}
export function getAssetData(name) {
  return Reader.getAsset(name);
}
export function getBlock(hash) {
  return Reader.getBlockByHash(hash);
}
export async function getTransaction(id) {
  return Reader.getTransaction(id);
}

export async function getCoinsInCirculation() {
  const method = "gettxoutsetinfo";
  const args = [];
  return rpc(method, args);
}
export async function listAssets() {
  const asset = "*";
  const verbose = true;

  return rpc("listassets", [asset, verbose]);
}
export async function getAddressBalance(address) {
  const balance = await Reader.getRavencoinBalance(address);
  balance.assets = await Reader.getAssetBalance(address);
  return balance;
}
export async function getType(value) {
  //Determine if id is block has, trans id or address

  if (!value) {
    return null;
  }
  if (value.length === 64) {
    //block or transaction
    try {
      const block = await rpc("getblock", [value]);
      if (block) {
        return "BLOCK";
      }
    } catch (e) {}

    try {
      const args = [];
      args.push(value);
      args.push(1); //verbose
      const transaction = await rpc("getrawtransaction", args);

      if (transaction) {
        return "TRANSACTION";
      }
    } catch (e) {}
  } else {
    //probably an address
    const valid = await rpc("validateaddress", [value]);
    if (valid.isvalid === true) {
      return "ADDRESS";
    }
  }

  //Check if block height
  const isNumber = Number.isNaN(Number(value)) === false;

  if (isNumber) {
    try {
      const block = await getBlockByHeight(parseFloat(value));

      if (block) {
        return "BLOCK";
      }
    } catch (e) {
      console.dir(e);
    }
  }

  return "UNKNOWN";
  //Check if block
}
export function getBlockByHeight(height) {
  return Reader.getBlockByHeight(height);
}
export function getBestBlockHash() {
  return Reader.getBestBlockHash();
}

export async function getBlockHash(hash) {
  return Reader.getBlockByHash(hash);
}
export async function getBlockHashes(start, end) {
  const requests = [];
  for (let i = start; i <= end; i++) {
    const data = {
      jsonrpc: "2.0",
      id: "getblockhash_" + i,
      method: "getblockhash",
      params: [i],
    };
    requests.push(data);
  }

  const rpcResponse = await axios.post(CONFIG.primeai_url, requests, options);

  const hashes = rpcResponse.data.map((item) => {
    return item.result;
  });

  return hashes;
}

async function getBlocksByHashes(hashes) {
  const blocksRequests = [];
  hashes.map((hash) => {
    const data = {
      jsonrpc: "2.0",
      id: Math.random(),
      method: "getblock",
      params: [hash],
    };
    blocksRequests.push(data);
  });

  const blocksResponse = await axios.post(
    CONFIG.primeai_url,
    blocksRequests,
    options
  );

  const blocks = blocksResponse.data.map((item) => item.result);
  return blocks;
}

export async function getAssets() {
  return Reader.getAllAssets();
}
export async function getAddressDeltas(address) {
  return Reader.getAddressDeltas(address);
}
export async function getRawMempool() {
  return Reader.getMempool();
}

export default {
  getAddressBalance,
  getAddressDeltas,
  getAddressUTXOs,
  getAssetData,
  getAssets,
  getBlock,
  getBlockByHeight,
  getBlockHash,
  getBlockHashes,
  getBestBlockHash,
  getBlock,
  getCoinsInCirculation,
  getRawMempool,
  getTransaction,
  getType,

  listAssets,
};
