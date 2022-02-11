import WalletActionTypes from './wallet.types';

export const resetWallet = () => {
  return {
    type: WalletActionTypes.RESET_WALLET,
  };
};

export const setAddressStart = (address) => {
  return {
    type: WalletActionTypes.SET_ADDRESS_START,
    payload: address,
  };
};

export const setAddressSuccess = (address) => {
  return {
    type: WalletActionTypes.SET_ADDRESS_SUCCESS,
    payload: address,
  };
};

export const setAddressFailure = (error) => {
  return {
    type: WalletActionTypes.SET_ADDRESS_FAILURE,
    payload: error,
  };
};

export const getTotalGasUsedStart = (address) => {
  return {
    type: WalletActionTypes.GET_TOTAL_GAS_USED_START,
    payload: address,
  };
};

export const getTotalGasUsedSuccess = (totalGasUsed) => {
  return {
    type: WalletActionTypes.GET_TOTAL_GAS_USED_SUCCESS,
    payload: totalGasUsed,
  };
};

export const getTotalGasUsedFailure = (error) => {
  return {
    type: WalletActionTypes.GET_TOTAL_GAS_USED_FAILURE,
    payload: error,
  };
};

export const getNftsStart = () => {
  return {
    type: WalletActionTypes.GET_NFTS_START,
  };
};

export const getNftsSuccess = (nfts) => {
  return {
    type: WalletActionTypes.GET_NFTS_SUCCESS,
    payload: nfts,
  };
};

export const getNftsFailure = (error) => {
  return {
    type: WalletActionTypes.GET_NFTS_FAILURE,
    payload: error,
  };
};
