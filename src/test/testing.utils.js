import { render } from '@testing-library/react';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import walletReducer, { INITIAL_STATE } from '../redux/wallet/wallet.reducer';

export const initialStateWalletStore = {
  wallet: {
    ...INITIAL_STATE,
  },
};

export const editWalletStore = (newObjects) => {
  return {
    ...initialStateWalletStore,
    wallet: {
      ...newObjects,
    },
  };
};

export const renderWithRedux = (
  component,
  { initialState, store = createStore(walletReducer, initialState) } = {}
) => {
  return {
    ...render(<Provider store={store}>{component}</Provider>),
    store,
  };
};
