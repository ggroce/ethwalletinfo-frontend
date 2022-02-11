import walletReducer from './wallet.reducer';
import WalletActionTypes from './wallet.types';
import { INITIAL_STATE } from './wallet.reducer';

test('wallet.reducer: should return the initial state', () => {
  expect(walletReducer(undefined, {})).toEqual(INITIAL_STATE);
});

test('wallet.reducer: should reset wallet to INITIAL_STATE', () => {
  expect(
    walletReducer(INITIAL_STATE, { type: WalletActionTypes.RESET_WALLET })
  ).toEqual(INITIAL_STATE);
});

test('wallet.reducer: should correctly set Ethereum address on SET_ADDRESS_SUCCESS', () => {
  const correctStateAfterSetAddressSuccess = {
    ...INITIAL_STATE,
    address: '0x123',
  };

  expect(
    walletReducer(INITIAL_STATE, {
      type: WalletActionTypes.SET_ADDRESS_SUCCESS,
      payload: '0x123',
    })
  ).toEqual(correctStateAfterSetAddressSuccess);
});

test('wallet.reducer: should clear state and submit error on SET_ADDRESS_FAILURE', () => {
  const correctStateAfterSetAddressFailure = {
    ...INITIAL_STATE,
    error: 'some error on SET_ADDRESS_FAILURE',
  };

  expect(
    walletReducer(INITIAL_STATE, {
      type: WalletActionTypes.SET_ADDRESS_FAILURE,
      payload: 'some error on SET_ADDRESS_FAILURE',
    })
  ).toEqual(correctStateAfterSetAddressFailure);
});

test('wallet.reducer: should set totalGasUsed on GET_TOTAL_GAS_USED_SUCCESS', () => {
  const correctStateAfterGetTotalGasUsedSuccess = {
    ...INITIAL_STATE,
    totalGasUsed: '12345',
  };

  expect(
    walletReducer(INITIAL_STATE, {
      type: WalletActionTypes.GET_TOTAL_GAS_USED_SUCCESS,
      payload: '12345',
    })
  ).toEqual(correctStateAfterGetTotalGasUsedSuccess);
});

test('wallet.reducer: should clear state and submit error on GET_TOTAL_GAS_USED_FAILURE', () => {
  const correctStateAfterGetTotalGasUsedFailure = {
    ...INITIAL_STATE,
    error: 'some error on GET_TOTAL_GAS_USED_FAILURE',
  };

  expect(
    walletReducer(INITIAL_STATE, {
      type: WalletActionTypes.GET_TOTAL_GAS_USED_FAILURE,
      payload: 'some error on GET_TOTAL_GAS_USED_FAILURE',
    })
  ).toEqual(correctStateAfterGetTotalGasUsedFailure);
});

test('wallet.reducer: should return current state and set nfts on GET_NFTS_SUCCESS', () => {
  const stateBeforeGetNftsSuccess = {
    ...INITIAL_STATE,
    address: '0x123',
    totalGasUsed: '12345',
  };

  const correctStateAfterGetNftsSuccess = {
    address: '0x123',
    totalGasUsed: '12345',
    nfts: ['nft1', 'nft2', 'nft3'],
    error: '',
  };

  expect(
    walletReducer(stateBeforeGetNftsSuccess, {
      type: WalletActionTypes.GET_NFTS_SUCCESS,
      payload: ['nft1', 'nft2', 'nft3'],
    })
  ).toEqual(correctStateAfterGetNftsSuccess);
});

test('wallet.reducer: should return current state and submit error on GET_NFTS_FAILURE', () => {
  const stateBeforeGetNftsFailure = {
    ...INITIAL_STATE,
    address: '0x123',
    totalGasUsed: '12345',
  };

  const correctStateAfterGetNftsFailure = {
    address: '0x123',
    totalGasUsed: '12345',
    nfts: null,
    error: 'some error on GET_NFTS_FAILURE',
  };

  expect(
    walletReducer(stateBeforeGetNftsFailure, {
      type: WalletActionTypes.GET_NFTS_FAILURE,
      payload: 'some error on GET_NFTS_FAILURE',
    })
  ).toEqual(correctStateAfterGetNftsFailure);
});
