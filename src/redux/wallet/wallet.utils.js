import axios from 'axios';
import { ethers } from 'ethers';
import {
  ETHERSCAN_ENDPOINT,
  RARIBLE_ENDPOINT,
  MAX_NFTS,
} from '../../constants';
import { ETHERSCAN_API_KEY } from '../../etherscan-apikey';

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

// gets all Ethereum transactions for supplied Ethereum address from etherscan
export const getEthTransactions = async (address) => {
  axiosController = new AbortController();
  return await axios
    .get(
      `${ETHERSCAN_ENDPOINT}?module=account&action=txlist&address=${address}&apikey=${ETHERSCAN_API_KEY}`,
      { signal: axiosController.signal }
    )
    .then((resp) => {
      if (resp.data.status === '0') {
        throw new Error(resp.data.result);
      }
      return resp;
    })
    .catch((error) => {
      console.log('Error from wallet.utils.getEthTransactions: ', error);
      return new Error('Error retrieving transactions: ', error);
    });
};

// calculates total amount of gas used by all 'from' transactions for address using Etherscan API
export const calcTotalGasUsed = (transactions, address) => {
  const totalGasUsed = transactions.data.result.reduce((acc, transaction) => {
    if (transaction.from.toLowerCase() === address.toLowerCase()) {
      const total = transaction.gasPrice * transaction.gasUsed;
      return acc + total;
    } else {
      return acc;
    }
  }, 0);
  const totalGasUsedInEth = ethers.utils.formatEther(
    totalGasUsed.toString(),
    'wei'
  );
  return totalGasUsedInEth;
};

// queries Rarible API for NFTs owned by address
export const getNfts = async (address) => {
  axiosController = new AbortController();
  return await axios
    .get(RARIBLE_ENDPOINT, {
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
