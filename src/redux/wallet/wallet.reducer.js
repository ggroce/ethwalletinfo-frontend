import WalletActionTypes from './wallet.types';

export const INITIAL_STATE = {
  address: null,
  totalGasUsed: null,
  nfts: null,
  error: '',
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case WalletActionTypes.RESET_WALLET:
      return {
        ...INITIAL_STATE,
      };
    case WalletActionTypes.SET_ADDRESS_START:
      return {
        ...INITIAL_STATE,
      };
    case WalletActionTypes.SET_ADDRESS_SUCCESS:
      return {
        ...state,
        address: action.payload,
        error: '',
      };
    case WalletActionTypes.SET_ADDRESS_FAILURE:
      return {
        ...INITIAL_STATE,
        error: action.payload,
      };
    case WalletActionTypes.GET_TOTAL_GAS_USED_SUCCESS:
      return {
        ...state,
        totalGasUsed: action.payload,
        error: '',
      };
    case WalletActionTypes.GET_TOTAL_GAS_USED_FAILURE:
      return {
        ...INITIAL_STATE,
        error: action.payload,
      };
    case WalletActionTypes.GET_NFTS_SUCCESS:
      return {
        ...state,
        nfts: action.payload,
        error: '',
      };
    case WalletActionTypes.GET_NFTS_FAILURE:
      return {
        ...state,
        nfts: null,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default walletReducer;
