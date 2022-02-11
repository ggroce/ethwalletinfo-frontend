import { all, call } from 'redux-saga/effects';

import { walletSagas } from './wallet/wallet.sagas';

export default function* rootSaga() {
  yield all([call(walletSagas)]);
}
