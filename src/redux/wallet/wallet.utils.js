import axios from 'axios';
import { ethers } from 'ethers';
import {
  ETHERSCAN_API_KEY,
  ETHERSCAN_ENDPOINT,
  MAX_NFTS,
} from '../../constants';

export let axiosController = null;

// checks for valid Ethereum address, and prepends '0x' if valid address is lacking
export const validateAddress = (address) => {
  if (ethers.utils.isAddress(address)) {
    if (address.substring(0, 2) !== '0x') {
      return '0x' + address;
    }
    return address;
  } else {
    throw new Error(
      'Ethereum address provided is invalid.  Please check and try again.'
    );
  }
};

// calculates total amount of gas used by all 'from' transactions for address using Etherscan API
export const getTotalGasUsed = async (address) => {
  axiosController = new AbortController();
  return await axios
    .get(
      `${ETHERSCAN_ENDPOINT}?module=account&action=txlist&address=${address}&apikey=${ETHERSCAN_API_KEY}`,
      { signal: axiosController.signal }
    )
    .then((resp) => {
      const totalGasUsed = resp.data.result.reduce((acc, transaction) => {
        if (transaction.from.toLowerCase() === address.toLowerCase()) {
          return acc + parseInt(transaction.gasUsed, 10);
        } else {
          return acc;
        }
      }, 0);
      return totalGasUsed;
    })
    .catch((error) => {
      return new Error(
        'Error calculating or retrieving total gas used: ',
        error
      );
    });
};

// queries Rarible API for NFTs owned by address
export const getNfts = async (address) => {
  axiosController = new AbortController();
  return await axios
    .get('https://api.rarible.com/protocol/v0.1/ethereum/nft/items/byOwner', {
      signal: axiosController.signal,
      params: { owner: address, continuation: MAX_NFTS },
    })
    .then((resp) => {
      return resp.data.items;
    })
    .catch((error) => {
      return new Error(
        'Error retrieving list of NFTs from Rarible API: ',
        error
      );
    });
};
