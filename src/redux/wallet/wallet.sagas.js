import { takeLatest, call, put, all, select } from 'redux-saga/effects';

import WalletActionTypes from './wallet.types';
import {
  setAddressSuccess,
  setAddressFailure,
  getTotalGasUsedStart,
  getTotalGasUsedSuccess,
  getTotalGasUsedFailure,
  getNftsStart,
  getNftsSuccess,
  getNftsFailure,
} from './wallet.actions';
import {
  validateAddress,
  getEthTransactions,
  getNfts,
  axiosController,
} from './wallet.utils';
import { getAddress } from './wallet.selectors';

// cancels any pending axios requests while RESET_WALLET action is clearing store
export function* handleResetWallet() {
  try {
    yield axiosController.abort();
  } catch (error) {
    console.log('Error cancelling any pending requests ', error);
  }
}

export function* handleSetAddressStart({ payload }) {
  try {
    const address = validateAddress(payload);
    if (address) {
      yield put(setAddressSuccess(address));
    }
  } catch (error) {
    yield put(setAddressFailure(error.message));
  }
}

export function* handleSetAddressSuccess({ payload }) {
  try {
    yield put(getTotalGasUsedStart(payload));
  } catch (error) {
    yield put(setAddressFailure(error.message));
  }
}

export function* handleGetTotalGasUsedStart({ payload }) {
  try {
    const totalGasUsedResp = yield getEthTransactions(payload);
    if (totalGasUsedResp instanceof Error) {
      throw totalGasUsedResp;
    }
    yield put(getTotalGasUsedSuccess(totalGasUsedResp));
  } catch (error) {
    console.log(error);
    yield put(getTotalGasUsedFailure(error.message));
  }
}

export function* handleGetTotalGasUsedSuccess() {
  try {
    yield put(getNftsStart());
  } catch (error) {
    yield put(getNftsFailure(error.message));
  }
}

export function* handleGetNftsStart() {
  try {
    const address = yield select(getAddress);
    const nftRequestResp = yield getNfts(address);
    if (nftRequestResp instanceof Error) {
      throw nftRequestResp;
    }
    yield put(getNftsSuccess(nftRequestResp));
  } catch (error) {
    console.log(error);
    yield put(getNftsFailure(error.message));
  }
}

export function* watchResetWallet() {
  yield takeLatest(WalletActionTypes.RESET_WALLET, handleResetWallet);
}

export function* watchSetAddressStart() {
  yield takeLatest(WalletActionTypes.SET_ADDRESS_START, handleSetAddressStart);
}

export function* watchSetAddressSuccess() {
  yield takeLatest(
    WalletActionTypes.SET_ADDRESS_SUCCESS,
    handleSetAddressSuccess
  );
}

export function* watchGetTotalGasUsedStart() {
  yield takeLatest(
    WalletActionTypes.GET_TOTAL_GAS_USED_START,
    handleGetTotalGasUsedStart
  );
}

export function* watchGetTotalGasUsedSuccess() {
  yield takeLatest(
    WalletActionTypes.GET_TOTAL_GAS_USED_SUCCESS,
    handleGetTotalGasUsedSuccess
  );
}

export function* watchGetNftsStart() {
  yield takeLatest(WalletActionTypes.GET_NFTS_START, handleGetNftsStart);
}

export function* walletSagas() {
  yield all([
    call(watchResetWallet),
    call(watchSetAddressStart),
    call(watchGetTotalGasUsedStart),
    call(watchSetAddressSuccess),
    call(watchGetTotalGasUsedSuccess),
    call(watchGetNftsStart),
  ]);
}
