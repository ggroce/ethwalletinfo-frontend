import { combineReducers } from 'redux';

import walletReducer from './wallet/wallet.reducer';

export const rootReducer = combineReducers({
  wallet: walletReducer,
});
